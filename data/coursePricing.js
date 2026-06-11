/**
 * Canonical course prices — server uses this to validate payment amounts.
 * Keep in sync with pages/CoursePage.jsx course data.
 */
export const COURSE_PRICING = {
  1: { price: 1999 },
  2: { price: 1999 },
  3: { price: 5999 },
  4: { price: 6499 },
  5: { price: 6999 },
  6: { price: 1999 },
  7: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  8: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1999 } },
  9: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  10: { durationPrices: { '2 Weeks': 499, '4 Weeks': 1199, '8 Weeks': 1999 } },
  11: { durationPrices: { '2 Weeks': 499, '4 Weeks': 1199, '8 Weeks': 1999 } },
  12: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  13: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  14: { durationPrices: { '2 Weeks': 499, '4 Weeks': 1199, '8 Weeks': 1999 } },
  15: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  16: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  17: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  18: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  19: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  20: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
  21: { durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 } },
};

export function getCoursePrice(courseId, duration) {
  const course = COURSE_PRICING[courseId];
  if (!course) return null;

  if (course.durationPrices) {
    if (!duration || !course.durationPrices[duration]) return null;
    return course.durationPrices[duration];
  }

  return course.price;
}
