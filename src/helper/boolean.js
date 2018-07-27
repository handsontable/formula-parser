/* eslint-disable import/prefer-default-export */
/**
 * Convert value into boolean.
 *
 * @param {String|Boolean|Number|Any} boolean
 * @returns {*}
 */
export function toBoolean(boolean) {
  let result;

  if (typeof boolean === 'boolean') {
    result = boolean;
  } else if (typeof boolean === 'string') {
    result = boolean !== '' && boolean !== '0';
  } else if (typeof boolean === 'number') {
    result = boolean !== 0;
  } else {
    result = !!boolean;
  }

  return result;
}
