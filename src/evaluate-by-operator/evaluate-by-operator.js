import {default as add} from './operator/add';
import {default as ampersand} from './operator/ampersand';
import {default as divide} from './operator/divide';
import {default as equal} from './operator/equal';
import {default as formulaFunction} from './operator/formula-function';
import {default as greaterThan} from './operator/greater-than';
import {default as greaterThanOrEqual} from './operator/greater-than-or-equal';
import {default as lessThan} from './operator/less-than';
import {default as lessThanOrEqual} from './operator/less-than-or-equal';
import {default as minus} from './operator/minus';
import {default as multiply} from './operator/multiply';
import {default as notEqual} from './operator/not-equal';
import {default as power} from './operator/power';
import {ERROR_NAME} from './../error';

const availableOperators = Object.create(null);

registerOperation(add.SYMBOL, add);
registerOperation(ampersand.SYMBOL, ampersand);
registerOperation(divide.SYMBOL, divide);
registerOperation(equal.SYMBOL, equal);
registerOperation(power.SYMBOL, power);
registerOperation(formulaFunction.SYMBOL, formulaFunction);
registerOperation(greaterThan.SYMBOL, greaterThan);
registerOperation(greaterThanOrEqual.SYMBOL, greaterThanOrEqual);
registerOperation(lessThan.SYMBOL, lessThan);
registerOperation(lessThanOrEqual.SYMBOL, lessThanOrEqual);
registerOperation(multiply.SYMBOL, multiply);
registerOperation(notEqual.SYMBOL, notEqual);
registerOperation(minus.SYMBOL, minus);

/**
 * Evaluate values by operator id.git
 *
 * @param {String} operator Operator id.
 * @param {Array} [params=[]] Arguments to evaluate.
 * @returns {*}
 */
export default function evaluateByOperator(operator, params = []) {
  operator = operator.toUpperCase();

  if (!availableOperators[operator]) {
    throw Error(ERROR_NAME);
  }

  return availableOperators[operator](...params);
}

/**
 * Register operator.
 *
 * @param {String|Array} symbol Symbol to register.
 * @param {Function} func Logic to register for this symbol.
 */
export function registerOperation(symbol, func) {
  if (!Array.isArray(symbol)) {
    symbol = [symbol.toUpperCase()];
  }
  symbol.forEach((s) => {
    if (func.isFactory) {
      availableOperators[s] = func(s);
    } else {
      availableOperators[s] = func;
    }
  });
}
