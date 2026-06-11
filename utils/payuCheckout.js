export function submitPayuPayment(payment) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = payment.action;
  form.style.display = 'none';

  Object.entries(payment.fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value ?? '';
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

export async function startPayuPayment(enrollmentPayload) {
  const response = await fetch('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enrollmentPayload),
  });

  const payment = await response.json();
  if (!response.ok) {
    throw new Error(payment.error || 'Unable to start PayU payment.');
  }

  submitPayuPayment(payment);
}
