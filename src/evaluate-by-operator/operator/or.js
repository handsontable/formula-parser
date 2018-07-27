import { toBoolean } from './../../helper/boolean';

export const SYMBOL = '||';

export default function func(first, ...rest) {
  return rest.reduce((acc, value) => acc || toBoolean(value), toBoolean(first));
}

func.SYMBOL = SYMBOL;
