/**
 * Convert value into number.
 *
 * @param {String|Number} number
 * @returns {*}
 */
export function toNumber(number) {
  let result;

  if (typeof number === 'number') {
    result = number;

  } else if (typeof number === 'string') {
    result = number.indexOf('.') > -1 ? parseFloat(number) : parseInt(number, 10);
  } else if (number instanceof Date) {
    // Excel serial dates are expressed as number of days since January 1, 1900
    const unix = number.getTime() / 1000;
    const excel = (unix / 86400) + 25569;
    result = excel;
  }

  return result;
}

/**
 * Invert provided number.
 *
 * @param {Number} number
 * @returns {Number} Returns inverted number.
 */
export function invertNumber(number) {
  return -1 * toNumber(number);
}
