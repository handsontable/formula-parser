import { toNumber } from './../../helper/number';
import { ERROR_VALUE } from './../../error';
import BigNumber from 'bignumber.js';

export const SYMBOL = '^';

export default function func(exp1, exp2) {
  if (!Number.isInteger(toNumber(exp2))) {
    throw Error(ERROR_VALUE);
  }

  const result = (new BigNumber(toNumber(exp1)).toPower(toNumber(exp2))).toNumber();
  if (isNaN(result)) {
    throw Error(ERROR_VALUE);
  }

  return result;
};

func.SYMBOL = SYMBOL;
