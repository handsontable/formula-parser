import {toNumber} from './../../helper/number';

export const SYMBOL = '^';

export default function func(exp1, exp2) {
  return Math.pow(toNumber(exp1), toNumber(exp2));
};

func.SYMBOL = SYMBOL;
