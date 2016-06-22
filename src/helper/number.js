export function toNumber(number) {
  let result;

  if (typeof number === 'number') {
    result = number;

  } else if (typeof number === 'string') {
    result = number.indexOf('.') > -1 ? parseFloat(number) : parseInt(number, 10);
  }

  return result;
}

export function invertNumber(number) {
  return -1 * toNumber(number);
}
