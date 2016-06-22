import {toNumber} from './../../helper/number';

export const SYMBOL = '+';

export default function func(first, ...rest) {
  return rest.reduce((acc, value) => acc + toNumber(value), toNumber(first));
};

func.SYMBOL = SYMBOL;
