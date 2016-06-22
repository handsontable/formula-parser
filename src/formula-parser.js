import Emitter from 'tiny-emitter';
import evaluateByOperator from './evaluate-by-operator/evaluate-by-operator';
import mixin from 'mixin';
import {Parser} from './grammar-parser/grammar-parser';
import {trimEdges} from './helper/string';
import {toNumber, invertNumber} from './helper/number';
import {default as errorParser, ERROR, ERROR_NAME} from './error';
import {extractLabel, columnLabelToIndex} from './helper/cell';

export {default as SUPPORTED_FORMULAS} from './supported-formulas';

const variables = new WeakMap();
const values = new WeakMap();

/**
 * @class FormulaParser
 */
class FormulaParser {
  constructor() {
    this.parser = new Parser();
    this.parser.yy = {
      toNumber,
      trimEdges,
      invertNumber,
      callVariable: (variable) => this._cellVariable(variable),
      evaluateByOperator,
      callFunction: evaluateByOperator,
      cellValue: (value) => this._cellValue(value),
      cellRangeValue: (start, end) => this._cellRangeValue(start, end),
      // relativeCellValue: (value) => this._relativeCellValue(value),
      // relativeCellRangeValue: (start, end) => this._relativeCellRangeValue(start, end),
      // mixedCellValue: (value) => this._mixedCellValue(value),
      // mixedCellRangeValue: (start, end) => this._mixedCellRangeValue(start, end),
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
   * @param {String} expression
   * @return {*}
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
    const resultError = errorParser(result);

    if (result instanceof Error || resultError) {
      error = resultError || errorParser(result.message);
      result = null;
    }

    return {
      error: error,
      result: result
    };
  }

  setVariable(name, value) {
    variables.get(this)[name] = value;
  }

  getVariable(name) {
    return variables.get(this)[name];
  }

  setCellValue(row, column, value) {

  }

  getCellValue(row, column) {

  }

  _cellVariable(variable) {
    this.emit('callVariable', variable);

    const value = this.getVariable(variable);

    if (value === void 0) {
      throw Error(ERROR_NAME);
    }

    return value;
  }

  _cellValue(value) {
    const [row, column] = extractLabel(value);

    const cell = {
      row, column
    };

    console.log('cellValue', cell);
  }

  _cellRangeValue(start, end) {
    const [startRow, startColumn] = extractLabel(start);
    const [endRow, endColumn] = extractLabel(end);

    const startCell = {
      row: startRow,
      column: startColumn,
    };
    const endCell = {
      row: endRow,
      column: endColumn,
    };

    this.emit('callRangeValue', startCell, endCell);

    console.log('cellRangeValue', startCell, endCell);
  }

  // _absoluteCellValue(value) {
  //   console.log('absoluteCellValue', value);
  // }
  //
  // _absoluteCellRangeValue(start, end) {
  //   console.log('absoluteCellRangeValue', start, end);
  // }
  //
  // _relativeCellValue(value) {
  //   console.log('relativeCellValue', value);
  // }
  //
  // _relativeCellRangeValue(start, end) {
  //   console.log('relativeCellRangeValue', start, end);
  // }
  //
  // _mixedCellValue(value) {
  //   console.log('mixedCellValue', value);
  // }
  //
  // _mixedCellRangeValue(start, end) {
  //   console.log('mixedCellRangeValue', start, end);
  // }
}

FormulaParser = mixin(FormulaParser, Emitter);

export {FormulaParser};
