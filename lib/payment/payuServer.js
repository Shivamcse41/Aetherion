import crypto from 'crypto';
import { getCoursePrice } from '../../data/coursePricing.js';
import { validateEnrollmentPayload } from './validators.js';
import { savePaidEnrollment } from './enrollmentStore.js';
import { signCompletionToken, verifyCompletionToken } from './signing.js';

const PAYU_URLS = {
  test: 'https://test.payu.in/_payment',
  production: 'https://secure.payu.in/_payment',
};

function getPayuConfig() {
  const key = process.env.PAYU_MERCHANT_KEY;
  const salt = process.env.PAYU_MERCHANT_SALT;
  const mode = process.env.PAYU_MODE === 'production' ? 'production' : 'test';

  if (!key || !salt) {
    throw new Error('PayU is not configured on the server.');
  }

  return { key, salt, mode };
}

function sha512(value) {
  return crypto.createHash('sha512').update(value).digest('hex');
}

function generateTxnId() {
  return `AETH${Date.now()}`.slice(0, 25);
}

function formatAmount(amountInr) {
  return Number(amountInr).toFixed(2);
}

function getFirstName(fullName) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

function buildRequestHash({ key, txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5, salt }) {
  const sequence = [
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 || '',
    udf2 || '',
    udf3 || '',
    udf4 || '',
    udf5 || '',
    '',
    '',
    '',
    '',
    '',
    salt,
  ].join('|');

  return sha512(sequence);
}

export function verifyResponseHash(params, salt) {
  const {
    status,
    udf5 = '',
    udf4 = '',
    udf3 = '',
    udf2 = '',
    udf1 = '',
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    key,
    hash,
    additionalCharges,
  } = params;

  if (!hash || !status || !txnid || !key) return false;

  let sequence;
  if (additionalCharges) {
    sequence = [
      additionalCharges,
      salt,
      status,
      '',
      '',
      '',
      '',
      '',
      udf5,
      udf4,
      udf3,
      udf2,
      udf1,
      email,
      firstname,
      productinfo,
      amount,
      txnid,
      key,
    ].join('|');
  } else {
    sequence = [
      salt,
      status,
      '',
      '',
      '',
      '',
      '',
      udf5,
      udf4,
      udf3,
      udf2,
      udf1,
      email,
      firstname,
      productinfo,
      amount,
      txnid,
      key,
    ].join('|');
  }

  const expected = sha512(sequence);
  const received = String(hash).toLowerCase();

  return (
    expected.length === received.length &&
    crypto.timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(received, 'utf8'))
  );
}

function resolveBaseUrl(origin) {
  return (
    process.env.SITE_URL ||
    origin ||
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

export async function createPayuPayment(body, origin) {
  const validation = validateEnrollmentPayload(body);
  if (!validation.ok) {
    return { status: 400, body: { error: validation.error } };
  }

  const { courseId, duration, name, email, phone, college, courseTitle } = validation.data;
  const priceInr = getCoursePrice(courseId, duration);

  if (!priceInr || priceInr < 1) {
    return { status: 400, body: { error: 'Could not determine a valid course price.' } };
  }

  try {
    const { key, salt, mode } = getPayuConfig();
    const baseUrl = resolveBaseUrl(origin);
    const txnid = generateTxnId();
    const amount = formatAmount(priceInr);
    const productinfo = courseTitle.slice(0, 100);
    const firstname = getFirstName(name);

    const udf1 = String(courseId);
    const udf2 = duration || '';
    const udf3 = college.slice(0, 100);
    const udf4 = phone.slice(0, 15);
    const udf5 = name.slice(0, 100);

    const hash = buildRequestHash({
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
      salt,
    });

    return {
      status: 200,
      body: {
        action: PAYU_URLS[mode],
        fields: {
          key,
          txnid,
          amount,
          productinfo,
          firstname,
          email,
          phone,
          surl: `${baseUrl}/api/payu-success`,
          furl: `${baseUrl}/api/payu-failure`,
          hash,
          ...(mode === 'production' ? { service_provider: 'payu_paisa' } : {}),
          udf1,
          udf2,
          udf3,
          udf4,
          udf5,
        },
      },
    };
  } catch (err) {
    console.error('PayU payment creation failed:', err?.message || err);
    return { status: 500, body: { error: 'Unable to start payment. Please try again.' } };
  }
}

function buildEnrollmentFromCallback(params) {
  return {
    course_id: Number(params.udf1),
    course_title: params.productinfo,
    name: params.udf5 || params.firstname,
    email: params.email,
    phone: params.udf4 || '',
    college: params.udf3 || '',
    price: Number(params.amount),
    payment_status: 'paid',
    payu_txnid: params.txnid,
    payu_mihpayid: params.mihpayid || '',
    payu_status: params.status,
  };
}

export async function handlePayuSuccess(params, origin) {
  const baseUrl = resolveBaseUrl(origin);

  try {
    const { salt } = getPayuConfig();

    if (!verifyResponseHash(params, salt)) {
      return { redirect: `${baseUrl}/payment/failure?reason=invalid_hash` };
    }

    if (params.status !== 'success') {
      return { redirect: `${baseUrl}/payment/failure?reason=payment_failed&txnid=${params.txnid || ''}` };
    }

    const enrollment = buildEnrollmentFromCallback(params);
    const saveResult = await savePaidEnrollment(enrollment);

    if (saveResult.saved) {
      return { redirect: `${baseUrl}/payment/success?txnid=${encodeURIComponent(params.txnid)}` };
    }

    const token = signCompletionToken(enrollment);
    return {
      redirect: `${baseUrl}/payment/success?token=${encodeURIComponent(token)}`,
    };
  } catch (err) {
    console.error('PayU success handler failed:', err?.message || err);
    return { redirect: `${baseUrl}/payment/failure?reason=server_error` };
  }
}

export function handlePayuFailure(params, origin) {
  const baseUrl = resolveBaseUrl(origin);
  const txnid = params?.txnid ? `&txnid=${encodeURIComponent(params.txnid)}` : '';
  return { redirect: `${baseUrl}/payment/failure?reason=cancelled${txnid}` };
}

export async function finalizeEnrollment(token) {
  const enrollment = verifyCompletionToken(token);
  if (!enrollment) {
    return { status: 400, body: { error: 'Invalid or expired payment token.', saved: false } };
  }

  const saveResult = await savePaidEnrollment(enrollment);
  if (!saveResult.saved) {
    return { status: 500, body: { error: 'Could not save enrollment.', saved: false } };
  }

  return {
    status: 200,
    body: {
      saved: true,
      txnid: enrollment.payu_txnid,
      courseTitle: enrollment.course_title,
    },
  };
}
