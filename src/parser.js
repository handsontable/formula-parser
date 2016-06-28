import Emitter from 'tiny-emitter';
import evaluateByOperator from './evaluate-by-operator/evaluate-by-operator';
import mixin from 'mixin';
import {Parser as GrammarParser} from './grammar-parser/grammar-parser';
import {trimEdges} from './helper/string';
import {toNumber, invertNumber} from './helper/number';
import {default as errorParser, ERROR, ERROR_NAME} from './error';
import {extractLabel} from './helper/cell';

export {default as SUPPORTED_FORMULAS} from './supported-formulas';

const variables = new WeakMap();

/**
 * @class Parser
 */
class Parser {
  constructor() {
    this.parser = new GrammarParser();
    this.parser.yy = {
      toNumber,
      trimEdges,
      invertNumber,
      callVariable: (variable) => this._callVariable(variable),
      evaluateByOperator,
      callFunction: evaluateByOperator,
      cellValue: (value) => this._callCellValue(value),
      rangeValue: (start, end) => this._callRangeValue(start, end),
    };
    variables.set(this, {
      TRUE: true,
      FALSE: false,
      NULL: null,
    });
  }

  /**
   * Parse formula expression.
   *
   * @param {String} expression to parse.
   * @return {*} Returns an object with tow properties `error` and `result`.
   */
  parse(expression) {
    let result = null;
    let error = null;

    try {
      result = this.parser.parse(expression);
    } catch (ex) {
      const message = errorParser(ex.message);

      if (message) {
        error = message;
      } else {
        error = errorParser(ERROR);
      }
    }

    if (result instanceof Error) {
      error = errorParser(result.message) || errorParser(ERROR);
      result = null;
    }

    return {
      error: error,
      result: result
    };
  }

  /**
   * Set predefined variable name which can be visible while parsing formula expression.
   *
   * @param {String} name Variable name.
   * @param {*} value Variable value.
   * @returns {Parser}
   */
  setVariable(name, value) {
    variables.get(this)[name] = value;

    return this;
  }

  /**
   * Get variable name.
   *
   * @param {String} name Variable name.
   * @returns {*}
   */
  getVariable(name) {
    return variables.get(this)[name];
  }

  /**
   * Retrieve variable value by its name.
   *
   * @param name Variable name.
   * @returns {*}
   * @private
   */
  _callVariable(name) {
    let value = this.getVariable(name);

    this.emit('callVariable', name, (newValue) => {
      if (newValue !== void 0) {
        value = newValue;
      }
    });

    if (value === void 0) {
      throw Error(ERROR_NAME);
    }

    return value;
  }

  /**
   * Retrieve value by its label (`B3`, `B$3`, `B$3`, `$B$3`).
   *
   * @param {String} label Coordinates.
   * @returns {*}
   * @private
   */
  _callCellValue(label) {
    const [row, column] = extractLabel(label);
    let value = void 0;

    this.emit('callCellValue', {label, row, column}, (_value) => {
      value = _value;
    });

    return value;
  }

  /**
   * Retrieve value by its label (`B3`, `B$3`, `B$3`, `$B$3`).
   *
   * @param {String} firstLabel Coordinates of the first cell.
   * @param {String} lastLabel Coordinates of the last cell.
   * @returns {Array} Returns an array of mixed values.
   * @private
   */
  _callRangeValue(firstLabel, lastLabel) {
    const [firstRow, firstColumn] = extractLabel(firstLabel);
    const [lastRow, lastColumn] = extractLabel(lastLabel);

    const firstCell = {
      label: firstLabel,
      row: firstRow,
      column: firstColumn,
    };
    const lastCell = {
      label: lastLabel,
      row: lastRow,
      column: lastColumn,
    };
    let value = [];

    this.emit('callRangeValue', firstCell, lastCell, (_value = []) => {
      value = _value;
    });

    return value;
  }
}

Parser = mixin(Parser, Emitter);

export {Parser};
