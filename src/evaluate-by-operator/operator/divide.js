import { toNumber } from './../../helper/number';
import { ERROR_DIV_ZERO, ERROR_VALUE } from './../../error';
import Decimal from 'decimal.js';

export const SYMBOL = '/';

export default function func(first, ...rest) {
  try {
    const result = rest.reduce((acc, value) => {
      const tempValue = (new Decimal(acc)).div(new Decimal(toNumber(value))).toNumber();
      if (tempValue === Infinity || tempValue === -Infinity) {
        throw Error(ERROR_DIV_ZERO);
      }

      return tempValue;
    }, toNumber(first));

    if (isNaN(result)) {
      throw Error(ERROR_VALUE);
    }

    return result;
  } catch (error) {
    if (error.message === ERROR_DIV_ZERO) {
      throw Error(ERROR_DIV_ZERO);
    }

    throw Error(ERROR_VALUE);
  }
};

func.SYMBOL = SYMBOL;
