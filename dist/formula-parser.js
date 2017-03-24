(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define(["fs", "path"], factory);
	else if(typeof exports === 'object')
		exports["formulaParser"] = factory(require("fs"), require("path"));
	else
		root["formulaParser"] = factory(root["fs"], root["path"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_43__, __WEBPACK_EXTERNAL_MODULE_44__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rowLabelToIndex = exports.rowIndexToLabel = exports.columnLabelToIndex = exports.columnIndexToLabel = exports.toLabel = exports.extractLabel = exports.error = exports.Parser = exports.ERROR_VALUE = exports.ERROR_REF = exports.ERROR_NUM = exports.ERROR_NULL = exports.ERROR_NOT_AVAILABLE = exports.ERROR_NAME = exports.ERROR_DIV_ZERO = exports.ERROR = exports.SUPPORTED_FORMULAS = undefined;
	
	var _parser = __webpack_require__(1);
	
	var _error = __webpack_require__(7);
	
	var _error2 = _interopRequireDefault(_error);
	
	var _cell = __webpack_require__(46);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.SUPPORTED_FORMULAS = _parser.SUPPORTED_FORMULAS;
	exports.ERROR = _error.ERROR;
	exports.ERROR_DIV_ZERO = _error.ERROR_DIV_ZERO;
	exports.ERROR_NAME = _error.ERROR_NAME;
	exports.ERROR_NOT_AVAILABLE = _error.ERROR_NOT_AVAILABLE;
	exports.ERROR_NULL = _error.ERROR_NULL;
	exports.ERROR_NUM = _error.ERROR_NUM;
	exports.ERROR_REF = _error.ERROR_REF;
	exports.ERROR_VALUE = _error.ERROR_VALUE;
	exports.Parser = _parser.Parser;
	exports.error = _error2.default;
	exports.extractLabel = _cell.extractLabel;
	exports.toLabel = _cell.toLabel;
	exports.columnIndexToLabel = _cell.columnIndexToLabel;
	exports.columnLabelToIndex = _cell.columnLabelToIndex;
	exports.rowIndexToLabel = _cell.rowIndexToLabel;
	exports.rowLabelToIndex = _cell.rowLabelToIndex;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Parser = exports.SUPPORTED_FORMULAS = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _supportedFormulas = __webpack_require__(2);
	
	Object.defineProperty(exports, 'SUPPORTED_FORMULAS', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_supportedFormulas).default;
	  }
	});
	
	var _tinyEmitter = __webpack_require__(3);
	
	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);
	
	var _evaluateByOperator = __webpack_require__(4);
	
	var _evaluateByOperator2 = _interopRequireDefault(_evaluateByOperator);
	
	var _grammarParser = __webpack_require__(41);
	
	var _string = __webpack_require__(45);
	
	var _number = __webpack_require__(6);
	
	var _error = __webpack_require__(7);
	
	var _error2 = _interopRequireDefault(_error);
	
	var _cell = __webpack_require__(46);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * @class Parser
	 */
	var Parser = function (_Emitter) {
	  _inherits(Parser, _Emitter);
	
	  function Parser() {
	    _classCallCheck(this, Parser);
	
	    var _this = _possibleConstructorReturn(this, (Parser.__proto__ || Object.getPrototypeOf(Parser)).call(this));
	
	    _this.parser = new _grammarParser.Parser();
	    _this.parser.yy = {
	      toNumber: _number.toNumber,
	      trimEdges: _string.trimEdges,
	      invertNumber: _number.invertNumber,
	      throwError: function throwError(errorName) {
	        return _this._throwError(errorName);
	      },
	      callVariable: function callVariable(variable) {
	        return _this._callVariable(variable);
	      },
	      evaluateByOperator: _evaluateByOperator2.default,
	      callFunction: _evaluateByOperator2.default,
	      cellValue: function cellValue(value, sheet) {
	        return _this._callCellValue(value, sheet);
	      },
	      rangeValue: function rangeValue(start, end, sheet) {
	        return _this._callRangeValue(start, end, sheet);
	      }
	    };
	    _this.variables = Object.create(null);
	
	    _this.setVariable('TRUE', true).setVariable('FALSE', false).setVariable('NULL', null);
	    return _this;
	  }
	
	  /**
	   * Parse formula expression.
	   *
	   * @param {String} expression to parse.
	   * @return {*} Returns an object with tow properties `error` and `result`.
	   */
	
	
	  _createClass(Parser, [{
	    key: 'parse',
	    value: function parse(expression) {
	      var result = null;
	      var error = null;
	
	      try {
	        if (expression === '') {
	          result = '';
	        } else {
	          result = this.parser.parse(expression);
	        }
	      } catch (ex) {
	        var message = (0, _error2.default)(ex.message);
	
	        if (message) {
	          error = message;
	        } else {
	          error = (0, _error2.default)(_error.ERROR);
	        }
	      }
	
	      if (result instanceof Error) {
	        error = (0, _error2.default)(result.message) || (0, _error2.default)(_error.ERROR);
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
	
	  }, {
	    key: 'setVariable',
	    value: function setVariable(name, value) {
	      this.variables[name] = value;
	
	      return this;
	    }
	
	    /**
	     * Get variable name.
	     *
	     * @param {String} name Variable name.
	     * @returns {*}
	     */
	
	  }, {
	    key: 'getVariable',
	    value: function getVariable(name) {
	      return this.variables[name];
	    }
	
	    /**
	     * Retrieve variable value by its name.
	     *
	     * @param name Variable name.
	     * @returns {*}
	     * @private
	     */
	
	  }, {
	    key: '_callVariable',
	    value: function _callVariable(name) {
	      var value = this.getVariable(name);
	
	      this.emit('callVariable', name, function (newValue) {
	        if (newValue !== void 0) {
	          value = newValue;
	        }
	      });
	
	      if (value === void 0) {
	        throw Error(_error.ERROR_NAME);
	      }
	
	      return value;
	    }
	
	    /**
	     * Retrieve value by its label (`B3`, `B$3`, `B$3`, `$B$3`).
	     *
	     * @param {String} label Coordinates.
	     * @param {String} sheet Reference sheet name
	     * @returns {*}
	     * @private
	     */
	
	  }, {
	    key: '_callCellValue',
	    value: function _callCellValue(label, sheet) {
	      label = label.toUpperCase();
	
	      var _extractLabel = (0, _cell.extractLabel)(label),
	          _extractLabel2 = _slicedToArray(_extractLabel, 2),
	          row = _extractLabel2[0],
	          column = _extractLabel2[1];
	
	      var value = void 0;
	
	      var cellCoordinate = sheet ? { label: label, row: row, column: column, sheet: sheet } : { label: label, row: row, column: column };
	
	      this.emit('callCellValue', cellCoordinate, function (_value) {
	        value = _value;
	      });
	
	      return value;
	    }
	
	    /**
	     * Retrieve value by its label (`B3:A1`, `B$3:A1`, `B$3:$A1`, `$B$3:A$1`).
	     *
	     * @param {String} startLabel Coordinates of the first cell.
	     * @param {String} endLabel Coordinates of the last cell.
	     * @param {String} sheet Reference sheet name
	     * @returns {Array} Returns an array of mixed values.
	     * @private
	     */
	
	  }, {
	    key: '_callRangeValue',
	    value: function _callRangeValue(startLabel, endLabel, sheet) {
	      startLabel = startLabel.toUpperCase();
	      endLabel = endLabel.toUpperCase();
	
	      var _extractLabel3 = (0, _cell.extractLabel)(startLabel),
	          _extractLabel4 = _slicedToArray(_extractLabel3, 2),
	          startRow = _extractLabel4[0],
	          startColumn = _extractLabel4[1];
	
	      var _extractLabel5 = (0, _cell.extractLabel)(endLabel),
	          _extractLabel6 = _slicedToArray(_extractLabel5, 2),
	          endRow = _extractLabel6[0],
	          endColumn = _extractLabel6[1];
	
	      var startCell = {};
	      var endCell = {};
	
	      if (startRow.index <= endRow.index) {
	        startCell.row = startRow;
	        endCell.row = endRow;
	      } else {
	        startCell.row = endRow;
	        endCell.row = startRow;
	      }
	
	      if (startColumn.index <= endColumn.index) {
	        startCell.column = startColumn;
	        endCell.column = endColumn;
	      } else {
	        startCell.column = endColumn;
	        endCell.column = startColumn;
	      }
	
	      startCell.label = (0, _cell.toLabel)(startCell.row, startCell.column);
	      endCell.label = (0, _cell.toLabel)(endCell.row, endCell.column);
	
	      if (sheet) {
	        startCell.sheet = sheet;
	        endCell.sheet = sheet;
	      }
	
	      var value = [];
	
	      this.emit('callRangeValue', startCell, endCell, function () {
	        var _value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	        value = _value;
	      });
	
	      return value;
	    }
	
	    /**
	     * Try to throw error by its name.
	     *
	     * @param {String} errorName Error name.
	     * @returns {String}
	     * @private
	     */
	
	  }, {
	    key: '_throwError',
	    value: function _throwError(errorName) {
	      if ((0, _error.isValidStrict)(errorName)) {
	        throw Error(errorName);
	      }
	
	      throw Error(_error.ERROR);
	    }
	  }]);
	
	  return Parser;
	}(_tinyEmitter2.default);
	
	exports.Parser = Parser;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SUPPORTED_FORMULAS = ['ABS', 'ACCRINT', 'ACOS', 'ACOSH', 'ACOT', 'ACOTH', 'ADD', 'AGGREGATE', 'AND', 'ARABIC', 'ARGS2ARRAY', 'ASIN', 'ASINH', 'ATAN', 'ATAN2', 'ATANH', 'AVEDEV', 'AVERAGE', 'AVERAGEA', 'AVERAGEIF', 'AVERAGEIFS', 'BASE', 'BESSELI', 'BESSELJ', 'BESSELK', 'BESSELY', 'BETA.DIST', 'BETA.INV', 'BETADIST', 'BETAINV', 'BIN2DEC', 'BIN2HEX', 'BIN2OCT', 'BINOM.DIST', 'BINOM.DIST.RANGE', 'BINOM.INV', 'BINOMDIST', 'BITAND', 'BITLSHIFT', 'BITOR', 'BITRSHIFT', 'BITXOR', 'CEILING', 'CEILINGMATH', 'CEILINGPRECISE', 'CHAR', 'CHISQ.DIST', 'CHISQ.DIST.RT', 'CHISQ.INV', 'CHISQ.INV.RT', 'CHOOSE', 'CHOOSE', 'CLEAN', 'CODE', 'COLUMN', 'COLUMNS', 'COMBIN', 'COMBINA', 'COMPLEX', 'CONCATENATE', 'CONFIDENCE', 'CONFIDENCE.NORM', 'CONFIDENCE.T', 'CONVERT', 'CORREL', 'COS', 'COSH', 'COT', 'COTH', 'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTIF', 'COUNTIFS', 'COUNTIN', 'COUNTUNIQUE', 'COVARIANCE.P', 'COVARIANCE.S', 'CSC', 'CSCH', 'CUMIPMT', 'CUMPRINC', 'DATE', 'DATEVALUE', 'DAY', 'DAYS', 'DAYS360', 'DB', 'DDB', 'DEC2BIN', 'DEC2HEX', 'DEC2OCT', 'DECIMAL', 'DEGREES', 'DELTA', 'DEVSQ', 'DIVIDE', 'DOLLAR', 'DOLLARDE', 'DOLLARFR', 'E', 'EDATE', 'EFFECT', 'EOMONTH', 'EQ', 'ERF', 'ERFC', 'EVEN', 'EXACT', 'EXPON.DIST', 'EXPONDIST', 'F.DIST', 'F.DIST.RT', 'F.INV', 'F.INV.RT', 'FACT', 'FACTDOUBLE', 'FALSE', 'FDIST', 'FDISTRT', 'FIND', 'FINV', 'FINVRT', 'FISHER', 'FISHERINV', 'FIXED', 'FLATTEN', 'FLOOR', 'FORECAST', 'FREQUENCY', 'FV', 'FVSCHEDULE', 'GAMMA', 'GAMMA.DIST', 'GAMMA.INV', 'GAMMADIST', 'GAMMAINV', 'GAMMALN', 'GAMMALN.PRECISE', 'GAUSS', 'GCD', 'GEOMEAN', 'GESTEP', 'GROWTH', 'GTE', 'HARMEAN', 'HEX2BIN', 'HEX2DEC', 'HEX2OCT', 'HOUR', 'HTML2TEXT', 'HYPGEOM.DIST', 'HYPGEOMDIST', 'IF', 'IMABS', 'IMAGINARY', 'IMARGUMENT', 'IMCONJUGATE', 'IMCOS', 'IMCOSH', 'IMCOT', 'IMCSC', 'IMCSCH', 'IMDIV', 'IMEXP', 'IMLN', 'IMLOG10', 'IMLOG2', 'IMPOWER', 'IMPRODUCT', 'IMREAL', 'IMSEC', 'IMSECH', 'IMSIN', 'IMSINH', 'IMSQRT', 'IMSUB', 'IMSUM', 'IMTAN', 'INT', 'INTERCEPT', 'INTERVAL', 'IPMT', 'IRR', 'ISBINARY', 'ISBLANK', 'ISEVEN', 'ISLOGICAL', 'ISNONTEXT', 'ISNUMBER', 'ISODD', 'ISODD', 'ISOWEEKNUM', 'ISPMT', 'ISTEXT', 'JOIN', 'KURT', 'LARGE', 'LCM', 'LEFT', 'LEN', 'LINEST', 'LN', 'LOG', 'LOG10', 'LOGEST', 'LOGNORM.DIST', 'LOGNORM.INV', 'LOGNORMDIST', 'LOGNORMINV', 'LOWER', 'LT', 'LTE', 'MATCH', 'MAX', 'MAXA', 'MEDIAN', 'MID', 'MIN', 'MINA', 'MINUS', 'MINUTE', 'MIRR', 'MOD', 'MODE.MULT', 'MODE.SNGL', 'MODEMULT', 'MODESNGL', 'MONTH', 'MROUND', 'MULTINOMIAL', 'MULTIPLY', 'NA', 'NE', 'NEGBINOM.DIST', 'NEGBINOMDIST', 'NETWORKDAYS', 'NOMINAL', 'NORM.DIST', 'NORM.INV', 'NORM.S.DIST', 'NORM.S.INV', 'NORMDIST', 'NORMINV', 'NORMSDIST', 'NORMSINV', 'NOT', 'NOW', 'NPER', 'NPV', 'NUMBERS', 'NUMERAL', 'OCT2BIN', 'OCT2DEC', 'OCT2HEX', 'ODD', 'OR', 'PDURATION', 'PEARSON', 'PERCENTILEEXC', 'PERCENTILEINC', 'PERCENTRANKEXC', 'PERCENTRANKINC', 'PERMUT', 'PERMUTATIONA', 'PHI', 'PI', 'PMT', 'POISSON.DIST', 'POISSONDIST', 'POW', 'POWER', 'PPMT', 'PROB', 'PRODUCT', 'PROPER', 'PV', 'QUARTILE.EXC', 'QUARTILE.INC', 'QUARTILEEXC', 'QUARTILEINC', 'QUOTIENT', 'RADIANS', 'RAND', 'RANDBETWEEN', 'RANK.AVG', 'RANK.EQ', 'RANKAVG', 'RANKEQ', 'RATE', 'REFERENCE', 'REGEXEXTRACT', 'REGEXMATCH', 'REGEXREPLACE', 'REPLACE', 'REPT', 'RIGHT', 'ROMAN', 'ROUND', 'ROUNDDOWN', 'ROUNDUP', 'ROW', 'ROWS', 'RRI', 'RSQ', 'SEARCH', 'SEC', 'SECH', 'SECOND', 'SERIESSUM', 'SIGN', 'SIN', 'SINH', 'SKEW', 'SKEW.P', 'SKEWP', 'SLN', 'SLOPE', 'SMALL', 'SPLIT', 'SPLIT', 'SQRT', 'SQRTPI', 'STANDARDIZE', 'STDEV.P', 'STDEV.S', 'STDEVA', 'STDEVP', 'STDEVPA', 'STDEVS', 'STEYX', 'SUBSTITUTE', 'SUBTOTAL', 'SUM', 'SUMIF', 'SUMIFS', 'SUMPRODUCT', 'SUMSQ', 'SUMX2MY2', 'SUMX2PY2', 'SUMXMY2', 'SWITCH', 'SYD', 'T', 'T.DIST', 'T.DIST.2T', 'T.DIST.RT', 'T.INV', 'T.INV.2T', 'TAN', 'TANH', 'TBILLEQ', 'TBILLPRICE', 'TBILLYIELD', 'TDIST', 'TDIST2T', 'TDISTRT', 'TEXT', 'TIME', 'TIMEVALUE', 'TINV', 'TINV2T', 'TODAY', 'TRANSPOSE', 'TREND', 'TRIM', 'TRIMMEAN', 'TRUE', 'TRUNC', 'UNICHAR', 'UNICODE', 'UNIQUE', 'UPPER', 'VALUE', 'VAR.P', 'VAR.S', 'VARA', 'VARP', 'VARPA', 'VARS', 'WEEKDAY', 'WEEKNUM', 'WEIBULL.DIST', 'WEIBULLDIST', 'WORKDAY', 'XIRR', 'XNPV', 'XOR', 'YEAR', 'YEARFRAC', 'VLOOKUP', 'HLOOKUP', 'IFERROR'];
	
	exports.default = SUPPORTED_FORMULAS;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function E () {
	  // Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}
	
	E.prototype = {
	  on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});
	
	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });
	
	    return this;
	  },
	
	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };
	
	    listener._ = callback
	    return this.on(name, listener, ctx);
	  },
	
	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;
	
	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }
	
	    return this;
	  },
	
	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];
	
	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }
	
	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
	
	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];
	
	    return this;
	  }
	};
	
	module.exports = E;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = evaluateByOperator;
	exports.registerOperation = registerOperation;
	
	var _add = __webpack_require__(5);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _ampersand = __webpack_require__(9);
	
	var _ampersand2 = _interopRequireDefault(_ampersand);
	
	var _divide = __webpack_require__(10);
	
	var _divide2 = _interopRequireDefault(_divide);
	
	var _equal = __webpack_require__(11);
	
	var _equal2 = _interopRequireDefault(_equal);
	
	var _formulaFunction = __webpack_require__(12);
	
	var _formulaFunction2 = _interopRequireDefault(_formulaFunction);
	
	var _greaterThan = __webpack_require__(33);
	
	var _greaterThan2 = _interopRequireDefault(_greaterThan);
	
	var _greaterThanOrEqual = __webpack_require__(34);
	
	var _greaterThanOrEqual2 = _interopRequireDefault(_greaterThanOrEqual);
	
	var _lessThan = __webpack_require__(35);
	
	var _lessThan2 = _interopRequireDefault(_lessThan);
	
	var _lessThanOrEqual = __webpack_require__(36);
	
	var _lessThanOrEqual2 = _interopRequireDefault(_lessThanOrEqual);
	
	var _minus = __webpack_require__(37);
	
	var _minus2 = _interopRequireDefault(_minus);
	
	var _multiply = __webpack_require__(38);
	
	var _multiply2 = _interopRequireDefault(_multiply);
	
	var _notEqual = __webpack_require__(39);
	
	var _notEqual2 = _interopRequireDefault(_notEqual);
	
	var _power = __webpack_require__(40);
	
	var _power2 = _interopRequireDefault(_power);
	
	var _error = __webpack_require__(7);
	
	var _decimal = __webpack_require__(8);
	
	var _decimal2 = _interopRequireDefault(_decimal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var availableOperators = Object.create(null);
	
	// Configuration
	
	_decimal2.default.set({ precision: 15 });
	
	registerOperation(_add2.default.SYMBOL, _add2.default);
	registerOperation(_ampersand2.default.SYMBOL, _ampersand2.default);
	registerOperation(_divide2.default.SYMBOL, _divide2.default);
	registerOperation(_equal2.default.SYMBOL, _equal2.default);
	registerOperation(_power2.default.SYMBOL, _power2.default);
	registerOperation(_formulaFunction2.default.SYMBOL, _formulaFunction2.default);
	registerOperation(_greaterThan2.default.SYMBOL, _greaterThan2.default);
	registerOperation(_greaterThanOrEqual2.default.SYMBOL, _greaterThanOrEqual2.default);
	registerOperation(_lessThan2.default.SYMBOL, _lessThan2.default);
	registerOperation(_lessThanOrEqual2.default.SYMBOL, _lessThanOrEqual2.default);
	registerOperation(_multiply2.default.SYMBOL, _multiply2.default);
	registerOperation(_notEqual2.default.SYMBOL, _notEqual2.default);
	registerOperation(_minus2.default.SYMBOL, _minus2.default);
	
	/**
	 * Evaluate values by operator id.git
	 *
	 * @param {String} operator Operator id.
	 * @param {Array} [params=[]] Arguments to evaluate.
	 * @returns {*}
	 */
	function evaluateByOperator(operator) {
	  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	  operator = operator.toUpperCase();
	
	  if (!availableOperators[operator]) {
	    throw Error(_error.ERROR_NAME);
	  }
	
	  return availableOperators[operator].apply(availableOperators, _toConsumableArray(params));
	}
	
	/**
	 * Register operator.
	 *
	 * @param {String|Array} symbol Symbol to register.
	 * @param {Function} func Logic to register for this symbol.
	 */
	function registerOperation(symbol, func) {
	  if (!Array.isArray(symbol)) {
	    symbol = [symbol.toUpperCase()];
	  }
	  symbol.forEach(function (s) {
	    if (func.isFactory) {
	      availableOperators[s] = func(s);
	    } else {
	      availableOperators[s] = func;
	    }
	  });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SYMBOL = undefined;
	exports.default = func;
	
	var _number = __webpack_require__(6);
	
	var _error = __webpack_require__(7);
	
	var _decimal = __webpack_require__(8);
	
	var _decimal2 = _interopRequireDefault(_decimal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SYMBOL = exports.SYMBOL = '+';
	
	function func(first) {
	  try {
	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }
	
	    var result = rest.reduce(function (acc, value) {
	      return new _decimal2.default(acc).plus(new _decimal2.default(value)).toNumber();
	    }, first);
	
	    if (isNaN(result)) {
	      throw Error(_error.ERROR_VALUE);
	    }
	
	    return result;
	  } catch (error) {
	    throw Error(_error.ERROR_VALUE);
	  }
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toNumber = toNumber;
	exports.invertNumber = invertNumber;
	/**
	 * Convert value into number.
	 *
	 * @param {String|Number} number
	 * @returns {*}
	 */
	function toNumber(number) {
	  var result = void 0;
	
	  if (typeof number === 'number') {
	    result = number;
	  } else if (typeof number === 'string') {
	    result = number.indexOf('.') > -1 ? parseFloat(number) : parseInt(number, 10);
	  }
	
	  return result;
	}
	
	/**
	 * Invert provided number.
	 *
	 * @param {Number} number
	 * @returns {Number} Returns inverted number.
	 */
	function invertNumber(number) {
	  return -1 * toNumber(number);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _errors;
	
	exports.default = error;
	exports.isValidStrict = isValidStrict;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var ERROR = exports.ERROR = 'ERROR';
	var ERROR_DIV_ZERO = exports.ERROR_DIV_ZERO = 'DIV/0';
	var ERROR_NAME = exports.ERROR_NAME = 'NAME';
	var ERROR_NOT_AVAILABLE = exports.ERROR_NOT_AVAILABLE = 'N/A';
	var ERROR_NULL = exports.ERROR_NULL = 'NULL';
	var ERROR_NUM = exports.ERROR_NUM = 'NUM';
	var ERROR_REF = exports.ERROR_REF = 'REF';
	var ERROR_VALUE = exports.ERROR_VALUE = 'VALUE';
	
	var errors = (_errors = {}, _defineProperty(_errors, ERROR, '#ERROR!'), _defineProperty(_errors, ERROR_DIV_ZERO, '#DIV/0!'), _defineProperty(_errors, ERROR_NAME, '#NAME?'), _defineProperty(_errors, ERROR_NOT_AVAILABLE, '#N/A'), _defineProperty(_errors, ERROR_NULL, '#NULL!'), _defineProperty(_errors, ERROR_NUM, '#NUM!'), _defineProperty(_errors, ERROR_REF, '#REF!'), _defineProperty(_errors, ERROR_VALUE, '#VALUE!'), _errors);
	
	/**
	 * Return error type based on provided error id.
	 *
	 * @param {String} type Error type.
	 * @returns {String|null} Returns error id.
	 */
	function error(type) {
	  var error = void 0;
	
	  type = (type + '').replace(/#|!|\?/g, '');
	
	  if (errors[type]) {
	    error = errors[type];
	  }
	
	  return error ? error : null;
	}
	
	/**
	 * Check if error type is strict valid with knows errors.
	 *
	 * @param {String} Error type.
	 * @return {Boolean}
	 */
	function isValidStrict(type) {
	  var valid = false;
	
	  for (var i in errors) {
	    if (errors.hasOwnProperty(i) && errors[i] === type) {
	      valid = true;
	      break;
	    }
	  }
	
	  return valid;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! decimal.js v7.1.1 https://github.com/MikeMcl/decimal.js/LICENCE */
	;(function (globalScope) {
	  'use strict';
	
	
	  /*
	   *  decimal.js v7.1.1
	   *  An arbitrary-precision Decimal type for JavaScript.
	   *  https://github.com/MikeMcl/decimal.js
	   *  Copyright (c) 2016 Michael Mclaughlin <M8ch88l@gmail.com>
	   *  MIT Licence
	   */
	
	
	  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //
	
	
	    // The maximum exponent magnitude.
	    // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
	  var EXP_LIMIT = 9e15,                      // 0 to 9e15
	
	    // The limit on the value of `precision`, and on the value of the first argument to
	    // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
	    MAX_DIGITS = 1e9,                        // 0 to 1e9
	
	    // Base conversion alphabet.
	    NUMERALS = '0123456789abcdef',
	
	    // The natural logarithm of 10 (1025 digits).
	    LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
	
	    // Pi (1025 digits).
	    PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
	
	
	    // The initial configuration properties of the Decimal constructor.
	    Decimal = {
	
	      // These values must be integers within the stated ranges (inclusive).
	      // Most of these values can be changed at run-time using the `Decimal.config` method.
	
	      // The maximum number of significant digits of the result of a calculation or base conversion.
	      // E.g. `Decimal.config({ precision: 20 });`
	      precision: 20,                         // 1 to MAX_DIGITS
	
	      // The rounding mode used when rounding to `precision`.
	      //
	      // ROUND_UP         0 Away from zero.
	      // ROUND_DOWN       1 Towards zero.
	      // ROUND_CEIL       2 Towards +Infinity.
	      // ROUND_FLOOR      3 Towards -Infinity.
	      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	      //
	      // E.g.
	      // `Decimal.rounding = 4;`
	      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
	      rounding: 4,                           // 0 to 8
	
	      // The modulo mode used when calculating the modulus: a mod n.
	      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	      // The remainder (r) is calculated as: r = a - n * q.
	      //
	      // UP         0 The remainder is positive if the dividend is negative, else is negative.
	      // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
	      // FLOOR      3 The remainder has the same sign as the divisor (Python %).
	      // HALF_EVEN  6 The IEEE 754 remainder function.
	      // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
	      //
	      // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
	      // division (9) are commonly used for the modulus operation. The other rounding modes can also
	      // be used, but they may not give useful results.
	      modulo: 1,                             // 0 to 9
	
	      // The exponent value at and beneath which `toString` returns exponential notation.
	      // JavaScript numbers: -7
	      toExpNeg: -7,                          // 0 to -EXP_LIMIT
	
	      // The exponent value at and above which `toString` returns exponential notation.
	      // JavaScript numbers: 21
	      toExpPos:  21,                         // 0 to EXP_LIMIT
	
	      // The minimum exponent value, beneath which underflow to zero occurs.
	      // JavaScript numbers: -324  (5e-324)
	      minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT
	
	      // The maximum exponent value, above which overflow to Infinity occurs.
	      // JavaScript numbers: 308  (1.7976931348623157e+308)
	      maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT
	
	      // Whether to use cryptographically-secure random number generation, if available.
	      crypto: false                          // true/false
	    },
	
	
	  // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //
	
	
	    inexact, noConflict, quadrant,
	    external = true,
	
	    decimalError = '[DecimalError] ',
	    invalidArgument = decimalError + 'Invalid argument: ',
	    precisionLimitExceeded = decimalError + 'Precision limit exceeded',
	    cryptoUnavailable = decimalError + 'crypto unavailable',
	
	    mathfloor = Math.floor,
	    mathpow = Math.pow,
	
	    isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
	    isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
	    isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
	    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	
	    BASE = 1e7,
	    LOG_BASE = 7,
	    MAX_SAFE_INTEGER = 9007199254740991,
	
	    LN10_PRECISION = LN10.length - 1,
	    PI_PRECISION = PI.length - 1,
	
	    // Decimal.prototype object
	    P = {};
	
	
	  // Decimal prototype methods
	
	
	  /*
	   *  absoluteValue             abs
	   *  ceil
	   *  comparedTo                cmp
	   *  cosine                    cos
	   *  cubeRoot                  cbrt
	   *  decimalPlaces             dp
	   *  dividedBy                 div
	   *  dividedToIntegerBy        divToInt
	   *  equals                    eq
	   *  floor
	   *  greaterThan               gt
	   *  greaterThanOrEqualTo      gte
	   *  hyperbolicCosine          cosh
	   *  hyperbolicSine            sinh
	   *  hyperbolicTangent         tanh
	   *  inverseCosine             acos
	   *  inverseHyperbolicCosine   acosh
	   *  inverseHyperbolicSine     asinh
	   *  inverseHyperbolicTangent  atanh
	   *  inverseSine               asin
	   *  inverseTangent            atan
	   *  isFinite
	   *  isInteger                 isInt
	   *  isNaN
	   *  isNegative                isNeg
	   *  isPositive                isPos
	   *  isZero
	   *  lessThan                  lt
	   *  lessThanOrEqualTo         lte
	   *  logarithm                 log
	   *  [maximum]                 [max]
	   *  [minimum]                 [min]
	   *  minus                     sub
	   *  modulo                    mod
	   *  naturalExponential        exp
	   *  naturalLogarithm          ln
	   *  negated                   neg
	   *  plus                      add
	   *  precision                 sd
	   *  round
	   *  sine                      sin
	   *  squareRoot                sqrt
	   *  tangent                   tan
	   *  times                     mul
	   *  toBinary
	   *  toDecimalPlaces           toDP
	   *  toExponential
	   *  toFixed
	   *  toFraction
	   *  toHexadecimal             toHex
	   *  toNearest
	   *  toNumber
	   *  toOctal
	   *  toPower                   pow
	   *  toPrecision
	   *  toSignificantDigits       toSD
	   *  toString
	   *  truncated                 trunc
	   *  valueOf                   toJSON
	   */
	
	
	  /*
	   * Return a new Decimal whose value is the absolute value of this Decimal.
	   *
	   */
	  P.absoluteValue = P.abs = function () {
	    var x = new this.constructor(this);
	    if (x.s < 0) x.s = 1;
	    return finalise(x);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	   * direction of positive Infinity.
	   *
	   */
	  P.ceil = function () {
	    return finalise(new this.constructor(this), this.e + 1, 2);
	  };
	
	
	  /*
	   * Return
	   *   1    if the value of this Decimal is greater than the value of `y`,
	   *  -1    if the value of this Decimal is less than the value of `y`,
	   *   0    if they have the same value,
	   *   NaN  if the value of either Decimal is NaN.
	   *
	   */
	  P.comparedTo = P.cmp = function (y) {
	    var i, j, xdL, ydL,
	      x = this,
	      xd = x.d,
	      yd = (y = new x.constructor(y)).d,
	      xs = x.s,
	      ys = y.s;
	
	    // Either NaN or ±Infinity?
	    if (!xd || !yd) {
	      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
	    }
	
	    // Either zero?
	    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
	
	    // Signs differ?
	    if (xs !== ys) return xs;
	
	    // Compare exponents.
	    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
	
	    xdL = xd.length;
	    ydL = yd.length;
	
	    // Compare digit by digit.
	    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
	      if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
	    }
	
	    // Compare lengths.
	    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * cos(0)         = 1
	   * cos(-0)        = 1
	   * cos(Infinity)  = NaN
	   * cos(-Infinity) = NaN
	   * cos(NaN)       = NaN
	   *
	   */
	  P.cosine = P.cos = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.d) return new Ctor(NaN);
	
	    // cos(0) = cos(-0) = 1
	    if (!x.d[0]) return new Ctor(1);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	    Ctor.rounding = 1;
	
	    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
	
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
	  };
	
	
	  /*
	   *
	   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   *  cbrt(0)  =  0
	   *  cbrt(-0) = -0
	   *  cbrt(1)  =  1
	   *  cbrt(-1) = -1
	   *  cbrt(N)  =  N
	   *  cbrt(-I) = -I
	   *  cbrt(I)  =  I
	   *
	   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
	   *
	   */
	  P.cubeRoot = P.cbrt = function () {
	    var e, m, n, r, rep, s, sd, t, t3, t3plusx,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.isFinite() || x.isZero()) return new Ctor(x);
	    external = false;
	
	    // Initial estimate.
	    s = x.s * Math.pow(x.s * x, 1 / 3);
	
	     // Math.cbrt underflow/overflow?
	     // Pass x to Math.pow as integer, then adjust the exponent of the result.
	    if (!s || Math.abs(s) == 1 / 0) {
	      n = digitsToString(x.d);
	      e = x.e;
	
	      // Adjust n exponent so it is a multiple of 3 away from x exponent.
	      if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
	      s = Math.pow(n, 1 / 3);
	
	      // Rarely, e may be one less than the result exponent value.
	      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
	
	      if (s == 1 / 0) {
	        n = '5e' + e;
	      } else {
	        n = s.toExponential();
	        n = n.slice(0, n.indexOf('e') + 1) + e;
	      }
	
	      r = new Ctor(n);
	      r.s = x.s;
	    } else {
	      r = new Ctor(s.toString());
	    }
	
	    sd = (e = Ctor.precision) + 3;
	
	    // Halley's method.
	    // TODO? Compare Newton's method.
	    for (;;) {
	      t = r;
	      t3 = t.times(t).times(t);
	      t3plusx = t3.plus(x);
	      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
	
	      // TODO? Replace with for-loop and checkRoundingDigits.
	      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	        n = n.slice(sd - 3, sd + 1);
	
	        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
	        // , i.e. approaching a rounding boundary, continue the iteration.
	        if (n == '9999' || !rep && n == '4999') {
	
	          // On the first iteration only, check to see if rounding up gives the exact result as the
	          // nines may infinitely repeat.
	          if (!rep) {
	            finalise(t, e + 1, 0);
	
	            if (t.times(t).times(t).eq(x)) {
	              r = t;
	              break;
	            }
	          }
	
	          sd += 4;
	          rep = 1;
	        } else {
	
	          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	          // If not, then there are further digits and m will be truthy.
	          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
	
	            // Truncate to the first rounding digit.
	            finalise(r, e + 1, 1);
	            m = !r.times(r).times(r).eq(x);
	          }
	
	          break;
	        }
	      }
	    }
	
	    external = true;
	
	    return finalise(r, e, Ctor.rounding, m);
	  };
	
	
	  /*
	   * Return the number of decimal places of the value of this Decimal.
	   *
	   */
	  P.decimalPlaces = P.dp = function () {
	    var w,
	      d = this.d,
	      n = NaN;
	
	    if (d) {
	      w = d.length - 1;
	      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
	
	      // Subtract the number of trailing zeros of the last word.
	      w = d[w];
	      if (w) for (; w % 10 == 0; w /= 10) n--;
	      if (n < 0) n = 0;
	    }
	
	    return n;
	  };
	
	
	  /*
	   *  n / 0 = I
	   *  n / N = N
	   *  n / I = 0
	   *  0 / n = 0
	   *  0 / 0 = N
	   *  0 / N = N
	   *  0 / I = 0
	   *  N / n = N
	   *  N / 0 = N
	   *  N / N = N
	   *  N / I = N
	   *  I / n = I
	   *  I / 0 = I
	   *  I / N = N
	   *  I / I = N
	   *
	   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.dividedBy = P.div = function (y) {
	    return divide(this, new this.constructor(y));
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
	   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.dividedToIntegerBy = P.divToInt = function (y) {
	    var x = this,
	      Ctor = x.constructor;
	    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
	   *
	   */
	  P.equals = P.eq = function (y) {
	    return this.cmp(y) === 0;
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	   * direction of negative Infinity.
	   *
	   */
	  P.floor = function () {
	    return finalise(new this.constructor(this), this.e + 1, 3);
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
	   * false.
	   *
	   */
	  P.greaterThan = P.gt = function (y) {
	    return this.cmp(y) > 0;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
	   * otherwise return false.
	   *
	   */
	  P.greaterThanOrEqualTo = P.gte = function (y) {
	    var k = this.cmp(y);
	    return k == 1 || k === 0;
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [1, Infinity]
	   *
	   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
	   *
	   * cosh(0)         = 1
	   * cosh(-0)        = 1
	   * cosh(Infinity)  = Infinity
	   * cosh(-Infinity) = Infinity
	   * cosh(NaN)       = NaN
	   *
	   *  x        time taken (ms)   result
	   * 1000      9                 9.8503555700852349694e+433
	   * 10000     25                4.4034091128314607936e+4342
	   * 100000    171               1.4033316802130615897e+43429
	   * 1000000   3817              1.5166076984010437725e+434294
	   * 10000000  abandoned after 2 minute wait
	   *
	   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
	   *
	   */
	  P.hyperbolicCosine = P.cosh = function () {
	    var k, n, pr, rm, len,
	      x = this,
	      Ctor = x.constructor,
	      one = new Ctor(1);
	
	    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
	    if (x.isZero()) return one;
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	    Ctor.rounding = 1;
	    len = x.d.length;
	
	    // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
	    // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))
	
	    // Estimate the optimum number of times to use the argument reduction.
	    // TODO? Estimation reused from cosine() and may not be optimal here.
	    if (len < 32) {
	      k = Math.ceil(len / 3);
	      n = Math.pow(4, -k).toString();
	    } else {
	      k = 16;
	      n = '2.3283064365386962890625e-10';
	    }
	
	    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
	
	    // Reverse argument reduction
	    var cosh2_x,
	      i = k,
	      d8 = new Ctor(8);
	    for (; i--;) {
	      cosh2_x = x.times(x);
	      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
	    }
	
	    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
	   *
	   * sinh(0)         = 0
	   * sinh(-0)        = -0
	   * sinh(Infinity)  = Infinity
	   * sinh(-Infinity) = -Infinity
	   * sinh(NaN)       = NaN
	   *
	   * x        time taken (ms)
	   * 10       2 ms
	   * 100      5 ms
	   * 1000     14 ms
	   * 10000    82 ms
	   * 100000   886 ms            1.4033316802130615897e+43429
	   * 200000   2613 ms
	   * 300000   5407 ms
	   * 400000   8824 ms
	   * 500000   13026 ms          8.7080643612718084129e+217146
	   * 1000000  48543 ms
	   *
	   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
	   *
	   */
	  P.hyperbolicSine = P.sinh = function () {
	    var k, pr, rm, len,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.isFinite() || x.isZero()) return new Ctor(x);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	    Ctor.rounding = 1;
	    len = x.d.length;
	
	    if (len < 3) {
	      x = taylorSeries(Ctor, 2, x, x, true);
	    } else {
	
	      // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
	      // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
	      // 3 multiplications and 1 addition
	
	      // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
	      // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
	      // 4 multiplications and 2 additions
	
	      // Estimate the optimum number of times to use the argument reduction.
	      k = 1.4 * Math.sqrt(len);
	      k = k > 16 ? 16 : k | 0;
	
	      x = x.times(Math.pow(5, -k));
	
	      x = taylorSeries(Ctor, 2, x, x, true);
	
	      // Reverse argument reduction
	      var sinh2_x,
	        d5 = new Ctor(5),
	        d16 = new Ctor(16),
	        d20 = new Ctor(20);
	      for (; k--;) {
	        sinh2_x = x.times(x);
	        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
	      }
	    }
	
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return finalise(x, pr, rm, true);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * tanh(x) = sinh(x) / cosh(x)
	   *
	   * tanh(0)         = 0
	   * tanh(-0)        = -0
	   * tanh(Infinity)  = 1
	   * tanh(-Infinity) = -1
	   * tanh(NaN)       = NaN
	   *
	   */
	  P.hyperbolicTangent = P.tanh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.isFinite()) return new Ctor(x.s);
	    if (x.isZero()) return new Ctor(x);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 7;
	    Ctor.rounding = 1;
	
	    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
	   * this Decimal.
	   *
	   * Domain: [-1, 1]
	   * Range: [0, pi]
	   *
	   * acos(x) = pi/2 - asin(x)
	   *
	   * acos(0)       = pi/2
	   * acos(-0)      = pi/2
	   * acos(1)       = 0
	   * acos(-1)      = pi
	   * acos(1/2)     = pi/3
	   * acos(-1/2)    = 2*pi/3
	   * acos(|x| > 1) = NaN
	   * acos(NaN)     = NaN
	   *
	   */
	  P.inverseCosine = P.acos = function () {
	    var halfPi,
	      x = this,
	      Ctor = x.constructor,
	      k = x.abs().cmp(1),
	      pr = Ctor.precision,
	      rm = Ctor.rounding;
	
	    if (k !== -1) {
	      return k === 0
	        // |x| is 1
	        ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
	        // |x| > 1 or x is NaN
	        : new Ctor(NaN);
	    }
	
	    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
	
	    // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3
	
	    Ctor.precision = pr + 6;
	    Ctor.rounding = 1;
	
	    x = x.asin();
	    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
	
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return halfPi.minus(x);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
	   * value of this Decimal.
	   *
	   * Domain: [1, Infinity]
	   * Range: [0, Infinity]
	   *
	   * acosh(x) = ln(x + sqrt(x^2 - 1))
	   *
	   * acosh(x < 1)     = NaN
	   * acosh(NaN)       = NaN
	   * acosh(Infinity)  = Infinity
	   * acosh(-Infinity) = NaN
	   * acosh(0)         = NaN
	   * acosh(-0)        = NaN
	   * acosh(1)         = 0
	   * acosh(-1)        = NaN
	   *
	   */
	  P.inverseHyperbolicCosine = P.acosh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;
	
	    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
	    if (!x.isFinite()) return new Ctor(x);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
	    Ctor.rounding = 1;
	    external = false;
	
	    x = x.times(x).minus(1).sqrt().plus(x);
	
	    external = true;
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return x.ln();
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
	   * of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * asinh(x) = ln(x + sqrt(x^2 + 1))
	   *
	   * asinh(NaN)       = NaN
	   * asinh(Infinity)  = Infinity
	   * asinh(-Infinity) = -Infinity
	   * asinh(0)         = 0
	   * asinh(-0)        = -0
	   *
	   */
	  P.inverseHyperbolicSine = P.asinh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.isFinite() || x.isZero()) return new Ctor(x);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
	    Ctor.rounding = 1;
	    external = false;
	
	    x = x.times(x).plus(1).sqrt().plus(x);
	
	    external = true;
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return x.ln();
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
	   * value of this Decimal.
	   *
	   * Domain: [-1, 1]
	   * Range: [-Infinity, Infinity]
	   *
	   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
	   *
	   * atanh(|x| > 1)   = NaN
	   * atanh(NaN)       = NaN
	   * atanh(Infinity)  = NaN
	   * atanh(-Infinity) = NaN
	   * atanh(0)         = 0
	   * atanh(-0)        = -0
	   * atanh(1)         = Infinity
	   * atanh(-1)        = -Infinity
	   *
	   */
	  P.inverseHyperbolicTangent = P.atanh = function () {
	    var pr, rm, wpr, xsd,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    xsd = x.sd();
	
	    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
	
	    Ctor.precision = wpr = xsd - x.e;
	
	    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
	
	    Ctor.precision = pr + 4;
	    Ctor.rounding = 1;
	
	    x = x.ln();
	
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return x.times(0.5);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi/2, pi/2]
	   *
	   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
	   *
	   * asin(0)       = 0
	   * asin(-0)      = -0
	   * asin(1/2)     = pi/6
	   * asin(-1/2)    = -pi/6
	   * asin(1)       = pi/2
	   * asin(-1)      = -pi/2
	   * asin(|x| > 1) = NaN
	   * asin(NaN)     = NaN
	   *
	   * TODO? Compare performance of Taylor series.
	   *
	   */
	  P.inverseSine = P.asin = function () {
	    var halfPi, k,
	      pr, rm,
	      x = this,
	      Ctor = x.constructor;
	
	    if (x.isZero()) return new Ctor(x);
	
	    k = x.abs().cmp(1);
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	
	    if (k !== -1) {
	
	      // |x| is 1
	      if (k === 0) {
	        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
	        halfPi.s = x.s;
	        return halfPi;
	      }
	
	      // |x| > 1 or x is NaN
	      return new Ctor(NaN);
	    }
	
	    // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6
	
	    Ctor.precision = pr + 6;
	    Ctor.rounding = 1;
	
	    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
	
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return x.times(2);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
	   * of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi/2, pi/2]
	   *
	   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	   *
	   * atan(0)         = 0
	   * atan(-0)        = -0
	   * atan(1)         = pi/4
	   * atan(-1)        = -pi/4
	   * atan(Infinity)  = pi/2
	   * atan(-Infinity) = -pi/2
	   * atan(NaN)       = NaN
	   *
	   */
	  P.inverseTangent = P.atan = function () {
	    var i, j, k, n, px, t, r, wpr, x2,
	      x = this,
	      Ctor = x.constructor,
	      pr = Ctor.precision,
	      rm = Ctor.rounding;
	
	    if (!x.isFinite()) {
	      if (!x.s) return new Ctor(NaN);
	      if (pr + 4 <= PI_PRECISION) {
	        r = getPi(Ctor, pr + 4, rm).times(0.5);
	        r.s = x.s;
	        return r;
	      }
	    } else if (x.isZero()) {
	      return new Ctor(x);
	    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
	      r = getPi(Ctor, pr + 4, rm).times(0.25);
	      r.s = x.s;
	      return r;
	    }
	
	    Ctor.precision = wpr = pr + 10;
	    Ctor.rounding = 1;
	
	    // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);
	
	    // Argument reduction
	    // Ensure |x| < 0.42
	    // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))
	
	    k = Math.min(28, wpr / LOG_BASE + 2 | 0);
	
	    for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));
	
	    external = false;
	
	    j = Math.ceil(wpr / LOG_BASE);
	    n = 1;
	    x2 = x.times(x);
	    r = new Ctor(x);
	    px = x;
	
	    // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	    for (; i !== -1;) {
	      px = px.times(x2);
	      t = r.minus(px.div(n += 2));
	
	      px = px.times(x2);
	      r = t.plus(px.div(n += 2));
	
	      if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
	    }
	
	    if (k) r = r.times(2 << (k - 1));
	
	    external = true;
	
	    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is a finite number, otherwise return false.
	   *
	   */
	  P.isFinite = function () {
	    return !!this.d;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is an integer, otherwise return false.
	   *
	   */
	  P.isInteger = P.isInt = function () {
	    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is NaN, otherwise return false.
	   *
	   */
	  P.isNaN = function () {
	    return !this.s;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is negative, otherwise return false.
	   *
	   */
	  P.isNegative = P.isNeg = function () {
	    return this.s < 0;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is positive, otherwise return false.
	   *
	   */
	  P.isPositive = P.isPos = function () {
	    return this.s > 0;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
	   *
	   */
	  P.isZero = function () {
	    return !!this.d && this.d[0] === 0;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is less than `y`, otherwise return false.
	   *
	   */
	  P.lessThan = P.lt = function (y) {
	    return this.cmp(y) < 0;
	  };
	
	
	  /*
	   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
	   *
	   */
	  P.lessThanOrEqualTo = P.lte = function (y) {
	    return this.cmp(y) < 1;
	  };
	
	
	  /*
	   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * If no base is specified, return log[10](arg).
	   *
	   * log[base](arg) = ln(arg) / ln(base)
	   *
	   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
	   * otherwise:
	   *
	   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
	   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
	   * between the result and the correctly rounded result will be one ulp (unit in the last place).
	   *
	   * log[-b](a)       = NaN
	   * log[0](a)        = NaN
	   * log[1](a)        = NaN
	   * log[NaN](a)      = NaN
	   * log[Infinity](a) = NaN
	   * log[b](0)        = -Infinity
	   * log[b](-0)       = -Infinity
	   * log[b](-a)       = NaN
	   * log[b](1)        = 0
	   * log[b](Infinity) = Infinity
	   * log[b](NaN)      = NaN
	   *
	   * [base] {number|string|Decimal} The base of the logarithm.
	   *
	   */
	  P.logarithm = P.log = function (base) {
	    var isBase10, d, denominator, k, inf, num, sd, r,
	      arg = this,
	      Ctor = arg.constructor,
	      pr = Ctor.precision,
	      rm = Ctor.rounding,
	      guard = 5;
	
	    // Default base is 10.
	    if (base == null) {
	      base = new Ctor(10);
	      isBase10 = true;
	    } else {
	      base = new Ctor(base);
	      d = base.d;
	
	      // Return NaN if base is negative, or non-finite, or is 0 or 1.
	      if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
	
	      isBase10 = base.eq(10);
	    }
	
	    d = arg.d;
	
	    // Is arg negative, non-finite, 0 or 1?
	    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
	      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
	    }
	
	    // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
	    // integer power of 10.
	    if (isBase10) {
	      if (d.length > 1) {
	        inf = true;
	      } else {
	        for (k = d[0]; k % 10 === 0;) k /= 10;
	        inf = k !== 1;
	      }
	    }
	
	    external = false;
	    sd = pr + guard;
	    num = naturalLogarithm(arg, sd);
	    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
	
	    // The result will have 5 rounding digits.
	    r = divide(num, denominator, sd, 1);
	
	    // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
	    // calculate 10 further digits.
	    //
	    // If the result is known to have an infinite decimal expansion, repeat this until it is clear
	    // that the result is above or below the boundary. Otherwise, if after calculating the 10
	    // further digits, the last 14 are nines, round up and assume the result is exact.
	    // Also assume the result is exact if the last 14 are zero.
	    //
	    // Example of a result that will be incorrectly rounded:
	    // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
	    // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
	    // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
	    // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
	    // place is still 2.6.
	    if (checkRoundingDigits(r.d, k = pr, rm)) {
	
	      do {
	        sd += 10;
	        num = naturalLogarithm(arg, sd);
	        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
	        r = divide(num, denominator, sd, 1);
	
	        if (!inf) {
	
	          // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
	          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
	            r = finalise(r, pr + 1, 0);
	          }
	
	          break;
	        }
	      } while (checkRoundingDigits(r.d, k += 10, rm));
	    }
	
	    external = true;
	
	    return finalise(r, pr, rm);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
	   *
	   * arguments {number|string|Decimal}
	   *
	  P.max = function () {
	    Array.prototype.push.call(arguments, this);
	    return maxOrMin(this.constructor, arguments, 'lt');
	  };
	   */
	
	
	  /*
	   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
	   *
	   * arguments {number|string|Decimal}
	   *
	  P.min = function () {
	    Array.prototype.push.call(arguments, this);
	    return maxOrMin(this.constructor, arguments, 'gt');
	  };
	   */
	
	
	  /*
	   *  n - 0 = n
	   *  n - N = N
	   *  n - I = -I
	   *  0 - n = -n
	   *  0 - 0 = 0
	   *  0 - N = N
	   *  0 - I = -I
	   *  N - n = N
	   *  N - 0 = N
	   *  N - N = N
	   *  N - I = N
	   *  I - n = I
	   *  I - 0 = I
	   *  I - N = N
	   *  I - I = N
	   *
	   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.minus = P.sub = function (y) {
	    var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
	      x = this,
	      Ctor = x.constructor;
	
	    y = new Ctor(y);
	
	    // If either is not finite...
	    if (!x.d || !y.d) {
	
	      // Return NaN if either is NaN.
	      if (!x.s || !y.s) y = new Ctor(NaN);
	
	      // Return y negated if x is finite and y is ±Infinity.
	      else if (x.d) y.s = -y.s;
	
	      // Return x if y is finite and x is ±Infinity.
	      // Return x if both are ±Infinity with different signs.
	      // Return NaN if both are ±Infinity with the same sign.
	      else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
	
	      return y;
	    }
	
	    // If signs differ...
	    if (x.s != y.s) {
	      y.s = -y.s;
	      return x.plus(y);
	    }
	
	    xd = x.d;
	    yd = y.d;
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	
	    // If either is zero...
	    if (!xd[0] || !yd[0]) {
	
	      // Return y negated if x is zero and y is non-zero.
	      if (yd[0]) y.s = -y.s;
	
	      // Return x if y is zero and x is non-zero.
	      else if (xd[0]) y = new Ctor(x);
	
	      // Return zero if both are zero.
	      // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
	      else return new Ctor(rm === 3 ? -0 : 0);
	
	      return external ? finalise(y, pr, rm) : y;
	    }
	
	    // x and y are finite, non-zero numbers with the same sign.
	
	    // Calculate base 1e7 exponents.
	    e = mathfloor(y.e / LOG_BASE);
	    xe = mathfloor(x.e / LOG_BASE);
	
	    xd = xd.slice();
	    k = xe - e;
	
	    // If base 1e7 exponents differ...
	    if (k) {
	      xLTy = k < 0;
	
	      if (xLTy) {
	        d = xd;
	        k = -k;
	        len = yd.length;
	      } else {
	        d = yd;
	        e = xe;
	        len = xd.length;
	      }
	
	      // Numbers with massively different exponents would result in a very high number of
	      // zeros needing to be prepended, but this can be avoided while still ensuring correct
	      // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
	      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
	
	      if (k > i) {
	        k = i;
	        d.length = 1;
	      }
	
	      // Prepend zeros to equalise exponents.
	      d.reverse();
	      for (i = k; i--;) d.push(0);
	      d.reverse();
	
	    // Base 1e7 exponents equal.
	    } else {
	
	      // Check digits to determine which is the bigger number.
	
	      i = xd.length;
	      len = yd.length;
	      xLTy = i < len;
	      if (xLTy) len = i;
	
	      for (i = 0; i < len; i++) {
	        if (xd[i] != yd[i]) {
	          xLTy = xd[i] < yd[i];
	          break;
	        }
	      }
	
	      k = 0;
	    }
	
	    if (xLTy) {
	      d = xd;
	      xd = yd;
	      yd = d;
	      y.s = -y.s;
	    }
	
	    len = xd.length;
	
	    // Append zeros to `xd` if shorter.
	    // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
	    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
	
	    // Subtract yd from xd.
	    for (i = yd.length; i > k;) {
	
	      if (xd[--i] < yd[i]) {
	        for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
	        --xd[j];
	        xd[i] += BASE;
	      }
	
	      xd[i] -= yd[i];
	    }
	
	    // Remove trailing zeros.
	    for (; xd[--len] === 0;) xd.pop();
	
	    // Remove leading zeros and adjust exponent accordingly.
	    for (; xd[0] === 0; xd.shift()) --e;
	
	    // Zero?
	    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
	
	    y.d = xd;
	    y.e = getBase10Exponent(xd, e);
	
	    return external ? finalise(y, pr, rm) : y;
	  };
	
	
	  /*
	   *   n % 0 =  N
	   *   n % N =  N
	   *   n % I =  n
	   *   0 % n =  0
	   *  -0 % n = -0
	   *   0 % 0 =  N
	   *   0 % N =  N
	   *   0 % I =  0
	   *   N % n =  N
	   *   N % 0 =  N
	   *   N % N =  N
	   *   N % I =  N
	   *   I % n =  N
	   *   I % 0 =  N
	   *   I % N =  N
	   *   I % I =  N
	   *
	   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * The result depends on the modulo mode.
	   *
	   */
	  P.modulo = P.mod = function (y) {
	    var q,
	      x = this,
	      Ctor = x.constructor;
	
	    y = new Ctor(y);
	
	    // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
	    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
	
	    // Return x if y is ±Infinity or x is ±0.
	    if (!y.d || x.d && !x.d[0]) {
	      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
	    }
	
	    // Prevent rounding of intermediate calculations.
	    external = false;
	
	    if (Ctor.modulo == 9) {
	
	      // Euclidian division: q = sign(y) * floor(x / abs(y))
	      // result = x - q * y    where  0 <= result < abs(y)
	      q = divide(x, y.abs(), 0, 3, 1);
	      q.s *= y.s;
	    } else {
	      q = divide(x, y, 0, Ctor.modulo, 1);
	    }
	
	    q = q.times(y);
	
	    external = true;
	
	    return x.minus(q);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
	   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.naturalExponential = P.exp = function () {
	    return naturalExponential(this);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
	   * rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.naturalLogarithm = P.ln = function () {
	    return naturalLogarithm(this);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
	   * -1.
	   *
	   */
	  P.negated = P.neg = function () {
	    var x = new this.constructor(this);
	    x.s = -x.s;
	    return finalise(x);
	  };
	
	
	  /*
	   *  n + 0 = n
	   *  n + N = N
	   *  n + I = I
	   *  0 + n = n
	   *  0 + 0 = 0
	   *  0 + N = N
	   *  0 + I = I
	   *  N + n = N
	   *  N + 0 = N
	   *  N + N = N
	   *  N + I = N
	   *  I + n = I
	   *  I + 0 = I
	   *  I + N = N
	   *  I + I = I
	   *
	   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.plus = P.add = function (y) {
	    var carry, d, e, i, k, len, pr, rm, xd, yd,
	      x = this,
	      Ctor = x.constructor;
	
	    y = new Ctor(y);
	
	    // If either is not finite...
	    if (!x.d || !y.d) {
	
	      // Return NaN if either is NaN.
	      if (!x.s || !y.s) y = new Ctor(NaN);
	
	      // Return x if y is finite and x is ±Infinity.
	      // Return x if both are ±Infinity with the same sign.
	      // Return NaN if both are ±Infinity with different signs.
	      // Return y if x is finite and y is ±Infinity.
	      else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
	
	      return y;
	    }
	
	     // If signs differ...
	    if (x.s != y.s) {
	      y.s = -y.s;
	      return x.minus(y);
	    }
	
	    xd = x.d;
	    yd = y.d;
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	
	    // If either is zero...
	    if (!xd[0] || !yd[0]) {
	
	      // Return x if y is zero.
	      // Return y if y is non-zero.
	      if (!yd[0]) y = new Ctor(x);
	
	      return external ? finalise(y, pr, rm) : y;
	    }
	
	    // x and y are finite, non-zero numbers with the same sign.
	
	    // Calculate base 1e7 exponents.
	    k = mathfloor(x.e / LOG_BASE);
	    e = mathfloor(y.e / LOG_BASE);
	
	    xd = xd.slice();
	    i = k - e;
	
	    // If base 1e7 exponents differ...
	    if (i) {
	
	      if (i < 0) {
	        d = xd;
	        i = -i;
	        len = yd.length;
	      } else {
	        d = yd;
	        e = k;
	        len = xd.length;
	      }
	
	      // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
	      k = Math.ceil(pr / LOG_BASE);
	      len = k > len ? k + 1 : len + 1;
	
	      if (i > len) {
	        i = len;
	        d.length = 1;
	      }
	
	      // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
	      d.reverse();
	      for (; i--;) d.push(0);
	      d.reverse();
	    }
	
	    len = xd.length;
	    i = yd.length;
	
	    // If yd is longer than xd, swap xd and yd so xd points to the longer array.
	    if (len - i < 0) {
	      i = len;
	      d = yd;
	      yd = xd;
	      xd = d;
	    }
	
	    // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
	    for (carry = 0; i;) {
	      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
	      xd[i] %= BASE;
	    }
	
	    if (carry) {
	      xd.unshift(carry);
	      ++e;
	    }
	
	    // Remove trailing zeros.
	    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	    for (len = xd.length; xd[--len] == 0;) xd.pop();
	
	    y.d = xd;
	    y.e = getBase10Exponent(xd, e);
	
	    return external ? finalise(y, pr, rm) : y;
	  };
	
	
	  /*
	   * Return the number of significant digits of the value of this Decimal.
	   *
	   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	   *
	   */
	  P.precision = P.sd = function (z) {
	    var k,
	      x = this;
	
	    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
	
	    if (x.d) {
	      k = getPrecision(x.d);
	      if (z && x.e + 1 > k) k = x.e + 1;
	    } else {
	      k = NaN;
	    }
	
	    return k;
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
	   * rounding mode `rounding`.
	   *
	   */
	  P.round = function () {
	    var x = this,
	      Ctor = x.constructor;
	
	    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * sin(x) = x - x^3/3! + x^5/5! - ...
	   *
	   * sin(0)         = 0
	   * sin(-0)        = -0
	   * sin(Infinity)  = NaN
	   * sin(-Infinity) = NaN
	   * sin(NaN)       = NaN
	   *
	   */
	  P.sine = P.sin = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.isZero()) return new Ctor(x);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	    Ctor.rounding = 1;
	
	    x = sine(Ctor, toLessThanHalfPi(Ctor, x));
	
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   *  sqrt(-n) =  N
	   *  sqrt(N)  =  N
	   *  sqrt(-I) =  N
	   *  sqrt(I)  =  I
	   *  sqrt(0)  =  0
	   *  sqrt(-0) = -0
	   *
	   */
	  P.squareRoot = P.sqrt = function () {
	    var m, n, sd, r, rep, t,
	      x = this,
	      d = x.d,
	      e = x.e,
	      s = x.s,
	      Ctor = x.constructor;
	
	    // Negative/NaN/Infinity/zero?
	    if (s !== 1 || !d || !d[0]) {
	      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
	    }
	
	    external = false;
	
	    // Initial estimate.
	    s = Math.sqrt(+x);
	
	    // Math.sqrt underflow/overflow?
	    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	    if (s == 0 || s == 1 / 0) {
	      n = digitsToString(d);
	
	      if ((n.length + e) % 2 == 0) n += '0';
	      s = Math.sqrt(n);
	      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
	
	      if (s == 1 / 0) {
	        n = '1e' + e;
	      } else {
	        n = s.toExponential();
	        n = n.slice(0, n.indexOf('e') + 1) + e;
	      }
	
	      r = new Ctor(n);
	    } else {
	      r = new Ctor(s.toString());
	    }
	
	    sd = (e = Ctor.precision) + 3;
	
	    // Newton-Raphson iteration.
	    for (;;) {
	      t = r;
	      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
	
	      // TODO? Replace with for-loop and checkRoundingDigits.
	      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	        n = n.slice(sd - 3, sd + 1);
	
	        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
	        // 4999, i.e. approaching a rounding boundary, continue the iteration.
	        if (n == '9999' || !rep && n == '4999') {
	
	          // On the first iteration only, check to see if rounding up gives the exact result as the
	          // nines may infinitely repeat.
	          if (!rep) {
	            finalise(t, e + 1, 0);
	
	            if (t.times(t).eq(x)) {
	              r = t;
	              break;
	            }
	          }
	
	          sd += 4;
	          rep = 1;
	        } else {
	
	          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	          // If not, then there are further digits and m will be truthy.
	          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
	
	            // Truncate to the first rounding digit.
	            finalise(r, e + 1, 1);
	            m = !r.times(r).eq(x);
	          }
	
	          break;
	        }
	      }
	    }
	
	    external = true;
	
	    return finalise(r, e, Ctor.rounding, m);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * tan(0)         = 0
	   * tan(-0)        = -0
	   * tan(Infinity)  = NaN
	   * tan(-Infinity) = NaN
	   * tan(NaN)       = NaN
	   *
	   */
	  P.tangent = P.tan = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;
	
	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.isZero()) return new Ctor(x);
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 10;
	    Ctor.rounding = 1;
	
	    x = x.sin();
	    x.s = 1;
	    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
	
	    Ctor.precision = pr;
	    Ctor.rounding = rm;
	
	    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
	  };
	
	
	  /*
	   *  n * 0 = 0
	   *  n * N = N
	   *  n * I = I
	   *  0 * n = 0
	   *  0 * 0 = 0
	   *  0 * N = N
	   *  0 * I = N
	   *  N * n = N
	   *  N * 0 = N
	   *  N * N = N
	   *  N * I = N
	   *  I * n = I
	   *  I * 0 = N
	   *  I * N = N
	   *  I * I = I
	   *
	   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   */
	  P.times = P.mul = function (y) {
	    var carry, e, i, k, r, rL, t, xdL, ydL,
	      x = this,
	      Ctor = x.constructor,
	      xd = x.d,
	      yd = (y = new Ctor(y)).d;
	
	    y.s *= x.s;
	
	     // If either is NaN, ±Infinity or ±0...
	    if (!xd || !xd[0] || !yd || !yd[0]) {
	
	      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd
	
	        // Return NaN if either is NaN.
	        // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
	        ? NaN
	
	        // Return ±Infinity if either is ±Infinity.
	        // Return ±0 if either is ±0.
	        : !xd || !yd ? y.s / 0 : y.s * 0);
	    }
	
	    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
	    xdL = xd.length;
	    ydL = yd.length;
	
	    // Ensure xd points to the longer array.
	    if (xdL < ydL) {
	      r = xd;
	      xd = yd;
	      yd = r;
	      rL = xdL;
	      xdL = ydL;
	      ydL = rL;
	    }
	
	    // Initialise the result array with zeros.
	    r = [];
	    rL = xdL + ydL;
	    for (i = rL; i--;) r.push(0);
	
	    // Multiply!
	    for (i = ydL; --i >= 0;) {
	      carry = 0;
	      for (k = xdL + i; k > i;) {
	        t = r[k] + yd[i] * xd[k - i - 1] + carry;
	        r[k--] = t % BASE | 0;
	        carry = t / BASE | 0;
	      }
	
	      r[k] = (r[k] + carry) % BASE | 0;
	    }
	
	    // Remove trailing zeros.
	    for (; !r[--rL];) r.pop();
	
	    if (carry) ++e;
	    else r.shift();
	
	    y.d = r;
	    y.e = getBase10Exponent(r, e);
	
	    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toBinary = function (sd, rm) {
	    return toStringBinary(this, 2, sd, rm);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
	   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
	   *
	   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toDecimalPlaces = P.toDP = function (dp, rm) {
	    var x = this,
	      Ctor = x.constructor;
	
	    x = new Ctor(x);
	    if (dp === void 0) return x;
	
	    checkInt32(dp, 0, MAX_DIGITS);
	
	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);
	
	    return finalise(x, dp + x.e + 1, rm);
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal in exponential notation rounded to
	   * `dp` fixed decimal places using rounding mode `rounding`.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toExponential = function (dp, rm) {
	    var str,
	      x = this,
	      Ctor = x.constructor;
	
	    if (dp === void 0) {
	      str = finiteToString(x, true);
	    } else {
	      checkInt32(dp, 0, MAX_DIGITS);
	
	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	
	      x = finalise(new Ctor(x), dp + 1, rm);
	      str = finiteToString(x, true, dp + 1);
	    }
	
	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
	   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
	   * omitted.
	   *
	   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
	   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
	   * (-0).toFixed(3) is '0.000'.
	   * (-0.5).toFixed(0) is '-0'.
	   *
	   */
	  P.toFixed = function (dp, rm) {
	    var str, y,
	      x = this,
	      Ctor = x.constructor;
	
	    if (dp === void 0) {
	      str = finiteToString(x);
	    } else {
	      checkInt32(dp, 0, MAX_DIGITS);
	
	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	
	      y = finalise(new Ctor(x), dp + x.e + 1, rm);
	      str = finiteToString(y, false, dp + y.e + 1);
	    }
	
	    // To determine whether to add the minus sign look at the value before it was rounded,
	    // i.e. look at `x` rather than `y`.
	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };
	
	
	  /*
	   * Return an array representing the value of this Decimal as a simple fraction with an integer
	   * numerator and an integer denominator.
	   *
	   * The denominator will be a positive non-zero value less than or equal to the specified maximum
	   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
	   * value necessary to represent the number exactly.
	   *
	   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
	   *
	   */
	  P.toFraction = function (maxD) {
	    var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
	      x = this,
	      xd = x.d,
	      Ctor = x.constructor;
	
	    if (!xd) return new Ctor(x);
	
	    n1 = d0 = new Ctor(1);
	    d1 = n0 = new Ctor(0);
	
	    d = new Ctor(d1);
	    e = d.e = getPrecision(xd) - x.e - 1;
	    k = e % LOG_BASE;
	    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
	
	    if (maxD == null) {
	
	      // d is 10**e, the minimum max-denominator needed.
	      maxD = e > 0 ? d : n1;
	    } else {
	      n = new Ctor(maxD);
	      if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
	      maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
	    }
	
	    external = false;
	    n = new Ctor(digitsToString(xd));
	    pr = Ctor.precision;
	    Ctor.precision = e = xd.length * LOG_BASE * 2;
	
	    for (;;)  {
	      q = divide(n, d, 0, 1, 1);
	      d2 = d0.plus(q.times(d1));
	      if (d2.cmp(maxD) == 1) break;
	      d0 = d1;
	      d1 = d2;
	      d2 = n1;
	      n1 = n0.plus(q.times(d2));
	      n0 = d2;
	      d2 = d;
	      d = n.minus(q.times(d2));
	      n = d2;
	    }
	
	    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
	    n0 = n0.plus(d2.times(n1));
	    d0 = d0.plus(d2.times(d1));
	    n0.s = n1.s = x.s;
	
	    // Determine which fraction is closer to x, n0/d0 or n1/d1?
	    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
	        ? [n1, d1] : [n0, d0];
	
	    Ctor.precision = pr;
	    external = true;
	
	    return r;
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toHexadecimal = P.toHex = function (sd, rm) {
	    return toStringBinary(this, 16, sd, rm);
	  };
	
	
	
	  /*
	   * Returns a new Decimal whose value is the nearest multiple of the magnitude of `y` to the value
	   * of this Decimal.
	   *
	   * If the value of this Decimal is equidistant from two multiples of `y`, the rounding mode `rm`,
	   * or `Decimal.rounding` if `rm` is omitted, determines the direction of the nearest multiple.
	   *
	   * In the context of this method, rounding mode 4 (ROUND_HALF_UP) is the same as rounding mode 0
	   * (ROUND_UP), and so on.
	   *
	   * The return value will always have the same sign as this Decimal, unless either this Decimal
	   * or `y` is NaN, in which case the return value will be also be NaN.
	   *
	   * The return value is not affected by the value of `precision`.
	   *
	   * y {number|string|Decimal} The magnitude to round to a multiple of.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * 'toNearest() rounding mode not an integer: {rm}'
	   * 'toNearest() rounding mode out of range: {rm}'
	   *
	   */
	  P.toNearest = function (y, rm) {
	    var x = this,
	      Ctor = x.constructor;
	
	    x = new Ctor(x);
	
	    if (y == null) {
	
	      // If x is not finite, return x.
	      if (!x.d) return x;
	
	      y = new Ctor(1);
	      rm = Ctor.rounding;
	    } else {
	      y = new Ctor(y);
	      if (rm !== void 0) checkInt32(rm, 0, 8);
	
	      // If x is not finite, return x if y is not NaN, else NaN.
	      if (!x.d) return y.s ? x : y;
	
	      // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
	      if (!y.d) {
	        if (y.s) y.s = x.s;
	        return y;
	      }
	    }
	
	    // If y is not zero, calculate the nearest multiple of y to x.
	    if (y.d[0]) {
	      external = false;
	      if (rm < 4) rm = [4, 5, 7, 8][rm];
	      x = divide(x, y, 0, rm, 1).times(y);
	      external = true;
	      finalise(x);
	
	    // If y is zero, return zero with the sign of x.
	    } else {
	      y.s = x.s;
	      x = y;
	    }
	
	    return x;
	  };
	
	
	  /*
	   * Return the value of this Decimal converted to a number primitive.
	   * Zero keeps its sign.
	   *
	   */
	  P.toNumber = function () {
	    return +this;
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toOctal = function (sd, rm) {
	    return toStringBinary(this, 8, sd, rm);
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
	   * to `precision` significant digits using rounding mode `rounding`.
	   *
	   * ECMAScript compliant.
	   *
	   *   pow(x, NaN)                           = NaN
	   *   pow(x, ±0)                            = 1
	
	   *   pow(NaN, non-zero)                    = NaN
	   *   pow(abs(x) > 1, +Infinity)            = +Infinity
	   *   pow(abs(x) > 1, -Infinity)            = +0
	   *   pow(abs(x) == 1, ±Infinity)           = NaN
	   *   pow(abs(x) < 1, +Infinity)            = +0
	   *   pow(abs(x) < 1, -Infinity)            = +Infinity
	   *   pow(+Infinity, y > 0)                 = +Infinity
	   *   pow(+Infinity, y < 0)                 = +0
	   *   pow(-Infinity, odd integer > 0)       = -Infinity
	   *   pow(-Infinity, even integer > 0)      = +Infinity
	   *   pow(-Infinity, odd integer < 0)       = -0
	   *   pow(-Infinity, even integer < 0)      = +0
	   *   pow(+0, y > 0)                        = +0
	   *   pow(+0, y < 0)                        = +Infinity
	   *   pow(-0, odd integer > 0)              = -0
	   *   pow(-0, even integer > 0)             = +0
	   *   pow(-0, odd integer < 0)              = -Infinity
	   *   pow(-0, even integer < 0)             = +Infinity
	   *   pow(finite x < 0, finite non-integer) = NaN
	   *
	   * For non-integer or very large exponents pow(x, y) is calculated using
	   *
	   *   x^y = exp(y*ln(x))
	   *
	   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
	   * probability of an incorrectly rounded result
	   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
	   * i.e. 1 in 250,000,000,000,000
	   *
	   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
	   *
	   * y {number|string|Decimal} The power to which to raise this Decimal.
	   *
	   */
	  P.toPower = P.pow = function (y) {
	    var e, k, pr, r, rm, sign, yIsInt,
	      x = this,
	      Ctor = x.constructor,
	      yn = +(y = new Ctor(y));
	
	    // Either ±Infinity, NaN or ±0?
	    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return  new Ctor(mathpow(+x, yn));
	
	    x = new Ctor(x);
	
	    if (x.eq(1)) return x;
	
	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	
	    if (y.eq(1)) return finalise(x, pr, rm);
	
	    e = mathfloor(y.e / LOG_BASE);
	    k = y.d.length - 1;
	    yIsInt = e >= k;
	    sign = x.s;
	
	    if (!yIsInt) {
	      if (sign < 0) return new Ctor(NaN);
	
	    // If y is a small integer use the 'exponentiation by squaring' algorithm.
	    } else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
	      r = intPow(Ctor, x, k, pr);
	      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
	    }
	
	    // Result is negative if x is negative and the last digit of integer y is odd.
	    sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;
	
	    // Estimate result exponent.
	    // x^y = 10^e,  where e = y * log10(x)
	    // log10(x) = log10(x_significand) + x_exponent
	    // log10(x_significand) = ln(x_significand) / ln(10)
	    k = mathpow(+x, yn);
	    e = k == 0 || !isFinite(k)
	      ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
	      : new Ctor(k + '').e;
	
	    // Estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.
	
	    // Overflow/underflow?
	    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? sign / 0 : 0);
	
	    external = false;
	    Ctor.rounding = x.s = 1;
	
	    // Estimate the extra guard digits needed to ensure five correct rounding digits from
	    // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
	    // new Decimal(2.32456).pow('2087987436534566.46411')
	    // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
	    k = Math.min(12, (e + '').length);
	
	    // r = x^y = exp(y*ln(x))
	    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
	
	    // Truncate to the required precision plus five rounding digits.
	    r = finalise(r, pr + 5, 1);
	
	    // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
	    // the result.
	    if (checkRoundingDigits(r.d, pr, rm)) {
	      e = pr + 10;
	
	      // Truncate to the increased precision plus five rounding digits.
	      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
	
	      // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
	      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
	        r = finalise(r, pr + 1, 0);
	      }
	    }
	
	    r.s = sign;
	    external = true;
	    Ctor.rounding = rm;
	
	    return finalise(r, pr, rm);
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal rounded to `sd` significant digits
	   * using rounding mode `rounding`.
	   *
	   * Return exponential notation if `sd` is less than the number of digits necessary to represent
	   * the integer part of the value in normal notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toPrecision = function (sd, rm) {
	    var str,
	      x = this,
	      Ctor = x.constructor;
	
	    if (sd === void 0) {
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
	    } else {
	      checkInt32(sd, 1, MAX_DIGITS);
	
	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	
	      x = finalise(new Ctor(x), sd, rm);
	      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
	    }
	
	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
	   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
	   * omitted.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * 'toSD() digits out of range: {sd}'
	   * 'toSD() digits not an integer: {sd}'
	   * 'toSD() rounding mode not an integer: {rm}'
	   * 'toSD() rounding mode out of range: {rm}'
	   *
	   */
	  P.toSignificantDigits = P.toSD = function (sd, rm) {
	    var x = this,
	      Ctor = x.constructor;
	
	    if (sd === void 0) {
	      sd = Ctor.precision;
	      rm = Ctor.rounding;
	    } else {
	      checkInt32(sd, 1, MAX_DIGITS);
	
	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	    }
	
	    return finalise(new Ctor(x), sd, rm);
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal.
	   *
	   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
	   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
	   *
	   */
	  P.toString = function () {
	    var x = this,
	      Ctor = x.constructor,
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
	
	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };
	
	
	  /*
	   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
	   *
	   */
	  P.truncated = P.trunc = function () {
	    return finalise(new this.constructor(this), this.e + 1, 1);
	  };
	
	
	  /*
	   * Return a string representing the value of this Decimal.
	   * Unlike `toString`, negative zero will include the minus sign.
	   *
	   */
	  P.valueOf = P.toJSON = function () {
	    var x = this,
	      Ctor = x.constructor,
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
	
	    return x.isNeg() ? '-' + str : str;
	  };
	
	
	  /*
	  // Add aliases to match BigDecimal method names.
	  // P.add = P.plus;
	  P.subtract = P.minus;
	  P.multiply = P.times;
	  P.divide = P.div;
	  P.remainder = P.mod;
	  P.compareTo = P.cmp;
	  P.negate = P.neg;
	   */
	
	
	  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.
	
	
	  /*
	   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
	   *                           finiteToString, naturalExponential, naturalLogarithm
	   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
	   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
	   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
	   *  convertBase              toStringBinary, parseOther
	   *  cos                      P.cos
	   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
	   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
	   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
	   *                           taylorSeries, atan2, parseOther
	   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
	   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
	   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
	   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
	   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
	   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
	   *                           naturalLogarithm, ceil, floor, round, trunc
	   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
	   *                           toStringBinary
	   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
	   *  getLn10                  P.logarithm, naturalLogarithm
	   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
	   *  getPrecision             P.precision, P.toFraction
	   *  getZeroString            digitsToString, finiteToString
	   *  intPow                   P.toPower, parseOther
	   *  isOdd                    toLessThanHalfPi
	   *  maxOrMin                 max, min
	   *  naturalExponential       P.naturalExponential, P.toPower
	   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
	   *                           P.toPower, naturalExponential
	   *  nonFiniteToString        finiteToString, toStringBinary
	   *  parseDecimal             Decimal
	   *  parseOther               Decimal
	   *  sin                      P.sin
	   *  taylorSeries             P.cosh, P.sinh, cos, sin
	   *  toLessThanHalfPi         P.cos, P.sin
	   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
	   *  truncate                 intPow
	   *
	   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
	   *                           naturalLogarithm, config, parseOther, random, Decimal
	   */
	
	
	  function digitsToString(d) {
	    var i, k, ws,
	      indexOfLastWord = d.length - 1,
	      str = '',
	      w = d[0];
	
	    if (indexOfLastWord > 0) {
	      str += w;
	      for (i = 1; i < indexOfLastWord; i++) {
	        ws = d[i] + '';
	        k = LOG_BASE - ws.length;
	        if (k) str += getZeroString(k);
	        str += ws;
	      }
	
	      w = d[i];
	      ws = w + '';
	      k = LOG_BASE - ws.length;
	      if (k) str += getZeroString(k);
	    } else if (w === 0) {
	      return '0';
	    }
	
	    // Remove trailing zeros of last w.
	    for (; w % 10 === 0;) w /= 10;
	
	    return str + w;
	  }
	
	
	  function checkInt32(i, min, max) {
	    if (i !== ~~i || i < min || i > max) {
	      throw Error(invalidArgument + i);
	    }
	  }
	
	
	  /*
	   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
	   * `repeating == null` if caller is `log` or `pow`,
	   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
	   */
	  function checkRoundingDigits(d, i, rm, repeating) {
	    var di, k, r, rd;
	
	    // Get the length of the first word of the array d.
	    for (k = d[0]; k >= 10; k /= 10) --i;
	
	    // Is the rounding digit in the first word of d?
	    if (--i < 0) {
	      i += LOG_BASE;
	      di = 0;
	    } else {
	      di = Math.ceil((i + 1) / LOG_BASE);
	      i %= LOG_BASE;
	    }
	
	    // i is the index (0 - 6) of the rounding digit.
	    // E.g. if within the word 3487563 the first rounding digit is 5,
	    // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
	    k = mathpow(10, LOG_BASE - i);
	    rd = d[di] % k | 0;
	
	    if (repeating == null) {
	      if (i < 3) {
	        if (i == 0) rd = rd / 100 | 0;
	        else if (i == 1) rd = rd / 10 | 0;
	        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
	      } else {
	        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
	          (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
	            (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
	      }
	    } else {
	      if (i < 4) {
	        if (i == 0) rd = rd / 1000 | 0;
	        else if (i == 1) rd = rd / 100 | 0;
	        else if (i == 2) rd = rd / 10 | 0;
	        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
	      } else {
	        r = ((repeating || rm < 4) && rd + 1 == k ||
	        (!repeating && rm > 3) && rd + 1 == k / 2) &&
	          (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
	      }
	    }
	
	    return r;
	  }
	
	
	  // Convert string of `baseIn` to an array of numbers of `baseOut`.
	  // Eg. convertBase('255', 10, 16) returns [15, 15].
	  // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	  function convertBase(str, baseIn, baseOut) {
	    var j,
	      arr = [0],
	      arrL,
	      i = 0,
	      strL = str.length;
	
	    for (; i < strL;) {
	      for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
	      arr[0] += NUMERALS.indexOf(str.charAt(i++));
	      for (j = 0; j < arr.length; j++) {
	        if (arr[j] > baseOut - 1) {
	          if (arr[j + 1] === void 0) arr[j + 1] = 0;
	          arr[j + 1] += arr[j] / baseOut | 0;
	          arr[j] %= baseOut;
	        }
	      }
	    }
	
	    return arr.reverse();
	  }
	
	
	  /*
	   * cos(x) = 1 - x^2/2! + x^4/4! - ...
	   * |x| < pi/2
	   *
	   */
	  function cosine(Ctor, x) {
	    var k, y,
	      len = x.d.length;
	
	    // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
	    // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1
	
	    // Estimate the optimum number of times to use the argument reduction.
	    if (len < 32) {
	      k = Math.ceil(len / 3);
	      y = Math.pow(4, -k).toString();
	    } else {
	      k = 16;
	      y = '2.3283064365386962890625e-10';
	    }
	
	    Ctor.precision += k;
	
	    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
	
	    // Reverse argument reduction
	    for (var i = k; i--;) {
	      var cos2x = x.times(x);
	      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
	    }
	
	    Ctor.precision -= k;
	
	    return x;
	  }
	
	
	  /*
	   * Perform division in the specified base.
	   */
	  var divide = (function () {
	
	    // Assumes non-zero x and k, and hence non-zero result.
	    function multiplyInteger(x, k, base) {
	      var temp,
	        carry = 0,
	        i = x.length;
	
	      for (x = x.slice(); i--;) {
	        temp = x[i] * k + carry;
	        x[i] = temp % base | 0;
	        carry = temp / base | 0;
	      }
	
	      if (carry) x.unshift(carry);
	
	      return x;
	    }
	
	    function compare(a, b, aL, bL) {
	      var i, r;
	
	      if (aL != bL) {
	        r = aL > bL ? 1 : -1;
	      } else {
	        for (i = r = 0; i < aL; i++) {
	          if (a[i] != b[i]) {
	            r = a[i] > b[i] ? 1 : -1;
	            break;
	          }
	        }
	      }
	
	      return r;
	    }
	
	    function subtract(a, b, aL, base) {
	      var i = 0;
	
	      // Subtract b from a.
	      for (; aL--;) {
	        a[aL] -= i;
	        i = a[aL] < b[aL] ? 1 : 0;
	        a[aL] = i * base + a[aL] - b[aL];
	      }
	
	      // Remove leading zeros.
	      for (; !a[0] && a.length > 1;) a.shift();
	    }
	
	    return function (x, y, pr, rm, dp, base) {
	      var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
	        yL, yz,
	        Ctor = x.constructor,
	        sign = x.s == y.s ? 1 : -1,
	        xd = x.d,
	        yd = y.d;
	
	      // Either NaN, Infinity or 0?
	      if (!xd || !xd[0] || !yd || !yd[0]) {
	
	        return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
	          !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :
	
	          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
	          xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
	      }
	
	      if (base) {
	        logBase = 1;
	        e = x.e - y.e;
	      } else {
	        base = BASE;
	        logBase = LOG_BASE;
	        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
	      }
	
	      yL = yd.length;
	      xL = xd.length;
	      q = new Ctor(sign);
	      qd = q.d = [];
	
	      // Result exponent may be one less than e.
	      // The digit array of a Decimal from toStringBinary may have trailing zeros.
	      for (i = 0; yd[i] == (xd[i] || 0); i++);
	
	      if (yd[i] > (xd[i] || 0)) e--;
	
	      if (pr == null) {
	        sd = pr = Ctor.precision;
	        rm = Ctor.rounding;
	      } else if (dp) {
	        sd = pr + (x.e - y.e) + 1;
	      } else {
	        sd = pr;
	      }
	
	      if (sd < 0) {
	        qd.push(1);
	        more = true;
	      } else {
	
	        // Convert precision in number of base 10 digits to base 1e7 digits.
	        sd = sd / logBase + 2 | 0;
	        i = 0;
	
	        // divisor < 1e7
	        if (yL == 1) {
	          k = 0;
	          yd = yd[0];
	          sd++;
	
	          // k is the carry.
	          for (; (i < xL || k) && sd--; i++) {
	            t = k * base + (xd[i] || 0);
	            qd[i] = t / yd | 0;
	            k = t % yd | 0;
	          }
	
	          more = k || i < xL;
	
	        // divisor >= 1e7
	        } else {
	
	          // Normalise xd and yd so highest order digit of yd is >= base/2
	          k = base / (yd[0] + 1) | 0;
	
	          if (k > 1) {
	            yd = multiplyInteger(yd, k, base);
	            xd = multiplyInteger(xd, k, base);
	            yL = yd.length;
	            xL = xd.length;
	          }
	
	          xi = yL;
	          rem = xd.slice(0, yL);
	          remL = rem.length;
	
	          // Add zeros to make remainder as long as divisor.
	          for (; remL < yL;) rem[remL++] = 0;
	
	          yz = yd.slice();
	          yz.unshift(0);
	          yd0 = yd[0];
	
	          if (yd[1] >= base / 2) ++yd0;
	
	          do {
	            k = 0;
	
	            // Compare divisor and remainder.
	            cmp = compare(yd, rem, yL, remL);
	
	            // If divisor < remainder.
	            if (cmp < 0) {
	
	              // Calculate trial digit, k.
	              rem0 = rem[0];
	              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
	
	              // k will be how many times the divisor goes into the current remainder.
	              k = rem0 / yd0 | 0;
	
	              //  Algorithm:
	              //  1. product = divisor * trial digit (k)
	              //  2. if product > remainder: product -= divisor, k--
	              //  3. remainder -= product
	              //  4. if product was < remainder at 2:
	              //    5. compare new remainder and divisor
	              //    6. If remainder > divisor: remainder -= divisor, k++
	
	              if (k > 1) {
	                if (k >= base) k = base - 1;
	
	                // product = divisor * trial digit.
	                prod = multiplyInteger(yd, k, base);
	                prodL = prod.length;
	                remL = rem.length;
	
	                // Compare product and remainder.
	                cmp = compare(prod, rem, prodL, remL);
	
	                // product > remainder.
	                if (cmp == 1) {
	                  k--;
	
	                  // Subtract divisor from product.
	                  subtract(prod, yL < prodL ? yz : yd, prodL, base);
	                }
	              } else {
	
	                // cmp is -1.
	                // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
	                // to avoid it. If k is 1 there is a need to compare yd and rem again below.
	                if (k == 0) cmp = k = 1;
	                prod = yd.slice();
	              }
	
	              prodL = prod.length;
	              if (prodL < remL) prod.unshift(0);
	
	              // Subtract product from remainder.
	              subtract(rem, prod, remL, base);
	
	              // If product was < previous remainder.
	              if (cmp == -1) {
	                remL = rem.length;
	
	                // Compare divisor and new remainder.
	                cmp = compare(yd, rem, yL, remL);
	
	                // If divisor < new remainder, subtract divisor from remainder.
	                if (cmp < 1) {
	                  k++;
	
	                  // Subtract divisor from remainder.
	                  subtract(rem, yL < remL ? yz : yd, remL, base);
	                }
	              }
	
	              remL = rem.length;
	            } else if (cmp === 0) {
	              k++;
	              rem = [0];
	            }    // if cmp === 1, k will be 0
	
	            // Add the next digit, k, to the result array.
	            qd[i++] = k;
	
	            // Update the remainder.
	            if (cmp && rem[0]) {
	              rem[remL++] = xd[xi] || 0;
	            } else {
	              rem = [xd[xi]];
	              remL = 1;
	            }
	
	          } while ((xi++ < xL || rem[0] !== void 0) && sd--);
	
	          more = rem[0] !== void 0;
	        }
	
	        // Leading zero?
	        if (!qd[0]) qd.shift();
	      }
	
	      // logBase is 1 when divide is being used for base conversion.
	      if (logBase == 1) {
	        q.e = e;
	        inexact = more;
	      } else {
	
	        // To calculate q.e, first get the number of digits of qd[0].
	        for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
	        q.e = i + e * logBase - 1;
	
	        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
	      }
	
	      return q;
	    };
	  })();
	
	
	  /*
	   * Round `x` to `sd` significant digits using rounding mode `rm`.
	   * Check for over/under-flow.
	   */
	   function finalise(x, sd, rm, isTruncated) {
	    var digits, i, j, k, rd, roundUp, w, xd, xdi,
	      Ctor = x.constructor;
	
	    // Don't round if sd is null or undefined.
	    out: if (sd != null) {
	      xd = x.d;
	
	      // Infinity/NaN.
	      if (!xd) return x;
	
	      // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
	      // w: the word of xd containing rd, a base 1e7 number.
	      // xdi: the index of w within xd.
	      // digits: the number of digits of w.
	      // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
	      // they had leading zeros)
	      // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).
	
	      // Get the length of the first word of the digits array xd.
	      for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
	      i = sd - digits;
	
	      // Is the rounding digit in the first word of xd?
	      if (i < 0) {
	        i += LOG_BASE;
	        j = sd;
	        w = xd[xdi = 0];
	
	        // Get the rounding digit at index j of w.
	        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
	      } else {
	        xdi = Math.ceil((i + 1) / LOG_BASE);
	        k = xd.length;
	        if (xdi >= k) {
	          if (isTruncated) {
	
	            // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
	            for (; k++ <= xdi;) xd.push(0);
	            w = rd = 0;
	            digits = 1;
	            i %= LOG_BASE;
	            j = i - LOG_BASE + 1;
	          } else {
	            break out;
	          }
	        } else {
	          w = k = xd[xdi];
	
	          // Get the number of digits of w.
	          for (digits = 1; k >= 10; k /= 10) digits++;
	
	          // Get the index of rd within w.
	          i %= LOG_BASE;
	
	          // Get the index of rd within w, adjusted for leading zeros.
	          // The number of leading zeros of w is given by LOG_BASE - digits.
	          j = i - LOG_BASE + digits;
	
	          // Get the rounding digit at index j of w.
	          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
	        }
	      }
	
	      // Are there any non-zero digits after the rounding digit?
	      isTruncated = isTruncated || sd < 0 ||
	        xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
	
	      // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
	      // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
	      // will give 714.
	
	      roundUp = rm < 4
	        ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	        : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&
	
	          // Check whether the digit to the left of the rounding digit is odd.
	          ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
	            rm == (x.s < 0 ? 8 : 7));
	
	      if (sd < 1 || !xd[0]) {
	        xd.length = 0;
	        if (roundUp) {
	
	          // Convert sd to decimal places.
	          sd -= x.e + 1;
	
	          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
	          x.e = -sd || 0;
	        } else {
	
	          // Zero.
	          xd[0] = x.e = 0;
	        }
	
	        return x;
	      }
	
	      // Remove excess digits.
	      if (i == 0) {
	        xd.length = xdi;
	        k = 1;
	        xdi--;
	      } else {
	        xd.length = xdi + 1;
	        k = mathpow(10, LOG_BASE - i);
	
	        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	        // j > 0 means i > number of leading zeros of w.
	        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
	      }
	
	      if (roundUp) {
	        for (;;) {
	
	          // Is the digit to be rounded up in the first word of xd?
	          if (xdi == 0) {
	
	            // i will be the length of xd[0] before k is added.
	            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
	            j = xd[0] += k;
	            for (k = 1; j >= 10; j /= 10) k++;
	
	            // if i != k the length has increased.
	            if (i != k) {
	              x.e++;
	              if (xd[0] == BASE) xd[0] = 1;
	            }
	
	            break;
	          } else {
	            xd[xdi] += k;
	            if (xd[xdi] != BASE) break;
	            xd[xdi--] = 0;
	            k = 1;
	          }
	        }
	      }
	
	      // Remove trailing zeros.
	      for (i = xd.length; xd[--i] === 0;) xd.pop();
	    }
	
	    if (external) {
	
	      // Overflow?
	      if (x.e > Ctor.maxE) {
	
	        // Infinity.
	        x.d = null;
	        x.e = NaN;
	
	      // Underflow?
	      } else if (x.e < Ctor.minE) {
	
	        // Zero.
	        x.e = 0;
	        x.d = [0];
	        // Ctor.underflow = true;
	      } // else Ctor.underflow = false;
	    }
	
	    return x;
	  }
	
	
	  function finiteToString(x, isExp, sd) {
	    if (!x.isFinite()) return nonFiniteToString(x);
	    var k,
	      e = x.e,
	      str = digitsToString(x.d),
	      len = str.length;
	
	    if (isExp) {
	      if (sd && (k = sd - len) > 0) {
	        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
	      } else if (len > 1) {
	        str = str.charAt(0) + '.' + str.slice(1);
	      }
	
	      str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
	    } else if (e < 0) {
	      str = '0.' + getZeroString(-e - 1) + str;
	      if (sd && (k = sd - len) > 0) str += getZeroString(k);
	    } else if (e >= len) {
	      str += getZeroString(e + 1 - len);
	      if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
	    } else {
	      if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
	      if (sd && (k = sd - len) > 0) {
	        if (e + 1 === len) str += '.';
	        str += getZeroString(k);
	      }
	    }
	
	    return str;
	  }
	
	
	  // Calculate the base 10 exponent from the base 1e7 exponent.
	  function getBase10Exponent(digits, e) {
	    var w = digits[0];
	
	    // Add the number of digits of the first word of the digits array.
	    for ( e *= LOG_BASE; w >= 10; w /= 10) e++;
	    return e;
	  }
	
	
	  function getLn10(Ctor, sd, pr) {
	    if (sd > LN10_PRECISION) {
	
	      // Reset global state in case the exception is caught.
	      external = true;
	      if (pr) Ctor.precision = pr;
	      throw Error(precisionLimitExceeded);
	    }
	    return finalise(new Ctor(LN10), sd, 1, true);
	  }
	
	
	  function getPi(Ctor, sd, rm) {
	    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
	    return finalise(new Ctor(PI), sd, rm, true);
	  }
	
	
	  function getPrecision(digits) {
	    var w = digits.length - 1,
	      len = w * LOG_BASE + 1;
	
	    w = digits[w];
	
	    // If non-zero...
	    if (w) {
	
	      // Subtract the number of trailing zeros of the last word.
	      for (; w % 10 == 0; w /= 10) len--;
	
	      // Add the number of digits of the first word.
	      for (w = digits[0]; w >= 10; w /= 10) len++;
	    }
	
	    return len;
	  }
	
	
	  function getZeroString(k) {
	    var zs = '';
	    for (; k--;) zs += '0';
	    return zs;
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
	   * integer of type number.
	   *
	   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
	   *
	   */
	  function intPow(Ctor, x, n, pr) {
	    var isTruncated,
	      r = new Ctor(1),
	
	      // Max n of 9007199254740991 takes 53 loop iterations.
	      // Maximum digits array length; leaves [28, 34] guard digits.
	      k = Math.ceil(pr / LOG_BASE + 4);
	
	    external = false;
	
	    for (;;) {
	      if (n % 2) {
	        r = r.times(x);
	        if (truncate(r.d, k)) isTruncated = true;
	      }
	
	      n = mathfloor(n / 2);
	      if (n === 0) {
	
	        // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
	        n = r.d.length - 1;
	        if (isTruncated && r.d[n] === 0) ++r.d[n];
	        break;
	      }
	
	      x = x.times(x);
	      truncate(x.d, k);
	    }
	
	    external = true;
	
	    return r;
	  }
	
	
	  function isOdd(n) {
	    return n.d[n.d.length - 1] & 1;
	  }
	
	
	  /*
	   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
	   */
	  function maxOrMin(Ctor, args, ltgt) {
	    var y,
	      x = new Ctor(args[0]),
	      i = 0;
	
	    for (; ++i < args.length;) {
	      y = new Ctor(args[i]);
	      if (!y.s) {
	        x = y;
	        break;
	      } else if (x[ltgt](y)) {
	        x = y;
	      }
	    }
	
	    return x;
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
	   * digits.
	   *
	   * Taylor/Maclaurin series.
	   *
	   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
	   *
	   * Argument reduction:
	   *   Repeat x = x / 32, k += 5, until |x| < 0.1
	   *   exp(x) = exp(x / 2^k)^(2^k)
	   *
	   * Previously, the argument was initially reduced by
	   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
	   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
	   * found to be slower than just dividing repeatedly by 32 as above.
	   *
	   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
	   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
	   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
	   *
	   *  exp(Infinity)  = Infinity
	   *  exp(-Infinity) = 0
	   *  exp(NaN)       = NaN
	   *  exp(±0)        = 1
	   *
	   *  exp(x) is non-terminating for any finite, non-zero x.
	   *
	   *  The result will always be correctly rounded.
	   *
	   */
	  function naturalExponential(x, sd) {
	    var denominator, guard, j, pow, sum, t, wpr,
	      rep = 0,
	      i = 0,
	      k = 0,
	      Ctor = x.constructor,
	      rm = Ctor.rounding,
	      pr = Ctor.precision;
	
	    // 0/NaN/Infinity?
	    if (!x.d || !x.d[0] || x.e > 17) {
	
	      return new Ctor(x.d
	        ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
	        : x.s ? x.s < 0 ? 0 : x : 0 / 0);
	    }
	
	    if (sd == null) {
	      external = false;
	      wpr = pr;
	    } else {
	      wpr = sd;
	    }
	
	    t = new Ctor(0.03125);
	
	    // while abs(x) >= 0.1
	    while (x.e > -2) {
	
	      // x = x / 2^5
	      x = x.times(t);
	      k += 5;
	    }
	
	    // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
	    // necessary to ensure the first 4 rounding digits are correct.
	    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
	    wpr += guard;
	    denominator = pow = sum = new Ctor(1);
	    Ctor.precision = wpr;
	
	    for (;;) {
	      pow = finalise(pow.times(x), wpr, 1);
	      denominator = denominator.times(++i);
	      t = sum.plus(divide(pow, denominator, wpr, 1));
	
	      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	        j = k;
	        while (j--) sum = finalise(sum.times(sum), wpr, 1);
	
	        // Check to see if the first 4 rounding digits are [49]999.
	        // If so, repeat the summation with a higher precision, otherwise
	        // e.g. with precision: 18, rounding: 1
	        // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
	        // `wpr - guard` is the index of first rounding digit.
	        if (sd == null) {
	
	          if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	            Ctor.precision = wpr += 10;
	            denominator = pow = t = new Ctor(1);
	            i = 0;
	            rep++;
	          } else {
	            return finalise(sum, Ctor.precision = pr, rm, external = true);
	          }
	        } else {
	          Ctor.precision = pr;
	          return sum;
	        }
	      }
	
	      sum = t;
	    }
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
	   * digits.
	   *
	   *  ln(-n)        = NaN
	   *  ln(0)         = -Infinity
	   *  ln(-0)        = -Infinity
	   *  ln(1)         = 0
	   *  ln(Infinity)  = Infinity
	   *  ln(-Infinity) = NaN
	   *  ln(NaN)       = NaN
	   *
	   *  ln(n) (n != 1) is non-terminating.
	   *
	   */
	  function naturalLogarithm(y, sd) {
	    var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
	      n = 1,
	      guard = 10,
	      x = y,
	      xd = x.d,
	      Ctor = x.constructor,
	      rm = Ctor.rounding,
	      pr = Ctor.precision;
	
	    // Is x negative or Infinity, NaN, 0 or 1?
	    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
	      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
	    }
	
	    if (sd == null) {
	      external = false;
	      wpr = pr;
	    } else {
	      wpr = sd;
	    }
	
	    Ctor.precision = wpr += guard;
	    c = digitsToString(xd);
	    c0 = c.charAt(0);
	
	    if (Math.abs(e = x.e) < 1.5e15) {
	
	      // Argument reduction.
	      // The series converges faster the closer the argument is to 1, so using
	      // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
	      // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
	      // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
	      // later be divided by this number, then separate out the power of 10 using
	      // ln(a*10^b) = ln(a) + b*ln(10).
	
	      // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
	      //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
	      // max n is 6 (gives 0.7 - 1.3)
	      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
	        x = x.times(y);
	        c = digitsToString(x.d);
	        c0 = c.charAt(0);
	        n++;
	      }
	
	      e = x.e;
	
	      if (c0 > 1) {
	        x = new Ctor('0.' + c);
	        e++;
	      } else {
	        x = new Ctor(c0 + '.' + c.slice(1));
	      }
	    } else {
	
	      // The argument reduction method above may result in overflow if the argument y is a massive
	      // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
	      // function using ln(x*10^e) = ln(x) + e*ln(10).
	      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
	      x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
	      Ctor.precision = pr;
	
	      return sd == null ? finalise(x, pr, rm, external = true) : x;
	    }
	
	    // x1 is x reduced to a value near 1.
	    x1 = x;
	
	    // Taylor series.
	    // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
	    // where x = (y - 1)/(y + 1)    (|x| < 1)
	    sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
	    x2 = finalise(x.times(x), wpr, 1);
	    denominator = 3;
	
	    for (;;) {
	      numerator = finalise(numerator.times(x2), wpr, 1);
	      t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));
	
	      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	        sum = sum.times(2);
	
	        // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
	        // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
	        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
	        sum = divide(sum, new Ctor(n), wpr, 1);
	
	        // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
	        // been repeated previously) and the first 4 rounding digits 9999?
	        // If so, restart the summation with a higher precision, otherwise
	        // e.g. with precision: 12, rounding: 1
	        // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
	        // `wpr - guard` is the index of first rounding digit.
	        if (sd == null) {
	          if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	            Ctor.precision = wpr += guard;
	            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
	            x2 = finalise(x.times(x), wpr, 1);
	            denominator = rep = 1;
	          } else {
	            return finalise(sum, Ctor.precision = pr, rm, external = true);
	          }
	        } else {
	          Ctor.precision = pr;
	          return sum;
	        }
	      }
	
	      sum = t;
	      denominator += 2;
	    }
	  }
	
	
	  // ±Infinity, NaN.
	  function nonFiniteToString(x) {
	    // Unsigned.
	    return String(x.s * x.s / 0);
	  }
	
	
	  /*
	   * Parse the value of a new Decimal `x` from string `str`.
	   */
	  function parseDecimal(x, str) {
	    var e, i, len;
	
	    // Decimal point?
	    if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
	
	    // Exponential form?
	    if ((i = str.search(/e/i)) > 0) {
	
	      // Determine exponent.
	      if (e < 0) e = i;
	      e += +str.slice(i + 1);
	      str = str.substring(0, i);
	    } else if (e < 0) {
	
	      // Integer.
	      e = str.length;
	    }
	
	    // Determine leading zeros.
	    for (i = 0; str.charCodeAt(i) === 48; i++);
	
	    // Determine trailing zeros.
	    for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
	    str = str.slice(i, len);
	
	    if (str) {
	      len -= i;
	      x.e = e = e - i - 1;
	      x.d = [];
	
	      // Transform base
	
	      // e is the base 10 exponent.
	      // i is where to slice str to get the first word of the digits array.
	      i = (e + 1) % LOG_BASE;
	      if (e < 0) i += LOG_BASE;
	
	      if (i < len) {
	        if (i) x.d.push(+str.slice(0, i));
	        for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
	        str = str.slice(i);
	        i = LOG_BASE - str.length;
	      } else {
	        i -= len;
	      }
	
	      for (; i--;) str += '0';
	      x.d.push(+str);
	
	      if (external) {
	
	        // Overflow?
	        if (x.e > x.constructor.maxE) {
	
	          // Infinity.
	          x.d = null;
	          x.e = NaN;
	
	        // Underflow?
	        } else if (x.e < x.constructor.minE) {
	
	          // Zero.
	          x.e = 0;
	          x.d = [0];
	          // x.constructor.underflow = true;
	        } // else x.constructor.underflow = false;
	      }
	    } else {
	
	      // Zero.
	      x.e = 0;
	      x.d = [0];
	    }
	
	    return x;
	  }
	
	
	  /*
	   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
	   */
	  function parseOther(x, str) {
	    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
	
	    if (str === 'Infinity' || str === 'NaN') {
	      if (!+str) x.s = NaN;
	      x.e = NaN;
	      x.d = null;
	      return x;
	    }
	
	    if (isHex.test(str))  {
	      base = 16;
	      str = str.toLowerCase();
	    } else if (isBinary.test(str))  {
	      base = 2;
	    } else if (isOctal.test(str))  {
	      base = 8;
	    } else {
	      throw Error(invalidArgument + str);
	    }
	
	    // Is there a binary exponent part?
	    i = str.search(/p/i);
	
	    if (i > 0) {
	      p = +str.slice(i + 1);
	      str = str.substring(2, i);
	    } else {
	      str = str.slice(2);
	    }
	
	    // Convert `str` as an integer then divide the result by `base` raised to a power such that the
	    // fraction part will be restored.
	    i = str.indexOf('.');
	    isFloat = i >= 0;
	    Ctor = x.constructor;
	
	    if (isFloat) {
	      str = str.replace('.', '');
	      len = str.length;
	      i = len - i;
	
	      // log[10](16) = 1.2041... , log[10](88) = 1.9444....
	      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
	    }
	
	    xd = convertBase(str, base, BASE);
	    xe = xd.length - 1;
	
	    // Remove trailing zeros.
	    for (i = xe; xd[i] === 0; --i) xd.pop();
	    if (i < 0) return new Ctor(x.s * 0);
	    x.e = getBase10Exponent(xd, xe);
	    x.d = xd;
	    external = false;
	
	    // At what precision to perform the division to ensure exact conversion?
	    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
	    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
	    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
	    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
	    // Therefore using 4 * the number of digits of str will always be enough.
	    if (isFloat) x = divide(x, divisor, len * 4);
	
	    // Multiply by the binary exponent part if present.
	    if (p) x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : Decimal.pow(2, p));
	    external = true;
	
	    return x;
	  }
	
	
	  /*
	   * sin(x) = x - x^3/3! + x^5/5! - ...
	   * |x| < pi/2
	   *
	   */
	  function sine(Ctor, x) {
	    var k,
	      len = x.d.length;
	
	    if (len < 3) return taylorSeries(Ctor, 2, x, x);
	
	    // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
	    // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
	    // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))
	
	    // Estimate the optimum number of times to use the argument reduction.
	    k = 1.4 * Math.sqrt(len);
	    k = k > 16 ? 16 : k | 0;
	
	    // Max k before Math.pow precision loss is 22
	    x = x.times(Math.pow(5, -k));
	    x = taylorSeries(Ctor, 2, x, x);
	
	    // Reverse argument reduction
	    var sin2_x,
	      d5 = new Ctor(5),
	      d16 = new Ctor(16),
	      d20 = new Ctor(20);
	    for (; k--;) {
	      sin2_x = x.times(x);
	      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
	    }
	
	    return x;
	  }
	
	
	  // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
	  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
	    var j, t, u, x2,
	      i = 1,
	      pr = Ctor.precision,
	      k = Math.ceil(pr / LOG_BASE);
	
	    external = false;
	    x2 = x.times(x);
	    u = new Ctor(y);
	
	    for (;;) {
	      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
	      u = isHyperbolic ? y.plus(t) : y.minus(t);
	      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
	      t = u.plus(y);
	
	      if (t.d[k] !== void 0) {
	        for (j = k; t.d[j] === u.d[j] && j--;);
	        if (j == -1) break;
	      }
	
	      j = u;
	      u = y;
	      y = t;
	      t = j;
	      i++;
	    }
	
	    external = true;
	    t.d.length = k + 1;
	
	    return t;
	  }
	
	
	  // Return the absolute value of `x` reduced to less than or equal to half pi.
	  function toLessThanHalfPi(Ctor, x) {
	    var t,
	      isNeg = x.s < 0,
	      pi = getPi(Ctor, Ctor.precision, 1),
	      halfPi = pi.times(0.5);
	
	    x = x.abs();
	
	    if (x.lte(halfPi)) {
	      quadrant = isNeg ? 4 : 1;
	      return x;
	    }
	
	    t = x.divToInt(pi);
	
	    if (t.isZero()) {
	      quadrant = isNeg ? 3 : 2;
	    } else {
	      x = x.minus(t.times(pi));
	
	      // 0 <= x < pi
	      if (x.lte(halfPi)) {
	        quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
	        return x;
	      }
	
	      quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
	    }
	
	    return x.minus(pi).abs();
	  }
	
	
	  /*
	   * Return the value of Decimal `x` as a string in base `baseOut`.
	   *
	   * If the optional `sd` argument is present include a binary exponent suffix.
	   */
	  function toStringBinary(x, baseOut, sd, rm) {
	    var base, e, i, k, len, roundUp, str, xd, y,
	      Ctor = x.constructor,
	      isExp = sd !== void 0;
	
	    if (isExp) {
	      checkInt32(sd, 1, MAX_DIGITS);
	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	    } else {
	      sd = Ctor.precision;
	      rm = Ctor.rounding;
	    }
	
	    if (!x.isFinite()) {
	      str = nonFiniteToString(x);
	    } else {
	      str = finiteToString(x);
	      i = str.indexOf('.');
	
	      // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
	      // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
	      // minBinaryExponent = floor(decimalExponent * log[2](10))
	      // log[2](10) = 3.321928094887362347870319429489390175864
	
	      if (isExp) {
	        base = 2;
	        if (baseOut == 16) {
	          sd = sd * 4 - 3;
	        } else if (baseOut == 8) {
	          sd = sd * 3 - 2;
	        }
	      } else {
	        base = baseOut;
	      }
	
	      // Convert the number as an integer then divide the result by its base raised to a power such
	      // that the fraction part will be restored.
	
	      // Non-integer.
	      if (i >= 0) {
	        str = str.replace('.', '');
	        y = new Ctor(1);
	        y.e = str.length - i;
	        y.d = convertBase(finiteToString(y), 10, base);
	        y.e = y.d.length;
	      }
	
	      xd = convertBase(str, 10, base);
	      e = len = xd.length;
	
	      // Remove trailing zeros.
	      for (; xd[--len] == 0;) xd.pop();
	
	      if (!xd[0]) {
	        str = isExp ? '0p+0' : '0';
	      } else {
	        if (i < 0) {
	          e--;
	        } else {
	          x = new Ctor(x);
	          x.d = xd;
	          x.e = e;
	          x = divide(x, y, sd, rm, 0, base);
	          xd = x.d;
	          e = x.e;
	          roundUp = inexact;
	        }
	
	        // The rounding digit, i.e. the digit after the digit that may be rounded up.
	        i = xd[sd];
	        k = base / 2;
	        roundUp = roundUp || xd[sd + 1] !== void 0;
	
	        roundUp = rm < 4
	          ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
	          : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
	            rm === (x.s < 0 ? 8 : 7));
	
	        xd.length = sd;
	
	        if (roundUp) {
	
	          // Rounding up may mean the previous digit has to be rounded up and so on.
	          for (; ++xd[--sd] > base - 1;) {
	            xd[sd] = 0;
	            if (!sd) {
	              ++e;
	              xd.unshift(1);
	            }
	          }
	        }
	
	        // Determine trailing zeros.
	        for (len = xd.length; !xd[len - 1]; --len);
	
	        // E.g. [4, 11, 15] becomes 4bf.
	        for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);
	
	        // Add binary exponent suffix?
	        if (isExp) {
	          if (len > 1) {
	            if (baseOut == 16 || baseOut == 8) {
	              i = baseOut == 16 ? 4 : 3;
	              for (--len; len % i; len++) str += '0';
	              xd = convertBase(str, base, baseOut);
	              for (len = xd.length; !xd[len - 1]; --len);
	
	              // xd[0] will always be be 1
	              for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
	            } else {
	              str = str.charAt(0) + '.' + str.slice(1);
	            }
	          }
	
	          str =  str + (e < 0 ? 'p' : 'p+') + e;
	        } else if (e < 0) {
	          for (; ++e;) str = '0' + str;
	          str = '0.' + str;
	        } else {
	          if (++e > len) for (e -= len; e-- ;) str += '0';
	          else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
	        }
	      }
	
	      str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
	    }
	
	    return x.s < 0 ? '-' + str : str;
	  }
	
	
	  // Does not strip trailing zeros.
	  function truncate(arr, len) {
	    if (arr.length > len) {
	      arr.length = len;
	      return true;
	    }
	  }
	
	
	  // Decimal methods
	
	
	  /*
	   *  abs
	   *  acos
	   *  acosh
	   *  add
	   *  asin
	   *  asinh
	   *  atan
	   *  atanh
	   *  atan2
	   *  cbrt
	   *  ceil
	   *  clone
	   *  config
	   *  cos
	   *  cosh
	   *  div
	   *  exp
	   *  floor
	   *  hypot
	   *  ln
	   *  log
	   *  log2
	   *  log10
	   *  max
	   *  min
	   *  mod
	   *  mul
	   *  pow
	   *  random
	   *  round
	   *  set
	   *  sign
	   *  sin
	   *  sinh
	   *  sqrt
	   *  sub
	   *  tan
	   *  tanh
	   *  trunc
	   */
	
	
	  /*
	   * Return a new Decimal whose value is the absolute value of `x`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function abs(x) {
	    return new this(x).abs();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the arccosine in radians of `x`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function acos(x) {
	    return new this(x).acos();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function acosh(x) {
	    return new this(x).acosh();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function add(x, y) {
	    return new this(x).plus(y);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function asin(x) {
	    return new this(x).asin();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function asinh(x) {
	    return new this(x).asinh();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function atan(x) {
	    return new this(x).atan();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function atanh(x) {
	    return new this(x).atanh();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
	   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi, pi]
	   *
	   * y {number|string|Decimal} The y-coordinate.
	   * x {number|string|Decimal} The x-coordinate.
	   *
	   * atan2(±0, -0)               = ±pi
	   * atan2(±0, +0)               = ±0
	   * atan2(±0, -x)               = ±pi for x > 0
	   * atan2(±0, x)                = ±0 for x > 0
	   * atan2(-y, ±0)               = -pi/2 for y > 0
	   * atan2(y, ±0)                = pi/2 for y > 0
	   * atan2(±y, -Infinity)        = ±pi for finite y > 0
	   * atan2(±y, +Infinity)        = ±0 for finite y > 0
	   * atan2(±Infinity, x)         = ±pi/2 for finite x
	   * atan2(±Infinity, -Infinity) = ±3*pi/4
	   * atan2(±Infinity, +Infinity) = ±pi/4
	   * atan2(NaN, x) = NaN
	   * atan2(y, NaN) = NaN
	   *
	   */
	  function atan2(y, x) {
	    y = new this(y);
	    x = new this(x);
	    var r,
	      pr = this.precision,
	      rm = this.rounding,
	      wpr = pr + 4;
	
	    // Either NaN
	    if (!y.s || !x.s) {
	      r = new this(NaN);
	
	    // Both ±Infinity
	    } else if (!y.d && !x.d) {
	      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
	      r.s = y.s;
	
	    // x is ±Infinity or y is ±0
	    } else if (!x.d || y.isZero()) {
	      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
	      r.s = y.s;
	
	    // y is ±Infinity or x is ±0
	    } else if (!y.d || x.isZero()) {
	      r = getPi(this, wpr, 1).times(0.5);
	      r.s = y.s;
	
	    // Both non-zero and finite
	    } else if (x.s < 0) {
	      this.precision = wpr;
	      this.rounding = 1;
	      r = this.atan(divide(y, x, wpr, 1));
	      x = getPi(this, wpr, 1);
	      this.precision = pr;
	      this.rounding = rm;
	      r = y.s < 0 ? r.minus(x) : r.plus(x);
	    } else {
	      r = this.atan(divide(y, x, wpr, 1));
	    }
	
	    return r;
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function cbrt(x) {
	    return new this(x).cbrt();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function ceil(x) {
	    return finalise(x = new this(x), x.e + 1, 2);
	  }
	
	
	  /*
	   * Configure global settings for a Decimal constructor.
	   *
	   * `obj` is an object with one or more of the following properties,
	   *
	   *   precision  {number}
	   *   rounding   {number}
	   *   toExpNeg   {number}
	   *   toExpPos   {number}
	   *   maxE       {number}
	   *   minE       {number}
	   *   modulo     {number}
	   *   crypto     {boolean|number}
	   *
	   * E.g. Decimal.config({ precision: 20, rounding: 4 })
	   *
	   */
	  function config(obj) {
	    if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
	    var i, p, v,
	      ps = [
	        'precision', 1, MAX_DIGITS,
	        'rounding', 0, 8,
	        'toExpNeg', -EXP_LIMIT, 0,
	        'toExpPos', 0, EXP_LIMIT,
	        'maxE', 0, EXP_LIMIT,
	        'minE', -EXP_LIMIT, 0,
	        'modulo', 0, 9
	      ];
	
	    for (i = 0; i < ps.length; i += 3) {
	      if ((v = obj[p = ps[i]]) !== void 0) {
	        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
	        else throw Error(invalidArgument + p + ': ' + v);
	      }
	    }
	
	    if ((v = obj[p = 'crypto']) !== void 0) {
	      if (v === true || v === false || v === 0 || v === 1) {
	        if (v) {
	          if (typeof crypto != 'undefined' && crypto &&
	            (crypto.getRandomValues || crypto.randomBytes)) {
	            this[p] = true;
	          } else {
	            throw Error(cryptoUnavailable);
	          }
	        } else {
	          this[p] = false;
	        }
	      } else {
	        throw Error(invalidArgument + p + ': ' + v);
	      }
	    }
	
	    return this;
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function cos(x) {
	    return new this(x).cos();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function cosh(x) {
	    return new this(x).cosh();
	  }
	
	
	  /*
	   * Create and return a Decimal constructor with the same configuration properties as this Decimal
	   * constructor.
	   *
	   */
	  function clone(obj) {
	    var i, p, ps;
	
	    /*
	     * The Decimal constructor and exported function.
	     * Return a new Decimal instance.
	     *
	     * v {number|string|Decimal} A numeric value.
	     *
	     */
	    function Decimal(v) {
	      var e, i, t,
	        x = this;
	
	      // Decimal called without new.
	      if (!(x instanceof Decimal)) return new Decimal(v);
	
	      // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
	      // which points to Object.
	      x.constructor = Decimal;
	
	      // Duplicate.
	      if (v instanceof Decimal) {
	        x.s = v.s;
	        x.e = v.e;
	        x.d = (v = v.d) ? v.slice() : v;
	        return;
	      }
	
	      t = typeof v;
	
	      if (t === 'number') {
	        if (v === 0) {
	          x.s = 1 / v < 0 ? -1 : 1;
	          x.e = 0;
	          x.d = [0];
	          return;
	        }
	
	        if (v < 0) {
	          v = -v;
	          x.s = -1;
	        } else {
	          x.s = 1;
	        }
	
	        // Fast path for small integers.
	        if (v === ~~v && v < 1e7) {
	          for (e = 0, i = v; i >= 10; i /= 10) e++;
	          x.e = e;
	          x.d = [v];
	          return;
	
	        // Infinity, NaN.
	        } else if (v * 0 !== 0) {
	          if (!v) x.s = NaN;
	          x.e = NaN;
	          x.d = null;
	          return;
	        }
	
	        return parseDecimal(x, v.toString());
	
	      } else if (t !== 'string') {
	        throw Error(invalidArgument + v);
	      }
	
	      // Minus sign?
	      if (v.charCodeAt(0) === 45) {
	        v = v.slice(1);
	        x.s = -1;
	      } else {
	        x.s = 1;
	      }
	
	      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
	    }
	
	    Decimal.prototype = P;
	
	    Decimal.ROUND_UP = 0;
	    Decimal.ROUND_DOWN = 1;
	    Decimal.ROUND_CEIL = 2;
	    Decimal.ROUND_FLOOR = 3;
	    Decimal.ROUND_HALF_UP = 4;
	    Decimal.ROUND_HALF_DOWN = 5;
	    Decimal.ROUND_HALF_EVEN = 6;
	    Decimal.ROUND_HALF_CEIL = 7;
	    Decimal.ROUND_HALF_FLOOR = 8;
	    Decimal.EUCLID = 9;
	
	    Decimal.config = Decimal.set = config;
	    Decimal.clone = clone;
	
	    Decimal.abs = abs;
	    Decimal.acos = acos;
	    Decimal.acosh = acosh;        // ES6
	    Decimal.add = add;
	    Decimal.asin = asin;
	    Decimal.asinh = asinh;        // ES6
	    Decimal.atan = atan;
	    Decimal.atanh = atanh;        // ES6
	    Decimal.atan2 = atan2;
	    Decimal.cbrt = cbrt;          // ES6
	    Decimal.ceil = ceil;
	    Decimal.cos = cos;
	    Decimal.cosh = cosh;          // ES6
	    Decimal.div = div;
	    Decimal.exp = exp;
	    Decimal.floor = floor;
	    Decimal.hypot = hypot;        // ES6
	    Decimal.ln = ln;
	    Decimal.log = log;
	    Decimal.log10 = log10;        // ES6
	    Decimal.log2 = log2;          // ES6
	    Decimal.max = max;
	    Decimal.min = min;
	    Decimal.mod = mod;
	    Decimal.mul = mul;
	    Decimal.pow = pow;
	    Decimal.random = random;
	    Decimal.round = round;
	    Decimal.sign = sign;          // ES6
	    Decimal.sin = sin;
	    Decimal.sinh = sinh;          // ES6
	    Decimal.sqrt = sqrt;
	    Decimal.sub = sub;
	    Decimal.tan = tan;
	    Decimal.tanh = tanh;          // ES6
	    Decimal.trunc = trunc;        // ES6
	
	    if (obj === void 0) obj = {};
	    if (obj) {
	      ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
	      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
	    }
	
	    Decimal.config(obj);
	
	    return Decimal;
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function div(x, y) {
	    return new this(x).div(y);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} The power to which to raise the base of the natural log.
	   *
	   */
	  function exp(x) {
	    return new this(x).exp();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function floor(x) {
	    return finalise(x = new this(x), x.e + 1, 3);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
	   * rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
	   *
	   */
	  function hypot() {
	    var i, n,
	      t = new this(0);
	
	    external = false;
	
	    for (i = 0; i < arguments.length;) {
	      n = new this(arguments[i++]);
	      if (!n.d) {
	        if (n.s) {
	          external = true;
	          return new this(1 / 0);
	        }
	        t = n;
	      } else if (t.d) {
	        t = t.plus(n.times(n));
	      }
	    }
	
	    external = true;
	
	    return t.sqrt();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function ln(x) {
	    return new this(x).ln();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
	   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * log[y](x)
	   *
	   * x {number|string|Decimal} The argument of the logarithm.
	   * y {number|string|Decimal} The base of the logarithm.
	   *
	   */
	  function log(x, y) {
	    return new this(x).log(y);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function log2(x) {
	    return new this(x).log(2);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function log10(x) {
	    return new this(x).log(10);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the maximum of the arguments.
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function max() {
	    return maxOrMin(this, arguments, 'lt');
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the minimum of the arguments.
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function min() {
	    return maxOrMin(this, arguments, 'gt');
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function mod(x, y) {
	    return new this(x).mod(y);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function mul(x, y) {
	    return new this(x).mul(y);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} The base.
	   * y {number|string|Decimal} The exponent.
	   *
	   */
	  function pow(x, y) {
	    return new this(x).pow(y);
	  }
	
	
	  /*
	   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
	   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
	   * are produced).
	   *
	   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
	   *
	   */
	  function random(sd) {
	    var d, e, k, n,
	      i = 0,
	      r = new this(1),
	      rd = [];
	
	    if (sd === void 0) sd = this.precision;
	    else checkInt32(sd, 1, MAX_DIGITS);
	
	    k = Math.ceil(sd / LOG_BASE);
	
	    if (!this.crypto) {
	      for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;
	
	    // Browsers supporting crypto.getRandomValues.
	    } else if (crypto.getRandomValues) {
	      d = crypto.getRandomValues(new Uint32Array(k));
	
	      for (; i < k;) {
	        n = d[i];
	
	        // 0 <= n < 4294967296
	        // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
	        if (n >= 4.29e9) {
	          d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
	        } else {
	
	          // 0 <= n <= 4289999999
	          // 0 <= (n % 1e7) <= 9999999
	          rd[i++] = n % 1e7;
	        }
	      }
	
	    // Node.js supporting crypto.randomBytes.
	    } else if (crypto.randomBytes) {
	
	      // buffer
	      d = crypto.randomBytes(k *= 4);
	
	      for (; i < k;) {
	
	        // 0 <= n < 2147483648
	        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);
	
	        // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
	        if (n >= 2.14e9) {
	          crypto.randomBytes(4).copy(d, i);
	        } else {
	
	          // 0 <= n <= 2139999999
	          // 0 <= (n % 1e7) <= 9999999
	          rd.push(n % 1e7);
	          i += 4;
	        }
	      }
	
	      i = k / 4;
	    } else {
	      throw Error(cryptoUnavailable);
	    }
	
	    k = rd[--i];
	    sd %= LOG_BASE;
	
	    // Convert trailing digits to zeros according to sd.
	    if (k && sd) {
	      n = mathpow(10, LOG_BASE - sd);
	      rd[i] = (k / n | 0) * n;
	    }
	
	    // Remove trailing words which are zero.
	    for (; rd[i] === 0; i--) rd.pop();
	
	    // Zero?
	    if (i < 0) {
	      e = 0;
	      rd = [0];
	    } else {
	      e = -1;
	
	      // Remove leading words which are zero and adjust exponent accordingly.
	      for (; rd[0] === 0; e -= LOG_BASE) rd.shift();
	
	      // Count the digits of the first word of rd to determine leading zeros.
	      for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;
	
	      // Adjust the exponent for leading zeros of the first word of rd.
	      if (k < LOG_BASE) e -= LOG_BASE - k;
	    }
	
	    r.e = e;
	    r.d = rd;
	
	    return r;
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
	   *
	   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function round(x) {
	    return finalise(x = new this(x), x.e + 1, this.rounding);
	  }
	
	
	  /*
	   * Return
	   *   1    if x > 0,
	   *  -1    if x < 0,
	   *   0    if x is 0,
	   *  -0    if x is -0,
	   *   NaN  otherwise
	   *
	   */
	  function sign(x) {
	    x = new this(x);
	    return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function sin(x) {
	    return new this(x).sin();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function sinh(x) {
	    return new this(x).sinh();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function sqrt(x) {
	    return new this(x).sqrt();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function sub(x, y) {
	    return new this(x).sub(y);
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function tan(x) {
	    return new this(x).tan();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function tanh(x) {
	    return new this(x).tanh();
	  }
	
	
	  /*
	   * Return a new Decimal whose value is `x` truncated to an integer.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function trunc(x) {
	    return finalise(x = new this(x), x.e + 1, 1);
	  }
	
	
	  // Create and configure initial Decimal constructor.
	  Decimal = clone(Decimal);
	
	  // Create the internal constants from their string values.
	  LN10 = new Decimal(LN10);
	  PI = new Decimal(PI);
	
	
	  // Export.
	
	
	  // AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return Decimal;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	  // Node and other environments that support module.exports.
	  } else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Decimal.default = Decimal.Decimal = Decimal;
	
	  // Browser.
	  } else {
	    if (!globalScope) {
	      globalScope = typeof self != 'undefined' && self && self.self == self
	        ? self : Function('return this')();
	    }
	
	    noConflict = globalScope.Decimal;
	    Decimal.noConflict = function () {
	      globalScope.Decimal = noConflict;
	      return Decimal;
	    };
	
	    globalScope.Decimal = Decimal;
	  }
	})(this);


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = func;
	var SYMBOL = exports.SYMBOL = '&';
	
	function func() {
	  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	    params[_key] = arguments[_key];
	  }
	
	  return params.reduce(function (acc, value) {
	    return acc + value.toString();
	  }, '');
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SYMBOL = undefined;
	exports.default = func;
	
	var _number = __webpack_require__(6);
	
	var _error = __webpack_require__(7);
	
	var _decimal = __webpack_require__(8);
	
	var _decimal2 = _interopRequireDefault(_decimal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SYMBOL = exports.SYMBOL = '/';
	
	function func(first) {
	  try {
	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }
	
	    var result = rest.reduce(function (acc, value) {
	      var tempValue = new _decimal2.default(acc).div(new _decimal2.default((0, _number.toNumber)(value))).toNumber();
	      if (tempValue === Infinity || tempValue === -Infinity) {
	        throw Error(_error.ERROR_DIV_ZERO);
	      }
	
	      return tempValue;
	    }, (0, _number.toNumber)(first));
	
	    if (isNaN(result)) {
	      throw Error(_error.ERROR_VALUE);
	    }
	
	    return result;
	  } catch (error) {
	    if (error.message === _error.ERROR_DIV_ZERO) {
	      throw Error(_error.ERROR_DIV_ZERO);
	    }
	
	    throw Error(_error.ERROR_VALUE);
	  }
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = func;
	var SYMBOL = exports.SYMBOL = '=';
	
	function func(exp1, exp2) {
	  return exp1 === exp2;
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SYMBOL = undefined;
	exports.default = func;
	
	var _supportedFormulas = __webpack_require__(2);
	
	var _supportedFormulas2 = _interopRequireDefault(_supportedFormulas);
	
	var _error = __webpack_require__(7);
	
	var _formulajs = __webpack_require__(13);
	
	var formulajs = _interopRequireWildcard(_formulajs);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SYMBOL = exports.SYMBOL = _supportedFormulas2.default;
	
	function func(symbol) {
	  return function () {
	    symbol = symbol.toUpperCase();
	
	    var symbolParts = symbol.split('.');
	    var foundFormula = false;
	    var result = void 0;
	
	    if (symbolParts.length === 1) {
	      if (formulajs[symbolParts[0]]) {
	        foundFormula = true;
	        result = formulajs[symbolParts[0]].apply(formulajs, arguments);
	      }
	    } else {
	      var length = symbolParts.length;
	      var index = 0;
	      var nestedFormula = formulajs;
	
	      while (index < length) {
	        nestedFormula = nestedFormula[symbolParts[index]];
	        index++;
	
	        if (!nestedFormula) {
	          nestedFormula = null;
	          break;
	        }
	      }
	      if (nestedFormula) {
	        foundFormula = true;
	        result = nestedFormula.apply(undefined, arguments);
	      }
	    }
	
	    if (!foundFormula) {
	      throw Error(_error.ERROR_NAME);
	    }
	
	    return result;
	  };
	};
	
	func.isFactory = true;
	func.SYMBOL = SYMBOL;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var categories = [
	  __webpack_require__(14),
	  __webpack_require__(29),
	  __webpack_require__(26),
	  __webpack_require__(30),
	  __webpack_require__(15),
	  __webpack_require__(19),
	  __webpack_require__(28),
	  __webpack_require__(31),
	  __webpack_require__(24),
	  __webpack_require__(32),
	  __webpack_require__(18),
	  __webpack_require__(23)
	];
	
	for (var c in categories) {
	  var category = categories[c];
	  for (var f in category) {
	    exports[f] = exports[f] || category[f];
	  }
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(15);
	var statistical = __webpack_require__(18);
	var engineering = __webpack_require__(26);
	var dateTime = __webpack_require__(28);
	
	function set(fn, root) {
	  if (root) {
	    for (var i in root) {
	      fn[i] = root[i];
	    }
	  }
	
	  return fn;
	}
	
	exports.BETADIST = statistical.BETA.DIST;
	exports.BETAINV = statistical.BETA.INV;
	exports.BINOMDIST = statistical.BINOM.DIST;
	exports.CEILING = exports.ISOCEILING = set(mathTrig.CEILING.MATH, mathTrig.CEILING);
	exports.CEILINGMATH = mathTrig.CEILING.MATH;
	exports.CEILINGPRECISE = mathTrig.CEILING.PRECISE;
	exports.CHIDIST = statistical.CHISQ.DIST;
	exports.CHIDISTRT = statistical.CHISQ.DIST.RT;
	exports.CHIINV = statistical.CHISQ.INV;
	exports.CHIINVRT = statistical.CHISQ.INV.RT;
	exports.CHITEST = statistical.CHISQ.TEST;
	exports.CONFIDENCE = set(statistical.CONFIDENCE.NORM, statistical.CONFIDENCE);
	exports.COVAR = statistical.COVARIANCE.P;
	exports.COVARIANCEP = statistical.COVARIANCE.P;
	exports.COVARIANCES = statistical.COVARIANCE.S;
	exports.CRITBINOM = statistical.BINOM.INV;
	exports.EXPONDIST = statistical.EXPON.DIST;
	exports.ERFCPRECISE = engineering.ERFC.PRECISE;
	exports.ERFPRECISE = engineering.ERF.PRECISE;
	exports.FDIST = statistical.F.DIST;
	exports.FDISTRT = statistical.F.DIST.RT;
	exports.FINVRT = statistical.F.INV.RT;
	exports.FINV = statistical.F.INV;
	exports.FLOOR = set(mathTrig.FLOOR.MATH, mathTrig.FLOOR);
	exports.FLOORMATH = mathTrig.FLOOR.MATH;
	exports.FLOORPRECISE = mathTrig.FLOOR.PRECISE;
	exports.FTEST = statistical.F.TEST;
	exports.GAMMADIST = statistical.GAMMA.DIST;
	exports.GAMMAINV = statistical.GAMMA.INV;
	exports.GAMMALNPRECISE = statistical.GAMMALN.PRECISE;
	exports.HYPGEOMDIST = statistical.HYPGEOM.DIST;
	exports.LOGINV = statistical.LOGNORM.INV;
	exports.LOGNORMINV = statistical.LOGNORM.INV;
	exports.LOGNORMDIST = statistical.LOGNORM.DIST;
	exports.MODE = set(statistical.MODE.SNGL, statistical.MODE);
	exports.MODEMULT = statistical.MODE.MULT;
	exports.MODESNGL = statistical.MODE.SNGL;
	exports.NEGBINOMDIST = statistical.NEGBINOM.DIST;
	exports.NETWORKDAYSINTL = dateTime.NETWORKDAYS.INTL;
	exports.NORMDIST = statistical.NORM.DIST;
	exports.NORMINV = statistical.NORM.INV;
	exports.NORMSDIST = statistical.NORM.S.DIST;
	exports.NORMSINV = statistical.NORM.S.INV;
	exports.PERCENTILE = set(statistical.PERCENTILE.EXC, statistical.PERCENTILE);
	exports.PERCENTILEEXC = statistical.PERCENTILE.EXC;
	exports.PERCENTILEINC = statistical.PERCENTILE.INC;
	exports.PERCENTRANK = set(statistical.PERCENTRANK.INC, statistical.PERCENTRANK);
	exports.PERCENTRANKEXC = statistical.PERCENTRANK.EXC;
	exports.PERCENTRANKINC = statistical.PERCENTRANK.INC;
	exports.POISSON = set(statistical.POISSON.DIST, statistical.POISSON);
	exports.POISSONDIST = statistical.POISSON.DIST;
	exports.QUARTILE = set(statistical.QUARTILE.INC, statistical.QUARTILE);
	exports.QUARTILEEXC = statistical.QUARTILE.EXC;
	exports.QUARTILEINC = statistical.QUARTILE.INC;
	exports.RANK = set(statistical.RANK.EQ, statistical.RANK);
	exports.RANKAVG = statistical.RANK.AVG;
	exports.RANKEQ = statistical.RANK.EQ;
	exports.SKEWP = statistical.SKEW.P;
	exports.STDEV = set(statistical.STDEV.S, statistical.STDEV);
	exports.STDEVP = statistical.STDEV.P;
	exports.STDEVS = statistical.STDEV.S;
	exports.TDIST = statistical.T.DIST;
	exports.TDISTRT = statistical.T.DIST.RT;
	exports.TINV = statistical.T.INV;
	exports.TTEST = statistical.T.TEST;
	exports.VAR = set(statistical.VAR.S, statistical.VAR);
	exports.VARP = statistical.VAR.P;
	exports.VARS = statistical.VAR.S;
	exports.WEIBULL = set(statistical.WEIBULL.DIST, statistical.WEIBULL);
	exports.WEIBULLDIST = statistical.WEIBULL.DIST;
	exports.WORKDAYINTL = dateTime.WORKDAY.INTL;
	exports.ZTEST = statistical.Z.TEST;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(16);
	var error = __webpack_require__(17);
	var statistical = __webpack_require__(18);
	var information = __webpack_require__(24);
	var BigNumber = __webpack_require__(25);
	
	BigNumber.config({ ERRORS: false });
	
	exports.ABS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var result = Math.abs(number);
	
	  return result;
	};
	
	exports.ACOS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var result = Math.acos(number);
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.ACOSH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var result = Math.log(number + Math.sqrt(number * number - 1));
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.ACOT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var result = Math.atan(1 / number);
	
	  return result;
	};
	
	exports.ACOTH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var result = 0.5 * Math.log((number + 1) / (number - 1));
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	//TODO: use options
	exports.AGGREGATE = function(function_num, options, ref1, ref2) {
	  function_num = utils.parseNumber(function_num);
	  options = utils.parseNumber(function_num);
	  if (utils.anyIsError(function_num, options)) {
	    return error.value;
	  }
	  switch (function_num) {
	    case 1:
	      return statistical.AVERAGE(ref1);
	    case 2:
	      return statistical.COUNT(ref1);
	    case 3:
	      return statistical.COUNTA(ref1);
	    case 4:
	      return statistical.MAX(ref1);
	    case 5:
	      return statistical.MIN(ref1);
	    case 6:
	      return exports.PRODUCT(ref1);
	    case 7:
	      return statistical.STDEV.S(ref1);
	    case 8:
	      return statistical.STDEV.P(ref1);
	    case 9:
	      return exports.SUM(ref1);
	    case 10:
	      return statistical.VAR.S(ref1);
	    case 11:
	      return statistical.VAR.P(ref1);
	    case 12:
	      return statistical.MEDIAN(ref1);
	    case 13:
	      return statistical.MODE.SNGL(ref1);
	    case 14:
	      return statistical.LARGE(ref1, ref2);
	    case 15:
	      return statistical.SMALL(ref1, ref2);
	    case 16:
	      return statistical.PERCENTILE.INC(ref1, ref2);
	    case 17:
	      return statistical.QUARTILE.INC(ref1, ref2);
	    case 18:
	      return statistical.PERCENTILE.EXC(ref1, ref2);
	    case 19:
	      return statistical.QUARTILE.EXC(ref1, ref2);
	  }
	};
	
	exports.ARABIC = function(text) {
	  // Credits: Rafa? Kukawski
	  if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
	    return error.value;
	  }
	  var r = 0;
	  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
	    r += {
	      M: 1000,
	      CM: 900,
	      D: 500,
	      CD: 400,
	      C: 100,
	      XC: 90,
	      L: 50,
	      XL: 40,
	      X: 10,
	      IX: 9,
	      V: 5,
	      IV: 4,
	      I: 1
	    }[i];
	  });
	  return r;
	};
	
	exports.ASIN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var result = Math.asin(number);
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.ASINH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number + Math.sqrt(number * number + 1));
	};
	
	exports.ATAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.atan(number);
	};
	
	exports.ATAN2 = function(number_x, number_y) {
	  number_x = utils.parseNumber(number_x);
	  number_y = utils.parseNumber(number_y);
	  if (utils.anyIsError(number_x, number_y)) {
	    return error.value;
	  }
	  return Math.atan2(number_x, number_y);
	};
	
	exports.ATANH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var result = Math.log((1 + number) / (1 - number)) / 2;
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.BASE = function(number, radix, min_length) {
	  min_length = min_length || 0;
	
	  number = utils.parseNumber(number);
	  radix = utils.parseNumber(radix);
	  min_length = utils.parseNumber(min_length);
	  if (utils.anyIsError(number, radix, min_length)) {
	    return error.value;
	  }
	  min_length = (min_length === undefined) ? 0 : min_length;
	  var result = number.toString(radix);
	  return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
	};
	
	exports.CEILING = function(number, significance, mode) {
	  significance = (significance === undefined) ? 1 : Math.abs(significance);
	  mode = mode || 0;
	
	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  mode = utils.parseNumber(mode);
	  if (utils.anyIsError(number, significance, mode)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.ceil(number / significance) * significance, precision);
	  } else {
	    if (mode === 0) {
	      return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
	    } else {
	      return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
	    }
	  }
	};
	
	exports.CEILING.MATH = exports.CEILING;
	
	exports.CEILING.PRECISE = exports.CEILING;
	
	exports.COMBIN = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return exports.FACT(number) / (exports.FACT(number_chosen) * exports.FACT(number - number_chosen));
	};
	
	exports.COMBINA = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return (number === 0 && number_chosen === 0) ? 1 : exports.COMBIN(number + number_chosen - 1, number - 1);
	};
	
	exports.COS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.cos(number);
	};
	
	exports.COSH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return (Math.exp(number) + Math.exp(-number)) / 2;
	};
	
	exports.COT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.tan(number);
	};
	
	exports.COTH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var e2 = Math.exp(2 * number);
	  return (e2 + 1) / (e2 - 1);
	};
	
	exports.CSC = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.sin(number);
	};
	
	exports.CSCH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 2 / (Math.exp(number) - Math.exp(-number));
	};
	
	exports.DECIMAL = function(number, radix) {
	  if (arguments.length < 1) {
	    return error.value;
	  }
	
	
	  return parseInt(number, radix);
	};
	
	exports.DEGREES = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return number * 180 / Math.PI;
	};
	
	exports.EVEN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return exports.CEILING(number, -2, -1);
	};
	
	exports.EXP = Math.exp;
	
	var MEMOIZED_FACT = [];
	exports.FACT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var n = Math.floor(number);
	  if (n === 0 || n === 1) {
	    return 1;
	  } else if (MEMOIZED_FACT[n] > 0) {
	    return MEMOIZED_FACT[n];
	  } else {
	    MEMOIZED_FACT[n] = exports.FACT(n - 1) * n;
	    return MEMOIZED_FACT[n];
	  }
	};
	
	exports.FACTDOUBLE = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var n = Math.floor(number);
	  if (n <= 0) {
	    return 1;
	  } else {
	    return n * exports.FACTDOUBLE(n - 2);
	  }
	};
	
	exports.FLOOR = function(number, significance) {
	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(number, significance)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }
	
	  if (!(number > 0 && significance > 0) && !(number < 0 && significance < 0)) {
	    return error.num;
	  }
	
	  significance = Math.abs(significance);
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.floor(number / significance) * significance, precision);
	  } else {
	    return -exports.ROUND(Math.ceil(Math.abs(number) / significance), precision);
	  }
	};
	
	//TODO: Verify
	exports.FLOOR.MATH = function(number, significance, mode) {
	  significance = (significance === undefined) ? 1 : significance;
	  mode = (mode === undefined) ? 0 : mode;
	
	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  mode = utils.parseNumber(mode);
	  if (utils.anyIsError(number, significance, mode)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }
	
	  significance = significance ? Math.abs(significance) : 1;
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.floor(number / significance) * significance, precision);
	  } else if (mode === 0 || mode === undefined) {
	    return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
	  }
	  return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
	};
	
	// Deprecated
	exports.FLOOR.PRECISE = exports.FLOOR.MATH;
	
	// adapted http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
	exports.GCD = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var r0 = range[0];
	  var x = r0 < 0 ? -r0 : r0;
	  for (var i = 1; i < n; i++) {
	    var ri = range[i];
	    var y = ri < 0 ? -ri : ri;
	    while (x && y) {
	      if (x > y) {
	        x %= y;
	      } else {
	        y %= x;
	      }
	    }
	    x += y;
	  }
	  return x;
	};
	
	
	exports.INT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.floor(number);
	};
	
	//TODO: verify
	exports.ISO = {
	  CEILING: exports.CEILING
	};
	
	exports.LCM = function() {
	  // Credits: Jonas Raoni Soares Silva
	  var o = utils.parseNumberArray(utils.flatten(arguments));
	  if (o instanceof Error) {
	    return o;
	  }
	  for (var i, j, n, d, r = 1;
	       (n = o.pop()) !== undefined;) {
	    while (n > 1) {
	      if (n % 2) {
	        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
	          //empty
	        }
	        d = (i <= j) ? i : n;
	      } else {
	        d = 2;
	      }
	      for (n /= d, r *= d, i = o.length; i;
	           (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
	        //empty
	      }
	    }
	  }
	  return r;
	};
	
	exports.LN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number);
	};
	
	exports.LN10 = function() {
	  return Math.log(10);
	};
	
	exports.LN2 = function() {
	  return Math.log(2);
	};
	
	exports.LOG10E = function() {
	  return Math.LOG10E;
	};
	
	exports.LOG2E = function() {
	  return Math.LOG2E;
	};
	
	exports.LOG = function(number, base) {
	  number = utils.parseNumber(number);
	  base = utils.parseNumber(base);
	  if (utils.anyIsError(number, base)) {
	    return error.value;
	  }
	  base = (base === undefined) ? 10 : base;
	  return Math.log(number) / Math.log(base);
	};
	
	exports.LOG10 = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number) / Math.log(10);
	};
	
	exports.MOD = function(dividend, divisor) {
	  dividend = utils.parseNumber(dividend);
	  divisor = utils.parseNumber(divisor);
	  if (utils.anyIsError(dividend, divisor)) {
	    return error.value;
	  }
	  if (divisor === 0) {
	    return error.div0;
	  }
	  var modulus = Math.abs(dividend % divisor);
	  return (divisor > 0) ? modulus : -modulus;
	};
	
	exports.MROUND = function(number, multiple) {
	  number = utils.parseNumber(number);
	  multiple = utils.parseNumber(multiple);
	  if (utils.anyIsError(number, multiple)) {
	    return error.value;
	  }
	  if (number * multiple < 0) {
	    return error.num;
	  }
	
	  return Math.round(number / multiple) * multiple;
	};
	
	exports.MULTINOMIAL = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  var sum = 0;
	  var divisor = 1;
	  for (var i = 0; i < args.length; i++) {
	    sum += args[i];
	    divisor *= exports.FACT(args[i]);
	  }
	  return exports.FACT(sum) / divisor;
	};
	
	exports.ODD = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var temp = Math.ceil(Math.abs(number));
	  temp = (temp & 1) ? temp : temp + 1;
	  return (number > 0) ? temp : -temp;
	};
	
	exports.PI = function() {
	  return Math.PI;
	};
	
	exports.E = function() {
	  return Math.E;
	};
	
	exports.POWER = function(number, power) {
	  number = utils.parseNumber(number);
	  power = utils.parseNumber(power);
	  if (utils.anyIsError(number, power)) {
	    return error.value;
	  }
	  var result = Math.pow(number, power);
	  if (isNaN(result)) {
	    return error.num;
	  }
	
	  return result;
	};
	
	exports.PRODUCT = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  var result = 1;
	  for (var i = 0; i < args.length; i++) {
	    result *= args[i];
	  }
	  return result;
	};
	
	exports.QUOTIENT = function(numerator, denominator) {
	  numerator = utils.parseNumber(numerator);
	  denominator = utils.parseNumber(denominator);
	  if (utils.anyIsError(numerator, denominator)) {
	    return error.value;
	  }
	  return parseInt(numerator / denominator, 10);
	};
	
	exports.RADIANS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return number * Math.PI / 180;
	};
	
	exports.RAND = function() {
	  return Math.random();
	};
	
	exports.RANDBETWEEN = function(bottom, top) {
	  bottom = utils.parseNumber(bottom);
	  top = utils.parseNumber(top);
	  if (utils.anyIsError(bottom, top)) {
	    return error.value;
	  }
	  // Creative Commons Attribution 3.0 License
	  // Copyright (c) 2012 eqcode
	  return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
	};
	
	// TODO
	exports.ROMAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  // The MIT License
	  // Copyright (c) 2008 Steven Levithan
	  var digits = String(number).split('');
	  var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
	  var roman = '';
	  var i = 3;
	  while (i--) {
	    roman = (key[+digits.pop() + (i * 10)] || '') + roman;
	  }
	  return new Array(+digits.join('') + 1).join('M') + roman;
	};
	
	exports.ROUND = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
	};
	
	exports.ROUNDDOWN = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};
	
	exports.ROUNDUP = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};
	
	exports.SEC = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.cos(number);
	};
	
	exports.SECH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 2 / (Math.exp(number) + Math.exp(-number));
	};
	
	exports.SERIESSUM = function(x, n, m, coefficients) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  m = utils.parseNumber(m);
	  coefficients = utils.parseNumberArray(coefficients);
	  if (utils.anyIsError(x, n, m, coefficients)) {
	    return error.value;
	  }
	  var result = coefficients[0] * Math.pow(x, n);
	  for (var i = 1; i < coefficients.length; i++) {
	    result += coefficients[i] * Math.pow(x, n + i * m);
	  }
	  return result;
	};
	
	exports.SIGN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0) {
	    return -1;
	  } else if (number === 0) {
	    return 0;
	  } else {
	    return 1;
	  }
	};
	
	exports.SIN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.sin(number);
	};
	
	exports.SINH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return (Math.exp(number) - Math.exp(-number)) / 2;
	};
	
	exports.SQRT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0) {
	    return error.num;
	  }
	  return Math.sqrt(number);
	};
	
	exports.SQRTPI = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.sqrt(number * Math.PI);
	};
	
	exports.SQRT1_2 = function() {
	  return 1 / Math.sqrt(2);
	};
	
	exports.SQRT2 = function() {
	  return Math.sqrt(2);
	};
	
	exports.SUBTOTAL = function(function_code, ref1) {
	  function_code = utils.parseNumber(function_code);
	  if (function_code instanceof Error) {
	    return function_code;
	  }
	  switch (function_code) {
	    case 1:
	      return statistical.AVERAGE(ref1);
	    case 2:
	      return statistical.COUNT(ref1);
	    case 3:
	      return statistical.COUNTA(ref1);
	    case 4:
	      return statistical.MAX(ref1);
	    case 5:
	      return statistical.MIN(ref1);
	    case 6:
	      return exports.PRODUCT(ref1);
	    case 7:
	      return statistical.STDEV.S(ref1);
	    case 8:
	      return statistical.STDEV.P(ref1);
	    case 9:
	      return exports.SUM(ref1);
	    case 10:
	      return statistical.VAR.S(ref1);
	    case 11:
	      return statistical.VAR.P(ref1);
	    // no hidden values for us
	    case 101:
	      return statistical.AVERAGE(ref1);
	    case 102:
	      return statistical.COUNT(ref1);
	    case 103:
	      return statistical.COUNTA(ref1);
	    case 104:
	      return statistical.MAX(ref1);
	    case 105:
	      return statistical.MIN(ref1);
	    case 106:
	      return exports.PRODUCT(ref1);
	    case 107:
	      return statistical.STDEV.S(ref1);
	    case 108:
	      return statistical.STDEV.P(ref1);
	    case 109:
	      return exports.SUM(ref1);
	    case 110:
	      return statistical.VAR.S(ref1);
	    case 111:
	      return statistical.VAR.P(ref1);
	
	  }
	};
	
	exports.ADD = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.value;
	  }
	
	  return num1 + num2;
	};
	
	exports.MINUS = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.value;
	  }
	
	  return num1 - num2;
	};
	
	exports.DIVIDE = function (dividend, divisor) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  dividend = utils.parseNumber(dividend);
	  divisor = utils.parseNumber(divisor);
	  if (utils.anyIsError(dividend, divisor)) {
	    return error.value;
	  }
	
	  if (divisor === 0) {
	    return error.div0;
	  }
	
	  return dividend / divisor;
	};
	
	exports.MULTIPLY = function (factor1, factor2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  factor1 = utils.parseNumber(factor1);
	  factor2 = utils.parseNumber(factor2);
	  if (utils.anyIsError(factor1, factor2)) {
	    return error.value;
	  }
	
	  return factor1 * factor2;
	};
	
	exports.GTE = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }
	
	  return num1 >= num2;
	};
	
	exports.LT = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }
	
	  return num1 < num2;
	};
	
	
	exports.LTE = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }
	
	  return num1 <= num2;
	};
	
	exports.EQ = function (value1, value2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  return value1 === value2;
	};
	
	exports.NE = function (value1, value2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  return value1 !== value2;
	};
	
	exports.POW = function (base, exponent) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  base = utils.parseNumber(base);
	  exponent = utils.parseNumber(exponent);
	  if (utils.anyIsError(base, exponent)) {
	    return error.error;
	  }
	
	  return exports.POWER(base, exponent);
	};
	
	exports.SUM = function() {
	  var result = 0;
	  utils.arrayEach(utils.argsToArray(arguments), function(value) {
	    if (typeof value === 'number') {
	      result = (new BigNumber(result)).plus(new BigNumber(value)).toNumber();
	    } else if (typeof value === 'string') {
	      var parsed = parseFloat(value);
	
	      !isNaN(parsed) && (result = (new BigNumber(result)).plus(new BigNumber(value)).toNumber());
	
	    } else if (Array.isArray(value)) {
	      result += exports.SUM.apply(null, value);
	    }
	  });
	
	  return result;
	};
	
	exports.SUMIF = function(range, criteria) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (range instanceof Error) {
	    return range;
	  }
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    result += (eval(range[i] + criteria)) ? range[i] : 0; // jshint ignore:line
	  }
	  return result;
	};
	
	exports.SUMIFS = function() {
	  var args = utils.argsToArray(arguments);
	  var range = utils.parseNumberArray(utils.flatten(args.shift()));
	  if (range instanceof Error) {
	    return range;
	  }
	  var criteria = args;
	
	  var n_range_elements = range.length;
	  var n_criterias = criteria.length;
	
	  var result = 0;
	  for (var i = 0; i < n_range_elements; i++) {
	    var el = range[i];
	    var condition = '';
	    for (var c = 0; c < n_criterias; c++) {
	      condition += el + criteria[c];
	      if (c !== n_criterias - 1) {
	        condition += '&&';
	      }
	    }
	    if (eval(condition)) { // jshint ignore:line
	      result += el;
	    }
	  }
	  return result;
	};
	
	exports.SUMPRODUCT = function() {
	  if (!arguments || arguments.length === 0) {
	    return error.value;
	  }
	  var arrays = arguments.length + 1;
	  var result = 0;
	  var product;
	  var k;
	  var _i;
	  var _ij;
	  for (var i = 0; i < arguments[0].length; i++) {
	    if (!(arguments[0][i] instanceof Array)) {
	      product = 1;
	      for (k = 1; k < arrays; k++) {
	        _i = utils.parseNumber(arguments[k - 1][i]);
	        if (_i instanceof Error) {
	          return _i;
	        }
	        product *= _i;
	      }
	      result += product;
	    } else {
	      for (var j = 0; j < arguments[0][i].length; j++) {
	        product = 1;
	        for (k = 1; k < arrays; k++) {
	          _ij = utils.parseNumber(arguments[k - 1][i][j]);
	          if (_ij instanceof Error) {
	            return _ij;
	          }
	          product *= _ij;
	        }
	        result += product;
	      }
	    }
	  }
	  return result;
	};
	
	exports.SUMSQ = function() {
	  var numbers = utils.parseNumberArray(utils.flatten(arguments));
	  if (numbers instanceof Error) {
	    return numbers;
	  }
	  var result = 0;
	  var length = numbers.length;
	  for (var i = 0; i < length; i++) {
	    result += (information.ISNUMBER(numbers[i])) ? numbers[i] * numbers[i] : 0;
	  }
	  return result;
	};
	
	exports.SUMX2MY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  for (var i = 0; i < array_x.length; i++) {
	    result += array_x[i] * array_x[i] - array_y[i] * array_y[i];
	  }
	  return result;
	};
	
	exports.SUMX2PY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  for (var i = 0; i < array_x.length; i++) {
	    result += array_x[i] * array_x[i] + array_y[i] * array_y[i];
	  }
	  return result;
	};
	
	exports.SUMXMY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  array_x = utils.flatten(array_x);
	  array_y = utils.flatten(array_y);
	  for (var i = 0; i < array_x.length; i++) {
	    result += Math.pow(array_x[i] - array_y[i], 2);
	  }
	  return result;
	};
	
	exports.TAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.tan(number);
	};
	
	exports.TANH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var e2 = Math.exp(2 * number);
	  return (e2 - 1) / (e2 + 1);
	};
	
	exports.TRUNC = function(number, digits) {
	  digits = (digits === undefined) ? 0 : digits;
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	
	exports.flattenShallow = function(array) {
	  if (!array || !array.reduce) {
	    return array;
	  }
	
	  return array.reduce(function(a, b) {
	    var aIsArray = Array.isArray(a);
	    var bIsArray = Array.isArray(b);
	
	    if (aIsArray && bIsArray ) {
	      return a.concat(b);
	    }
	    if (aIsArray) {
	      a.push(b);
	
	      return a;
	    }
	    if (bIsArray) {
	      return [a].concat(b);
	    }
	
	    return [a, b];
	  });
	};
	
	exports.isFlat = function(array) {
	  if (!array) {
	    return false;
	  }
	
	  for (var i = 0; i < array.length; ++i) {
	    if (Array.isArray(array[i])) {
	      return false;
	    }
	  }
	
	  return true;
	};
	
	exports.flatten = function() {
	  var result = exports.argsToArray.apply(null, arguments);
	
	  while (!exports.isFlat(result)) {
	    result = exports.flattenShallow(result);
	  }
	
	  return result;
	};
	
	exports.argsToArray = function(args) {
	  var result = [];
	
	  exports.arrayEach(args, function(value) {
	    result.push(value);
	  });
	
	  return result;
	};
	
	exports.numbers = function() {
	  var possibleNumbers = this.flatten.apply(null, arguments);
	  return possibleNumbers.filter(function(el) {
	    return typeof el === 'number';
	  });
	};
	
	exports.cleanFloat = function(number) {
	  var power = 1e14;
	  return Math.round(number * power) / power;
	};
	
	exports.parseBool = function(bool) {
	  if (typeof bool === 'boolean') {
	    return bool;
	  }
	
	  if (bool instanceof Error) {
	    return bool;
	  }
	
	  if (typeof bool === 'number') {
	    return bool !== 0;
	  }
	
	  if (typeof bool === 'string') {
	    var up = bool.toUpperCase();
	    if (up === 'TRUE') {
	      return true;
	    }
	
	    if (up === 'FALSE') {
	      return false;
	    }
	  }
	
	  if (bool instanceof Date && !isNaN(bool)) {
	    return true;
	  }
	
	  return error.value;
	};
	
	exports.parseNumber = function(string) {
	  if (string === undefined || string === '') {
	    return error.value;
	  }
	  if (!isNaN(string)) {
	    return parseFloat(string);
	  }
	
	  return error.value;
	};
	
	exports.parseNumberArray = function(arr) {
	  var len;
	
	  if (!arr || (len = arr.length) === 0) {
	    return error.value;
	  }
	
	  var parsed;
	
	  while (len--) {
	    parsed = exports.parseNumber(arr[len]);
	    if (parsed === error.value) {
	      return parsed;
	    }
	    arr[len] = parsed;
	  }
	
	  return arr;
	};
	
	exports.parseMatrix = function(matrix) {
	  var n;
	
	  if (!matrix || (n = matrix.length) === 0) {
	    return error.value;
	  }
	  var pnarr;
	
	  for (var i = 0; i < matrix.length; i++) {
	    pnarr = exports.parseNumberArray(matrix[i]);
	    matrix[i] = pnarr;
	
	    if (pnarr instanceof Error) {
	      return pnarr;
	    }
	  }
	
	  return matrix;
	};
	
	var d1900 = new Date(1900, 0, 1);
	exports.parseDate = function(date) {
	  if (!isNaN(date)) {
	    if (date instanceof Date) {
	      return new Date(date);
	    }
	    var d = parseInt(date, 10);
	    if (d < 0) {
	      return error.num;
	    }
	    if (d <= 60) {
	      return new Date(d1900.getTime() + (d - 1) * 86400000);
	    }
	    return new Date(d1900.getTime() + (d - 2) * 86400000);
	  }
	  if (typeof date === 'string') {
	    date = new Date(date);
	    if (!isNaN(date)) {
	      return date;
	    }
	  }
	  return error.value;
	};
	
	exports.parseDateArray = function(arr) {
	  var len = arr.length;
	  var parsed;
	  while (len--) {
	    parsed = this.parseDate(arr[len]);
	    if (parsed === error.value) {
	      return parsed;
	    }
	    arr[len] = parsed;
	  }
	  return arr;
	};
	
	exports.anyIsError = function() {
	  var n = arguments.length;
	  while (n--) {
	    if (arguments[n] instanceof Error) {
	      return true;
	    }
	  }
	  return false;
	};
	
	exports.arrayValuesToNumbers = function(arr) {
	  var n = arr.length;
	  var el;
	  while (n--) {
	    el = arr[n];
	    if (typeof el === 'number') {
	      continue;
	    }
	    if (el === true) {
	      arr[n] = 1;
	      continue;
	    }
	    if (el === false) {
	      arr[n] = 0;
	      continue;
	    }
	    if (typeof el === 'string') {
	      var number = this.parseNumber(el);
	      if (number instanceof Error) {
	        arr[n] = 0;
	      } else {
	        arr[n] = number;
	      }
	    }
	  }
	  return arr;
	};
	
	exports.rest = function(array, idx) {
	  idx = idx || 1;
	  if (!array || typeof array.slice !== 'function') {
	    return array;
	  }
	  return array.slice(idx);
	};
	
	exports.initial = function(array, idx) {
	  idx = idx || 1;
	  if (!array || typeof array.slice !== 'function') {
	    return array;
	  }
	  return array.slice(0, array.length - idx);
	};
	
	exports.arrayEach = function(array, iteratee) {
	  var index = -1, length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	
	  return array;
	};
	
	exports.transpose = function(matrix) {
	  if(!matrix) { 
	    return error.value;
	  }
	
	  return matrix[0].map(function(col, i) { 
	    return matrix.map(function(row) { 
	      return row[i];
	    });
	  });
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	exports.nil = new Error('#NULL!');
	exports.div0 = new Error('#DIV/0!');
	exports.value = new Error('#VALUE!');
	exports.ref = new Error('#REF!');
	exports.name = new Error('#NAME?');
	exports.num = new Error('#NUM!');
	exports.na = new Error('#N/A');
	exports.error = new Error('#ERROR!');
	exports.data = new Error('#GETTING_DATA');


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(15);
	var text = __webpack_require__(19);
	var jStat = __webpack_require__(22).jStat;
	var utils = __webpack_require__(16);
	var error = __webpack_require__(17);
	var misc = __webpack_require__(23);
	
	var SQRT2PI = 2.5066282746310002;
	
	exports.AVEDEV = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  return jStat.sum(jStat(range).subtract(jStat.mean(range)).abs()[0]) / range.length;
	};
	
	exports.AVERAGE = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sum = 0;
	  var count = 0;
	  var result;
	
	  for (var i = 0; i < n; i++) {
	    sum += range[i];
	    count += 1;
	  }
	  result = sum / count;
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.AVERAGEA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sum = 0;
	  var count = 0;
	  var result;
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sum += el;
	    }
	    if (el === true) {
	      sum++;
	    }
	    if (el !== null) {
	      count++;
	    }
	  }
	  result = sum / count;
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.AVERAGEIF = function(range, criteria, average_range) {
	  if (arguments.length <= 1) {
	    return error.na;
	  }
	  average_range = average_range || range;
	  range = utils.flatten(range);
	  average_range = utils.parseNumberArray(utils.flatten(average_range));
	  if (average_range instanceof Error) {
	    return average_range;
	  }
	  var average_count = 0;
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (eval(range[i] + criteria)) { // jshint ignore:line
	      result += average_range[i];
	      average_count++;
	    }
	  }
	  return result / average_count;
	};
	
	exports.AVERAGEIFS = function() {
	  // Does not work with multi dimensional ranges yet!
	  //http://office.microsoft.com/en-001/excel-help/averageifs-function-HA010047493.aspx
	  var args = utils.argsToArray(arguments);
	  var criteria = (args.length - 1) / 2;
	  var range = utils.flatten(args[0]);
	  var count = 0;
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    var condition = '';
	    for (var j = 0; j < criteria; j++) {
	      condition += args[2 * j + 1][i] + args[2 * j + 2];
	      if (j !== criteria - 1) {
	        condition += '&&';
	      }
	    }
	    if (eval(condition)) { // jshint ignore:line
	      result += range[i];
	      count++;
	    }
	  }
	
	  var average = result / count;
	  if (isNaN(average)) {
	    return 0;
	  } else {
	    return average;
	  }
	};
	
	exports.BETA = {};
	
	exports.BETA.DIST = function(x, alpha, beta, cumulative, A, B) {
	  if (arguments.length < 4) {
	    return error.value;
	  }
	
	  A = (A === undefined) ? 0 : A;
	  B = (B === undefined) ? 1 : B;
	
	  x = utils.parseNumber(x);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  A = utils.parseNumber(A);
	  B = utils.parseNumber(B);
	  if (utils.anyIsError(x, alpha, beta, A, B)) {
	    return error.value;
	  }
	
	  x = (x - A) / (B - A);
	  return (cumulative) ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta);
	};
	
	exports.BETA.INV = function(probability, alpha, beta, A, B) {
	  A = (A === undefined) ? 0 : A;
	  B = (B === undefined) ? 1 : B;
	
	  probability = utils.parseNumber(probability);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  A = utils.parseNumber(A);
	  B = utils.parseNumber(B);
	  if (utils.anyIsError(probability, alpha, beta, A, B)) {
	    return error.value;
	  }
	
	  return jStat.beta.inv(probability, alpha, beta) * (B - A) + A;
	};
	
	exports.BINOM = {};
	
	exports.BINOM.DIST = function(successes, trials, probability, cumulative) {
	  successes = utils.parseNumber(successes);
	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  cumulative = utils.parseNumber(cumulative);
	  if (utils.anyIsError(successes, trials, probability, cumulative)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.binomial.cdf(successes, trials, probability) : jStat.binomial.pdf(successes, trials, probability);
	};
	
	exports.BINOM.DIST.RANGE = function(trials, probability, successes, successes2) {
	  successes2 = (successes2 === undefined) ? successes : successes2;
	
	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  successes = utils.parseNumber(successes);
	  successes2 = utils.parseNumber(successes2);
	  if (utils.anyIsError(trials, probability, successes, successes2)) {
	    return error.value;
	  }
	
	  var result = 0;
	  for (var i = successes; i <= successes2; i++) {
	    result += mathTrig.COMBIN(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i);
	  }
	  return result;
	};
	
	exports.BINOM.INV = function(trials, probability, alpha) {
	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  alpha = utils.parseNumber(alpha);
	  if (utils.anyIsError(trials, probability, alpha)) {
	    return error.value;
	  }
	
	  var x = 0;
	  while (x <= trials) {
	    if (jStat.binomial.cdf(x, trials, probability) >= alpha) {
	      return x;
	    }
	    x++;
	  }
	};
	
	exports.CHISQ = {};
	
	exports.CHISQ.DIST = function(x, k, cumulative) {
	  x = utils.parseNumber(x);
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(x, k)) {
	    return error.value;
	  }
	
	  return (cumulative) ? jStat.chisquare.cdf(x, k) : jStat.chisquare.pdf(x, k);
	};
	
	exports.CHISQ.DIST.RT = function(x, k) {
	  if (!x | !k) {
	    return error.na;
	  }
	
	  if (x < 1 || k > Math.pow(10, 10)) {
	    return error.num;
	  }
	
	  if ((typeof x !== 'number') || (typeof k !== 'number')) {
	    return error.value;
	  }
	
	  return 1 -  jStat.chisquare.cdf(x, k);
	};
	
	exports.CHISQ.INV = function(probability, k) {
	  probability = utils.parseNumber(probability);
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(probability, k)) {
	    return error.value;
	  }
	  return jStat.chisquare.inv(probability, k);
	};
	
	exports.CHISQ.INV.RT = function(p, k) {
	  if (!p | !k) {
	    return error.na;
	  }
	
	  if (p < 0 || p > 1 || k < 1 || k > Math.pow(10, 10)) {
	    return error.num;
	  }
	
	  if ((typeof p !== 'number') || (typeof k !== 'number')) {
	    return error.value;
	  }
	
	  return jStat.chisquare.inv(1.0 - p, k);
	};
	
	exports.CHISQ.TEST = function(observed, expected) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  if ((!(observed instanceof Array)) || (!(expected instanceof Array))) {
	    return error.value;
	  }
	
	  if (observed.length !== expected.length) {
	    return error.value;
	  }
	
	  if (observed[0] && expected[0] &&
	    observed[0].length !== expected[0].length) {
	    return error.value;
	  }
	
	  var row = observed.length;
	  var tmp, i, j;
	
	  // Convert single-dimension array into two-dimension array
	  for (i = 0; i < row; i ++) {
	    if (!(observed[i] instanceof Array)) {
	      tmp = observed[i];
	      observed[i] = [];
	      observed[i].push(tmp);
	    }
	    if (!(expected[i] instanceof Array)) {
	      tmp = expected[i];
	      expected[i] = [];
	      expected[i].push(tmp);
	    }
	  }
	
	  var col = observed[0].length;
	  var dof = (col === 1) ? row-1 : (row-1)*(col-1);
	  var xsqr = 0;
	  var Pi =Math.PI;
	
	  for (i = 0; i < row; i ++) {
	    for (j = 0; j < col; j ++) {
	      xsqr += Math.pow((observed[i][j] - expected[i][j]), 2) / expected[i][j];
	    }
	  }
	
	  // Get independency by X square and its degree of freedom
	  function ChiSq(xsqr, dof) {
	    var p = Math.exp(-0.5 * xsqr);
	    if((dof%2) === 1) {
	      p = p * Math.sqrt(2 * xsqr/Pi);
	    }
	    var k = dof;
	    while(k >= 2) {
	      p = p * xsqr/k;
	      k = k - 2;
	    }
	    var t = p;
	    var a = dof;
	    while (t > 0.0000000001*p) {
	      a = a + 2;
	      t = t * xsqr/a;
	      p = p + t;
	    }
	    return 1-p;
	  }
	
	  return Math.round(ChiSq(xsqr, dof) * 1000000) / 1000000;
	};
	
	exports.COLUMN = function(matrix, index) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  if (index < 0) {
	    return error.num;
	  }
	
	  if (!(matrix instanceof Array) || (typeof index !== 'number')) {
	    return error.value;
	  }
	
	  if (matrix.length === 0) {
	    return undefined;
	  }
	
	  return jStat.col(matrix, index);
	};
	
	exports.COLUMNS = function(matrix) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }
	
	  if (!(matrix instanceof Array)) {
	    return error.value;
	  }
	
	  if (matrix.length === 0) {
	    return 0;
	  }
	
	  return jStat.cols(matrix);
	};
	
	exports.CONFIDENCE = {};
	
	exports.CONFIDENCE.NORM = function(alpha, sd, n) {
	  alpha = utils.parseNumber(alpha);
	  sd = utils.parseNumber(sd);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(alpha, sd, n)) {
	    return error.value;
	  }
	  return jStat.normalci(1, alpha, sd, n)[1] - 1;
	};
	
	exports.CONFIDENCE.T = function(alpha, sd, n) {
	  alpha = utils.parseNumber(alpha);
	  sd = utils.parseNumber(sd);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(alpha, sd, n)) {
	    return error.value;
	  }
	  return jStat.tci(1, alpha, sd, n)[1] - 1;
	};
	
	exports.CORREL = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  return jStat.corrcoeff(array1, array2);
	};
	
	exports.COUNT = function() {
	  return utils.numbers(utils.flatten(arguments)).length;
	};
	
	exports.COUNTA = function() {
	  var range = utils.flatten(arguments);
	  return range.length - exports.COUNTBLANK(range);
	};
	
	exports.COUNTIN = function (range, value) {
	  var result = 0;
	
	  range = utils.flatten(range);
	
	  for (var i = 0; i < range.length; i++) {
	    if (range[i] === value) {
	      result++;
	    }
	  }
	  return result;
	};
	
	
	exports.COUNTBLANK = function() {
	  var range = utils.flatten(arguments);
	  var blanks = 0;
	  var element;
	  for (var i = 0; i < range.length; i++) {
	    element = range[i];
	    if (element === null || element === '') {
	      blanks++;
	    }
	  }
	  return blanks;
	};
	
	exports.COUNTIF = function(range, criteria) {
	  range = utils.flatten(range);
	  if (!/[<>=!]/.test(criteria)) {
	    criteria = '=="' + criteria + '"';
	  }
	  var matches = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (typeof range[i] !== 'string') {
	      if (eval(range[i] + criteria)) { // jshint ignore:line
	        matches++;
	      }
	    } else {
	      if (eval('"' + range[i] + '"' + criteria)) { // jshint ignore:line
	        matches++;
	      }
	    }
	  }
	  return matches;
	};
	
	exports.COUNTIFS = function() {
	  var args = utils.argsToArray(arguments);
	  var results = new Array(utils.flatten(args[0]).length);
	  for (var i = 0; i < results.length; i++) {
	    results[i] = true;
	  }
	  for (i = 0; i < args.length; i += 2) {
	    var range = utils.flatten(args[i]);
	    var criteria = args[i + 1];
	    if (!/[<>=!]/.test(criteria)) {
	      criteria = '=="' + criteria + '"';
	    }
	    for (var j = 0; j < range.length; j++) {
	      if (typeof range[j] !== 'string') {
	        results[j] = results[j] && eval(range[j] + criteria); // jshint ignore:line
	      } else {
	        results[j] = results[j] && eval('"' + range[j] + '"' + criteria); // jshint ignore:line
	      }
	    }
	  }
	  var result = 0;
	  for (i = 0; i < results.length; i++) {
	    if (results[i]) {
	      result++;
	    }
	  }
	  return result;
	};
	
	exports.COUNTUNIQUE = function () {
	  return misc.UNIQUE.apply(null, utils.flatten(arguments)).length;
	};
	
	exports.COVARIANCE = {};
	
	exports.COVARIANCE.P = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  var mean1 = jStat.mean(array1);
	  var mean2 = jStat.mean(array2);
	  var result = 0;
	  var n = array1.length;
	  for (var i = 0; i < n; i++) {
	    result += (array1[i] - mean1) * (array2[i] - mean2);
	  }
	  return result / n;
	};
	
	exports.COVARIANCE.S = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  return jStat.covariance(array1, array2);
	};
	
	exports.DEVSQ = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    result += Math.pow((range[i] - mean), 2);
	  }
	  return result;
	};
	
	exports.EXPON = {};
	
	exports.EXPON.DIST = function(x, lambda, cumulative) {
	  x = utils.parseNumber(x);
	  lambda = utils.parseNumber(lambda);
	  if (utils.anyIsError(x, lambda)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
	};
	
	exports.F = {};
	
	exports.F.DIST = function(x, d1, d2, cumulative) {
	  x = utils.parseNumber(x);
	  d1 = utils.parseNumber(d1);
	  d2 = utils.parseNumber(d2);
	  if (utils.anyIsError(x, d1, d2)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.centralF.cdf(x, d1, d2) : jStat.centralF.pdf(x, d1, d2);
	};
	
	exports.F.DIST.RT = function(x, d1, d2) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }
	
	  if (x < 0 || d1 < 1 || d2 < 1) {
	    return error.num;
	  }
	
	  if ((typeof x !== 'number') || (typeof d1 !== 'number') || (typeof d2 !== 'number')) {
	    return error.value;
	  }
	
	  return 1 - jStat.centralF.cdf(x, d1, d2);
	};
	
	exports.F.INV = function(probability, d1, d2) {
	  probability = utils.parseNumber(probability);
	  d1 = utils.parseNumber(d1);
	  d2 = utils.parseNumber(d2);
	  if (utils.anyIsError(probability, d1, d2)) {
	    return error.value;
	  }
	  if (probability <= 0.0 || probability > 1.0) {
	    return error.num;
	  }
	
	  return jStat.centralF.inv(probability, d1, d2);
	};
	
	exports.F.INV.RT = function(p, d1, d2) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }
	
	  if (p < 0 || p > 1 || d1 < 1 || d1 > Math.pow(10, 10) || d2 < 1 || d2 > Math.pow(10, 10)) {
	    return error.num;
	  }
	
	  if ((typeof p !== 'number') || (typeof d1 !== 'number') || (typeof d2 !== 'number')) {
	    return error.value;
	  }
	
	  return jStat.centralF.inv(1.0 - p, d1, d2);
	};
	
	exports.F.TEST = function(array1, array2) {
	  if (!array1 || !array2) {
	    return error.na;
	  }
	
	  if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
	    return error.na;
	  }
	
	  if (array1.length < 2 || array2.length < 2) {
	    return error.div0;
	  }
	
	  var sumOfSquares = function(values, x1) {
	    var sum = 0;
	    for (var i = 0; i < values.length; i++) {
	      sum +=Math.pow((values[i] - x1), 2);
	    }
	    return sum;
	  };
	
	  var x1 = mathTrig.SUM(array1) / array1.length;
	  var x2 = mathTrig.SUM(array2) / array2.length;
	  var sum1 = sumOfSquares(array1, x1) / (array1.length - 1);
	  var sum2 = sumOfSquares(array2, x2) / (array2.length - 1);
	
	  return sum1 / sum2;
	};
	
	exports.FISHER = function(x) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }
	  return Math.log((1 + x) / (1 - x)) / 2;
	};
	
	exports.FISHERINV = function(y) {
	  y = utils.parseNumber(y);
	  if (y instanceof Error) {
	    return y;
	  }
	  var e2y = Math.exp(2 * y);
	  return (e2y - 1) / (e2y + 1);
	};
	
	exports.FORECAST = function(x, data_y, data_x) {
	  x = utils.parseNumber(x);
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(x, data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  var b = num / den;
	  var a = ymean - b * xmean;
	  return a + b * x;
	};
	
	exports.FREQUENCY = function(data, bins) {
	  data = utils.parseNumberArray(utils.flatten(data));
	  bins = utils.parseNumberArray(utils.flatten(bins));
	  if (utils.anyIsError(data, bins)) {
	    return error.value;
	  }
	  var n = data.length;
	  var b = bins.length;
	  var r = [];
	  for (var i = 0; i <= b; i++) {
	    r[i] = 0;
	    for (var j = 0; j < n; j++) {
	      if (i === 0) {
	        if (data[j] <= bins[0]) {
	          r[0] += 1;
	        }
	      } else if (i < b) {
	        if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
	          r[i] += 1;
	        }
	      } else if (i === b) {
	        if (data[j] > bins[b - 1]) {
	          r[b] += 1;
	        }
	      }
	    }
	  }
	  return r;
	};
	
	
	exports.GAMMA = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	
	  if (number === 0) {
	    return error.num;
	  }
	
	  if (parseInt(number, 10) === number && number < 0) {
	    return error.num;
	  }
	
	  return jStat.gammafn(number);
	};
	
	exports.GAMMA.DIST = function(value, alpha, beta, cumulative) {
	  if (arguments.length !== 4) {
	    return error.na;
	  }
	
	  if (value < 0 || alpha <= 0 || beta <= 0) {
	    return error.value;
	  }
	
	  if ((typeof value !== 'number') || (typeof alpha !== 'number') || (typeof beta !== 'number')) {
	    return error.value;
	  }
	
	  return cumulative ? jStat.gamma.cdf(value, alpha, beta, true) : jStat.gamma.pdf(value, alpha, beta, false);
	};
	
	exports.GAMMA.INV = function(probability, alpha, beta) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }
	
	  if (probability < 0 || probability > 1 || alpha <= 0 || beta <= 0) {
	    return error.num;
	  }
	
	  if ((typeof probability !== 'number') || (typeof alpha !== 'number') || (typeof beta !== 'number')) {
	    return error.value;
	  }
	
	  return jStat.gamma.inv(probability, alpha, beta);
	};
	
	exports.GAMMALN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return jStat.gammaln(number);
	};
	
	exports.GAMMALN.PRECISE = function(x) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }
	
	  if (x <= 0) {
	    return error.num;
	  }
	
	  if (typeof x !== 'number') {
	    return error.value;
	  }
	
	  return jStat.gammaln(x);
	};
	
	exports.GAUSS = function(z) {
	  z = utils.parseNumber(z);
	  if (z instanceof Error) {
	    return z;
	  }
	  return jStat.normal.cdf(z, 0, 1) - 0.5;
	};
	
	exports.GEOMEAN = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  return jStat.geomean(args);
	};
	
	exports.GROWTH = function(known_y, known_x, new_x, use_const) {
	  // Credits: Ilmari Karonen (http://stackoverflow.com/questions/14161990/how-to-implement-growth-function-in-javascript)
	
	  known_y = utils.parseNumberArray(known_y);
	  if (known_y instanceof Error) {
	    return known_y;
	  }
	
	  // Default values for optional parameters:
	  var i;
	  if (known_x === undefined) {
	    known_x = [];
	    for (i = 1; i <= known_y.length; i++) {
	      known_x.push(i);
	    }
	  }
	  if (new_x === undefined) {
	    new_x = [];
	    for (i = 1; i <= known_y.length; i++) {
	      new_x.push(i);
	    }
	  }
	
	  known_x = utils.parseNumberArray(known_x);
	  new_x = utils.parseNumberArray(new_x);
	  if (utils.anyIsError(known_x, new_x)) {
	    return error.value;
	  }
	
	
	  if (use_const === undefined) {
	    use_const = true;
	  }
	
	  // Calculate sums over the data:
	  var n = known_y.length;
	  var avg_x = 0;
	  var avg_y = 0;
	  var avg_xy = 0;
	  var avg_xx = 0;
	  for (i = 0; i < n; i++) {
	    var x = known_x[i];
	    var y = Math.log(known_y[i]);
	    avg_x += x;
	    avg_y += y;
	    avg_xy += x * y;
	    avg_xx += x * x;
	  }
	  avg_x /= n;
	  avg_y /= n;
	  avg_xy /= n;
	  avg_xx /= n;
	
	  // Compute linear regression coefficients:
	  var beta;
	  var alpha;
	  if (use_const) {
	    beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
	    alpha = avg_y - beta * avg_x;
	  } else {
	    beta = avg_xy / avg_xx;
	    alpha = 0;
	  }
	
	  // Compute and return result array:
	  var new_y = [];
	  for (i = 0; i < new_x.length; i++) {
	    new_y.push(Math.exp(alpha + beta * new_x[i]));
	  }
	  return new_y;
	};
	
	exports.HARMEAN = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    den += 1 / range[i];
	  }
	  return n / den;
	};
	
	exports.HYPGEOM = {};
	
	exports.HYPGEOM.DIST = function(x, n, M, N, cumulative) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  M = utils.parseNumber(M);
	  N = utils.parseNumber(N);
	  if (utils.anyIsError(x, n, M, N)) {
	    return error.value;
	  }
	
	  function pdf(x, n, M, N) {
	    return mathTrig.COMBIN(M, x) * mathTrig.COMBIN(N - M, n - x) / mathTrig.COMBIN(N, n);
	  }
	
	  function cdf(x, n, M, N) {
	    var result = 0;
	    for (var i = 0; i <= x; i++) {
	      result += pdf(i, n, M, N);
	    }
	    return result;
	  }
	
	  return (cumulative) ? cdf(x, n, M, N) : pdf(x, n, M, N);
	};
	
	exports.INTERCEPT = function(known_y, known_x) {
	  known_y = utils.parseNumberArray(known_y);
	  known_x = utils.parseNumberArray(known_x);
	  if (utils.anyIsError(known_y, known_x)) {
	    return error.value;
	  }
	  if (known_y.length !== known_x.length) {
	    return error.na;
	  }
	  return exports.FORECAST(0, known_y, known_x);
	};
	
	exports.KURT = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var sigma = 0;
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 4);
	  }
	  sigma = sigma / Math.pow(jStat.stdev(range, true), 4);
	  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
	};
	
	exports.LARGE = function(range, k) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(range, k)) {
	    return range;
	  }
	  return range.sort(function(a, b) {
	    return b - a;
	  })[k - 1];
	};
	
	exports.LINEST = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var ymean = jStat.mean(data_y);
	  var xmean = jStat.mean(data_x);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  var m = num / den;
	  var b = ymean - m * xmean;
	  return [m, b];
	};
	
	// According to Microsoft:
	// http://office.microsoft.com/en-us/starter-help/logest-function-HP010342665.aspx
	// LOGEST returns are based on the following linear model:
	// ln y = x1 ln m1 + ... + xn ln mn + ln b
	exports.LOGEST = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  for (var i = 0; i < data_y.length; i ++) {
	    data_y[i] = Math.log(data_y[i]);
	  }
	
	  var result = exports.LINEST(data_y, data_x);
	  result[0] = Math.round(Math.exp(result[0])*1000000)/1000000;
	  result[1] = Math.round(Math.exp(result[1])*1000000)/1000000;
	  return result;
	};
	
	exports.LOGNORM = {};
	
	exports.LOGNORM.DIST = function(x, mean, sd, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.lognormal.cdf(x, mean, sd) : jStat.lognormal.pdf(x, mean, sd);
	};
	
	exports.LOGNORM.INV = function(probability, mean, sd) {
	  probability = utils.parseNumber(probability);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(probability, mean, sd)) {
	    return error.value;
	  }
	  return jStat.lognormal.inv(probability, mean, sd);
	};
	
	exports.MAX = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
	};
	
	exports.MAXA = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
	};
	
	exports.MEDIAN = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  var result = jStat.median(range);
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.MIN = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
	};
	
	exports.MINA = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
	};
	
	exports.MODE = {};
	
	exports.MODE.MULT = function() {
	  // Credits: Roönaän
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var count = {};
	  var maxItems = [];
	  var max = 0;
	  var currentItem;
	
	  for (var i = 0; i < n; i++) {
	    currentItem = range[i];
	    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
	    if (count[currentItem] > max) {
	      max = count[currentItem];
	      maxItems = [];
	    }
	    if (count[currentItem] === max) {
	      maxItems[maxItems.length] = currentItem;
	    }
	  }
	  return maxItems;
	};
	
	exports.MODE.SNGL = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  return exports.MODE.MULT(range).sort(function(a, b) {
	    return a - b;
	  })[0];
	};
	
	exports.NEGBINOM = {};
	
	exports.NEGBINOM.DIST = function(k, r, p, cumulative) {
	  k = utils.parseNumber(k);
	  r = utils.parseNumber(r);
	  p = utils.parseNumber(p);
	  if (utils.anyIsError(k, r, p)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.negbin.cdf(k, r, p) : jStat.negbin.pdf(k, r, p);
	};
	
	exports.NORM = {};
	
	exports.NORM.DIST = function(x, mean, sd, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  if (sd <= 0) {
	    return error.num;
	  }
	
	  // Return normal distribution computed by jStat [http://jstat.org]
	  return (cumulative) ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd);
	};
	
	exports.NORM.INV = function(probability, mean, sd) {
	  probability = utils.parseNumber(probability);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(probability, mean, sd)) {
	    return error.value;
	  }
	  return jStat.normal.inv(probability, mean, sd);
	};
	
	exports.NORM.S = {};
	
	exports.NORM.S.DIST = function(z, cumulative) {
	  z = utils.parseNumber(z);
	  if (z instanceof Error) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
	};
	
	exports.NORM.S.INV = function(probability) {
	  probability = utils.parseNumber(probability);
	  if (probability instanceof Error) {
	    return error.value;
	  }
	  return jStat.normal.inv(probability, 0, 1);
	};
	
	exports.PEARSON = function(data_x, data_y) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den1 = 0;
	  var den2 = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den1 += Math.pow(data_x[i] - xmean, 2);
	    den2 += Math.pow(data_y[i] - ymean, 2);
	  }
	  return num / Math.sqrt(den1 * den2);
	};
	
	exports.PERCENTILE = {};
	
	exports.PERCENTILE.EXC = function(array, k) {
	  array = utils.parseNumberArray(utils.flatten(array));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(array, k)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    {
	      return a - b;
	    }
	  });
	  var n = array.length;
	  if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
	    return error.num;
	  }
	  var l = k * (n + 1) - 1;
	  var fl = Math.floor(l);
	  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
	};
	
	exports.PERCENTILE.INC = function(array, k) {
	  array = utils.parseNumberArray(utils.flatten(array));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(array, k)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var n = array.length;
	  var l = k * (n - 1);
	  var fl = Math.floor(l);
	  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
	};
	
	exports.PERCENTRANK = {};
	
	exports.PERCENTRANK.EXC = function(array, x, significance) {
	  significance = (significance === undefined) ? 3 : significance;
	  array = utils.parseNumberArray(utils.flatten(array));
	  x = utils.parseNumber(x);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(array, x, significance)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var uniques = misc.UNIQUE.apply(null, array);
	  var n = array.length;
	  var m = uniques.length;
	  var power = Math.pow(10, significance);
	  var result = 0;
	  var match = false;
	  var i = 0;
	  while (!match && i < m) {
	    if (x === uniques[i]) {
	      result = (array.indexOf(uniques[i]) + 1) / (n + 1);
	      match = true;
	    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
	      result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
	      match = true;
	    }
	    i++;
	  }
	  return Math.floor(result * power) / power;
	};
	
	exports.PERCENTRANK.INC = function(array, x, significance) {
	  significance = (significance === undefined) ? 3 : significance;
	  array = utils.parseNumberArray(utils.flatten(array));
	  x = utils.parseNumber(x);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(array, x, significance)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var uniques = misc.UNIQUE.apply(null, array);
	  var n = array.length;
	  var m = uniques.length;
	  var power = Math.pow(10, significance);
	  var result = 0;
	  var match = false;
	  var i = 0;
	  while (!match && i < m) {
	    if (x === uniques[i]) {
	      result = array.indexOf(uniques[i]) / (n - 1);
	      match = true;
	    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
	      result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
	      match = true;
	    }
	    i++;
	  }
	  return Math.floor(result * power) / power;
	};
	
	exports.PERMUT = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return mathTrig.FACT(number) / mathTrig.FACT(number - number_chosen);
	};
	
	exports.PERMUTATIONA = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return Math.pow(number, number_chosen);
	};
	
	exports.PHI = function(x) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return error.value;
	  }
	  return Math.exp(-0.5 * x * x) / SQRT2PI;
	};
	
	exports.POISSON = {};
	
	exports.POISSON.DIST = function(x, mean, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  if (utils.anyIsError(x, mean)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
	};
	
	exports.PROB = function(range, probability, lower, upper) {
	  if (lower === undefined) {
	    return 0;
	  }
	  upper = (upper === undefined) ? lower : upper;
	
	  range = utils.parseNumberArray(utils.flatten(range));
	  probability = utils.parseNumberArray(utils.flatten(probability));
	  lower = utils.parseNumber(lower);
	  upper = utils.parseNumber(upper);
	  if (utils.anyIsError(range, probability, lower, upper)) {
	    return error.value;
	  }
	
	  if (lower === upper) {
	    return (range.indexOf(lower) >= 0) ? probability[range.indexOf(lower)] : 0;
	  }
	
	  var sorted = range.sort(function(a, b) {
	    return a - b;
	  });
	  var n = sorted.length;
	  var result = 0;
	  for (var i = 0; i < n; i++) {
	    if (sorted[i] >= lower && sorted[i] <= upper) {
	      result += probability[range.indexOf(sorted[i])];
	    }
	  }
	  return result;
	};
	
	exports.QUARTILE = {};
	
	exports.QUARTILE.EXC = function(range, quart) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  quart = utils.parseNumber(quart);
	  if (utils.anyIsError(range, quart)) {
	    return error.value;
	  }
	  switch (quart) {
	    case 1:
	      return exports.PERCENTILE.EXC(range, 0.25);
	    case 2:
	      return exports.PERCENTILE.EXC(range, 0.5);
	    case 3:
	      return exports.PERCENTILE.EXC(range, 0.75);
	    default:
	      return error.num;
	  }
	};
	
	exports.QUARTILE.INC = function(range, quart) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  quart = utils.parseNumber(quart);
	  if (utils.anyIsError(range, quart)) {
	    return error.value;
	  }
	  switch (quart) {
	    case 1:
	      return exports.PERCENTILE.INC(range, 0.25);
	    case 2:
	      return exports.PERCENTILE.INC(range, 0.5);
	    case 3:
	      return exports.PERCENTILE.INC(range, 0.75);
	    default:
	      return error.num;
	  }
	};
	
	exports.RANK = {};
	
	exports.RANK.AVG = function(number, range, order) {
	  number = utils.parseNumber(number);
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (utils.anyIsError(number, range)) {
	    return error.value;
	  }
	  range = utils.flatten(range);
	  order = order || false;
	  var sort = (order) ? function(a, b) {
	    return a - b;
	  } : function(a, b) {
	    return b - a;
	  };
	  range = range.sort(sort);
	
	  var length = range.length;
	  var count = 0;
	  for (var i = 0; i < length; i++) {
	    if (range[i] === number) {
	      count++;
	    }
	  }
	
	  return (count > 1) ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1;
	};
	
	exports.RANK.EQ = function(number, range, order) {
	  number = utils.parseNumber(number);
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (utils.anyIsError(number, range)) {
	    return error.value;
	  }
	  order = order || false;
	  var sort = (order) ? function(a, b) {
	    return a - b;
	  } : function(a, b) {
	    return b - a;
	  };
	  range = range.sort(sort);
	  return range.indexOf(number) + 1;
	};
	
	exports.ROW = function(matrix, index) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  if (index < 0) {
	    return error.num;
	  }
	
	  if (!(matrix instanceof Array) || (typeof index !== 'number')) {
	    return error.value;
	  }
	
	  if (matrix.length === 0) {
	    return undefined;
	  }
	
	  return jStat.row(matrix, index);
	};
	
	exports.ROWS = function(matrix) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }
	
	  if (!(matrix instanceof Array)) {
	    return error.value;
	  }
	
	  if (matrix.length === 0) {
	    return 0;
	  }
	
	  return jStat.rows(matrix);
	};
	
	exports.RSQ = function(data_x, data_y) { // no need to flatten here, PEARSON will take care of that
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  if (utils.anyIsError(data_x, data_y)) {
	    return error.value;
	  }
	  return Math.pow(exports.PEARSON(data_x, data_y), 2);
	};
	
	exports.SKEW = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var sigma = 0;
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 3);
	  }
	  return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(range, true), 3));
	};
	
	exports.SKEW.P = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var m2 = 0;
	  var m3 = 0;
	  for (var i = 0; i < n; i++) {
	    m3 += Math.pow(range[i] - mean, 3);
	    m2 += Math.pow(range[i] - mean, 2);
	  }
	  m3 = m3 / n;
	  m2 = m2 / n;
	  return m3 / Math.pow(m2, 3 / 2);
	};
	
	exports.SLOPE = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  return num / den;
	};
	
	exports.SMALL = function(range, k) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(range, k)) {
	    return range;
	  }
	  return range.sort(function(a, b) {
	    return a - b;
	  })[k - 1];
	};
	
	exports.STANDARDIZE = function(x, mean, sd) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  return (x - mean) / sd;
	};
	
	exports.STDEV = {};
	
	exports.STDEV.P = function() {
	  var v = exports.VAR.P.apply(this, arguments);
	  var result = Math.sqrt(v);
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.STDEV.S = function() {
	  var v = exports.VAR.S.apply(this, arguments);
	  var result = Math.sqrt(v);
	
	  return result;
	};
	
	exports.STDEVA = function() {
	  var v = exports.VARA.apply(this, arguments);
	  var result = Math.sqrt(v);
	
	  return result;
	};
	
	exports.STDEVPA = function() {
	  var v = exports.VARPA.apply(this, arguments);
	  var result = Math.sqrt(v);
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	
	exports.STEYX = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var lft = 0;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    lft += Math.pow(data_y[i] - ymean, 2);
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  return Math.sqrt((lft - num * num / den) / (n - 2));
	};
	
	exports.TRANSPOSE = function(matrix) {
	  if (!matrix) {
	    return error.na;
	  }
	  return jStat.transpose(matrix);
	};
	
	exports.T = text.T;
	
	exports.T.DIST = function(x, df, cumulative) {
	  x = utils.parseNumber(x);
	  df = utils.parseNumber(df);
	  if (utils.anyIsError(x, df)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.studentt.cdf(x, df) : jStat.studentt.pdf(x, df);
	};
	
	exports.T.DIST['2T'] = function(x, df) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  if (x < 0 || df < 1) {
	    return error.num;
	  }
	
	  if ((typeof x !== 'number') || (typeof df !== 'number')) {
	    return error.value;
	  }
	
	  return (1 - jStat.studentt.cdf(x , df)) * 2;
	};
	
	exports.T.DIST.RT = function(x, df) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	
	  if (x < 0 || df < 1) {
	    return error.num;
	  }
	
	  if ((typeof x !== 'number') || (typeof df !== 'number')) {
	    return error.value;
	  }
	
	  return 1 - jStat.studentt.cdf(x , df);
	};
	
	exports.T.INV = function(probability, df) {
	  probability = utils.parseNumber(probability);
	  df = utils.parseNumber(df);
	  if (utils.anyIsError(probability, df)) {
	    return error.value;
	  }
	  return jStat.studentt.inv(probability, df);
	};
	
	exports.T.INV['2T'] = function(probability, df) {
	  probability = utils.parseNumber(probability);
	  df = utils.parseNumber(df);
	  if (probability <= 0 || probability > 1 || df < 1) {
	    return error.num;
	  }
	  if (utils.anyIsError(probability, df)) {
	    return error.value;
	  }
	  return Math.abs(jStat.studentt.inv(probability/2, df));
	};
	
	// The algorithm can be found here:
	// http://www.chem.uoa.gr/applets/AppletTtest/Appl_Ttest2.html
	exports.T.TEST = function(data_x, data_y) {
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  if (utils.anyIsError(data_x, data_y)) {
	    return error.value;
	  }
	
	  var mean_x = jStat.mean(data_x);
	  var mean_y = jStat.mean(data_y);
	  var s_x = 0;
	  var s_y = 0;
	  var i;
	
	  for (i = 0; i < data_x.length; i++) {
	    s_x += Math.pow(data_x[i] - mean_x, 2);
	  }
	  for (i = 0; i < data_y.length; i++) {
	    s_y += Math.pow(data_y[i] - mean_y, 2);
	  }
	
	  s_x = s_x / (data_x.length-1);
	  s_y = s_y / (data_y.length-1);
	
	  var t = Math.abs(mean_x - mean_y) / Math.sqrt(s_x/data_x.length + s_y/data_y.length);
	
	  return exports.T.DIST['2T'](t, data_x.length+data_y.length-2);
	};
	
	exports.TREND = function(data_y, data_x, new_data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  new_data_x = utils.parseNumberArray(utils.flatten(new_data_x));
	  if (utils.anyIsError(data_y, data_x, new_data_x)) {
	    return error.value;
	  }
	  var linest = exports.LINEST(data_y, data_x);
	  var m = linest[0];
	  var b = linest[1];
	  var result = [];
	
	  new_data_x.forEach(function(x) {
	    result.push(m * x + b);
	  });
	
	  return result;
	};
	
	exports.TRIMMEAN = function(range, percent) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  percent = utils.parseNumber(percent);
	  if (utils.anyIsError(range, percent)) {
	    return error.value;
	  }
	  var trim = mathTrig.FLOOR(range.length * percent, 2) / 2;
	  return jStat.mean(utils.initial(utils.rest(range.sort(function(a, b) {
	    return a - b;
	  }), trim), trim));
	};
	
	exports.VAR = {};
	
	exports.VAR.P = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  var result;
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  result = sigma / n;
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.VAR.S = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / (n - 1);
	};
	
	exports.VARA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sigma = 0;
	  var count = 0;
	  var mean = exports.AVERAGEA(range);
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sigma += Math.pow(el - mean, 2);
	    } else if (el === true) {
	      sigma += Math.pow(1 - mean, 2);
	    } else {
	      sigma += Math.pow(0 - mean, 2);
	    }
	
	    if (el !== null) {
	      count++;
	    }
	  }
	  return sigma / (count - 1);
	};
	
	exports.VARPA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sigma = 0;
	  var count = 0;
	  var mean = exports.AVERAGEA(range);
	  var result;
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sigma += Math.pow(el - mean, 2);
	    } else if (el === true) {
	      sigma += Math.pow(1 - mean, 2);
	    } else {
	      sigma += Math.pow(0 - mean, 2);
	    }
	
	    if (el !== null) {
	      count++;
	    }
	  }
	  result = sigma / count;
	
	  if (isNaN(result)) {
	    result = error.num;
	  }
	
	  return result;
	};
	
	exports.WEIBULL = {};
	
	exports.WEIBULL.DIST = function(x, alpha, beta, cumulative) {
	  x = utils.parseNumber(x);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  if (utils.anyIsError(x, alpha, beta)) {
	    return error.value;
	  }
	  return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
	};
	
	exports.Z = {};
	
	exports.Z.TEST = function(range, x, sd) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  x = utils.parseNumber(x);
	  if (utils.anyIsError(range, x)) {
	    return error.value;
	  }
	
	  sd = sd || exports.STDEV.S(range);
	  var n = range.length;
	  return 1 - exports.NORM.S.DIST((exports.AVERAGE(range) - x) / (sd / Math.sqrt(n)), true);
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(16);
	var error = __webpack_require__(17);
	var numbro = __webpack_require__(20);
	
	//TODO
	exports.ASC = function() {
	  throw new Error('ASC is not implemented');
	};
	
	//TODO
	exports.BAHTTEXT = function() {
	  throw new Error('BAHTTEXT is not implemented');
	};
	
	exports.CHAR = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return String.fromCharCode(number);
	};
	
	exports.CLEAN = function(text) {
	  text = text || '';
	  var re = /[\0-\x1F]/g;
	  return text.replace(re, "");
	};
	
	exports.CODE = function(text) {
	  text = text || '';
	  var result = text.charCodeAt(0);
	
	  if (isNaN(result)) {
	    result = error.na;
	  }
	  return result;
	};
	
	exports.CONCATENATE = function() {
	  var args = utils.flatten(arguments);
	
	  var trueFound = 0;
	  while ((trueFound = args.indexOf(true)) > -1) {
	    args[trueFound] = 'TRUE';
	  }
	
	  var falseFound = 0;
	  while ((falseFound = args.indexOf(false)) > -1) {
	    args[falseFound] = 'FALSE';
	  }
	
	  return args.join('');
	};
	
	//TODO
	exports.DBCS = function() {
	  throw new Error('DBCS is not implemented');
	};
	
	exports.DOLLAR = function(number, decimals) {
	  decimals = (decimals === undefined) ? 2 : decimals;
	
	  number = utils.parseNumber(number);
	  decimals = utils.parseNumber(decimals);
	  if (utils.anyIsError(number, decimals)) {
	    return error.value;
	  }
	  var format = '';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	    format = '($0,0)';
	  } else if (decimals > 0) {
	    format = '($0,0.' + new Array(decimals + 1).join('0') + ')';
	  }
	  return numbro(number).format(format);
	};
	
	exports.EXACT = function(text1, text2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }
	  return text1 === text2;
	};
	
	exports.FIND = function(find_text, within_text, position) {
	  if (arguments.length < 2) {
	    return error.na;
	  }
	  position = (position === undefined) ? 0 : position;
	  return within_text ? within_text.indexOf(find_text, position - 1) + 1 : null;
	};
	
	exports.FIXED = function(number, decimals, no_commas) {
	  decimals = (decimals === undefined) ? 2 : decimals;
	  no_commas = (no_commas === undefined) ? false : no_commas;
	
	  number = utils.parseNumber(number);
	  decimals = utils.parseNumber(decimals);
	  if (utils.anyIsError(number, decimals)) {
	    return error.value;
	  }
	
	  var format = no_commas ? '0' : '0,0';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	  } else if (decimals > 0) {
	    format += '.' + new Array(decimals + 1).join('0');
	  }
	  return numbro(number).format(format);
	};
	
	exports.HTML2TEXT = function (value) {
	  var result = '';
	
	  if (value) {
	    if (value instanceof Array) {
	      value.forEach(function (line) {
	        if (result !== '') {
	          result += '\n';
	        }
	        result += (line.replace(/<(?:.|\n)*?>/gm, ''));
	      });
	    } else {
	      result = value.replace(/<(?:.|\n)*?>/gm, '');
	    }
	  }
	
	  return result;
	};
	
	exports.LEFT = function(text, number) {
	  number = (number === undefined) ? 1 : number;
	  number = utils.parseNumber(number);
	  if (number instanceof Error || typeof text !== 'string') {
	    return error.value;
	  }
	  return text ? text.substring(0, number) : null;
	};
	
	exports.LEN = function(text) {
	  console.log('==== LEN text', text, typeof text);
	  if (arguments.length === 0) {
	    return error.error;
	  }
	
	  if (typeof text === 'string') {
	    return text ? text.length : 0;
	  }
	
	  if (text.length) {
	    return text.length;
	  }
	
	  return error.value;
	};
	
	exports.LOWER = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text ? text.toLowerCase() : text;
	};
	
	exports.MID = function(text, start, number) {
	  start = utils.parseNumber(start);
	  number = utils.parseNumber(number);
	  if (utils.anyIsError(start, number) || typeof text !== 'string') {
	    return number;
	  }
	
	  var begin = start - 1;
	  var end = begin + number;
	
	  return text.substring(begin, end);
	};
	
	// TODO
	exports.NUMBERVALUE = function (text, decimal_separator, group_separator)  {
	  decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;
	  group_separator = (typeof group_separator === 'undefined') ? ',' : group_separator;
	  return Number(text.replace(decimal_separator, '.').replace(group_separator, ''));
	};
	
	// TODO
	exports.PRONETIC = function() {
	  throw new Error('PRONETIC is not implemented');
	};
	
	exports.PROPER = function(text) {
	  if (text === undefined || text.length === 0) {
	    return error.value;
	  }
	  if (text === true) {
	    text = 'TRUE';
	  }
	  if (text === false) {
	    text = 'FALSE';
	  }
	  if (isNaN(text) && typeof text === 'number') {
	    return error.value;
	  }
	  if (typeof text === 'number') {
	    text = '' + text;
	  }
	
	  return text.replace(/\w\S*/g, function(txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	};
	
	exports.REGEXEXTRACT = function (text, regular_expression) {
	  if (arguments.length < 2) {
	    return error.na;
	  }
	  var match = text.match(new RegExp(regular_expression));
	  return match ? (match[match.length > 1 ? match.length - 1 : 0]) : null;
	};
	
	exports.REGEXMATCH = function (text, regular_expression, full) {
	  if (arguments.length < 2) {
	    return error.na;
	  }
	  var match = text.match(new RegExp(regular_expression));
	  return full ? match : !!match;
	};
	
	exports.REGEXREPLACE = function (text, regular_expression, replacement) {
	  if (arguments.length < 3) {
	    return error.na;
	  }
	  return text.replace(new RegExp(regular_expression), replacement);
	};
	
	exports.REPLACE = function(text, position, length, new_text) {
	  position = utils.parseNumber(position);
	  length = utils.parseNumber(length);
	  if (utils.anyIsError(position, length) ||
	    typeof text !== 'string' ||
	    typeof new_text !== 'string') {
	    return error.value;
	  }
	  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
	};
	
	exports.REPT = function(text, number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return new Array(number + 1).join(text);
	};
	
	exports.RIGHT = function(text, number) {
	  number = (number === undefined) ? 1 : number;
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return text ? text.substring(text.length - number) : error.na;
	};
	
	exports.SEARCH = function(find_text, within_text, position) {
	  var foundAt;
	  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
	    return error.value;
	  }
	  position = (position === undefined) ? 0 : position;
	  foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1)+1;
	  return (foundAt === 0)?error.value:foundAt;
	};
	
	exports.SPLIT = function (text, separator) {
	  return text.split(separator);
	};
	
	exports.SUBSTITUTE = function(text, old_text, new_text, occurrence) {
	  if (arguments.length < 2) {
	    return error.na;
	  }
	  if (!text || !old_text || !new_text) {
	    return text;
	  } else if (occurrence === undefined) {
	    return text.replace(new RegExp(old_text, 'g'), new_text);
	  } else {
	    var index = 0;
	    var i = 0;
	    while (text.indexOf(old_text, index) > 0) {
	      index = text.indexOf(old_text, index + 1);
	      i++;
	      if (i === occurrence) {
	        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
	      }
	    }
	  }
	};
	
	exports.T = function(value) {
	  return (typeof value === "string") ? value : '';
	};
	
	// TODO incomplete implementation
	exports.TEXT = function(value, format) {
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(value)) {
	    return error.na;
	  }
	
	  return numbro(value).format(format);
	};
	
	exports.TRIM = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text.replace(/ +/g, ' ').trim();
	};
	
	exports.UNICHAR = exports.CHAR;
	
	exports.UNICODE = exports.CODE;
	
	exports.UPPER = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text.toUpperCase();
	};
	
	exports.VALUE = function(text) {
	  // if (typeof text !== 'string') {
	  //   return error.value;
	  // }
	  var result = numbro().unformat(text);
	
	  return result === void 0 ? 0 : result;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * numbro.js
	 * version : 1.9.3
	 * author : Företagsplatsen AB
	 * license : MIT
	 * http://www.foretagsplatsen.se
	 */
	
	(function () {
	    'use strict';
	
	    /************************************
	        Constants
	    ************************************/
	
	    var numbro,
	        VERSION = '1.9.3',
	        binarySuffixes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
	        decimalSuffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	        bytes = {
	            general: { scale: 1024, suffixes: decimalSuffixes, marker: 'bd' },
	            binary:  { scale: 1024, suffixes: binarySuffixes, marker: 'b' },
	            decimal: { scale: 1000, suffixes: decimalSuffixes, marker: 'd' }
	        },
	        // general must be before the others because it reuses their characters!
	        byteFormatOrder = [ bytes.general, bytes.binary, bytes.decimal ],
	    // internal storage for culture config files
	        cultures = {},
	    // Todo: Remove in 2.0.0
	        languages = cultures,
	        currentCulture = 'en-US',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	        defaultCurrencyFormat = '0$',
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined' && module.exports),
	    // default culture
	        enUS = {
	            delimiters: {
	                thousands: ',',
	                decimal: '.'
	            },
	            abbreviations: {
	                thousand: 'k',
	                million: 'm',
	                billion: 'b',
	                trillion: 't'
	            },
	            ordinal: function(number) {
	                var b = number % 10;
	                return (~~(number % 100 / 10) === 1) ? 'th' :
	                    (b === 1) ? 'st' :
	                        (b === 2) ? 'nd' :
	                            (b === 3) ? 'rd' : 'th';
	            },
	            currency: {
	                symbol: '$',
	                position: 'prefix'
	            },
	            defaults: {
	                currencyFormat: ',0000 a'
	            },
	            formats: {
	                fourDigits: '0000 a',
	                fullWithTwoDecimals: '$ ,0.00',
	                fullWithTwoDecimalsNoCurrency: ',0.00'
	            }
	        };
	
	    /************************************
	        Constructors
	    ************************************/
	
	
	    // Numbro prototype object
	    function Numbro(number) {
	        this._value = number;
	    }
	
	    function zeroes(count) {
	        var i, ret = '';
	
	        for (i = 0; i < count; i++) {
	            ret += '0';
	        }
	
	        return ret;
	    }
	    /**
	     * Implementation of toFixed() for numbers with exponents
	     * This function may return negative representations for zero values e.g. "-0.0"
	     */
	    function toFixedLargeSmall(value, precision) {
	        var mantissa,
	            beforeDec,
	            afterDec,
	            exponent,
	            prefix,
	            endStr,
	            zerosStr,
	            str;
	
	        str = value.toString();
	
	        mantissa = str.split('e')[0];
	        exponent = str.split('e')[1];
	
	        beforeDec = mantissa.split('.')[0];
	        afterDec = mantissa.split('.')[1] || '';
	
	        if (+exponent > 0) {
	            // exponent is positive - add zeros after the numbers
	            str = beforeDec + afterDec + zeroes(exponent - afterDec.length);
	        } else {
	            // exponent is negative
	
	            if (+beforeDec < 0) {
	                prefix = '-0';
	            } else {
	                prefix = '0';
	            }
	
	            // tack on the decimal point if needed
	            if (precision > 0) {
	                prefix += '.';
	            }
	
	            zerosStr = zeroes((-1 * exponent) - 1);
	            // substring off the end to satisfy the precision
	            endStr = (zerosStr + Math.abs(beforeDec) + afterDec).substr(0, precision);
	            str = prefix + endStr;
	        }
	
	        // only add percision 0's if the exponent is positive
	        if (+exponent > 0 && precision > 0) {
	            str += '.' + zeroes(precision);
	        }
	
	        return str;
	    }
	
	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     *
	     * Also removes negative signs for zero-formatted numbers. e.g. -0.01 w/ precision 1 -> 0.0
	     */
	    function toFixed(value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	
	        if (value.toString().indexOf('e') > -1) {
	            // toFixed returns scientific notation for numbers above 1e21 and below 1e-7
	            output = toFixedLargeSmall(value, precision);
	            // remove the leading negative sign if it exists and should not be present (e.g. -0.00)
	            if (output.charAt(0) === '-' && +output >= 0) {
	                output = output.substr(1); // chop off the '-'
	            }
	        }
	        else {
	            // Multiply up by precision, round accurately, then divide and use native toFixed():
	            output = (roundingFunction(value + 'e+' + precision) / power).toFixed(precision);
	        }
	
	        if (optionals) {
	            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
	            output = output.replace(optionalsRegExp, '');
	        }
	
	        return output;
	    }
	
	    /************************************
	        Formatting
	    ************************************/
	
	    // determine what type of formatting we need to do
	    function formatNumbro(n, format, roundingFunction) {
	        var output,
	            escapedFormat = format.replace(/\{[^\{\}]*\}/g, '');
	
	        // figure out what kind of format we are dealing with
	        if (escapedFormat.indexOf('$') > -1) { // currency!!!!!
	            output = formatCurrency(n, cultures[currentCulture].currency.symbol, format, roundingFunction);
	        } else if (escapedFormat.indexOf('%') > -1) { // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (escapedFormat.indexOf(':') > -1) { // time
	            output = formatTime(n, format);
	        } else { // plain ol' numbers or bytes
	            output = formatNumber(n._value, format, roundingFunction);
	        }
	
	        // return string
	        return output;
	    }
	
	    // revert to number
	    function unformatNumbro(n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            bytesMultiplier = false,
	            power;
	
	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (cultures[currentCulture].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g, '').replace(cultures[currentCulture].delimiters.decimal, '.');
	                }
	
	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.thousand +
	                    '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.million +
	                    '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.billion +
	                    '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.trillion +
	                    '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	
	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 1; power < binarySuffixes.length && !bytesMultiplier; ++power) {
	                    if (string.indexOf(binarySuffixes[power]) > -1) {
	                        bytesMultiplier = Math.pow(1024, power);
	                    } else if (string.indexOf(decimalSuffixes[power]) > -1) {
	                        bytesMultiplier = Math.pow(1000, power);
	                    }
	                }
	
	                var str = string.replace(/[^0-9\.]+/g, '');
	                if (str === '') {
	                    // An empty string is not a number.
	                    n._value = NaN;
	
	                } else {
	                    // do some math to create our number
	                    n._value = ((bytesMultiplier) ? bytesMultiplier : 1) *
	                        ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) *
	                        ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) *
	                        ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) *
	                        ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) *
	                        ((string.indexOf('%') > -1) ? 0.01 : 1) *
	                        (((string.split('-').length +
	                            Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2) ? 1 : -1) *
	                        Number(str);
	
	                    // round if we are talking about bytes
	                    n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
	                }
	            }
	        }
	        return n._value;
	    }
	
	    function formatCurrency(n, currencySymbol, originalFormat, roundingFunction) {
	        var format = originalFormat,
	            symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            plusSignIndex = format.indexOf('+'),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            decimalSeparator = '',
	            spliceIndex,
	            output;
	
	        if(format.indexOf('$') === -1){
	            // Use defaults instead of the format provided
	            if (cultures[currentCulture].currency.position === 'infix') {
	                decimalSeparator = currencySymbol;
	                if (cultures[currentCulture].currency.spaceSeparated) {
	                    decimalSeparator = ' ' + decimalSeparator + ' ';
	                }
	            } else if (cultures[currentCulture].currency.spaceSeparated) {
	                space = ' ';
	            }
	        } else {
	            // check for space before or after currency
	            if (format.indexOf(' $') > -1) {
	                space = ' ';
	                format = format.replace(' $', '');
	            } else if (format.indexOf('$ ') > -1) {
	                space = ' ';
	                format = format.replace('$ ', '');
	            } else {
	                format = format.replace('$', '');
	            }
	        }
	
	        // Format The Number
	        output = formatNumber(n._value, format, roundingFunction, decimalSeparator);
	
	        if (originalFormat.indexOf('$') === -1) {
	            // Use defaults instead of the format provided
	            switch (cultures[currentCulture].currency.position) {
	                case 'postfix':
	                    if (output.indexOf(')') > -1) {
	                        output = output.split('');
	                        output.splice(-1, 0, space + currencySymbol);
	                        output = output.join('');
	                    } else {
	                        output = output + space + currencySymbol;
	                    }
	                    break;
	                case 'infix':
	                    break;
	                case 'prefix':
	                    if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                        output = output.split('');
	                        spliceIndex = Math.max(openParenIndex, minusSignIndex) + 1;
	
	                        output.splice(spliceIndex, 0, currencySymbol + space);
	                        output = output.join('');
	                    } else {
	                        output = currencySymbol + space + output;
	                    }
	                    break;
	                default:
	                    throw Error('Currency position should be among ["prefix", "infix", "postfix"]');
	            }
	        } else {
	            // position the symbol
	            if (symbolIndex <= 1) {
	                if (output.indexOf('(') > -1 || output.indexOf('+') > -1 || output.indexOf('-') > -1) {
	                    output = output.split('');
	                    spliceIndex = 1;
	                    if (symbolIndex < openParenIndex || symbolIndex < plusSignIndex || symbolIndex < minusSignIndex) {
	                        // the symbol appears before the "(", "+" or "-"
	                        spliceIndex = 0;
	                    }
	                    output.splice(spliceIndex, 0, currencySymbol + space);
	                    output = output.join('');
	                } else {
	                    output = currencySymbol + space + output;
	                }
	            } else {
	                if (output.indexOf(')') > -1) {
	                    output = output.split('');
	                    output.splice(-1, 0, space + currencySymbol);
	                    output = output.join('');
	                } else {
	                    output = output + space + currencySymbol;
	                }
	            }
	        }
	
	        return output;
	    }
	
	    function formatForeignCurrency(n, foreignCurrencySymbol, originalFormat, roundingFunction) {
	        return formatCurrency(n, foreignCurrencySymbol, originalFormat, roundingFunction);
	    }
	
	    function formatPercentage(n, format, roundingFunction) {
	        var space = '',
	            output,
	            value = n._value * 100;
	
	        // check for space before %
	        if (format.indexOf(' %') > -1) {
	            space = ' ';
	            format = format.replace(' %', '');
	        } else {
	            format = format.replace('%', '');
	        }
	
	        output = formatNumber(value, format, roundingFunction);
	
	        if (output.indexOf(')') > -1) {
	            output = output.split('');
	            output.splice(-1, 0, space + '%');
	            output = output.join('');
	        } else {
	            output = output + space + '%';
	        }
	
	        return output;
	    }
	
	    function formatTime(n) {
	        var hours = Math.floor(n._value / 60 / 60),
	            minutes = Math.floor((n._value - (hours * 60 * 60)) / 60),
	            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
	        return hours + ':' +
	            ((minutes < 10) ? '0' + minutes : minutes) + ':' +
	            ((seconds < 10) ? '0' + seconds : seconds);
	    }
	
	    function unformatTime(string) {
	        var timeArray = string.split(':'),
	            seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        } else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }
	
	    function formatByteUnits (value, suffixes, scale) {
	        var suffix = suffixes[0],
	            power,
	            min,
	            max,
	            abs = Math.abs(value);
	
	        if (abs >= scale) {
	            for (power = 1; power < suffixes.length; ++power) {
	                min = Math.pow(scale, power);
	                max = Math.pow(scale, power + 1);
	
	                if (abs >= min && abs < max) {
	                    suffix = suffixes[power];
	                    value = value / min;
	                    break;
	                }
	            }
	
	            // values greater than or equal to [scale] YB never set the suffix
	            if (suffix === suffixes[0]) {
	                value = value / Math.pow(scale, suffixes.length - 1);
	                suffix = suffixes[suffixes.length - 1];
	            }
	        }
	
	        return { value: value, suffix: suffix };
	    }
	
	    function formatNumber (value, format, roundingFunction, sep) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
	            abbrK = false, // force abbreviation to thousands
	            abbrM = false, // force abbreviation to millions
	            abbrB = false, // force abbreviation to billions
	            abbrT = false, // force abbreviation to trillions
	            abbrForce = false, // force abbreviation
	            bytes = '',
	            byteFormat,
	            units,
	            ord = '',
	            abs = Math.abs(value),
	            totalLength,
	            length,
	            minimumPrecision,
	            pow,
	            w,
	            intPrecision,
	            precision,
	            prefix,
	            postfix,
	            thousands,
	            d = '',
	            forcedNeg = false,
	            neg = false,
	            indexOpenP,
	            size,
	            indexMinus,
	            paren = '',
	            minlen,
	            i;
	
	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        }
	
	        if (!isFinite(value)) {
	            return '' + value;
	        }
	
	        if (format.indexOf('{') === 0) {
	            var end = format.indexOf('}');
	            if (end === -1) {
	                throw Error('Format should also contain a "}"');
	            }
	            prefix = format.slice(1, end);
	            format = format.slice(end + 1);
	        } else {
	            prefix = '';
	        }
	
	        if (format.indexOf('}') === format.length - 1) {
	            var start = format.indexOf('{');
	            if (start === -1) {
	                throw Error('Format should also contain a "{"');
	            }
	            postfix = format.slice(start + 1, -1);
	            format = format.slice(0, start + 1);
	        } else {
	            postfix = '';
	        }
	
	        // check for min length
	        var info;
	        if (format.indexOf('.') === -1) {
	            info = format.match(/([0-9]+).*/);
	        } else {
	            info = format.match(/([0-9]+)\..*/);
	        }
	        minlen = info === null ? -1 : info[1].length;
	
	        // see if we should use parentheses for negative number or if we should prefix with a sign
	        // if both are present we default to parentheses
	        if (format.indexOf('-') !== -1) {
	            forcedNeg = true;
	        }
	        if (format.indexOf('(') > -1) {
	            negP = true;
	            format = format.slice(1, -1);
	        } else if (format.indexOf('+') > -1) {
	            signed = true;
	            format = format.replace(/\+/g, '');
	        }
	
	        // see if abbreviation is wanted
	        if (format.indexOf('a') > -1) {
	            intPrecision = format.split('.')[0].match(/[0-9]+/g) || ['0'];
	            intPrecision = parseInt(intPrecision[0], 10);
	
	            // check if abbreviation is specified
	            abbrK = format.indexOf('aK') >= 0;
	            abbrM = format.indexOf('aM') >= 0;
	            abbrB = format.indexOf('aB') >= 0;
	            abbrT = format.indexOf('aT') >= 0;
	            abbrForce = abbrK || abbrM || abbrB || abbrT;
	
	            // check for space before abbreviation
	            if (format.indexOf(' a') > -1) {
	                abbr = ' ';
	                format = format.replace(' a', '');
	            } else {
	                format = format.replace('a', '');
	            }
	
	            totalLength = Math.floor(Math.log(abs) / Math.LN10) + 1;
	
	            minimumPrecision = totalLength % 3;
	            minimumPrecision = minimumPrecision === 0 ? 3 : minimumPrecision;
	
	            if (intPrecision && abs !== 0) {
	
	                length = Math.floor(Math.log(abs) / Math.LN10) + 1 - intPrecision;
	
	                pow = 3 * ~~((Math.min(intPrecision, totalLength) - minimumPrecision) / 3);
	
	                abs = abs / Math.pow(10, pow);
	
	                if (format.indexOf('.') === -1 && intPrecision > 3) {
	                    format += '[.]';
	
	                    size = length === 0 ? 0 : 3 * ~~(length / 3) - length;
	                    size = size < 0 ? size + 3 : size;
	
	                    format += zeroes(size);
	                }
	            }
	
	            if (Math.floor(Math.log(Math.abs(value)) / Math.LN10) + 1 !== intPrecision) {
	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + cultures[currentCulture].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + cultures[currentCulture].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + cultures[currentCulture].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + cultures[currentCulture].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }
	        }
	
	        // see if we are formatting
	        //   binary-decimal bytes (1024 MB), binary bytes (1024 MiB), or decimal bytes (1000 MB)
	        for (i = 0; i < byteFormatOrder.length; ++i) {
	            byteFormat = byteFormatOrder[i];
	
	            if (format.indexOf(byteFormat.marker) > -1) {
	                // check for space before
	                if (format.indexOf(' ' + byteFormat.marker) >-1) {
	                    bytes = ' ';
	                }
	
	                // remove the marker (with the space if it had one)
	                format = format.replace(bytes + byteFormat.marker, '');
	
	                units = formatByteUnits(value, byteFormat.suffixes, byteFormat.scale);
	
	                value = units.value;
	                bytes = bytes + units.suffix;
	
	                break;
	            }
	        }
	
	        // see if ordinal is wanted
	        if (format.indexOf('o') > -1) {
	            // check for space before
	            if (format.indexOf(' o') > -1) {
	                ord = ' ';
	                format = format.replace(' o', '');
	            } else {
	                format = format.replace('o', '');
	            }
	
	            if (cultures[currentCulture].ordinal) {
	                ord = ord + cultures[currentCulture].ordinal(value);
	            }
	        }
	
	        if (format.indexOf('[.]') > -1) {
	            optDec = true;
	            format = format.replace('[.]', '.');
	        }
	
	        w = value.toString().split('.')[0];
	        precision = format.split('.')[1];
	        thousands = format.indexOf(',');
	
	        if (precision) {
	            if (precision.indexOf('*') !== -1) {
	                d = toFixed(value, value.toString().split('.')[1].length, roundingFunction);
	            } else {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction,
	                        precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }
	            }
	
	            w = d.split('.')[0];
	
	            if (d.split('.')[1].length) {
	                var p = sep ? abbr + sep : cultures[currentCulture].delimiters.decimal;
	                d = p + d.split('.')[1];
	            } else {
	                d = '';
	            }
	
	            if (optDec && Number(d.slice(1)) === 0) {
	                d = '';
	            }
	        } else {
	            w = toFixed(value, 0, roundingFunction);
	        }
	
	        // format number
	        if (w.indexOf('-') > -1) {
	            w = w.slice(1);
	            neg = true;
	        }
	
	        if (w.length < minlen) {
	            w = zeroes(minlen - w.length) + w;
	        }
	
	        if (thousands > -1) {
	            w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' +
	                cultures[currentCulture].delimiters.thousands);
	        }
	
	        if (format.indexOf('.') === 0) {
	            w = '';
	        }
	
	        indexOpenP = format.indexOf('(');
	        indexMinus = format.indexOf('-');
	
	        if (indexOpenP < indexMinus) {
	            paren = ((negP && neg) ? '(' : '') + (((forcedNeg && neg) || (!negP && neg)) ? '-' : '');
	        } else {
	            paren = (((forcedNeg && neg) || (!negP && neg)) ? '-' : '') + ((negP && neg) ? '(' : '');
	        }
	
	        return prefix +
	            paren + ((!neg && signed && value !== 0) ? '+' : '') +
	            w + d +
	            ((ord) ? ord : '') +
	            ((abbr && !sep) ? abbr : '') +
	            ((bytes) ? bytes : '') +
	            ((negP && neg) ? ')' : '') +
	            postfix;
	    }
	
	    /************************************
	        Top Level Functions
	    ************************************/
	
	    numbro = function(input) {
	        if (numbro.isNumbro(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numbro.fn.unformat(input);
	        }
	
	        return new Numbro(Number(input));
	    };
	
	    // version number
	    numbro.version = VERSION;
	
	    // compare numbro object
	    numbro.isNumbro = function(obj) {
	        return obj instanceof Numbro;
	    };
	
	    /**
	     * This function allow the user to set a new language with a fallback if
	     * the language does not exist. If no fallback language is provided,
	     * it fallbacks to english.
	     *
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `setCulture` should be used instead.
	     */
	    numbro.setLanguage = function(newLanguage, fallbackLanguage) {
	        console.warn('`setLanguage` is deprecated since version 1.6.0. Use `setCulture` instead');
	        var key = newLanguage,
	            prefix = newLanguage.split('-')[0],
	            matchingLanguage = null;
	        if (!languages[key]) {
	            Object.keys(languages).forEach(function(language) {
	                if (!matchingLanguage && language.split('-')[0] === prefix) {
	                    matchingLanguage = language;
	                }
	            });
	            key = matchingLanguage || fallbackLanguage || 'en-US';
	        }
	        chooseCulture(key);
	    };
	
	    /**
	     * This function allow the user to set a new culture with a fallback if
	     * the culture does not exist. If no fallback culture is provided,
	     * it falls back to "en-US".
	     */
	    numbro.setCulture = function(newCulture, fallbackCulture) {
	        var key = newCulture,
	            suffix = newCulture.split('-')[1],
	            matchingCulture = null;
	        if (!cultures[key]) {
	            if (suffix) {
	                Object.keys(cultures).forEach(function(language) {
	                    if (!matchingCulture && language.split('-')[1] === suffix) {
	                        matchingCulture = language;
	                    }
	                });
	            }
	
	            key = matchingCulture || fallbackCulture || 'en-US';
	        }
	        chooseCulture(key);
	    };
	
	    /**
	     * This function will load languages and then set the global language.  If
	     * no arguments are passed in, it will simply return the current global
	     * language key.
	     *
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `culture` should be used instead.
	     */
	    numbro.language = function(key, values) {
	        console.warn('`language` is deprecated since version 1.6.0. Use `culture` instead');
	
	        if (!key) {
	            return currentCulture;
	        }
	
	        if (key && !values) {
	            if (!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            chooseCulture(key);
	        }
	
	        if (values || !languages[key]) {
	            setCulture(key, values);
	        }
	
	        return numbro;
	    };
	
	    /**
	     * This function will load cultures and then set the global culture.  If
	     * no arguments are passed in, it will simply return the current global
	     * culture code.
	     */
	    numbro.culture = function(code, values) {
	        if (!code) {
	            return currentCulture;
	        }
	
	        if (code && !values) {
	            if (!cultures[code]) {
	                throw new Error('Unknown culture : ' + code);
	            }
	            chooseCulture(code);
	        }
	
	        if (values || !cultures[code]) {
	            setCulture(code, values);
	        }
	
	        return numbro;
	    };
	
	    /**
	     * This function provides access to the loaded language data.  If
	     * no arguments are passed in, it will simply return the current
	     * global language object.
	     *
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `culture` should be used instead.
	     */
	    numbro.languageData = function(key) {
	        console.warn('`languageData` is deprecated since version 1.6.0. Use `cultureData` instead');
	
	        if (!key) {
	            return languages[currentCulture];
	        }
	
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	
	        return languages[key];
	    };
	
	    /**
	     * This function provides access to the loaded culture data.  If
	     * no arguments are passed in, it will simply return the current
	     * global culture object.
	     */
	    numbro.cultureData = function(code) {
	        if (!code) {
	            return cultures[currentCulture];
	        }
	
	        if (!cultures[code]) {
	            throw new Error('Unknown culture : ' + code);
	        }
	
	        return cultures[code];
	    };
	
	    numbro.culture('en-US', enUS);
	
	    /**
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `cultures` should be used instead.
	     */
	    numbro.languages = function() {
	        console.warn('`languages` is deprecated since version 1.6.0. Use `cultures` instead');
	
	        return languages;
	    };
	
	    numbro.cultures = function() {
	        return cultures;
	    };
	
	    numbro.zeroFormat = function(format) {
	        zeroFormat = typeof(format) === 'string' ? format : null;
	    };
	
	    numbro.defaultFormat = function(format) {
	        defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };
	
	    numbro.defaultCurrencyFormat = function (format) {
	        defaultCurrencyFormat = typeof(format) === 'string' ? format : '0$';
	    };
	
	    numbro.validate = function(val, culture) {
	
	        var _decimalSep,
	            _thousandSep,
	            _currSymbol,
	            _valArray,
	            _abbrObj,
	            _thousandRegEx,
	            cultureData,
	            temp;
	
	        //coerce val to string
	        if (typeof val !== 'string') {
	            val += '';
	            if (console.warn) {
	                console.warn('Numbro.js: Value is not string. It has been co-erced to: ', val);
	            }
	        }
	
	        //trim whitespaces from either sides
	        val = val.trim();
	
	        //replace the initial '+' or '-' sign if present
	        val = val.replace(/^[+-]?/, '');
	
	        //if val is just digits return true
	        if ( !! val.match(/^\d+$/)) {
	            return true;
	        }
	
	        //if val is empty return false
	        if (val === '') {
	            return false;
	        }
	
	        //get the decimal and thousands separator from numbro.cultureData
	        try {
	            //check if the culture is understood by numbro. if not, default it to current culture
	            cultureData = numbro.cultureData(culture);
	        } catch (e) {
	            cultureData = numbro.cultureData(numbro.culture());
	        }
	
	        //setup the delimiters and currency symbol based on culture
	        _currSymbol = cultureData.currency.symbol;
	        _abbrObj = cultureData.abbreviations;
	        _decimalSep = cultureData.delimiters.decimal;
	        if (cultureData.delimiters.thousands === '.') {
	            _thousandSep = '\\.';
	        } else {
	            _thousandSep = cultureData.delimiters.thousands;
	        }
	
	        // validating currency symbol
	        temp = val.match(/^[^\d\.\,]+/);
	        if (temp !== null) {
	            val = val.substr(1);
	            if (temp[0] !== _currSymbol) {
	                return false;
	            }
	        }
	
	        //validating abbreviation symbol
	        temp = val.match(/[^\d]+$/);
	        if (temp !== null) {
	            val = val.slice(0, -1);
	            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million &&
	                    temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
	                return false;
	            }
	        }
	
	        _thousandRegEx = new RegExp(_thousandSep + '{2}');
	
	        if (!val.match(/[^\d.,]/g)) {
	            _valArray = val.split(_decimalSep);
	            if (_valArray.length > 2) {
	                return false;
	            } else {
	                if (_valArray.length < 2) {
	                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
	                } else {
	                    if (_valArray[0] === '') {
	                        // for values without leading zero eg. .984
	                        return (!_valArray[0].match(_thousandRegEx) &&
	                            !!_valArray[1].match(/^\d+$/));
	
	                    } else if (_valArray[0].length === 1) {
	                        return ( !! _valArray[0].match(/^\d+$/) &&
	                            !_valArray[0].match(_thousandRegEx) &&
	                            !! _valArray[1].match(/^\d+$/));
	                    } else {
	                        return ( !! _valArray[0].match(/^\d+.*\d$/) &&
	                            !_valArray[0].match(_thousandRegEx) &&
	                            !! _valArray[1].match(/^\d+$/));
	                    }
	                }
	            }
	        }
	
	        return false;
	    };
	
	    /**
	     * * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `loadCulturesInNode` should be used instead.
	     */
	    numbro.loadLanguagesInNode = function() {
	        console.warn('`loadLanguagesInNode` is deprecated since version 1.6.0. Use `loadCulturesInNode` instead');
	
	        numbro.loadCulturesInNode();
	    };
	
	    numbro.loadCulturesInNode = function() {
	        // TODO: Rename the folder in 2.0.0
	        var cultures = __webpack_require__(21);
	
	        for(var langLocaleCode in cultures) {
	            if(langLocaleCode) {
	                numbro.culture(langLocaleCode, cultures[langLocaleCode]);
	            }
	        }
	    };
	
	    /************************************
	        Helpers
	    ************************************/
	
	    function setCulture(code, values) {
	        cultures[code] = values;
	    }
	
	    function chooseCulture(code) {
	        currentCulture = code;
	        var defaults = cultures[code].defaults;
	        if (defaults && defaults.format) {
	            numbro.defaultFormat(defaults.format);
	        }
	        if (defaults && defaults.currencyFormat) {
	            numbro.defaultCurrencyFormat(defaults.currencyFormat);
	        }
	    }
	
	    function inNodejsRuntime() {
	        return (typeof process !== 'undefined') &&
	            (process.browser === undefined) &&
	            process.title &&
	            (
	                process.title.indexOf('node') === 0 ||
	                process.title.indexOf('meteor-tool') > 0 ||
	                process.title === 'grunt' ||
	                process.title === 'gulp'
	            ) &&
	            ("function" !== 'undefined');
	    }
	
	    /************************************
	        Floating-point helpers
	    ************************************/
	
	    // The floating-point helper functions and implementation
	    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/
	
	    /**
	     * Array.prototype.reduce for browsers that don't support it
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
	     */
	    if ('function' !== typeof Array.prototype.reduce) {
	        Array.prototype.reduce = function(callback, optInitialValue) {
	
	            if (null === this || 'undefined' === typeof this) {
	                // At the moment all modern browsers, that support strict mode, have
	                // native implementation of Array.prototype.reduce. For instance, IE8
	                // does not support strict mode, so this check is actually useless.
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }
	
	            if ('function' !== typeof callback) {
	                throw new TypeError(callback + ' is not a function');
	            }
	
	            var index,
	                value,
	                length = this.length >>> 0,
	                isValueSet = false;
	
	            if (1 < arguments.length) {
	                value = optInitialValue;
	                isValueSet = true;
	            }
	
	            for (index = 0; length > index; ++index) {
	                if (this.hasOwnProperty(index)) {
	                    if (isValueSet) {
	                        value = callback(value, this[index], index, this);
	                    } else {
	                        value = this[index];
	                        isValueSet = true;
	                    }
	                }
	            }
	
	            if (!isValueSet) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }
	
	            return value;
	        };
	    }
	
	
	    /**
	     * Computes the multiplier necessary to make x >= 1,
	     * effectively eliminating miscalculations caused by
	     * finite precision.
	     */
	    function multiplier(x) {
	        var parts = x.toString().split('.');
	        if (parts.length < 2) {
	            return 1;
	        }
	        return Math.pow(10, parts[1].length);
	    }
	
	    /**
	     * Given a variable number of arguments, returns the maximum
	     * multiplier that must be used to normalize an operation involving
	     * all of them.
	     */
	    function correctionFactor() {
	        var args = Array.prototype.slice.call(arguments);
	        return args.reduce(function(prev, next) {
	            var mp = multiplier(prev),
	                mn = multiplier(next);
	            return mp > mn ? mp : mn;
	        }, -Infinity);
	    }
	
	    /************************************
	        Numbro Prototype
	    ************************************/
	
	
	    numbro.fn = Numbro.prototype = {
	
	        clone: function() {
	            return numbro(this);
	        },
	
	        format: function(inputString, roundingFunction) {
	            return formatNumbro(this,
	                inputString ? inputString : defaultFormat,
	                (roundingFunction !== undefined) ? roundingFunction : Math.round
	            );
	        },
	
	        formatCurrency: function(inputString, roundingFunction) {
	            return formatCurrency(this,
	                cultures[currentCulture].currency.symbol,
	                inputString ? inputString : defaultCurrencyFormat,
	                (roundingFunction !== undefined) ? roundingFunction : Math.round
	            );
	        },
	
	        formatForeignCurrency: function(currencySymbol, inputString, roundingFunction) {
	            return formatForeignCurrency(this,
	                currencySymbol,
	                inputString ? inputString : defaultCurrencyFormat,
	                (roundingFunction !== undefined) ? roundingFunction : Math.round
	            );
	        },
	
	        unformat: function(inputString) {
	            if (typeof inputString === 'number') {
	                return inputString;
	            } else if (typeof inputString === 'string') {
	                var result = unformatNumbro(this, inputString);
	
	                // Any unparseable string (represented as NaN in the result) is
	                // converted into undefined.
	                return isNaN(result) ? undefined : result;
	            } else {
	                return undefined;
	            }
	        },
	
	        binaryByteUnits: function() {
	            return formatByteUnits(this._value, bytes.binary.suffixes, bytes.binary.scale).suffix;
	        },
	
	        byteUnits: function() {
	            return formatByteUnits(this._value, bytes.general.suffixes, bytes.general.scale).suffix;
	        },
	
	        decimalByteUnits: function() {
	            return formatByteUnits(this._value, bytes.decimal.suffixes, bytes.decimal.scale).suffix;
	        },
	
	        value: function() {
	            return this._value;
	        },
	
	        valueOf: function() {
	            return this._value;
	        },
	
	        set: function(value) {
	            this._value = Number(value);
	            return this;
	        },
	
	        add: function(value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	
	            function cback(accum, curr) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },
	
	        subtract: function(value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	
	            function cback(accum, curr) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
	            return this;
	        },
	
	        multiply: function(value) {
	            function cback(accum, curr) {
	                var corrFactor = correctionFactor(accum, curr),
	                    result = accum * corrFactor;
	                result *= curr * corrFactor;
	                result /= corrFactor * corrFactor;
	                return result;
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },
	
	        divide: function(value) {
	            function cback(accum, curr) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);
	            return this;
	        },
	
	        difference: function(value) {
	            return Math.abs(numbro(this._value).subtract(value).value());
	        }
	
	    };
	
	    /************************************
	        Exposing Numbro
	    ************************************/
	
	    if (inNodejsRuntime()) {
	        //Todo: Rename the folder in 2.0.0
	        numbro.loadCulturesInNode();
	    }
	
	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numbro;
	    } else {
	        /*global ender:false */
	        if (typeof ender === 'undefined') {
	            // here, `this` means `window` in the browser, or `global` on the server
	            // add `numbro` as a global object via a string identifier,
	            // for Closure Compiler 'advanced' mode
	            this.numbro = numbro;
	        }
	
	        /*global define:false */
	        if (true) {
	            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	                return numbro;
	            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	        }
	    }
	
	}.call(typeof window === 'undefined' ? this : window));


/***/ },
/* 21 */
/***/ function(module, exports) {

	// empty (null-loader)

/***/ },
/* 22 */
/***/ function(module, exports) {

	this.j$ = this.jStat = (function(Math, undefined) {
	
	// For quick reference.
	var concat = Array.prototype.concat;
	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;
	
	// Calculate correction for IEEE error
	// TODO: This calculation can be improved.
	function calcRdx(n, m) {
	  var val = n > m ? n : m;
	  return Math.pow(10,
	                  17 - ~~(Math.log(((val > 0) ? val : -val)) * Math.LOG10E));
	}
	
	
	var isArray = Array.isArray || function isArray(arg) {
	  return toString.call(arg) === '[object Array]';
	};
	
	
	function isFunction(arg) {
	  return toString.call(arg) === '[object Function]';
	}
	
	
	function isNumber(arg) {
	  return typeof arg === 'number' && arg === arg;
	}
	
	
	// Converts the jStat matrix to vector.
	function toVector(arr) {
	  return concat.apply([], arr);
	}
	
	
	// The one and only jStat constructor.
	function jStat() {
	  return new jStat._init(arguments);
	}
	
	
	// TODO: Remove after all references in src files have been removed.
	jStat.fn = jStat.prototype;
	
	
	// By separating the initializer from the constructor it's easier to handle
	// always returning a new instance whether "new" was used or not.
	jStat._init = function _init(args) {
	  var i;
	
	  // If first argument is an array, must be vector or matrix.
	  if (isArray(args[0])) {
	    // Check if matrix.
	    if (isArray(args[0][0])) {
	      // See if a mapping function was also passed.
	      if (isFunction(args[1]))
	        args[0] = jStat.map(args[0], args[1]);
	      // Iterate over each is faster than this.push.apply(this, args[0].
	      for (var i = 0; i < args[0].length; i++)
	        this[i] = args[0][i];
	      this.length = args[0].length;
	
	    // Otherwise must be a vector.
	    } else {
	      this[0] = isFunction(args[1]) ? jStat.map(args[0], args[1]) : args[0];
	      this.length = 1;
	    }
	
	  // If first argument is number, assume creation of sequence.
	  } else if (isNumber(args[0])) {
	    this[0] = jStat.seq.apply(null, args);
	    this.length = 1;
	
	  // Handle case when jStat object is passed to jStat.
	  } else if (args[0] instanceof jStat) {
	    // Duplicate the object and pass it back.
	    return jStat(args[0].toArray());
	
	  // Unexpected argument value, return empty jStat object.
	  // TODO: This is strange behavior. Shouldn't this throw or some such to let
	  // the user know they had bad arguments?
	  } else {
	    this[0] = [];
	    this.length = 1;
	  }
	
	  return this;
	};
	jStat._init.prototype = jStat.prototype;
	jStat._init.constructor = jStat;
	
	
	// Utility functions.
	// TODO: for internal use only?
	jStat.utils = {
	  calcRdx: calcRdx,
	  isArray: isArray,
	  isFunction: isFunction,
	  isNumber: isNumber,
	  toVector: toVector
	};
	
	
	// Easily extend the jStat object.
	// TODO: is this seriously necessary?
	jStat.extend = function extend(obj) {
	  var i, j;
	
	  if (arguments.length === 1) {
	    for (j in obj)
	      jStat[j] = obj[j];
	    return this;
	  }
	
	  for (var i = 1; i < arguments.length; i++) {
	    for (j in arguments[i])
	      obj[j] = arguments[i][j];
	  }
	
	  return obj;
	};
	
	
	// Returns the number of rows in the matrix.
	jStat.rows = function rows(arr) {
	  return arr.length || 1;
	};
	
	
	// Returns the number of columns in the matrix.
	jStat.cols = function cols(arr) {
	  return arr[0].length || 1;
	};
	
	
	// Returns the dimensions of the object { rows: i, cols: j }
	jStat.dimensions = function dimensions(arr) {
	  return {
	    rows: jStat.rows(arr),
	    cols: jStat.cols(arr)
	  };
	};
	
	
	// Returns a specified row as a vector or return a sub matrix by pick some rows
	jStat.row = function row(arr, index) {
	  if (isArray(index)) {
	    return index.map(function(i) {
	      return jStat.row(arr, i);
	    })
	  }
	  return arr[index];
	};
	
	
	// return row as array
	// rowa([[1,2],[3,4]],0) -> [1,2]
	jStat.rowa = function rowa(arr, i) {
	  return jStat.row(arr, i);
	};
	
	
	// Returns the specified column as a vector or return a sub matrix by pick some
	// columns
	jStat.col = function col(arr, index) {
	  if (isArray(index)) {
	    var submat = jStat.arange(arr.length).map(function(i) {
	      return new Array(index.length);
	    });
	    index.forEach(function(ind, i){
	      jStat.arange(arr.length).forEach(function(j) {
	        submat[j][i] = arr[j][ind];
	      });
	    });
	    return submat;
	  }
	  var column = new Array(arr.length);
	  for (var i = 0; i < arr.length; i++)
	    column[i] = [arr[i][index]];
	  return column;
	};
	
	
	// return column as array
	// cola([[1,2],[3,4]],0) -> [1,3]
	jStat.cola = function cola(arr, i) {
	  return jStat.col(arr, i).map(function(a){ return a[0] });
	};
	
	
	// Returns the diagonal of the matrix
	jStat.diag = function diag(arr) {
	  var nrow = jStat.rows(arr);
	  var res = new Array(nrow);
	  for (var row = 0; row < nrow; row++)
	    res[row] = [arr[row][row]];
	  return res;
	};
	
	
	// Returns the anti-diagonal of the matrix
	jStat.antidiag = function antidiag(arr) {
	  var nrow = jStat.rows(arr) - 1;
	  var res = new Array(nrow);
	  for (var i = 0; nrow >= 0; nrow--, i++)
	    res[i] = [arr[i][nrow]];
	  return res;
	};
	
	// Transpose a matrix or array.
	jStat.transpose = function transpose(arr) {
	  var obj = [];
	  var objArr, rows, cols, j, i;
	
	  // Make sure arr is in matrix format.
	  if (!isArray(arr[0]))
	    arr = [arr];
	
	  rows = arr.length;
	  cols = arr[0].length;
	
	  for (var i = 0; i < cols; i++) {
	    objArr = new Array(rows);
	    for (j = 0; j < rows; j++)
	      objArr[j] = arr[j][i];
	    obj.push(objArr);
	  }
	
	  // If obj is vector, return only single array.
	  return obj.length === 1 ? obj[0] : obj;
	};
	
	
	// Map a function to an array or array of arrays.
	// "toAlter" is an internal variable.
	jStat.map = function map(arr, func, toAlter) {
	  var row, nrow, ncol, res, col;
	
	  if (!isArray(arr[0]))
	    arr = [arr];
	
	  nrow = arr.length;
	  ncol = arr[0].length;
	  res = toAlter ? arr : new Array(nrow);
	
	  for (row = 0; row < nrow; row++) {
	    // if the row doesn't exist, create it
	    if (!res[row])
	      res[row] = new Array(ncol);
	    for (col = 0; col < ncol; col++)
	      res[row][col] = func(arr[row][col], row, col);
	  }
	
	  return res.length === 1 ? res[0] : res;
	};
	
	
	// Cumulatively combine the elements of an array or array of arrays using a function.
	jStat.cumreduce = function cumreduce(arr, func, toAlter) {
	  var row, nrow, ncol, res, col;
	
	  if (!isArray(arr[0]))
	    arr = [arr];
	
	  nrow = arr.length;
	  ncol = arr[0].length;
	  res = toAlter ? arr : new Array(nrow);
	
	  for (row = 0; row < nrow; row++) {
	    // if the row doesn't exist, create it
	    if (!res[row])
	      res[row] = new Array(ncol);
	    if (ncol > 0)
	      res[row][0] = arr[row][0];
	    for (col = 1; col < ncol; col++)
	      res[row][col] = func(res[row][col-1], arr[row][col]);
	  }
	  return res.length === 1 ? res[0] : res;
	};
	
	
	// Destructively alter an array.
	jStat.alter = function alter(arr, func) {
	  return jStat.map(arr, func, true);
	};
	
	
	// Generate a rows x cols matrix according to the supplied function.
	jStat.create = function  create(rows, cols, func) {
	  var res = new Array(rows);
	  var i, j;
	
	  if (isFunction(cols)) {
	    func = cols;
	    cols = rows;
	  }
	
	  for (var i = 0; i < rows; i++) {
	    res[i] = new Array(cols);
	    for (j = 0; j < cols; j++)
	      res[i][j] = func(i, j);
	  }
	
	  return res;
	};
	
	
	function retZero() { return 0; }
	
	
	// Generate a rows x cols matrix of zeros.
	jStat.zeros = function zeros(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retZero);
	};
	
	
	function retOne() { return 1; }
	
	
	// Generate a rows x cols matrix of ones.
	jStat.ones = function ones(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retOne);
	};
	
	
	// Generate a rows x cols matrix of uniformly random numbers.
	jStat.rand = function rand(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, Math.random);
	};
	
	
	function retIdent(i, j) { return i === j ? 1 : 0; }
	
	
	// Generate an identity matrix of size row x cols.
	jStat.identity = function identity(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retIdent);
	};
	
	
	// Tests whether a matrix is symmetric
	jStat.symmetric = function symmetric(arr) {
	  var issymmetric = true;
	  var size = arr.length;
	  var row, col;
	
	  if (arr.length !== arr[0].length)
	    return false;
	
	  for (row = 0; row < size; row++) {
	    for (col = 0; col < size; col++)
	      if (arr[col][row] !== arr[row][col])
	        return false;
	  }
	
	  return true;
	};
	
	
	// Set all values to zero.
	jStat.clear = function clear(arr) {
	  return jStat.alter(arr, retZero);
	};
	
	
	// Generate sequence.
	jStat.seq = function seq(min, max, length, func) {
	  if (!isFunction(func))
	    func = false;
	
	  var arr = [];
	  var hival = calcRdx(min, max);
	  var step = (max * hival - min * hival) / ((length - 1) * hival);
	  var current = min;
	  var cnt;
	
	  // Current is assigned using a technique to compensate for IEEE error.
	  // TODO: Needs better implementation.
	  for (cnt = 0;
	       current <= max;
	       cnt++, current = (min * hival + step * hival * cnt) / hival) {
	    arr.push((func ? func(current, cnt) : current));
	  }
	
	  return arr;
	};
	
	
	// arange(5) -> [0,1,2,3,4]
	// arange(1,5) -> [1,2,3,4]
	// arange(5,1,-1) -> [5,4,3,2]
	jStat.arange = function arange(start, end, step) {
	  var rl = [];
	  step = step || 1;
	  if (end === undefined) {
	    end = start;
	    start = 0;
	  }
	  if (start === end || step === 0) {
	    return [];
	  }
	  if (start < end && step < 0) {
	    return [];
	  }
	  if (start > end && step > 0) {
	    return [];
	  }
	  if (step > 0) {
	    for (i = start; i < end; i += step) {
	      rl.push(i);
	    }
	  } else {
	    for (i = start; i > end; i += step) {
	      rl.push(i);
	    }
	  }
	  return rl;
	};
	
	
	// A=[[1,2,3],[4,5,6],[7,8,9]]
	// slice(A,{row:{end:2},col:{start:1}}) -> [[2,3],[5,6]]
	// slice(A,1,{start:1}) -> [5,6]
	// as numpy code A[:2,1:]
	jStat.slice = (function(){
	  function _slice(list, start, end, step) {
	    // note it's not equal to range.map mode it's a bug
	    var i;
	    var rl = [];
	    var length = list.length;
	    if (start === undefined && end === undefined && step === undefined) {
	      return jStat.copy(list);
	    }
	
	    start = start || 0;
	    end = end || list.length;
	    start = start >= 0 ? start : length + start;
	    end = end >= 0 ? end : length + end;
	    step = step || 1;
	    if (start === end || step === 0) {
	      return [];
	    }
	    if (start < end && step < 0) {
	      return [];
	    }
	    if (start > end && step > 0) {
	      return [];
	    }
	    if (step > 0) {
	      for (i = start; i < end; i += step) {
	        rl.push(list[i]);
	      }
	    } else {
	      for (i = start; i > end;i += step) {
	        rl.push(list[i]);
	      }
	    }
	    return rl;
	  }
	
	  function slice(list, rcSlice) {
	    rcSlice = rcSlice || {};
	    if (isNumber(rcSlice.row)) {
	      if (isNumber(rcSlice.col))
	        return list[rcSlice.row][rcSlice.col];
	      var row = jStat.rowa(list, rcSlice.row);
	      var colSlice = rcSlice.col || {};
	      return _slice(row, colSlice.start, colSlice.end, colSlice.step);
	    }
	
	    if (isNumber(rcSlice.col)) {
	      var col = jStat.cola(list, rcSlice.col);
	      var rowSlice = rcSlice.row || {};
	      return _slice(col, rowSlice.start, rowSlice.end, rowSlice.step);
	    }
	
	    var rowSlice = rcSlice.row || {};
	    var colSlice = rcSlice.col || {};
	    var rows = _slice(list, rowSlice.start, rowSlice.end, rowSlice.step);
	    return rows.map(function(row) {
	      return _slice(row, colSlice.start, colSlice.end, colSlice.step);
	    });
	  }
	
	  return slice;
	}());
	
	
	// A=[[1,2,3],[4,5,6],[7,8,9]]
	// sliceAssign(A,{row:{start:1},col:{start:1}},[[0,0],[0,0]])
	// A=[[1,2,3],[4,0,0],[7,0,0]]
	jStat.sliceAssign = function sliceAssign(A, rcSlice, B) {
	  if (isNumber(rcSlice.row)) {
	    if (isNumber(rcSlice.col))
	      return A[rcSlice.row][rcSlice.col] = B;
	    rcSlice.col = rcSlice.col || {};
	    rcSlice.col.start = rcSlice.col.start || 0;
	    rcSlice.col.end = rcSlice.col.end || A[0].length;
	    rcSlice.col.step = rcSlice.col.step || 1;
	    var nl = jStat.arange(rcSlice.col.start,
	                          Math.min(A.length, rcSlice.col.end),
	                          rcSlice.col.step);
	    var m = rcSlice.row;
	    nl.forEach(function(n, i) {
	      A[m][n] = B[i];
	    });
	    return A;
	  }
	
	  if (isNumber(rcSlice.col)) {
	    rcSlice.row = rcSlice.row || {};
	    rcSlice.row.start = rcSlice.row.start || 0;
	    rcSlice.row.end = rcSlice.row.end || A.length;
	    rcSlice.row.step = rcSlice.row.step || 1;
	    var ml = jStat.arange(rcSlice.row.start,
	                          Math.min(A[0].length, rcSlice.row.end),
	                          rcSlice.row.step);
	    var n = rcSlice.col;
	    ml.forEach(function(m, j) {
	      A[m][n] = B[j];
	    });
	    return A;
	  }
	
	  if (B[0].length === undefined) {
	    B = [B];
	  }
	  rcSlice.row.start = rcSlice.row.start || 0;
	  rcSlice.row.end = rcSlice.row.end || A.length;
	  rcSlice.row.step = rcSlice.row.step || 1;
	  rcSlice.col.start = rcSlice.col.start || 0;
	  rcSlice.col.end = rcSlice.col.end || A[0].length;
	  rcSlice.col.step = rcSlice.col.step || 1;
	  var ml = jStat.arange(rcSlice.row.start,
	                        Math.min(A.length, rcSlice.row.end),
	                        rcSlice.row.step);
	  var nl = jStat.arange(rcSlice.col.start,
	                        Math.min(A[0].length, rcSlice.col.end),
	                        rcSlice.col.step);
	  ml.forEach(function(m, i) {
	    nl.forEach(function(n, j) {
	      A[m][n] = B[i][j];
	    });
	  });
	  return A;
	};
	
	
	// [1,2,3] ->
	// [[1,0,0],[0,2,0],[0,0,3]]
	jStat.diagonal = function diagonal(diagArray) {
	  var mat = jStat.zeros(diagArray.length, diagArray.length);
	  diagArray.forEach(function(t, i) {
	    mat[i][i] = t;
	  });
	  return mat;
	};
	
	
	// return copy of A
	jStat.copy = function copy(A) {
	  return A.map(function(row) {
	    if (isNumber(row))
	      return row;
	    return row.map(function(t) {
	      return t;
	    });
	  });
	};
	
	
	// TODO: Go over this entire implementation. Seems a tragic waste of resources
	// doing all this work. Instead, and while ugly, use new Function() to generate
	// a custom function for each static method.
	
	// Quick reference.
	var jProto = jStat.prototype;
	
	// Default length.
	jProto.length = 0;
	
	// For internal use only.
	// TODO: Check if they're actually used, and if they are then rename them
	// to _*
	jProto.push = Array.prototype.push;
	jProto.sort = Array.prototype.sort;
	jProto.splice = Array.prototype.splice;
	jProto.slice = Array.prototype.slice;
	
	
	// Return a clean array.
	jProto.toArray = function toArray() {
	  return this.length > 1 ? slice.call(this) : slice.call(this)[0];
	};
	
	
	// Map a function to a matrix or vector.
	jProto.map = function map(func, toAlter) {
	  return jStat(jStat.map(this, func, toAlter));
	};
	
	
	// Cumulatively combine the elements of a matrix or vector using a function.
	jProto.cumreduce = function cumreduce(func, toAlter) {
	  return jStat(jStat.cumreduce(this, func, toAlter));
	};
	
	
	// Destructively alter an array.
	jProto.alter = function alter(func) {
	  jStat.alter(this, func);
	  return this;
	};
	
	
	// Extend prototype with methods that have no argument.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function(func) {
	      var self = this,
	      results;
	      // Check for callback.
	      if (func) {
	        setTimeout(function() {
	          func.call(self, jProto[passfunc].call(self));
	        });
	        return this;
	      }
	      results = jStat[passfunc](this);
	      return isArray(results) ? jStat(results) : results;
	    };
	  })(funcs[i]);
	})('transpose clear symmetric rows cols dimensions diag antidiag'.split(' '));
	
	
	// Extend prototype with methods that have one argument.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function(index, func) {
	      var self = this;
	      // check for callback
	      if (func) {
	        setTimeout(function() {
	          func.call(self, jProto[passfunc].call(self, index));
	        });
	        return this;
	      }
	      return jStat(jStat[passfunc](this, index));
	    };
	  })(funcs[i]);
	})('row col'.split(' '));
	
	
	// Extend prototype with simple shortcut methods.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = new Function(
	        'return jStat(jStat.' + passfunc + '.apply(null, arguments));');
	  })(funcs[i]);
	})('create zeros ones rand identity'.split(' '));
	
	
	// Exposing jStat.
	return jStat;
	
	}(Math));
	(function(jStat, Math) {
	
	var isFunction = jStat.utils.isFunction;
	
	// Ascending functions for sort
	function ascNum(a, b) { return a - b; }
	
	function clip(arg, min, max) {
	  return Math.max(min, Math.min(arg, max));
	}
	
	
	// sum of an array
	jStat.sum = function sum(arr) {
	  var sum = 0;
	  var i = arr.length;
	  while (--i >= 0)
	    sum += arr[i];
	  return sum;
	};
	
	
	// sum squared
	jStat.sumsqrd = function sumsqrd(arr) {
	  var sum = 0;
	  var i = arr.length;
	  while (--i >= 0)
	    sum += arr[i] * arr[i];
	  return sum;
	};
	
	
	// sum of squared errors of prediction (SSE)
	jStat.sumsqerr = function sumsqerr(arr) {
	  var mean = jStat.mean(arr);
	  var sum = 0;
	  var i = arr.length;
	  var tmp;
	  while (--i >= 0) {
	    tmp = arr[i] - mean;
	    sum += tmp * tmp;
	  }
	  return sum;
	};
	
	// sum of an array in each row
	jStat.sumrow = function sumrow(arr) {
	  var sum = 0;
	  var i = arr.length;
	  while (--i >= 0)
	    sum += arr[i];
	  return sum;
	};
	
	// product of an array
	jStat.product = function product(arr) {
	  var prod = 1;
	  var i = arr.length;
	  while (--i >= 0)
	    prod *= arr[i];
	  return prod;
	};
	
	
	// minimum value of an array
	jStat.min = function min(arr) {
	  var low = arr[0];
	  var i = 0;
	  while (++i < arr.length)
	    if (arr[i] < low)
	      low = arr[i];
	  return low;
	};
	
	
	// maximum value of an array
	jStat.max = function max(arr) {
	  var high = arr[0];
	  var i = 0;
	  while (++i < arr.length)
	    if (arr[i] > high)
	      high = arr[i];
	  return high;
	};
	
	
	// unique values of an array
	jStat.unique = function unique(arr) {
	  var hash = {}, _arr = [];
	  for(var i = 0; i < arr.length; i++) {
	    if (!hash[arr[i]]) {
	      hash[arr[i]] = true;
	      _arr.push(arr[i]);
	    }
	  }
	  return _arr;
	};
	
	
	// mean value of an array
	jStat.mean = function mean(arr) {
	  return jStat.sum(arr) / arr.length;
	};
	
	
	// mean squared error (MSE)
	jStat.meansqerr = function meansqerr(arr) {
	  return jStat.sumsqerr(arr) / arr.length;
	};
	
	
	// geometric mean of an array
	jStat.geomean = function geomean(arr) {
	  return Math.pow(jStat.product(arr), 1 / arr.length);
	};
	
	
	// median of an array
	jStat.median = function median(arr) {
	  var arrlen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  // check if array is even or odd, then return the appropriate
	  return !(arrlen & 1)
	    ? (_arr[(arrlen / 2) - 1 ] + _arr[(arrlen / 2)]) / 2
	    : _arr[(arrlen / 2) | 0 ];
	};
	
	
	// cumulative sum of an array
	jStat.cumsum = function cumsum(arr) {
	  return jStat.cumreduce(arr, function (a, b) { return a + b; });
	};
	
	
	// cumulative product of an array
	jStat.cumprod = function cumprod(arr) {
	  return jStat.cumreduce(arr, function (a, b) { return a * b; });
	};
	
	
	// successive differences of a sequence
	jStat.diff = function diff(arr) {
	  var diffs = [];
	  var arrLen = arr.length;
	  var i;
	  for (var i = 1; i < arrLen; i++)
	    diffs.push(arr[i] - arr[i - 1]);
	  return diffs;
	};
	
	
	// ranks of an array
	jStat.rank = function (arr) {
	  var arrlen = arr.length;
	  var sorted = arr.slice().sort(ascNum);
	  var ranks = new Array(arrlen);
	  for (var i = 0; i < arrlen; i++) {
	    var first = sorted.indexOf(arr[i]);
	    var last = sorted.lastIndexOf(arr[i]);
	    if (first === last) {
	      var val = first;
	    } else {
	      var val = (first + last) / 2;
	    }
	    ranks[i] = val + 1;
	  }
	  return ranks;
	};
	
	
	// mode of an array
	// if there are multiple modes of an array, return all of them
	// is this the appropriate way of handling it?
	jStat.mode = function mode(arr) {
	  var arrLen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  var count = 1;
	  var maxCount = 0;
	  var numMaxCount = 0;
	  var mode_arr = [];
	  var i;
	
	  for (var i = 0; i < arrLen; i++) {
	    if (_arr[i] === _arr[i + 1]) {
	      count++;
	    } else {
	      if (count > maxCount) {
	        mode_arr = [_arr[i]];
	        maxCount = count;
	        numMaxCount = 0;
	      }
	      // are there multiple max counts
	      else if (count === maxCount) {
	        mode_arr.push(_arr[i]);
	        numMaxCount++;
	      }
	      // resetting count for new value in array
	      count = 1;
	    }
	  }
	
	  return numMaxCount === 0 ? mode_arr[0] : mode_arr;
	};
	
	
	// range of an array
	jStat.range = function range(arr) {
	  return jStat.max(arr) - jStat.min(arr);
	};
	
	// variance of an array
	// flag = true indicates sample instead of population
	jStat.variance = function variance(arr, flag) {
	  return jStat.sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
	};
	
	// deviation of an array
	jStat.deviation = function (arr) {
	  var mean = jStat.mean(arr);
	  var arrlen = arr.length;
	  var dev = new Array(arrlen);
	  for (var i = 0; i < arrlen; i++) {
	    dev[i] = arr[i] - mean;
	  }
	  return dev;
	};
	
	// standard deviation of an array
	// flag = true indicates sample instead of population
	jStat.stdev = function stdev(arr, flag) {
	  return Math.sqrt(jStat.variance(arr, flag));
	};
	
	
	// mean deviation (mean absolute deviation) of an array
	jStat.meandev = function meandev(arr) {
	  var devSum = 0;
	  var mean = jStat.mean(arr);
	  var i;
	  for (var i = arr.length - 1; i >= 0; i--)
	    devSum += Math.abs(arr[i] - mean);
	  return devSum / arr.length;
	};
	
	
	// median deviation (median absolute deviation) of an array
	jStat.meddev = function meddev(arr) {
	  var devSum = 0;
	  var median = jStat.median(arr);
	  var i;
	  for (var i = arr.length - 1; i >= 0; i--)
	    devSum += Math.abs(arr[i] - median);
	  return devSum / arr.length;
	};
	
	
	// coefficient of variation
	jStat.coeffvar = function coeffvar(arr) {
	  return jStat.stdev(arr) / jStat.mean(arr);
	};
	
	
	// quartiles of an array
	jStat.quartiles = function quartiles(arr) {
	  var arrlen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  return [
	    _arr[ Math.round((arrlen) / 4) - 1 ],
	    _arr[ Math.round((arrlen) / 2) - 1 ],
	    _arr[ Math.round((arrlen) * 3 / 4) - 1 ]
	  ];
	};
	
	
	// Arbitary quantiles of an array. Direct port of the scipy.stats
	// implementation by Pierre GF Gerard-Marchant.
	jStat.quantiles = function quantiles(arr, quantilesArray, alphap, betap) {
	  var sortedArray = arr.slice().sort(ascNum);
	  var quantileVals = [quantilesArray.length];
	  var n = arr.length;
	  var i, p, m, aleph, k, gamma;
	
	  if (typeof alphap === 'undefined')
	    alphap = 3 / 8;
	  if (typeof betap === 'undefined')
	    betap = 3 / 8;
	
	  for (var i = 0; i < quantilesArray.length; i++) {
	    p = quantilesArray[i];
	    m = alphap + p * (1 - alphap - betap);
	    aleph = n * p + m;
	    k = Math.floor(clip(aleph, 1, n - 1));
	    gamma = clip(aleph - k, 0, 1);
	    quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k];
	  }
	
	  return quantileVals;
	};
	
	// Returns the k-th percentile of values in a range, where k is in the
	// range 0..1, exclusive.
	jStat.percentile = function percentile(arr, k) {
	  var _arr = arr.slice().sort(ascNum);
	  var realIndex = k * (_arr.length - 1);
	  var index = parseInt(realIndex);
	  var frac = realIndex - index;
	
	  if (index + 1 < _arr.length) {
	    return _arr[index] * (1 - frac) + _arr[index + 1] * frac;
	  } else {
	    return _arr[index];
	  }
	}
	
	
	// The percentile rank of score in a given array. Returns the percentage
	// of all values in the input array that are less than (kind='strict') or
	// less or equal than (kind='weak') score. Default is weak.
	jStat.percentileOfScore = function percentileOfScore(arr, score, kind) {
	  var counter = 0;
	  var len = arr.length;
	  var strict = false;
	  var value, i;
	
	  if (kind === 'strict')
	    strict = true;
	
	  for (var i = 0; i < len; i++) {
	    value = arr[i];
	    if ((strict && value < score) ||
	        (!strict && value <= score)) {
	      counter++;
	    }
	  }
	
	  return counter / len;
	};
	
	
	// Histogram (bin count) data
	jStat.histogram = function histogram(arr, bins) {
	  var first = jStat.min(arr);
	  var binCnt = bins || 4;
	  var binWidth = (jStat.max(arr) - first) / binCnt;
	  var len = arr.length;
	  var bins = [];
	  var i;
	
	  for (var i = 0; i < binCnt; i++)
	    bins[i] = 0;
	  for (var i = 0; i < len; i++)
	    bins[Math.min(Math.floor(((arr[i] - first) / binWidth)), binCnt - 1)] += 1;
	
	  return bins;
	};
	
	
	// covariance of two arrays
	jStat.covariance = function covariance(arr1, arr2) {
	  var u = jStat.mean(arr1);
	  var v = jStat.mean(arr2);
	  var arr1Len = arr1.length;
	  var sq_dev = new Array(arr1Len);
	  var i;
	
	  for (var i = 0; i < arr1Len; i++)
	    sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
	
	  return jStat.sum(sq_dev) / (arr1Len - 1);
	};
	
	
	// (pearson's) population correlation coefficient, rho
	jStat.corrcoeff = function corrcoeff(arr1, arr2) {
	  return jStat.covariance(arr1, arr2) /
	      jStat.stdev(arr1, 1) /
	      jStat.stdev(arr2, 1);
	};
	
	  // (spearman's) rank correlation coefficient, sp
	jStat.spearmancoeff =  function (arr1, arr2) {
	  arr1 = jStat.rank(arr1);
	  arr2 = jStat.rank(arr2);
	  var arr1dev = jStat.deviation(arr1);
	  var arr2dev = jStat.deviation(arr2);
	  return jStat.sum(arr1dev.map(function (x, i) {
	    return x * arr2dev[i];
	  })) /
	  Math.sqrt(jStat.sum(arr1dev.map(function (x) {
	    return Math.pow(x, 2);
	    })) * jStat.sum(arr2dev.map(function (x) {
	      return Math.pow(x, 2);
	  }))
	  );
	}
	
	
	// statistical standardized moments (general form of skew/kurt)
	jStat.stanMoment = function stanMoment(arr, n) {
	  var mu = jStat.mean(arr);
	  var sigma = jStat.stdev(arr);
	  var len = arr.length;
	  var skewSum = 0;
	
	  for (var i = 0; i < len; i++)
	    skewSum += Math.pow((arr[i] - mu) / sigma, n);
	
	  return skewSum / arr.length;
	};
	
	// (pearson's) moment coefficient of skewness
	jStat.skewness = function skewness(arr) {
	  return jStat.stanMoment(arr, 3);
	};
	
	// (pearson's) (excess) kurtosis
	jStat.kurtosis = function kurtosis(arr) {
	  return jStat.stanMoment(arr, 4) - 3;
	};
	
	
	var jProto = jStat.prototype;
	
	
	// Extend jProto with method for calculating cumulative sums and products.
	// This differs from the similar extension below as cumsum and cumprod should
	// not be run again in the case fullbool === true.
	// If a matrix is passed, automatically assume operation should be done on the
	// columns.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    // If a matrix is passed, automatically assume operation should be done on
	    // the columns.
	    jProto[passfunc] = function(fullbool, func) {
	      var arr = [];
	      var i = 0;
	      var tmpthis = this;
	      // Assignment reassignation depending on how parameters were passed in.
	      if (isFunction(fullbool)) {
	        func = fullbool;
	        fullbool = false;
	      }
	      // Check if a callback was passed with the function.
	      if (func) {
	        setTimeout(function() {
	          func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
	        });
	        return this;
	      }
	      // Check if matrix and run calculations.
	      if (this.length > 1) {
	        tmpthis = fullbool === true ? this : this.transpose();
	        for (; i < tmpthis.length; i++)
	          arr[i] = jStat[passfunc](tmpthis[i]);
	        return arr;
	      }
	      // Pass fullbool if only vector, not a matrix. for variance and stdev.
	      return jStat[passfunc](this[0], fullbool);
	    };
	  })(funcs[i]);
	})(('cumsum cumprod').split(' '));
	
	
	// Extend jProto with methods which don't require arguments and work on columns.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    // If a matrix is passed, automatically assume operation should be done on
	    // the columns.
	    jProto[passfunc] = function(fullbool, func) {
	      var arr = [];
	      var i = 0;
	      var tmpthis = this;
	      // Assignment reassignation depending on how parameters were passed in.
	      if (isFunction(fullbool)) {
	        func = fullbool;
	        fullbool = false;
	      }
	      // Check if a callback was passed with the function.
	      if (func) {
	        setTimeout(function() {
	          func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
	        });
	        return this;
	      }
	      // Check if matrix and run calculations.
	      if (this.length > 1) {
	        if (passfunc !== 'sumrow')
	          tmpthis = fullbool === true ? this : this.transpose();
	        for (; i < tmpthis.length; i++)
	          arr[i] = jStat[passfunc](tmpthis[i]);
	        return fullbool === true
	            ? jStat[passfunc](jStat.utils.toVector(arr))
	            : arr;
	      }
	      // Pass fullbool if only vector, not a matrix. for variance and stdev.
	      return jStat[passfunc](this[0], fullbool);
	    };
	  })(funcs[i]);
	})(('sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr ' +
	    'geomean median diff rank mode range variance deviation stdev meandev ' +
	    'meddev coeffvar quartiles histogram skewness kurtosis').split(' '));
	
	
	// Extend jProto with functions that take arguments. Operations on matrices are
	// done on columns.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function() {
	      var arr = [];
	      var i = 0;
	      var tmpthis = this;
	      var args = Array.prototype.slice.call(arguments);
	
	      // If the last argument is a function, we assume it's a callback; we
	      // strip the callback out and call the function again.
	      if (isFunction(args[args.length - 1])) {
	        var callbackFunction = args[args.length - 1];
	        var argsToPass = args.slice(0, args.length - 1);
	
	        setTimeout(function() {
	          callbackFunction.call(tmpthis,
	                                jProto[passfunc].apply(tmpthis, argsToPass));
	        });
	        return this;
	
	      // Otherwise we curry the function args and call normally.
	      } else {
	        var callbackFunction = undefined;
	        var curriedFunction = function curriedFunction(vector) {
	          return jStat[passfunc].apply(tmpthis, [vector].concat(args));
	        }
	      }
	
	      // If this is a matrix, run column-by-column.
	      if (this.length > 1) {
	        tmpthis = tmpthis.transpose();
	        for (; i < tmpthis.length; i++)
	          arr[i] = curriedFunction(tmpthis[i]);
	        return arr;
	      }
	
	      // Otherwise run on the vector.
	      return curriedFunction(this[0]);
	    };
	  })(funcs[i]);
	})('quantiles percentileOfScore'.split(' '));
	
	}(this.jStat, Math));
	// Special functions //
	(function(jStat, Math) {
	
	// Log-gamma function
	jStat.gammaln = function gammaln(x) {
	  var j = 0;
	  var cof = [
	    76.18009172947146, -86.50532032941677, 24.01409824083091,
	    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
	  ];
	  var ser = 1.000000000190015;
	  var xx, y, tmp;
	  tmp = (y = xx = x) + 5.5;
	  tmp -= (xx + 0.5) * Math.log(tmp);
	  for (; j < 6; j++)
	    ser += cof[j] / ++y;
	  return Math.log(2.5066282746310005 * ser / xx) - tmp;
	};
	
	
	// gamma of x
	jStat.gammafn = function gammafn(x) {
	  var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
	           629.3311553128184, 866.9662027904133, -31451.272968848367,
	           -36144.413418691176, 66456.14382024054
	  ];
	  var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
	           -3107.771671572311, 22538.118420980151, 4755.8462775278811,
	           -134659.9598649693, -115132.2596755535];
	  var fact = false;
	  var n = 0;
	  var xden = 0;
	  var xnum = 0;
	  var y = x;
	  var i, z, yi, res, sum, ysq;
	  if (y <= 0) {
	    res = y % 1 + 3.6e-16;
	    if (res) {
	      fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
	      y = 1 - y;
	    } else {
	      return Infinity;
	    }
	  }
	  yi = y;
	  if (y < 1) {
	    z = y++;
	  } else {
	    z = (y -= n = (y | 0) - 1) - 1;
	  }
	  for (var i = 0; i < 8; ++i) {
	    xnum = (xnum + p[i]) * z;
	    xden = xden * z + q[i];
	  }
	  res = xnum / xden + 1;
	  if (yi < y) {
	    res /= yi;
	  } else if (yi > y) {
	    for (var i = 0; i < n; ++i) {
	      res *= y;
	      y++;
	    }
	  }
	  if (fact) {
	    res = fact / res;
	  }
	  return res;
	};
	
	
	// lower incomplete gamma function, which is usually typeset with a
	// lower-case greek gamma as the function symbol
	jStat.gammap = function gammap(a, x) {
	  return jStat.lowRegGamma(a, x) * jStat.gammafn(a);
	};
	
	
	// The lower regularized incomplete gamma function, usually written P(a,x)
	jStat.lowRegGamma = function lowRegGamma(a, x) {
	  var aln = jStat.gammaln(a);
	  var ap = a;
	  var sum = 1 / a;
	  var del = sum;
	  var b = x + 1 - a;
	  var c = 1 / 1.0e-30;
	  var d = 1 / b;
	  var h = d;
	  var i = 1;
	  // calculate maximum number of itterations required for a
	  var ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17);
	  var an, endval;
	
	  if (x < 0 || a <= 0) {
	    return NaN;
	  } else if (x < a + 1) {
	    for (; i <= ITMAX; i++) {
	      sum += del *= x / ++ap;
	    }
	    return (sum * Math.exp(-x + a * Math.log(x) - (aln)));
	  }
	
	  for (; i <= ITMAX; i++) {
	    an = -i * (i - a);
	    b += 2;
	    d = an * d + b;
	    c = b + an / c;
	    d = 1 / d;
	    h *= d * c;
	  }
	
	  return (1 - h * Math.exp(-x + a * Math.log(x) - (aln)));
	};
	
	// natural log factorial of n
	jStat.factorialln = function factorialln(n) {
	  return n < 0 ? NaN : jStat.gammaln(n + 1);
	};
	
	// factorial of n
	jStat.factorial = function factorial(n) {
	  return n < 0 ? NaN : jStat.gammafn(n + 1);
	};
	
	// combinations of n, m
	jStat.combination = function combination(n, m) {
	  // make sure n or m don't exceed the upper limit of usable values
	  return (n > 170 || m > 170)
	      ? Math.exp(jStat.combinationln(n, m))
	      : (jStat.factorial(n) / jStat.factorial(m)) / jStat.factorial(n - m);
	};
	
	
	jStat.combinationln = function combinationln(n, m){
	  return jStat.factorialln(n) - jStat.factorialln(m) - jStat.factorialln(n - m);
	};
	
	
	// permutations of n, m
	jStat.permutation = function permutation(n, m) {
	  return jStat.factorial(n) / jStat.factorial(n - m);
	};
	
	
	// beta function
	jStat.betafn = function betafn(x, y) {
	  // ensure arguments are positive
	  if (x <= 0 || y <= 0)
	    return undefined;
	  // make sure x + y doesn't exceed the upper limit of usable values
	  return (x + y > 170)
	      ? Math.exp(jStat.betaln(x, y))
	      : jStat.gammafn(x) * jStat.gammafn(y) / jStat.gammafn(x + y);
	};
	
	
	// natural logarithm of beta function
	jStat.betaln = function betaln(x, y) {
	  return jStat.gammaln(x) + jStat.gammaln(y) - jStat.gammaln(x + y);
	};
	
	
	// Evaluates the continued fraction for incomplete beta function by modified
	// Lentz's method.
	jStat.betacf = function betacf(x, a, b) {
	  var fpmin = 1e-30;
	  var m = 1;
	  var qab = a + b;
	  var qap = a + 1;
	  var qam = a - 1;
	  var c = 1;
	  var d = 1 - qab * x / qap;
	  var m2, aa, del, h;
	
	  // These q's will be used in factors that occur in the coefficients
	  if (Math.abs(d) < fpmin)
	    d = fpmin;
	  d = 1 / d;
	  h = d;
	
	  for (; m <= 100; m++) {
	    m2 = 2 * m;
	    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
	    // One step (the even one) of the recurrence
	    d = 1 + aa * d;
	    if (Math.abs(d) < fpmin)
	      d = fpmin;
	    c = 1 + aa / c;
	    if (Math.abs(c) < fpmin)
	      c = fpmin;
	    d = 1 / d;
	    h *= d * c;
	    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
	    // Next step of the recurrence (the odd one)
	    d = 1 + aa * d;
	    if (Math.abs(d) < fpmin)
	      d = fpmin;
	    c = 1 + aa / c;
	    if (Math.abs(c) < fpmin)
	      c = fpmin;
	    d = 1 / d;
	    del = d * c;
	    h *= del;
	    if (Math.abs(del - 1.0) < 3e-7)
	      break;
	  }
	
	  return h;
	};
	
	
	// Returns the inverse of the lower regularized inomplete gamma function
	jStat.gammapinv = function gammapinv(p, a) {
	  var j = 0;
	  var a1 = a - 1;
	  var EPS = 1e-8;
	  var gln = jStat.gammaln(a);
	  var x, err, t, u, pp, lna1, afac;
	
	  if (p >= 1)
	    return Math.max(100, a + 100 * Math.sqrt(a));
	  if (p <= 0)
	    return 0;
	  if (a > 1) {
	    lna1 = Math.log(a1);
	    afac = Math.exp(a1 * (lna1 - 1) - gln);
	    pp = (p < 0.5) ? p : 1 - p;
	    t = Math.sqrt(-2 * Math.log(pp));
	    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
	    if (p < 0.5)
	      x = -x;
	    x = Math.max(1e-3,
	                 a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3));
	  } else {
	    t = 1 - a * (0.253 + a * 0.12);
	    if (p < t)
	      x = Math.pow(p / t, 1 / a);
	    else
	      x = 1 - Math.log(1 - (p - t) / (1 - t));
	  }
	
	  for(; j < 12; j++) {
	    if (x <= 0)
	      return 0;
	    err = jStat.lowRegGamma(a, x) - p;
	    if (a > 1)
	      t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1));
	    else
	      t = Math.exp(-x + a1 * Math.log(x) - gln);
	    u = err / t;
	    x -= (t = u / (1 - 0.5 * Math.min(1, u * ((a - 1) / x - 1))));
	    if (x <= 0)
	      x = 0.5 * (x + t);
	    if (Math.abs(t) < EPS * x)
	      break;
	  }
	
	  return x;
	};
	
	
	// Returns the error function erf(x)
	jStat.erf = function erf(x) {
	  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
	             -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
	             4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
	             1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
	             6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
	             -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
	             -6.886027e-12, 8.94487e-13, 3.13092e-13,
	             -1.12708e-13, 3.81e-16, 7.106e-15,
	             -1.523e-15, -9.4e-17, 1.21e-16,
	             -2.8e-17];
	  var j = cof.length - 1;
	  var isneg = false;
	  var d = 0;
	  var dd = 0;
	  var t, ty, tmp, res;
	
	  if (x < 0) {
	    x = -x;
	    isneg = true;
	  }
	
	  t = 2 / (2 + x);
	  ty = 4 * t - 2;
	
	  for(; j > 0; j--) {
	    tmp = d;
	    d = ty * d - dd + cof[j];
	    dd = tmp;
	  }
	
	  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
	  return isneg ? res - 1 : 1 - res;
	};
	
	
	// Returns the complmentary error function erfc(x)
	jStat.erfc = function erfc(x) {
	  return 1 - jStat.erf(x);
	};
	
	
	// Returns the inverse of the complementary error function
	jStat.erfcinv = function erfcinv(p) {
	  var j = 0;
	  var x, err, t, pp;
	  if (p >= 2)
	    return -100;
	  if (p <= 0)
	    return 100;
	  pp = (p < 1) ? p : 2 - p;
	  t = Math.sqrt(-2 * Math.log(pp / 2));
	  x = -0.70711 * ((2.30753 + t * 0.27061) /
	                  (1 + t * (0.99229 + t * 0.04481)) - t);
	  for (; j < 2; j++) {
	    err = jStat.erfc(x) - pp;
	    x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
	  }
	  return (p < 1) ? x : -x;
	};
	
	
	// Returns the inverse of the incomplete beta function
	jStat.ibetainv = function ibetainv(p, a, b) {
	  var EPS = 1e-8;
	  var a1 = a - 1;
	  var b1 = b - 1;
	  var j = 0;
	  var lna, lnb, pp, t, u, err, x, al, h, w, afac;
	  if (p <= 0)
	    return 0;
	  if (p >= 1)
	    return 1;
	  if (a >= 1 && b >= 1) {
	    pp = (p < 0.5) ? p : 1 - p;
	    t = Math.sqrt(-2 * Math.log(pp));
	    x = (2.30753 + t * 0.27061) / (1 + t* (0.99229 + t * 0.04481)) - t;
	    if (p < 0.5)
	      x = -x;
	    al = (x * x - 3) / 6;
	    h = 2 / (1 / (2 * a - 1)  + 1 / (2 * b - 1));
	    w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
	        (al + 5 / 6 - 2 / (3 * h));
	    x = a / (a + b * Math.exp(2 * w));
	  } else {
	    lna = Math.log(a / (a + b));
	    lnb = Math.log(b / (a + b));
	    t = Math.exp(a * lna) / a;
	    u = Math.exp(b * lnb) / b;
	    w = t + u;
	    if (p < t / w)
	      x = Math.pow(a * w * p, 1 / a);
	    else
	      x = 1 - Math.pow(b * w * (1 - p), 1 / b);
	  }
	  afac = -jStat.gammaln(a) - jStat.gammaln(b) + jStat.gammaln(a + b);
	  for(; j < 10; j++) {
	    if (x === 0 || x === 1)
	      return x;
	    err = jStat.ibeta(x, a, b) - p;
	    t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
	    u = err / t;
	    x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
	    if (x <= 0)
	      x = 0.5 * (x + t);
	    if (x >= 1)
	      x = 0.5 * (x + t + 1);
	    if (Math.abs(t) < EPS * x && j > 0)
	      break;
	  }
	  return x;
	};
	
	
	// Returns the incomplete beta function I_x(a,b)
	jStat.ibeta = function ibeta(x, a, b) {
	  // Factors in front of the continued fraction.
	  var bt = (x === 0 || x === 1) ?  0 :
	    Math.exp(jStat.gammaln(a + b) - jStat.gammaln(a) -
	             jStat.gammaln(b) + a * Math.log(x) + b *
	             Math.log(1 - x));
	  if (x < 0 || x > 1)
	    return false;
	  if (x < (a + 1) / (a + b + 2))
	    // Use continued fraction directly.
	    return bt * jStat.betacf(x, a, b) / a;
	  // else use continued fraction after making the symmetry transformation.
	  return 1 - bt * jStat.betacf(1 - x, b, a) / b;
	};
	
	
	// Returns a normal deviate (mu=0, sigma=1).
	// If n and m are specified it returns a object of normal deviates.
	jStat.randn = function randn(n, m) {
	  var u, v, x, y, q, mat;
	  if (!m)
	    m = n;
	  if (n)
	    return jStat.create(n, m, function() { return jStat.randn(); });
	  do {
	    u = Math.random();
	    v = 1.7156 * (Math.random() - 0.5);
	    x = u - 0.449871;
	    y = Math.abs(v) + 0.386595;
	    q = x * x + y * (0.19600 * y - 0.25472 * x);
	  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
	  return v / u;
	};
	
	
	// Returns a gamma deviate by the method of Marsaglia and Tsang.
	jStat.randg = function randg(shape, n, m) {
	  var oalph = shape;
	  var a1, a2, u, v, x, mat;
	  if (!m)
	    m = n;
	  if (!shape)
	    shape = 1;
	  if (n) {
	    mat = jStat.zeros(n,m);
	    mat.alter(function() { return jStat.randg(shape); });
	    return mat;
	  }
	  if (shape < 1)
	    shape += 1;
	  a1 = shape - 1 / 3;
	  a2 = 1 / Math.sqrt(9 * a1);
	  do {
	    do {
	      x = jStat.randn();
	      v = 1 + a2 * x;
	    } while(v <= 0);
	    v = v * v * v;
	    u = Math.random();
	  } while(u > 1 - 0.331 * Math.pow(x, 4) &&
	          Math.log(u) > 0.5 * x*x + a1 * (1 - v + Math.log(v)));
	  // alpha > 1
	  if (shape == oalph)
	    return a1 * v;
	  // alpha < 1
	  do {
	    u = Math.random();
	  } while(u === 0);
	  return Math.pow(u, 1 / oalph) * a1 * v;
	};
	
	
	// making use of static methods on the instance
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function() {
	      return jStat(
	          jStat.map(this, function(value) { return jStat[passfunc](value); }));
	    }
	  })(funcs[i]);
	})('gammaln gammafn factorial factorialln'.split(' '));
	
	
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function() {
	      return jStat(jStat[passfunc].apply(null, arguments));
	    };
	  })(funcs[i]);
	})('randn'.split(' '));
	
	}(this.jStat, Math));
	(function(jStat, Math) {
	
	// generate all distribution instance methods
	(function(list) {
	  for (var i = 0; i < list.length; i++) (function(func) {
	    // distribution instance method
	    jStat[func] = function(a, b, c) {
	      if (!(this instanceof arguments.callee))
	        return new arguments.callee(a, b, c);
	      this._a = a;
	      this._b = b;
	      this._c = c;
	      return this;
	    };
	    // distribution method to be used on a jStat instance
	    jStat.fn[func] = function(a, b, c) {
	      var newthis = jStat[func](a, b, c);
	      newthis.data = this;
	      return newthis;
	    };
	    // sample instance method
	    jStat[func].prototype.sample = function(arr) {
	      var a = this._a;
	      var b = this._b;
	      var c = this._c;
	      if (arr)
	        return jStat.alter(arr, function() {
	          return jStat[func].sample(a, b, c);
	        });
	      else
	        return jStat[func].sample(a, b, c);
	    };
	    // generate the pdf, cdf and inv instance methods
	    (function(vals) {
	      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
	        jStat[func].prototype[fnfunc] = function(x) {
	          var a = this._a;
	          var b = this._b;
	          var c = this._c;
	          if (!x && x !== 0)
	            x = this.data;
	          if (typeof x !== 'number') {
	            return jStat.fn.map.call(x, function(x) {
	              return jStat[func][fnfunc](x, a, b, c);
	            });
	          }
	          return jStat[func][fnfunc](x, a, b, c);
	        };
	      })(vals[i]);
	    })('pdf cdf inv'.split(' '));
	    // generate the mean, median, mode and variance instance methods
	    (function(vals) {
	      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
	        jStat[func].prototype[fnfunc] = function() {
	          return jStat[func][fnfunc](this._a, this._b, this._c);
	        };
	      })(vals[i]);
	    })('mean median mode variance'.split(' '));
	  })(list[i]);
	})((
	  'beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy ' +
	  'laplace lognormal noncentralt normal pareto studentt weibull uniform ' +
	  'binomial negbin hypgeom poisson triangular'
	).split(' '));
	
	
	
	// extend beta function with static methods
	jStat.extend(jStat.beta, {
	  pdf: function pdf(x, alpha, beta) {
	    // PDF is zero outside the support
	    if (x > 1 || x < 0)
	      return 0;
	    // PDF is one for the uniform case
	    if (alpha == 1 && beta == 1)
	      return 1;
	
	    if (alpha < 512 && beta < 512) {
	      return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) /
	          jStat.betafn(alpha, beta);
	    } else {
	      return Math.exp((alpha - 1) * Math.log(x) +
	                      (beta - 1) * Math.log(1 - x) -
	                      jStat.betaln(alpha, beta));
	    }
	  },
	
	  cdf: function cdf(x, alpha, beta) {
	    return (x > 1 || x < 0) ? (x > 1) * 1 : jStat.ibeta(x, alpha, beta);
	  },
	
	  inv: function inv(x, alpha, beta) {
	    return jStat.ibetainv(x, alpha, beta);
	  },
	
	  mean: function mean(alpha, beta) {
	    return alpha / (alpha + beta);
	  },
	
	  median: function median(alpha, beta) {
	    return jStat.ibetainv(0.5, alpha, beta);
	  },
	
	  mode: function mode(alpha, beta) {
	    return (alpha - 1 ) / ( alpha + beta - 2);
	  },
	
	  // return a random sample
	  sample: function sample(alpha, beta) {
	    var u = jStat.randg(alpha);
	    return u / (u + jStat.randg(beta));
	  },
	
	  variance: function variance(alpha, beta) {
	    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
	  }
	});
	
	// extend F function with static methods
	jStat.extend(jStat.centralF, {
	  // This implementation of the pdf function avoids float overflow
	  // See the way that R calculates this value:
	  // https://svn.r-project.org/R/trunk/src/nmath/df.c
	  pdf: function pdf(x, df1, df2) {
	    var p, q, f;
	
	    if (x < 0)
	      return 0;
	
	    if (df1 <= 2) {
	      if (x === 0 && df1 < 2) {
	        return Infinity;
	      }
	      if (x === 0 && df1 === 2) {
	        return 1;
	      }
	      return Math.sqrt((Math.pow(df1 * x, df1) * Math.pow(df2, df2)) /
	                       (Math.pow(df1 * x + df2, df1 + df2))) /
	                       (x * jStat.betafn(df1/2, df2/2));
	    }
	
	    p = (df1 * x) / (df2 + x * df1);
	    q = df2 / (df2 + x * df1);
	    f = df1 * q / 2.0;
	    return f * jStat.binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p);
	  },
	
	  cdf: function cdf(x, df1, df2) {
	    if (x < 0)
	      return 0;
	    return jStat.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
	  },
	
	  inv: function inv(x, df1, df2) {
	    return df2 / (df1 * (1 / jStat.ibetainv(x, df1 / 2, df2 / 2) - 1));
	  },
	
	  mean: function mean(df1, df2) {
	    return (df2 > 2) ? df2 / (df2 - 2) : undefined;
	  },
	
	  mode: function mode(df1, df2) {
	    return (df1 > 2) ? (df2 * (df1 - 2)) / (df1 * (df2 + 2)) : undefined;
	  },
	
	  // return a random sample
	  sample: function sample(df1, df2) {
	    var x1 = jStat.randg(df1 / 2) * 2;
	    var x2 = jStat.randg(df2 / 2) * 2;
	    return (x1 / df1) / (x2 / df2);
	  },
	
	  variance: function variance(df1, df2) {
	    if (df2 <= 4)
	      return undefined;
	    return 2 * df2 * df2 * (df1 + df2 - 2) /
	        (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
	  }
	});
	
	
	// extend cauchy function with static methods
	jStat.extend(jStat.cauchy, {
	  pdf: function pdf(x, local, scale) {
	    if (scale < 0) { return 0; }
	
	    return (scale / (Math.pow(x - local, 2) + Math.pow(scale, 2))) / Math.PI;
	  },
	
	  cdf: function cdf(x, local, scale) {
	    return Math.atan((x - local) / scale) / Math.PI + 0.5;
	  },
	
	  inv: function(p, local, scale) {
	    return local + scale * Math.tan(Math.PI * (p - 0.5));
	  },
	
	  median: function median(local, scale) {
	    return local;
	  },
	
	  mode: function mode(local, scale) {
	    return local;
	  },
	
	  sample: function sample(local, scale) {
	    return jStat.randn() *
	        Math.sqrt(1 / (2 * jStat.randg(0.5))) * scale + local;
	  }
	});
	
	
	
	// extend chisquare function with static methods
	jStat.extend(jStat.chisquare, {
	  pdf: function pdf(x, dof) {
	    if (x < 0)
	      return 0;
	    return (x === 0 && dof === 2) ? 0.5 :
	        Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - (dof / 2) *
	                 Math.log(2) - jStat.gammaln(dof / 2));
	  },
	
	  cdf: function cdf(x, dof) {
	    if (x < 0)
	      return 0;
	    return jStat.lowRegGamma(dof / 2, x / 2);
	  },
	
	  inv: function(p, dof) {
	    return 2 * jStat.gammapinv(p, 0.5 * dof);
	  },
	
	  mean : function(dof) {
	    return dof;
	  },
	
	  // TODO: this is an approximation (is there a better way?)
	  median: function median(dof) {
	    return dof * Math.pow(1 - (2 / (9 * dof)), 3);
	  },
	
	  mode: function mode(dof) {
	    return (dof - 2 > 0) ? dof - 2 : 0;
	  },
	
	  sample: function sample(dof) {
	    return jStat.randg(dof / 2) * 2;
	  },
	
	  variance: function variance(dof) {
	    return 2 * dof;
	  }
	});
	
	
	
	// extend exponential function with static methods
	jStat.extend(jStat.exponential, {
	  pdf: function pdf(x, rate) {
	    return x < 0 ? 0 : rate * Math.exp(-rate * x);
	  },
	
	  cdf: function cdf(x, rate) {
	    return x < 0 ? 0 : 1 - Math.exp(-rate * x);
	  },
	
	  inv: function(p, rate) {
	    return -Math.log(1 - p) / rate;
	  },
	
	  mean : function(rate) {
	    return 1 / rate;
	  },
	
	  median: function (rate) {
	    return (1 / rate) * Math.log(2);
	  },
	
	  mode: function mode(rate) {
	    return 0;
	  },
	
	  sample: function sample(rate) {
	    return -1 / rate * Math.log(Math.random());
	  },
	
	  variance : function(rate) {
	    return Math.pow(rate, -2);
	  }
	});
	
	
	
	// extend gamma function with static methods
	jStat.extend(jStat.gamma, {
	  pdf: function pdf(x, shape, scale) {
	    if (x < 0)
	      return 0;
	    return (x === 0 && shape === 1) ? 1 / scale :
	            Math.exp((shape - 1) * Math.log(x) - x / scale -
	                    jStat.gammaln(shape) - shape * Math.log(scale));
	  },
	
	  cdf: function cdf(x, shape, scale) {
	    if (x < 0)
	      return 0;
	    return jStat.lowRegGamma(shape, x / scale);
	  },
	
	  inv: function(p, shape, scale) {
	    return jStat.gammapinv(p, shape) * scale;
	  },
	
	  mean : function(shape, scale) {
	    return shape * scale;
	  },
	
	  mode: function mode(shape, scale) {
	    if(shape > 1) return (shape - 1) * scale;
	    return undefined;
	  },
	
	  sample: function sample(shape, scale) {
	    return jStat.randg(shape) * scale;
	  },
	
	  variance: function variance(shape, scale) {
	    return shape * scale * scale;
	  }
	});
	
	// extend inverse gamma function with static methods
	jStat.extend(jStat.invgamma, {
	  pdf: function pdf(x, shape, scale) {
	    if (x <= 0)
	      return 0;
	    return Math.exp(-(shape + 1) * Math.log(x) - scale / x -
	                    jStat.gammaln(shape) + shape * Math.log(scale));
	  },
	
	  cdf: function cdf(x, shape, scale) {
	    if (x <= 0)
	      return 0;
	    return 1 - jStat.lowRegGamma(shape, scale / x);
	  },
	
	  inv: function(p, shape, scale) {
	    return scale / jStat.gammapinv(1 - p, shape);
	  },
	
	  mean : function(shape, scale) {
	    return (shape > 1) ? scale / (shape - 1) : undefined;
	  },
	
	  mode: function mode(shape, scale) {
	    return scale / (shape + 1);
	  },
	
	  sample: function sample(shape, scale) {
	    return scale / jStat.randg(shape);
	  },
	
	  variance: function variance(shape, scale) {
	    if (shape <= 2)
	      return undefined;
	    return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
	  }
	});
	
	
	// extend kumaraswamy function with static methods
	jStat.extend(jStat.kumaraswamy, {
	  pdf: function pdf(x, alpha, beta) {
	    if (x === 0 && alpha === 1)
	      return beta;
	    else if (x === 1 && beta === 1)
	      return alpha;
	    return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) *
	                    Math.log(x) + (beta - 1) *
	                    Math.log(1 - Math.pow(x, alpha)));
	  },
	
	  cdf: function cdf(x, alpha, beta) {
	    if (x < 0)
	      return 0;
	    else if (x > 1)
	      return 1;
	    return (1 - Math.pow(1 - Math.pow(x, alpha), beta));
	  },
	
	  inv: function inv(p, alpha, beta) {
	    return Math.pow(1 - Math.pow(1 - p, 1 / beta), 1 / alpha);
	  },
	
	  mean : function(alpha, beta) {
	    return (beta * jStat.gammafn(1 + 1 / alpha) *
	            jStat.gammafn(beta)) / (jStat.gammafn(1 + 1 / alpha + beta));
	  },
	
	  median: function median(alpha, beta) {
	    return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha);
	  },
	
	  mode: function mode(alpha, beta) {
	    if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
	      return undefined;
	    return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
	  },
	
	  variance: function variance(alpha, beta) {
	    throw new Error('variance not yet implemented');
	    // TODO: complete this
	  }
	});
	
	
	
	// extend lognormal function with static methods
	jStat.extend(jStat.lognormal, {
	  pdf: function pdf(x, mu, sigma) {
	    if (x <= 0)
	      return 0;
	    return Math.exp(-Math.log(x) - 0.5 * Math.log(2 * Math.PI) -
	                    Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) /
	                    (2 * sigma * sigma));
	  },
	
	  cdf: function cdf(x, mu, sigma) {
	    if (x < 0)
	      return 0;
	    return 0.5 +
	        (0.5 * jStat.erf((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma)));
	  },
	
	  inv: function(p, mu, sigma) {
	    return Math.exp(-1.41421356237309505 * sigma * jStat.erfcinv(2 * p) + mu);
	  },
	
	  mean: function mean(mu, sigma) {
	    return Math.exp(mu + sigma * sigma / 2);
	  },
	
	  median: function median(mu, sigma) {
	    return Math.exp(mu);
	  },
	
	  mode: function mode(mu, sigma) {
	    return Math.exp(mu - sigma * sigma);
	  },
	
	  sample: function sample(mu, sigma) {
	    return Math.exp(jStat.randn() * sigma + mu);
	  },
	
	  variance: function variance(mu, sigma) {
	    return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
	  }
	});
	
	
	
	// extend noncentralt function with static methods
	jStat.extend(jStat.noncentralt, {
	  pdf: function pdf(x, dof, ncp) {
	    var tol = 1e-14;
	    if (Math.abs(ncp) < tol)  // ncp approx 0; use student-t
	      return jStat.studentt.pdf(x, dof)
	
	    if (Math.abs(x) < tol) {  // different formula for x == 0
	      return Math.exp(jStat.gammaln((dof + 1) / 2) - ncp * ncp / 2 -
	                      0.5 * Math.log(Math.PI * dof) - jStat.gammaln(dof / 2));
	    }
	
	    // formula for x != 0
	    return dof / x *
	        (jStat.noncentralt.cdf(x * Math.sqrt(1 + 2 / dof), dof+2, ncp) -
	         jStat.noncentralt.cdf(x, dof, ncp));
	  },
	
	  cdf: function cdf(x, dof, ncp) {
	    var tol = 1e-14;
	    var min_iterations = 200;
	
	    if (Math.abs(ncp) < tol)  // ncp approx 0; use student-t
	      return jStat.studentt.cdf(x, dof);
	
	    // turn negative x into positive and flip result afterwards
	    var flip = false;
	    if (x < 0) {
	      flip = true;
	      ncp = -ncp;
	    }
	
	    var prob = jStat.normal.cdf(-ncp, 0, 1);
	    var value = tol + 1;
	    // use value at last two steps to determine convergence
	    var lastvalue = value;
	    var y = x * x / (x * x + dof);
	    var j = 0;
	    var p = Math.exp(-ncp * ncp / 2);
	    var q = Math.exp(-ncp * ncp / 2 - 0.5 * Math.log(2) -
	                     jStat.gammaln(3 / 2)) * ncp;
	    while (j < min_iterations || lastvalue > tol || value > tol) {
	      lastvalue = value;
	      if (j > 0) {
	        p *= (ncp * ncp) / (2 * j);
	        q *= (ncp * ncp) / (2 * (j + 1 / 2));
	      }
	      value = p * jStat.beta.cdf(y, j + 0.5, dof / 2) +
	          q * jStat.beta.cdf(y, j+1, dof/2);
	      prob += 0.5 * value;
	      j++;
	    }
	
	    return flip ? (1 - prob) : prob;
	  }
	});
	
	
	// extend normal function with static methods
	jStat.extend(jStat.normal, {
	  pdf: function pdf(x, mean, std) {
	    return Math.exp(-0.5 * Math.log(2 * Math.PI) -
	                    Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
	  },
	
	  cdf: function cdf(x, mean, std) {
	    return 0.5 * (1 + jStat.erf((x - mean) / Math.sqrt(2 * std * std)));
	  },
	
	  inv: function(p, mean, std) {
	    return -1.41421356237309505 * std * jStat.erfcinv(2 * p) + mean;
	  },
	
	  mean : function(mean, std) {
	    return mean;
	  },
	
	  median: function median(mean, std) {
	    return mean;
	  },
	
	  mode: function (mean, std) {
	    return mean;
	  },
	
	  sample: function sample(mean, std) {
	    return jStat.randn() * std + mean;
	  },
	
	  variance : function(mean, std) {
	    return std * std;
	  }
	});
	
	
	
	// extend pareto function with static methods
	jStat.extend(jStat.pareto, {
	  pdf: function pdf(x, scale, shape) {
	    if (x < scale)
	      return 0;
	    return (shape * Math.pow(scale, shape)) / Math.pow(x, shape + 1);
	  },
	
	  cdf: function cdf(x, scale, shape) {
	    if (x < scale)
	      return 0;
	    return 1 - Math.pow(scale / x, shape);
	  },
	
	  inv: function inv(p, scale, shape) {
	    return scale / Math.pow(1 - p, 1 / shape);
	  },
	
	  mean: function mean(scale, shape) {
	    if (shape <= 1)
	      return undefined;
	    return (shape * Math.pow(scale, shape)) / (shape - 1);
	  },
	
	  median: function median(scale, shape) {
	    return scale * (shape * Math.SQRT2);
	  },
	
	  mode: function mode(scale, shape) {
	    return scale;
	  },
	
	  variance : function(scale, shape) {
	    if (shape <= 2)
	      return undefined;
	    return (scale*scale * shape) / (Math.pow(shape - 1, 2) * (shape - 2));
	  }
	});
	
	
	
	// extend studentt function with static methods
	jStat.extend(jStat.studentt, {
	  pdf: function pdf(x, dof) {
	    dof = dof > 1e100 ? 1e100 : dof;
	    return (1/(Math.sqrt(dof) * jStat.betafn(0.5, dof/2))) *
	        Math.pow(1 + ((x * x) / dof), -((dof + 1) / 2));
	  },
	
	  cdf: function cdf(x, dof) {
	    var dof2 = dof / 2;
	    return jStat.ibeta((x + Math.sqrt(x * x + dof)) /
	                       (2 * Math.sqrt(x * x + dof)), dof2, dof2);
	  },
	
	  inv: function(p, dof) {
	    var x = jStat.ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
	    x = Math.sqrt(dof * (1 - x) / x);
	    return (p > 0.5) ? x : -x;
	  },
	
	  mean: function mean(dof) {
	    return (dof > 1) ? 0 : undefined;
	  },
	
	  median: function median(dof) {
	    return 0;
	  },
	
	  mode: function mode(dof) {
	    return 0;
	  },
	
	  sample: function sample(dof) {
	    return jStat.randn() * Math.sqrt(dof / (2 * jStat.randg(dof / 2)));
	  },
	
	  variance: function variance(dof) {
	    return (dof  > 2) ? dof / (dof - 2) : (dof > 1) ? Infinity : undefined;
	  }
	});
	
	
	
	// extend weibull function with static methods
	jStat.extend(jStat.weibull, {
	  pdf: function pdf(x, scale, shape) {
	    if (x < 0 || scale < 0 || shape < 0)
	      return 0;
	    return (shape / scale) * Math.pow((x / scale), (shape - 1)) *
	        Math.exp(-(Math.pow((x / scale), shape)));
	  },
	
	  cdf: function cdf(x, scale, shape) {
	    return x < 0 ? 0 : 1 - Math.exp(-Math.pow((x / scale), shape));
	  },
	
	  inv: function(p, scale, shape) {
	    return scale * Math.pow(-Math.log(1 - p), 1 / shape);
	  },
	
	  mean : function(scale, shape) {
	    return scale * jStat.gammafn(1 + 1 / shape);
	  },
	
	  median: function median(scale, shape) {
	    return scale * Math.pow(Math.log(2), 1 / shape);
	  },
	
	  mode: function mode(scale, shape) {
	    if (shape <= 1)
	      return 0;
	    return scale * Math.pow((shape - 1) / shape, 1 / shape);
	  },
	
	  sample: function sample(scale, shape) {
	    return scale * Math.pow(-Math.log(Math.random()), 1 / shape);
	  },
	
	  variance: function variance(scale, shape) {
	    return scale * scale * jStat.gammafn(1 + 2 / shape) -
	        Math.pow(jStat.weibull.mean(scale, shape), 2);
	  }
	});
	
	
	
	// extend uniform function with static methods
	jStat.extend(jStat.uniform, {
	  pdf: function pdf(x, a, b) {
	    return (x < a || x > b) ? 0 : 1 / (b - a);
	  },
	
	  cdf: function cdf(x, a, b) {
	    if (x < a)
	      return 0;
	    else if (x < b)
	      return (x - a) / (b - a);
	    return 1;
	  },
	
	  inv: function(p, a, b) {
	    return a + (p * (b - a));
	  },
	
	  mean: function mean(a, b) {
	    return 0.5 * (a + b);
	  },
	
	  median: function median(a, b) {
	    return jStat.mean(a, b);
	  },
	
	  mode: function mode(a, b) {
	    throw new Error('mode is not yet implemented');
	  },
	
	  sample: function sample(a, b) {
	    return (a / 2 + b / 2) + (b / 2 - a / 2) * (2 * Math.random() - 1);
	  },
	
	  variance: function variance(a, b) {
	    return Math.pow(b - a, 2) / 12;
	  }
	});
	
	
	
	// extend uniform function with static methods
	jStat.extend(jStat.binomial, {
	  pdf: function pdf(k, n, p) {
	    return (p === 0 || p === 1) ?
	      ((n * p) === k ? 1 : 0) :
	      jStat.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
	  },
	
	  cdf: function cdf(x, n, p) {
	    var binomarr = [],
	    k = 0;
	    if (x < 0) {
	      return 0;
	    }
	    if (x < n) {
	      for (; k <= x; k++) {
	        binomarr[ k ] = jStat.binomial.pdf(k, n, p);
	      }
	      return jStat.sum(binomarr);
	    }
	    return 1;
	  }
	});
	
	
	
	// extend uniform function with static methods
	jStat.extend(jStat.negbin, {
	  pdf: function pdf(k, r, p) {
	    if (k !== k >>> 0)
	      return false;
	    if (k < 0)
	      return 0;
	    return jStat.combination(k + r - 1, r - 1) *
	        Math.pow(1 - p, k) * Math.pow(p, r);
	  },
	
	  cdf: function cdf(x, r, p) {
	    var sum = 0,
	    k = 0;
	    if (x < 0) return 0;
	    for (; k <= x; k++) {
	      sum += jStat.negbin.pdf(k, r, p);
	    }
	    return sum;
	  }
	});
	
	
	
	// extend uniform function with static methods
	jStat.extend(jStat.hypgeom, {
	  pdf: function pdf(k, N, m, n) {
	    // Hypergeometric PDF.
	
	    // A simplification of the CDF algorithm below.
	
	    // k = number of successes drawn
	    // N = population size
	    // m = number of successes in population
	    // n = number of items drawn from population
	
	    if(k !== k | 0) {
	      return false;
	    } else if(k < 0 || k < m - (N - n)) {
	      // It's impossible to have this few successes drawn.
	      return 0;
	    } else if(k > n || k > m) {
	      // It's impossible to have this many successes drawn.
	      return 0;
	    } else if (m * 2 > N) {
	      // More than half the population is successes.
	
	      if(n * 2 > N) {
	        // More than half the population is sampled.
	
	        return jStat.hypgeom.pdf(N - m - n + k, N, N - m, N - n)
	      } else {
	        // Half or less of the population is sampled.
	
	        return jStat.hypgeom.pdf(n - k, N, N - m, n);
	      }
	
	    } else if(n * 2 > N) {
	      // Half or less is successes.
	
	      return jStat.hypgeom.pdf(m - k, N, m, N - n);
	
	    } else if(m < n) {
	      // We want to have the number of things sampled to be less than the
	      // successes available. So swap the definitions of successful and sampled.
	      return jStat.hypgeom.pdf(k, N, n, m);
	    } else {
	      // If we get here, half or less of the population was sampled, half or
	      // less of it was successes, and we had fewer sampled things than
	      // successes. Now we can do this complicated iterative algorithm in an
	      // efficient way.
	
	      // The basic premise of the algorithm is that we partially normalize our
	      // intermediate product to keep it in a numerically good region, and then
	      // finish the normalization at the end.
	
	      // This variable holds the scaled probability of the current number of
	      // successes.
	      var scaledPDF = 1;
	
	      // This keeps track of how much we have normalized.
	      var samplesDone = 0;
	
	      for(var i = 0; i < k; i++) {
	        // For every possible number of successes up to that observed...
	
	        while(scaledPDF > 1 && samplesDone < n) {
	          // Intermediate result is growing too big. Apply some of the
	          // normalization to shrink everything.
	
	          scaledPDF *= 1 - (m / (N - samplesDone));
	
	          // Say we've normalized by this sample already.
	          samplesDone++;
	        }
	
	        // Work out the partially-normalized hypergeometric PDF for the next
	        // number of successes
	        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
	      }
	
	      for(; samplesDone < n; samplesDone++) {
	        // Apply all the rest of the normalization
	        scaledPDF *= 1 - (m / (N - samplesDone));
	      }
	
	      // Bound answer sanely before returning.
	      return Math.min(1, Math.max(0, scaledPDF));
	    }
	  },
	
	  cdf: function cdf(x, N, m, n) {
	    // Hypergeometric CDF.
	
	    // This algorithm is due to Prof. Thomas S. Ferguson, <tom@math.ucla.edu>,
	    // and comes from his hypergeometric test calculator at
	    // <http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html>.
	
	    // x = number of successes drawn
	    // N = population size
	    // m = number of successes in population
	    // n = number of items drawn from population
	
	    if(x < 0 || x < m - (N - n)) {
	      // It's impossible to have this few successes drawn or fewer.
	      return 0;
	    } else if(x >= n || x >= m) {
	      // We will always have this many successes or fewer.
	      return 1;
	    } else if (m * 2 > N) {
	      // More than half the population is successes.
	
	      if(n * 2 > N) {
	        // More than half the population is sampled.
	
	        return jStat.hypgeom.cdf(N - m - n + x, N, N - m, N - n)
	      } else {
	        // Half or less of the population is sampled.
	
	        return 1 - jStat.hypgeom.cdf(n - x - 1, N, N - m, n);
	      }
	
	    } else if(n * 2 > N) {
	      // Half or less is successes.
	
	      return 1 - jStat.hypgeom.cdf(m - x - 1, N, m, N - n);
	
	    } else if(m < n) {
	      // We want to have the number of things sampled to be less than the
	      // successes available. So swap the definitions of successful and sampled.
	      return jStat.hypgeom.cdf(x, N, n, m);
	    } else {
	      // If we get here, half or less of the population was sampled, half or
	      // less of it was successes, and we had fewer sampled things than
	      // successes. Now we can do this complicated iterative algorithm in an
	      // efficient way.
	
	      // The basic premise of the algorithm is that we partially normalize our
	      // intermediate sum to keep it in a numerically good region, and then
	      // finish the normalization at the end.
	
	      // Holds the intermediate, scaled total CDF.
	      var scaledCDF = 1;
	
	      // This variable holds the scaled probability of the current number of
	      // successes.
	      var scaledPDF = 1;
	
	      // This keeps track of how much we have normalized.
	      var samplesDone = 0;
	
	      for(var i = 0; i < x; i++) {
	        // For every possible number of successes up to that observed...
	
	        while(scaledCDF > 1 && samplesDone < n) {
	          // Intermediate result is growing too big. Apply some of the
	          // normalization to shrink everything.
	
	          var factor = 1 - (m / (N - samplesDone));
	
	          scaledPDF *= factor;
	          scaledCDF *= factor;
	
	          // Say we've normalized by this sample already.
	          samplesDone++;
	        }
	
	        // Work out the partially-normalized hypergeometric PDF for the next
	        // number of successes
	        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
	
	        // Add to the CDF answer.
	        scaledCDF += scaledPDF;
	      }
	
	      for(; samplesDone < n; samplesDone++) {
	        // Apply all the rest of the normalization
	        scaledCDF *= 1 - (m / (N - samplesDone));
	      }
	
	      // Bound answer sanely before returning.
	      return Math.min(1, Math.max(0, scaledCDF));
	    }
	  }
	});
	
	
	
	// extend uniform function with static methods
	jStat.extend(jStat.poisson, {
	  pdf: function pdf(k, l) {
	    if (l < 0 || (k % 1) !== 0 || k < 0) {
	      return 0;
	    }
	
	    return Math.pow(l, k) * Math.exp(-l) / jStat.factorial(k);
	  },
	
	  cdf: function cdf(x, l) {
	    var sumarr = [],
	    k = 0;
	    if (x < 0) return 0;
	    for (; k <= x; k++) {
	      sumarr.push(jStat.poisson.pdf(k, l));
	    }
	    return jStat.sum(sumarr);
	  },
	
	  mean : function(l) {
	    return l;
	  },
	
	  variance : function(l) {
	    return l;
	  },
	
	  sample: function sample(l) {
	    var p = 1, k = 0, L = Math.exp(-l);
	    do {
	      k++;
	      p *= Math.random();
	    } while (p > L);
	    return k - 1;
	  }
	});
	
	// extend triangular function with static methods
	jStat.extend(jStat.triangular, {
	  pdf: function pdf(x, a, b, c) {
	    if (b <= a || c < a || c > b) {
	      return NaN;
	    } else {
	      if (x < a || x > b) {
	        return 0;
	      } else if (x < c) {
	          return (2 * (x - a)) / ((b - a) * (c - a));
	      } else if (x === c) {
	          return (2 / (b - a));
	      } else { // x > c
	          return (2 * (b - x)) / ((b - a) * (b - c));
	      }
	    }
	  },
	
	  cdf: function cdf(x, a, b, c) {
	    if (b <= a || c < a || c > b)
	      return NaN;
	    if (x <= a)
	      return 0;
	    else if (x >= b)
	      return 1;
	    if (x <= c)
	      return Math.pow(x - a, 2) / ((b - a) * (c - a));
	    else // x > c
	      return 1 - Math.pow(b - x, 2) / ((b - a) * (b - c));
	  },
	
	  inv: function inv(p, a, b, c) {
	    if (b <= a || c < a || c > b) {
	      return NaN;
	    } else {
	      if (p <= ((c - a) / (b - a))) {
	        return a + (b - a) * Math.sqrt(p * ((c - a) / (b - a)));
	      } else { // p > ((c - a) / (b - a))
	        return a + (b - a) * (1 - Math.sqrt((1 - p) * (1 - ((c - a) / (b - a)))));
	      }
	    }
	  },
	
	  mean: function mean(a, b, c) {
	    return (a + b + c) / 3;
	  },
	
	  median: function median(a, b, c) {
	    if (c <= (a + b) / 2) {
	      return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2);
	    } else if (c > (a + b) / 2) {
	      return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2);
	    }
	  },
	
	  mode: function mode(a, b, c) {
	    return c;
	  },
	
	  sample: function sample(a, b, c) {
	    var u = Math.random();
	    if (u < ((c - a) / (b - a)))
	      return a + Math.sqrt(u * (b - a) * (c - a))
	    return b - Math.sqrt((1 - u) * (b - a) * (b - c));
	  },
	
	  variance: function variance(a, b, c) {
	    return (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
	  }
	});
	
	function laplaceSign(x) { return x / Math.abs(x); }
	
	jStat.extend(jStat.laplace, {
	  pdf: function pdf(x, mu, b) {
	    return (b <= 0) ? 0 : (Math.exp(-Math.abs(x - mu) / b)) / (2 * b);
	  },
	
	  cdf: function cdf(x, mu, b) {
	    if (b <= 0) { return 0; }
	
	    if(x < mu) {
	      return 0.5 * Math.exp((x - mu) / b);
	    } else {
	      return 1 - 0.5 * Math.exp(- (x - mu) / b);
	    }
	  },
	
	  mean: function(mu, b) {
	    return mu;
	  },
	
	  median: function(mu, b) {
	    return mu;
	  },
	
	  mode: function(mu, b) {
	    return mu;
	  },
	
	  variance: function(mu, b) {
	    return 2 * b * b;
	  },
	
	  sample: function sample(mu, b) {
	    var u = Math.random() - 0.5;
	
	    return mu - (b * laplaceSign(u) * Math.log(1 - (2 * Math.abs(u))));
	  }
	});
	
	}(this.jStat, Math));
	/* Provides functions for the solution of linear system of equations, integration, extrapolation,
	 * interpolation, eigenvalue problems, differential equations and PCA analysis. */
	
	(function(jStat, Math) {
	
	var push = Array.prototype.push;
	var isArray = jStat.utils.isArray;
	
	function isUsable(arg) {
	  return isArray(arg) || arg instanceof jStat;
	}
	
	jStat.extend({
	
	  // add a vector/matrix to a vector/matrix or scalar
	  add: function add(arr, arg) {
	    // check if arg is a vector or scalar
	    if (isUsable(arg)) {
	      if (!isUsable(arg[0])) arg = [ arg ];
	      return jStat.map(arr, function(value, row, col) {
	        return value + arg[row][col];
	      });
	    }
	    return jStat.map(arr, function(value) { return value + arg; });
	  },
	
	  // subtract a vector or scalar from the vector
	  subtract: function subtract(arr, arg) {
	    // check if arg is a vector or scalar
	    if (isUsable(arg)) {
	      if (!isUsable(arg[0])) arg = [ arg ];
	      return jStat.map(arr, function(value, row, col) {
	        return value - arg[row][col] || 0;
	      });
	    }
	    return jStat.map(arr, function(value) { return value - arg; });
	  },
	
	  // matrix division
	  divide: function divide(arr, arg) {
	    if (isUsable(arg)) {
	      if (!isUsable(arg[0])) arg = [ arg ];
	      return jStat.multiply(arr, jStat.inv(arg));
	    }
	    return jStat.map(arr, function(value) { return value / arg; });
	  },
	
	  // matrix multiplication
	  multiply: function multiply(arr, arg) {
	    var row, col, nrescols, sum, nrow, ncol, res, rescols;
	    // eg: arr = 2 arg = 3 -> 6 for res[0][0] statement closure
	    if (arr.length === undefined && arg.length === undefined) {
	      return arr * arg;
	    }
	    nrow = arr.length,
	    ncol = arr[0].length,
	    res = jStat.zeros(nrow, nrescols = (isUsable(arg)) ? arg[0].length : ncol),
	    rescols = 0;
	    if (isUsable(arg)) {
	      for (; rescols < nrescols; rescols++) {
	        for (row = 0; row < nrow; row++) {
	          sum = 0;
	          for (col = 0; col < ncol; col++)
	          sum += arr[row][col] * arg[col][rescols];
	          res[row][rescols] = sum;
	        }
	      }
	      return (nrow === 1 && rescols === 1) ? res[0][0] : res;
	    }
	    return jStat.map(arr, function(value) { return value * arg; });
	  },
	
	  // outer([1,2,3],[4,5,6])
	  // ===
	  // [[1],[2],[3]] times [[4,5,6]]
	  // ->
	  // [[4,5,6],[8,10,12],[12,15,18]]
	  outer:function outer(A, B) {
	    return jStat.multiply(A.map(function(t){ return [t] }), [B]);
	  },
	
	
	  // Returns the dot product of two matricies
	  dot: function dot(arr, arg) {
	    if (!isUsable(arr[0])) arr = [ arr ];
	    if (!isUsable(arg[0])) arg = [ arg ];
	    // convert column to row vector
	    var left = (arr[0].length === 1 && arr.length !== 1) ? jStat.transpose(arr) : arr,
	    right = (arg[0].length === 1 && arg.length !== 1) ? jStat.transpose(arg) : arg,
	    res = [],
	    row = 0,
	    nrow = left.length,
	    ncol = left[0].length,
	    sum, col;
	    for (; row < nrow; row++) {
	      res[row] = [];
	      sum = 0;
	      for (col = 0; col < ncol; col++)
	      sum += left[row][col] * right[row][col];
	      res[row] = sum;
	    }
	    return (res.length === 1) ? res[0] : res;
	  },
	
	  // raise every element by a scalar
	  pow: function pow(arr, arg) {
	    return jStat.map(arr, function(value) { return Math.pow(value, arg); });
	  },
	
	  // exponentiate every element
	  exp: function exp(arr) {
	    return jStat.map(arr, function(value) { return Math.exp(value); });
	  },
	
	  // generate the natural log of every element
	  log: function exp(arr) {
	    return jStat.map(arr, function(value) { return Math.log(value); });
	  },
	
	  // generate the absolute values of the vector
	  abs: function abs(arr) {
	    return jStat.map(arr, function(value) { return Math.abs(value); });
	  },
	
	  // computes the p-norm of the vector
	  // In the case that a matrix is passed, uses the first row as the vector
	  norm: function norm(arr, p) {
	    var nnorm = 0,
	    i = 0;
	    // check the p-value of the norm, and set for most common case
	    if (isNaN(p)) p = 2;
	    // check if multi-dimensional array, and make vector correction
	    if (isUsable(arr[0])) arr = arr[0];
	    // vector norm
	    for (; i < arr.length; i++) {
	      nnorm += Math.pow(Math.abs(arr[i]), p);
	    }
	    return Math.pow(nnorm, 1 / p);
	  },
	
	  // computes the angle between two vectors in rads
	  // In case a matrix is passed, this uses the first row as the vector
	  angle: function angle(arr, arg) {
	    return Math.acos(jStat.dot(arr, arg) / (jStat.norm(arr) * jStat.norm(arg)));
	  },
	
	  // augment one matrix by another
	  // Note: this function returns a matrix, not a jStat object
	  aug: function aug(a, b) {
	    var newarr = [];
	    for (var i = 0; i < a.length; i++) {
	      newarr.push(a[i].slice());
	    }
	    for (var i = 0; i < newarr.length; i++) {
	      push.apply(newarr[i], b[i]);
	    }
	    return newarr;
	  },
	
	  // The inv() function calculates the inverse of a matrix
	  // Create the inverse by augmenting the matrix by the identity matrix of the
	  // appropriate size, and then use G-J elimination on the augmented matrix.
	  inv: function inv(a) {
	    var rows = a.length;
	    var cols = a[0].length;
	    var b = jStat.identity(rows, cols);
	    var c = jStat.gauss_jordan(a, b);
	    var result = [];
	    var i = 0;
	    var j;
	
	    //We need to copy the inverse portion to a new matrix to rid G-J artifacts
	    for (; i < rows; i++) {
	      result[i] = [];
	      for (j = cols; j < c[0].length; j++)
	        result[i][j - cols] = c[i][j];
	    }
	    return result;
	  },
	
	  // calculate the determinant of a matrix
	  det: function det(a) {
	    var alen = a.length,
	    alend = alen * 2,
	    vals = new Array(alend),
	    rowshift = alen - 1,
	    colshift = alend - 1,
	    mrow = rowshift - alen + 1,
	    mcol = colshift,
	    i = 0,
	    result = 0,
	    j;
	    // check for special 2x2 case
	    if (alen === 2) {
	      return a[0][0] * a[1][1] - a[0][1] * a[1][0];
	    }
	    for (; i < alend; i++) {
	      vals[i] = 1;
	    }
	    for (var i = 0; i < alen; i++) {
	      for (j = 0; j < alen; j++) {
	        vals[(mrow < 0) ? mrow + alen : mrow ] *= a[i][j];
	        vals[(mcol < alen) ? mcol + alen : mcol ] *= a[i][j];
	        mrow++;
	        mcol--;
	      }
	      mrow = --rowshift - alen + 1;
	      mcol = --colshift;
	    }
	    for (var i = 0; i < alen; i++) {
	      result += vals[i];
	    }
	    for (; i < alend; i++) {
	      result -= vals[i];
	    }
	    return result;
	  },
	
	  gauss_elimination: function gauss_elimination(a, b) {
	    var i = 0,
	    j = 0,
	    n = a.length,
	    m = a[0].length,
	    factor = 1,
	    sum = 0,
	    x = [],
	    maug, pivot, temp, k;
	    a = jStat.aug(a, b);
	    maug = a[0].length;
	    for(var i = 0; i < n; i++) {
	      pivot = a[i][i];
	      j = i;
	      for (k = i + 1; k < m; k++) {
	        if (pivot < Math.abs(a[k][i])) {
	          pivot = a[k][i];
	          j = k;
	        }
	      }
	      if (j != i) {
	        for(k = 0; k < maug; k++) {
	          temp = a[i][k];
	          a[i][k] = a[j][k];
	          a[j][k] = temp;
	        }
	      }
	      for (j = i + 1; j < n; j++) {
	        factor = a[j][i] / a[i][i];
	        for(k = i; k < maug; k++) {
	          a[j][k] = a[j][k] - factor * a[i][k];
	        }
	      }
	    }
	    for (var i = n - 1; i >= 0; i--) {
	      sum = 0;
	      for (j = i + 1; j<= n - 1; j++) {
	        sum = sum + x[j] * a[i][j];
	      }
	      x[i] =(a[i][maug - 1] - sum) / a[i][i];
	    }
	    return x;
	  },
	
	  gauss_jordan: function gauss_jordan(a, b) {
	    var m = jStat.aug(a, b),
	    h = m.length,
	    w = m[0].length;
	    // find max pivot
	    for (var y = 0; y < h; y++) {
	      var maxrow = y;
	      for (var y2 = y+1; y2 < h; y2++) {
	        if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
	          maxrow = y2;
	      }
	      var tmp = m[y];
	      m[y] = m[maxrow];
	      m[maxrow] = tmp
	      for (var y2 = y+1; y2 < h; y2++) {
	        c = m[y2][y] / m[y][y];
	        for (var x = y; x < w; x++) {
	          m[y2][x] -= m[y][x] * c;
	        }
	      }
	    }
	    // backsubstitute
	    for (var y = h-1; y >= 0; y--) {
	      c = m[y][y];
	      for (var y2 = 0; y2 < y; y2++) {
	        for (var x = w-1; x > y-1; x--) {
	          m[y2][x] -= m[y][x] * m[y2][y] / c;
	        }
	      }
	      m[y][y] /= c;
	      for (var x = h; x < w; x++) {
	        m[y][x] /= c;
	      }
	    }
	    return m;
	  },
	
	  // solve equation
	  // Ax=b
	  // A is upper triangular matrix
	  // A=[[1,2,3],[0,4,5],[0,6,7]]
	  // b=[1,2,3]
	  // triaUpSolve(A,b) // -> [2.666,0.1666,1.666]
	  // if you use matrix style
	  // A=[[1,2,3],[0,4,5],[0,6,7]]
	  // b=[[1],[2],[3]]
	  // will return [[2.666],[0.1666],[1.666]]
	  triaUpSolve: function triaUpSolve(A, b) {
	    var size = A[0].length;
	    var x = jStat.zeros(1, size)[0];
	    var parts;
	    var matrix_mode = false;
	
	    if (b[0].length != undefined) {
	      b = b.map(function(i){ return i[0] });
	      matrix_mode = true;
	    }
	
	    jStat.arange(size - 1, -1, -1).forEach(function(i) {
	      parts = jStat.arange(i + 1,size).map(function(j) {
	        return x[j] * A[i][j];
	      });
	      x[i] = (b[i] - jStat.sum(parts)) / A[i][i];
	    });
	
	    if (matrix_mode)
	      return x.map(function(i){ return [i] });
	    return x;
	  },
	
	  triaLowSolve: function triaLowSolve(A, b) {
	    // like to triaUpSolve but A is lower triangular matrix
	    var size = A[0].length;
	    var x = jStat.zeros(1, size)[0];
	    var parts;
	
	    var matrix_mode=false;
	    if (b[0].length != undefined) {
	      b = b.map(function(i){ return i[0] });
	      matrix_mode = true;
	    }
	
	    jStat.arange(size).forEach(function(i) {
	      parts = jStat.arange(i).map(function(j) {
	        return A[i][j] * x[j];
	      });
	      x[i] = (b[i] - jStat.sum(parts)) / A[i][i];
	    })
	
	    if (matrix_mode)
	      return x.map(function(i){ return [i] });
	    return x;
	  },
	
	  // A -> [L,U]
	  // A=LU
	  // L is lower triangular matrix
	  // U is upper triangular matrix
	  lu: function lu(A) {
	    var size = A.length;
	    //var L=jStat.diagonal(jStat.ones(1,size)[0]);
	    var L = jStat.identity(size);
	    var R = jStat.zeros(A.length, A[0].length);
	    var parts;
	    jStat.arange(size).forEach(function(t) {
	      R[0][t] = A[0][t];
	    });
	    jStat.arange(1, size).forEach(function(l) {
	      jStat.arange(l).forEach(function(i) {
	        parts = jStat.arange(i).map(function(jj) {
	          return L[l][jj] * R[jj][i];
	        });
	        L[l][i] = (A[l][i] - jStat.sum(parts)) / R[i][i];
	      });
	      jStat.arange(l, size).forEach(function(j) {
	        parts = jStat.arange(l).map(function(jj) {
	          return L[l][jj] * R[jj][j];
	        });
	        R[l][j] = A[i][j] - jStat.sum(parts);
	      });
	    });
	    return [L, R];
	  },
	
	  // A -> T
	  // A=TT'
	  // T is lower triangular matrix
	  cholesky: function cholesky(A) {
	    var size = A.length;
	    var T = jStat.zeros(A.length, A[0].length);
	    var parts;
	    jStat.arange(size).forEach(function(i) {
	      parts = jStat.arange(i).map(function(t) {
	        return Math.pow(T[i][t],2);
	      });
	      T[i][i] = Math.sqrt(A[i][i] - jStat.sum(parts));
	      jStat.arange(i + 1, size).forEach(function(j) {
	        parts = jStat.arange(i).map(function(t) {
	          return T[i][t] * T[j][t];
	        });
	        T[j][i] = (A[i][j] - jStat.sum(parts)) / T[i][i];
	      });
	    });
	    return T;
	  },
	
	  gauss_jacobi: function gauss_jacobi(a, b, x, r) {
	    var i = 0;
	    var j = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.multiply(jStat.inv(d), jStat.add(l, u)), -1);
	    c = jStat.multiply(jStat.inv(d), b);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk,xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i++;
	    }
	    return xk;
	  },
	
	  gauss_seidel: function gauss_seidel(a, b, x, r) {
	    var i = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var j, xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d, l)), u), -1);
	    c = jStat.multiply(jStat.inv(jStat.add(d, l)), b);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i = i + 1;
	    }
	    return xk;
	  },
	
	  SOR: function SOR(a, b, x, r, w) {
	    var i = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var j, xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.inv(jStat.add(d, jStat.multiply(l, w))),
	                       jStat.subtract(jStat.multiply(d, 1 - w),
	                                      jStat.multiply(u, w)));
	    c = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d,
	        jStat.multiply(l, w))), b), w);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i++;
	    }
	    return xk;
	  },
	
	  householder: function householder(a) {
	    var m = a.length;
	    var n = a[0].length;
	    var i = 0;
	    var w = [];
	    var p = [];
	    var alpha, r, k, j, factor;
	    for (; i < m - 1; i++) {
	      alpha = 0;
	      for (j = i + 1; j < n; j++)
	      alpha += (a[j][i] * a[j][i]);
	      factor = (a[i + 1][i] > 0) ? -1 : 1;
	      alpha = factor * Math.sqrt(alpha);
	      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
	      w = jStat.zeros(m, 1);
	      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
	      for (k = i + 2; k < m; k++) w[k][0] = a[k][i] / (2 * r);
	      p = jStat.subtract(jStat.identity(m, n),
	          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
	      a = jStat.multiply(p, jStat.multiply(a, p));
	    }
	    return a;
	  },
	
	  // A -> [Q,R]
	  // Q is orthogonal matrix
	  // R is upper triangular
	  QR: (function() {
	    // x -> Q
	    // find a orthogonal matrix Q st.
	    // Qx=y
	    // y is [||x||,0,0,...]
	    function get_Q1(x) {
	      var size = x.length;
	      var norm_x = jStat.norm(x,2);
	      var e1 = jStat.zeros(1, size)[0];
	      e1[0] = 1;
	      var u = jStat.add(jStat.multiply(jStat.multiply(e1, norm_x), -1), x);
	      var norm_u = jStat.norm(u, 2);
	      var v = jStat.divide(u, norm_u);
	      var Q = jStat.subtract(jStat.identity(size),
	                             jStat.multiply(jStat.outer(v, v), 2));
	      return Q;
	    }
	
	    function qr(A) {
	      var size = A[0].length;
	      var QList = [];
	      jStat.arange(size).forEach(function(i) {
	        var x = jStat.slice(A, { row: { start: i }, col: i });
	        var Q = get_Q1(x);
	        var Qn = jStat.identity(A.length);
	        Qn = jStat.sliceAssign(Qn, { row: { start: i }, col: { start: i }}, Q);
	        A = jStat.multiply(Qn, A);
	        QList.push(Qn);
	      });
	      var Q = QList.reduce(function(x, y){ return jStat.multiply(x,y) });
	      var R = A;
	      return [Q, R];
	    }
	
	    return qr;
	  })(),
	
	  lstsq: (function(A, b) {
	    // solve least squard problem for Ax=b as QR decomposition way if b is
	    // [[b1],[b2],[b3]] form will return [[x1],[x2],[x3]] array form solution
	    // else b is [b1,b2,b3] form will return [x1,x2,x3] array form solution
	    function R_I(A) {
	      A = jStat.copy(A);
	      var size = A.length;
	      var I = jStat.identity(size);
	      jStat.arange(size - 1, -1, -1).forEach(function(i) {
	        jStat.sliceAssign(
	            I, { row: i }, jStat.divide(jStat.slice(I, { row: i }), A[i][i]));
	        jStat.sliceAssign(
	            A, { row: i }, jStat.divide(jStat.slice(A, { row: i }), A[i][i]));
	        jStat.arange(i).forEach(function(j) {
	          var c = jStat.multiply(A[j][i], -1);
	          var Aj = jStat.slice(A, { row: j });
	          var cAi = jStat.multiply(jStat.slice(A, { row: i }), c);
	          jStat.sliceAssign(A, { row: j }, jStat.add(Aj, cAi));
	          var Ij = jStat.slice(I, { row: j });
	          var cIi = jStat.multiply(jStat.slice(I, { row: i }), c);
	          jStat.sliceAssign(I, { row: j }, jStat.add(Ij, cIi));
	        })
	      });
	      return I;
	    }
	
	    function qr_solve(A, b){
	      var array_mode = false;
	      if (b[0].length === undefined) {
	        // [c1,c2,c3] mode
	        b = b.map(function(x){ return [x] });
	        array_mode = true;
	      }
	      var QR = jStat.QR(A);
	      var Q = QR[0];
	      var R = QR[1];
	      var attrs = A[0].length;
	      var Q1 = jStat.slice(Q,{col:{end:attrs}});
	      var R1 = jStat.slice(R,{row:{end:attrs}});
	      var RI = R_I(R1);
	      var x = jStat.multiply(jStat.multiply(RI, jStat.transpose(Q1)), b);
	      if (array_mode)
	        return x.map(function(i){ return i[0] });
	      return x;
	    }
	
	    return qr_solve;
	  })(),
	
	  jacobi: function jacobi(a) {
	    var condition = 1;
	    var count = 0;
	    var n = a.length;
	    var e = jStat.identity(n, n);
	    var ev = [];
	    var b, i, j, p, q, maxim, theta, s;
	    // condition === 1 only if tolerance is not reached
	    while (condition === 1) {
	      count++;
	      maxim = a[0][1];
	      p = 0;
	      q = 1;
	      for (var i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	          if (i != j) {
	            if (maxim < Math.abs(a[i][j])) {
	              maxim = Math.abs(a[i][j]);
	              p = i;
	              q = j;
	            }
	          }
	        }
	      }
	      if (a[p][p] === a[q][q])
	        theta = (a[p][q] > 0) ? Math.PI / 4 : -Math.PI / 4;
	      else
	        theta = Math.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2;
	      s = jStat.identity(n, n);
	      s[p][p] = Math.cos(theta);
	      s[p][q] = -Math.sin(theta);
	      s[q][p] = Math.sin(theta);
	      s[q][q] = Math.cos(theta);
	      // eigen vector matrix
	      e = jStat.multiply(e, s);
	      b = jStat.multiply(jStat.multiply(jStat.inv(s), a), s);
	      a = b;
	      condition = 0;
	      for (var i = 1; i < n; i++) {
	        for (j = 1; j < n; j++) {
	          if (i != j && Math.abs(a[i][j]) > 0.001) {
	            condition = 1;
	          }
	        }
	      }
	    }
	    for (var i = 0; i < n; i++) ev.push(a[i][i]);
	    //returns both the eigenvalue and eigenmatrix
	    return [e, ev];
	  },
	
	  rungekutta: function rungekutta(f, h, p, t_j, u_j, order) {
	    var k1, k2, u_j1, k3, k4;
	    if (order === 2) {
	      while (t_j <= p) {
	        k1 = h * f(t_j, u_j);
	        k2 = h * f(t_j + h, u_j + k1);
	        u_j1 = u_j + (k1 + k2) / 2;
	        u_j = u_j1;
	        t_j = t_j + h;
	      }
	    }
	    if (order === 4) {
	      while (t_j <= p) {
	        k1 = h * f(t_j, u_j);
	        k2 = h * f(t_j + h / 2, u_j + k1 / 2);
	        k3 = h * f(t_j + h / 2, u_j + k2 / 2);
	        k4 = h * f(t_j +h, u_j + k3);
	        u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
	        u_j = u_j1;
	        t_j = t_j + h;
	      }
	    }
	    return u_j;
	  },
	
	  romberg: function romberg(f, a, b, order) {
	    var i = 0;
	    var h = (b - a) / 2;
	    var x = [];
	    var h1 = [];
	    var g = [];
	    var m, a1, j, k, I, d;
	    while (i < order / 2) {
	      I = f(a);
	      for (j = a, k = 0; j <= b; j = j + h, k++) x[k] = j;
	      m = x.length;
	      for (j = 1; j < m - 1; j++) {
	        I += (((j % 2) !== 0) ? 4 : 2) * f(x[j]);
	      }
	      I = (h / 3) * (I + f(b));
	      g[i] = I;
	      h /= 2;
	      i++;
	    }
	    a1 = g.length;
	    m = 1;
	    while (a1 !== 1) {
	      for (j = 0; j < a1 - 1; j++)
	      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
	      a1 = h1.length;
	      g = h1;
	      h1 = [];
	      m++;
	    }
	    return g;
	  },
	
	  richardson: function richardson(X, f, x, h) {
	    function pos(X, x) {
	      var i = 0;
	      var n = X.length;
	      var p;
	      for (; i < n; i++)
	        if (X[i] === x) p = i;
	      return p;
	    }
	    var n = X.length,
	    h_min = Math.abs(x - X[pos(X, x) + 1]),
	    i = 0,
	    g = [],
	    h1 = [],
	    y1, y2, m, a, j;
	    while (h >= h_min) {
	      y1 = pos(X, x + h);
	      y2 = pos(X, x);
	      g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h);
	      h /= 2;
	      i++;
	    }
	    a = g.length;
	    m = 1;
	    while (a != 1) {
	      for (j = 0; j < a - 1; j++)
	      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
	      a = h1.length;
	      g = h1;
	      h1 = [];
	      m++;
	    }
	    return g;
	  },
	
	  simpson: function simpson(f, a, b, n) {
	    var h = (b - a) / n;
	    var I = f(a);
	    var x = [];
	    var j = a;
	    var k = 0;
	    var i = 1;
	    var m;
	    for (; j <= b; j = j + h, k++)
	      x[k] = j;
	    m = x.length;
	    for (; i < m - 1; i++) {
	      I += ((i % 2 !== 0) ? 4 : 2) * f(x[i]);
	    }
	    return (h / 3) * (I + f(b));
	  },
	
	  hermite: function hermite(X, F, dF, value) {
	    var n = X.length;
	    var p = 0;
	    var i = 0;
	    var l = [];
	    var dl = [];
	    var A = [];
	    var B = [];
	    var j;
	    for (; i < n; i++) {
	      l[i] = 1;
	      for (j = 0; j < n; j++) {
	        if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]);
	      }
	      dl[i] = 0;
	      for (j = 0; j < n; j++) {
	        if (i != j) dl[i] += 1 / (X [i] - X[j]);
	      }
	      A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]);
	      B[i] = (value - X[i]) * (l[i] * l[i]);
	      p += (A[i] * F[i] + B[i] * dF[i]);
	    }
	    return p;
	  },
	
	  lagrange: function lagrange(X, F, value) {
	    var p = 0;
	    var i = 0;
	    var j, l;
	    var n = X.length;
	    for (; i < n; i++) {
	      l = F[i];
	      for (j = 0; j < n; j++) {
	        // calculating the lagrange polynomial L_i
	        if (i != j) l *= (value - X[j]) / (X[i] - X[j]);
	      }
	      // adding the lagrange polynomials found above
	      p += l;
	    }
	    return p;
	  },
	
	  cubic_spline: function cubic_spline(X, F, value) {
	    var n = X.length;
	    var i = 0, j;
	    var A = [];
	    var B = [];
	    var alpha = [];
	    var c = [];
	    var h = [];
	    var b = [];
	    var d = [];
	    for (; i < n - 1; i++)
	      h[i] = X[i + 1] - X[i];
	    alpha[0] = 0;
	    for (var i = 1; i < n - 1; i++) {
	      alpha[i] = (3 / h[i]) * (F[i + 1] - F[i]) -
	          (3 / h[i-1]) * (F[i] - F[i-1]);
	    }
	    for (var i = 1; i < n - 1; i++) {
	      A[i] = [];
	      B[i] = [];
	      A[i][i-1] = h[i-1];
	      A[i][i] = 2 * (h[i - 1] + h[i]);
	      A[i][i+1] = h[i];
	      B[i][0] = alpha[i];
	    }
	    c = jStat.multiply(jStat.inv(A), B);
	    for (j = 0; j < n - 1; j++) {
	      b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3;
	      d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]);
	    }
	    for (j = 0; j < n; j++) {
	      if (X[j] > value) break;
	    }
	    j -= 1;
	    return F[j] + (value - X[j]) * b[j] + jStat.sq(value-X[j]) *
	        c[j] + (value - X[j]) * jStat.sq(value - X[j]) * d[j];
	  },
	
	  gauss_quadrature: function gauss_quadrature() {
	    throw new Error('gauss_quadrature not yet implemented');
	  },
	
	  PCA: function PCA(X) {
	    var m = X.length;
	    var n = X[0].length;
	    var flag = false;
	    var i = 0;
	    var j, temp1;
	    var u = [];
	    var D = [];
	    var result = [];
	    var temp2 = [];
	    var Y = [];
	    var Bt = [];
	    var B = [];
	    var C = [];
	    var V = [];
	    var Vt = [];
	    for (var i = 0; i < m; i++) {
	      u[i] = jStat.sum(X[i]) / n;
	    }
	    for (var i = 0; i < n; i++) {
	      B[i] = [];
	      for(j = 0; j < m; j++) {
	        B[i][j] = X[j][i] - u[j];
	      }
	    }
	    B = jStat.transpose(B);
	    for (var i = 0; i < m; i++) {
	      C[i] = [];
	      for (j = 0; j < m; j++) {
	        C[i][j] = (jStat.dot([B[i]], [B[j]])) / (n - 1);
	      }
	    }
	    result = jStat.jacobi(C);
	    V = result[0];
	    D = result[1];
	    Vt = jStat.transpose(V);
	    for (var i = 0; i < D.length; i++) {
	      for (j = i; j < D.length; j++) {
	        if(D[i] < D[j])  {
	          temp1 = D[i];
	          D[i] = D[j];
	          D[j] = temp1;
	          temp2 = Vt[i];
	          Vt[i] = Vt[j];
	          Vt[j] = temp2;
	        }
	      }
	    }
	    Bt = jStat.transpose(B);
	    for (var i = 0; i < m; i++) {
	      Y[i] = [];
	      for (j = 0; j < Bt.length; j++) {
	        Y[i][j] = jStat.dot([Vt[i]], [Bt[j]]);
	      }
	    }
	    return [X, D, Vt, Y];
	  }
	});
	
	// extend jStat.fn with methods that require one argument
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function(arg, func) {
	      var tmpthis = this;
	      // check for callback
	      if (func) {
	        setTimeout(function() {
	          func.call(tmpthis, jStat.fn[passfunc].call(tmpthis, arg));
	        }, 15);
	        return this;
	      }
	      if (typeof jStat[passfunc](this, arg) === 'number')
	        return jStat[passfunc](this, arg);
	      else
	        return jStat(jStat[passfunc](this, arg));
	    };
	  }(funcs[i]));
	}('add divide multiply subtract dot pow exp log abs norm angle'.split(' ')));
	
	}(this.jStat, Math));
	(function(jStat, Math) {
	
	var slice = [].slice;
	var isNumber = jStat.utils.isNumber;
	var isArray = jStat.utils.isArray;
	
	// flag==true denotes use of sample standard deviation
	// Z Statistics
	jStat.extend({
	  // 2 different parameter lists:
	  // (value, mean, sd)
	  // (value, array, flag)
	  zscore: function zscore() {
	    var args = slice.call(arguments);
	    if (isNumber(args[1])) {
	      return (args[0] - args[1]) / args[2];
	    }
	    return (args[0] - jStat.mean(args[1])) / jStat.stdev(args[1], args[2]);
	  },
	
	  // 3 different paramter lists:
	  // (value, mean, sd, sides)
	  // (zscore, sides)
	  // (value, array, sides, flag)
	  ztest: function ztest() {
	    var args = slice.call(arguments);
	    var z;
	    if (isArray(args[1])) {
	      // (value, array, sides, flag)
	      z = jStat.zscore(args[0],args[1],args[3]);
	      return (args[2] === 1) ?
	        (jStat.normal.cdf(-Math.abs(z), 0, 1)) :
	        (jStat.normal.cdf(-Math.abs(z), 0, 1)*2);
	    } else {
	      if (args.length > 2) {
	        // (value, mean, sd, sides)
	        z = jStat.zscore(args[0],args[1],args[2]);
	        return (args[3] === 1) ?
	          (jStat.normal.cdf(-Math.abs(z),0,1)) :
	          (jStat.normal.cdf(-Math.abs(z),0,1)* 2);
	      } else {
	        // (zscore, sides)
	        z = args[0];
	        return (args[1] === 1) ?
	          (jStat.normal.cdf(-Math.abs(z),0,1)) :
	          (jStat.normal.cdf(-Math.abs(z),0,1)*2);
	      }
	    }
	  }
	});
	
	jStat.extend(jStat.fn, {
	  zscore: function zscore(value, flag) {
	    return (value - this.mean()) / this.stdev(flag);
	  },
	
	  ztest: function ztest(value, sides, flag) {
	    var zscore = Math.abs(this.zscore(value, flag));
	    return (sides === 1) ?
	      (jStat.normal.cdf(-zscore, 0, 1)) :
	      (jStat.normal.cdf(-zscore, 0, 1) * 2);
	  }
	});
	
	// T Statistics
	jStat.extend({
	  // 2 parameter lists
	  // (value, mean, sd, n)
	  // (value, array)
	  tscore: function tscore() {
	    var args = slice.call(arguments);
	    return (args.length === 4) ?
	      ((args[0] - args[1]) / (args[2] / Math.sqrt(args[3]))) :
	      ((args[0] - jStat.mean(args[1])) /
	       (jStat.stdev(args[1], true) / Math.sqrt(args[1].length)));
	  },
	
	  // 3 different paramter lists:
	  // (value, mean, sd, n, sides)
	  // (tscore, n, sides)
	  // (value, array, sides)
	  ttest: function ttest() {
	    var args = slice.call(arguments);
	    var tscore;
	    if (args.length === 5) {
	      tscore = Math.abs(jStat.tscore(args[0], args[1], args[2], args[3]));
	      return (args[4] === 1) ?
	        (jStat.studentt.cdf(-tscore, args[3]-1)) :
	        (jStat.studentt.cdf(-tscore, args[3]-1)*2);
	    }
	    if (isNumber(args[1])) {
	      tscore = Math.abs(args[0])
	      return (args[2] == 1) ?
	        (jStat.studentt.cdf(-tscore, args[1]-1)) :
	        (jStat.studentt.cdf(-tscore, args[1]-1) * 2);
	    }
	    tscore = Math.abs(jStat.tscore(args[0], args[1]))
	    return (args[2] == 1) ?
	      (jStat.studentt.cdf(-tscore, args[1].length-1)) :
	      (jStat.studentt.cdf(-tscore, args[1].length-1) * 2);
	  }
	});
	
	jStat.extend(jStat.fn, {
	  tscore: function tscore(value) {
	    return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols()));
	  },
	
	  ttest: function ttest(value, sides) {
	    return (sides === 1) ?
	      (1 - jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols()-1)) :
	      (jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols()-1)*2);
	  }
	});
	
	// F Statistics
	jStat.extend({
	  // Paramter list is as follows:
	  // (array1, array2, array3, ...)
	  // or it is an array of arrays
	  // array of arrays conversion
	  anovafscore: function anovafscore() {
	    var args = slice.call(arguments),
	    expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j;
	    if (args.length === 1) {
	      tmpargs = new Array(args[0].length);
	      for (var i = 0; i < args[0].length; i++) {
	        tmpargs[i] = args[0][i];
	      }
	      args = tmpargs;
	    }
	    // 2 sample case
	    if (args.length === 2) {
	      return jStat.variance(args[0]) / jStat.variance(args[1]);
	    }
	    // Builds sample array
	    sample = new Array();
	    for (var i = 0; i < args.length; i++) {
	      sample = sample.concat(args[i]);
	    }
	    sampMean = jStat.mean(sample);
	    // Computes the explained variance
	    expVar = 0;
	    for (var i = 0; i < args.length; i++) {
	      expVar = expVar + args[i].length * Math.pow(jStat.mean(args[i]) - sampMean, 2);
	    }
	    expVar /= (args.length - 1);
	    // Computes unexplained variance
	    unexpVar = 0;
	    for (var i = 0; i < args.length; i++) {
	      sampSampMean = jStat.mean(args[i]);
	      for (j = 0; j < args[i].length; j++) {
	        unexpVar += Math.pow(args[i][j] - sampSampMean, 2);
	      }
	    }
	    unexpVar /= (sample.length - args.length);
	    return expVar / unexpVar;
	  },
	
	  // 2 different paramter setups
	  // (array1, array2, array3, ...)
	  // (anovafscore, df1, df2)
	  anovaftest: function anovaftest() {
	    var args = slice.call(arguments),
	    df1, df2, n, i;
	    if (isNumber(args[0])) {
	      return 1 - jStat.centralF.cdf(args[0], args[1], args[2]);
	    }
	    anovafscore = jStat.anovafscore(args);
	    df1 = args.length - 1;
	    n = 0;
	    for (var i = 0; i < args.length; i++) {
	      n = n + args[i].length;
	    }
	    df2 = n - df1 - 1;
	    return 1 - jStat.centralF.cdf(anovafscore, df1, df2);
	  },
	
	  ftest: function ftest(fscore, df1, df2) {
	    return 1 - jStat.centralF.cdf(fscore, df1, df2);
	  }
	});
	
	jStat.extend(jStat.fn, {
	  anovafscore: function anovafscore() {
	    return jStat.anovafscore(this.toArray());
	  },
	
	  anovaftes: function anovaftes() {
	    var n = 0;
	    var i;
	    for (var i = 0; i < this.length; i++) {
	      n = n + this[i].length;
	    }
	    return jStat.ftest(this.anovafscore(), this.length - 1, n - this.length);
	  }
	});
	
	// Error Bounds
	jStat.extend({
	  // 2 different parameter setups
	  // (value, alpha, sd, n)
	  // (value, alpha, array)
	  normalci: function normalci() {
	    var args = slice.call(arguments),
	    ans = new Array(2),
	    change;
	    if (args.length === 4) {
	      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
	                        args[2] / Math.sqrt(args[3]));
	    } else {
	      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
	                        jStat.stdev(args[2]) / Math.sqrt(args[2].length));
	    }
	    ans[0] = args[0] - change;
	    ans[1] = args[0] + change;
	    return ans;
	  },
	
	  // 2 different parameter setups
	  // (value, alpha, sd, n)
	  // (value, alpha, array)
	  tci: function tci() {
	    var args = slice.call(arguments),
	    ans = new Array(2),
	    change;
	    if (args.length === 4) {
	      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[3] - 1) *
	                        args[2] / Math.sqrt(args[3]));
	    } else {
	      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[2].length - 1) *
	                        jStat.stdev(args[2], true) / Math.sqrt(args[2].length));
	    }
	    ans[0] = args[0] - change;
	    ans[1] = args[0] + change;
	    return ans;
	  },
	
	  significant: function significant(pvalue, alpha) {
	    return pvalue < alpha;
	  }
	});
	
	jStat.extend(jStat.fn, {
	  normalci: function normalci(value, alpha) {
	    return jStat.normalci(value, alpha, this.toArray());
	  },
	
	  tci: function tci(value, alpha) {
	    return jStat.tci(value, alpha, this.toArray());
	  }
	});
	
	// internal method for calculating the z-score for a difference of proportions test
	function differenceOfProportions(p1, n1, p2, n2) {
	  if (p1 > 1 || p2 > 1 || p1 <= 0 || p2 <= 0) {
	    throw new Error("Proportions should be greater than 0 and less than 1")
	  }
	  var pooled = (p1 * n1 + p2 * n2) / (n1 + n2);
	  var se = Math.sqrt(pooled * (1 - pooled) * ((1/n1) + (1/n2)));
	  return (p1 - p2) / se;
	}
	
	// Difference of Proportions
	jStat.extend(jStat.fn, {
	  oneSidedDifferenceOfProportions: function oneSidedDifferenceOfProportions(p1, n1, p2, n2) {
	    var z = differenceOfProportions(p1, n1, p2, n2);
	    return jStat.ztest(z, 1);
	  },
	
	  twoSidedDifferenceOfProportions: function twoSidedDifferenceOfProportions(p1, n1, p2, n2) {
	    var z = differenceOfProportions(p1, n1, p2, n2);
	    return jStat.ztest(z, 2);
	  }
	});
	
	}(this.jStat, Math));
	this.jStat.models=(function(){
	
	  function sub_regress(endog, exog) {
	    return ols(endog, exog);
	  }
	
	  function sub_regress(exog) {
	    var var_count = exog[0].length;
	    var modelList = jStat.arange(var_count).map(function(endog_index) {
	      var exog_index =
	          jStat.arange(var_count).filter(function(i){return i!==endog_index});
	      return ols(jStat.col(exog, endog_index).map(function(x){ return x[0] }),
	                 jStat.col(exog, exog_index))
	    });
	    return modelList;
	  }
	
	  // do OLS model regress
	  // exog have include const columns ,it will not generate it .In fact, exog is
	  // "design matrix" look at
	  //https://en.wikipedia.org/wiki/Design_matrix
	  function ols(endog, exog) {
	    var nobs = endog.length;
	    var df_model = exog[0].length - 1;
	    var df_resid = nobs-df_model - 1;
	    var coef = jStat.lstsq(exog, endog);
	    var predict =
	        jStat.multiply(exog, coef.map(function(x) { return [x] }))
	            .map(function(p) { return p[0] });
	    var resid = jStat.subtract(endog, predict);
	    var ybar = jStat.mean(endog);
	    // constant cause problem
	    // var SST = jStat.sum(endog.map(function(y) {
	    //   return Math.pow(y-ybar,2);
	    // }));
	    var SSE = jStat.sum(predict.map(function(f) {
	      return Math.pow(f - ybar, 2);
	    }));
	    var SSR = jStat.sum(endog.map(function(y, i) {
	      return Math.pow(y - predict[i], 2);
	    }));
	    var SST = SSE + SSR;
	    var R2 = (SSE / SST);
	    return {
	        exog:exog,
	        endog:endog,
	        nobs:nobs,
	        df_model:df_model,
	        df_resid:df_resid,
	        coef:coef,
	        predict:predict,
	        resid:resid,
	        ybar:ybar,
	        SST:SST,
	        SSE:SSE,
	        SSR:SSR,
	        R2:R2
	    };
	  }
	
	  // H0: b_I=0
	  // H1: b_I!=0
	  function t_test(model) {
	    var subModelList = sub_regress(model.exog);
	    //var sigmaHat=jStat.stdev(model.resid);
	    var sigmaHat = Math.sqrt(model.SSR / (model.df_resid));
	    var seBetaHat = subModelList.map(function(mod) {
	      var SST = mod.SST;
	      var R2 = mod.R2;
	      return sigmaHat / Math.sqrt(SST * (1 - R2));
	    });
	    var tStatistic = model.coef.map(function(coef, i) {
	      return (coef - 0) / seBetaHat[i];
	    });
	    var pValue = tStatistic.map(function(t) {
	      var leftppf = jStat.studentt.cdf(t, model.df_resid);
	      return (leftppf > 0.5 ? 1 - leftppf : leftppf) * 2;
	    });
	    var c = jStat.studentt.inv(0.975, model.df_resid);
	    var interval95 = model.coef.map(function(coef, i) {
	      var d = c * seBetaHat[i];
	      return [coef - d, coef + d];
	    })
	    return {
	        se: seBetaHat,
	        t: tStatistic,
	        p: pValue,
	        sigmaHat: sigmaHat,
	        interval95: interval95
	    };
	  }
	
	  function F_test(model) {
	    var F_statistic =
	        (model.R2 / model.df_model) / ((1 - model.R2) / model.df_resid);
	    var fcdf = function(x, n1, n2) {
	      return jStat.beta.cdf(x / (n2 / n1 + x), n1 / 2, n2 / 2)
	    }
	    var pvalue = 1 - fcdf(F_statistic, model.df_model, model.df_resid);
	    return { F_statistic: F_statistic, pvalue: pvalue };
	  }
	
	  function ols_wrap(endog, exog) {
	    var model = ols(endog,exog);
	    var ttest = t_test(model);
	    var ftest = F_test(model);
	    var adjust_R2 =
	        1 - (1 - model.rsquared) * ((model.nobs - 1) / (model.df_resid));
	    model.t = ttest;
	    model.f = ftest;
	    model.adjust_R2 = adjust_R2;
	    return model;
	  }
	
	  return { ols: ols_wrap };
	})();


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(16);
	var numbro = __webpack_require__(20);
	var error = __webpack_require__(17);
	
	exports.UNIQUE = function () {
	  var result = [];
	  for (var i = 0; i < arguments.length; ++i) {
	    var hasElement = false;
	    var element    = arguments[i];
	
	    // Check if we've already seen this element.
	    for (var j = 0; j < result.length; ++j) {
	      hasElement = result[j] === element;
	      if (hasElement) { break; }
	    }
	
	    // If we did not find it, add it to the result.
	    if (!hasElement) {
	      result.push(element);
	    }
	  }
	  return result;
	};
	
	exports.FLATTEN = utils.flatten;
	
	exports.ARGS2ARRAY = function () {
	  return Array.prototype.slice.call(arguments, 0);
	};
	
	exports.REFERENCE = function (context, reference) {
	  if (!arguments.length) {
	    return error.error;
	  }
	  try {
	    var path = reference.split('.');
	    var result = context;
	    for (var i = 0; i < path.length; ++i) {
	      var step = path[i];
	      if (step[step.length - 1] === ']') {
	        var opening = step.indexOf('[');
	        var index = step.substring(opening + 1, step.length - 1);
	        result = result[step.substring(0, opening)][index];
	      } else {
	        result = result[step];
	      }
	    }
	    return result;
	  } catch (error) {}
	};
	
	exports.JOIN = function (array, separator) {
	  return array.join(separator);
	};
	
	exports.NUMBERS = function () {
	  var possibleNumbers = utils.flatten(arguments);
	  return possibleNumbers.filter(function (el) {
	    return typeof el === 'number';
	  });
	};
	
	exports.NUMERAL = function (number, format) {
	  return numbro(number).format(format);
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	
	// TODO
	exports.CELL = function() {
	  throw new Error('CELL is not implemented');
	};
	
	exports.ERROR = {};
	exports.ERROR.TYPE = function(error_val) {
	  switch (error_val) {
	    case error.nil: return 1;
	    case error.div0: return 2;
	    case error.value: return 3;
	    case error.ref: return 4;
	    case error.name: return 5;
	    case error.num: return 6;
	    case error.na: return 7;
	    case error.data: return 8;
	  }
	  return error.na;
	};
	
	// TODO
	exports.INFO = function() {
	  throw new Error('INFO is not implemented');
	};
	
	exports.ISBLANK = function(value) {
	  return value === null;
	};
	
	exports.ISBINARY = function (number) {
	  return (/^[01]{1,10}$/).test(number);
	};
	
	exports.ISERR = function(value) {
	  return ([error.value, error.ref, error.div0, error.num, error.name, error.nil]).indexOf(value) >= 0 ||
	    (typeof value === 'number' && (isNaN(value) || !isFinite(value)));
	};
	
	exports.ISERROR = function(value) {
	  return exports.ISERR(value) || value === error.na;
	};
	
	exports.ISEVEN = function(number) {
	  return (Math.floor(Math.abs(number)) & 1) ? false : true;
	};
	
	// TODO
	exports.ISFORMULA = function() {
	  throw new Error('ISFORMULA is not implemented');
	};
	
	exports.ISLOGICAL = function(value) {
	  return value === true || value === false;
	};
	
	exports.ISNA = function(value) {
	  return value === error.na;
	};
	
	exports.ISNONTEXT = function(value) {
	  return typeof(value) !== 'string';
	};
	
	exports.ISNUMBER = function(value) {
	  return typeof(value) === 'number' && !isNaN(value) && isFinite(value);
	};
	
	exports.ISODD = function(number) {
	  return (Math.floor(Math.abs(number)) & 1) ? true : false;
	};
	
	// TODO
	exports.ISREF = function() {
	  throw new Error('ISREF is not implemented');
	};
	
	exports.ISTEXT = function(value) {
	  return typeof(value) === 'string';
	};
	
	exports.N = function(value) {
	  if (this.ISNUMBER(value)) {
	    return value;
	  }
	  if (value instanceof Date) {
	    return value.getTime();
	  }
	  if (value === true) {
	    return 1;
	  }
	  if (value === false) {
	    return 0;
	  }
	  if (this.ISERROR(value)) {
	    return value;
	  }
	  return 0;
	};
	
	exports.NA = function() {
	  if (process && process.env && process.env.NODE_ENV === 'compile') {
	    return 0;
	  }
	  
	  return error.na;
	};
	
	
	// TODO
	exports.SHEET = function() {
	  throw new Error('SHEET is not implemented');
	};
	
	// TODO
	exports.SHEETS = function() {
	  throw new Error('SHEETS is not implemented');
	};
	
	exports.TYPE = function(value) {
	  if (this.ISNUMBER(value)) {
	    return 1;
	  }
	  if (this.ISTEXT(value)) {
	    return 2;
	  }
	  if (this.ISLOGICAL(value)) {
	    return 4;
	  }
	  if (this.ISERROR(value)) {
	    return 16;
	  }
	  if (Array.isArray(value)) {
	    return 64;
	  }
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v4.0.0 https://github.com/MikeMcl/bignumber.js/LICENCE */
	
	;(function (globalObj) {
	    'use strict';
	
	    /*
	      bignumber.js v4.0.0
	      A JavaScript library for arbitrary-precision arithmetic.
	      https://github.com/MikeMcl/bignumber.js
	      Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
	      MIT Expat Licence
	    */
	
	
	    var BigNumber,
	        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        mathceil = Math.ceil,
	        mathfloor = Math.floor,
	        notBool = ' not a boolean or binary digit',
	        roundingMode = 'rounding mode',
	        tooManyDigits = 'number type has more than 15 significant digits',
	        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
	        BASE = 1e14,
	        LOG_BASE = 14,
	        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
	        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	        SQRT_BASE = 1e7,
	
	        /*
	         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
	         * exception is thrown (if ERRORS is true).
	         */
	        MAX = 1E9;                                   // 0 to MAX_INT32
	
	
	    /*
	     * Create and return a BigNumber constructor.
	     */
	    function constructorFactory(config) {
	        var div, parseNumeric,
	
	            // id tracks the caller function, so its name can be included in error messages.
	            id = 0,
	            P = BigNumber.prototype,
	            ONE = new BigNumber(1),
	
	
	            /********************************* EDITABLE DEFAULTS **********************************/
	
	
	            /*
	             * The default values below must be integers within the inclusive ranges stated.
	             * The values can also be changed at run-time using BigNumber.config.
	             */
	
	            // The maximum number of decimal places for operations involving division.
	            DECIMAL_PLACES = 20,                     // 0 to MAX
	
	            /*
	             * The rounding mode used when rounding to the above decimal places, and when using
	             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
	             * UP         0 Away from zero.
	             * DOWN       1 Towards zero.
	             * CEIL       2 Towards +Infinity.
	             * FLOOR      3 Towards -Infinity.
	             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	             */
	            ROUNDING_MODE = 4,                       // 0 to 8
	
	            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]
	
	            // The exponent value at and beneath which toString returns exponential notation.
	            // Number type: -7
	            TO_EXP_NEG = -7,                         // 0 to -MAX
	
	            // The exponent value at and above which toString returns exponential notation.
	            // Number type: 21
	            TO_EXP_POS = 21,                         // 0 to MAX
	
	            // RANGE : [MIN_EXP, MAX_EXP]
	
	            // The minimum exponent value, beneath which underflow to zero occurs.
	            // Number type: -324  (5e-324)
	            MIN_EXP = -1e7,                          // -1 to -MAX
	
	            // The maximum exponent value, above which overflow to Infinity occurs.
	            // Number type:  308  (1.7976931348623157e+308)
	            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
	            MAX_EXP = 1e7,                           // 1 to MAX
	
	            // Whether BigNumber Errors are ever thrown.
	            ERRORS = true,                           // true or false
	
	            // Change to intValidatorNoErrors if ERRORS is false.
	            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors
	
	            // Whether to use cryptographically-secure random number generation, if available.
	            CRYPTO = false,                          // true or false
	
	            /*
	             * The modulo mode used when calculating the modulus: a mod n.
	             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	             * The remainder (r) is calculated as: r = a - n * q.
	             *
	             * UP        0 The remainder is positive if the dividend is negative, else is negative.
	             * DOWN      1 The remainder has the same sign as the dividend.
	             *             This modulo mode is commonly known as 'truncated division' and is
	             *             equivalent to (a % n) in JavaScript.
	             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
	             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	             *             The remainder is always positive.
	             *
	             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
	             * modes are commonly used for the modulus operation.
	             * Although the other rounding modes can also be used, they may not give useful results.
	             */
	            MODULO_MODE = 1,                         // 0 to 9
	
	            // The maximum number of significant digits of the result of the toPower operation.
	            // If POW_PRECISION is 0, there will be unlimited significant digits.
	            POW_PRECISION = 0,                       // 0 to MAX
	
	            // The format specification used by the BigNumber.prototype.toFormat method.
	            FORMAT = {
	                decimalSeparator: '.',
	                groupSeparator: ',',
	                groupSize: 3,
	                secondaryGroupSize: 0,
	                fractionGroupSeparator: '\xA0',      // non-breaking space
	                fractionGroupSize: 0
	            };
	
	
	        /******************************************************************************************/
	
	
	        // CONSTRUCTOR
	
	
	        /*
	         * The BigNumber constructor and exported function.
	         * Create and return a new instance of a BigNumber object.
	         *
	         * n {number|string|BigNumber} A numeric value.
	         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
	         */
	        function BigNumber( n, b ) {
	            var c, e, i, num, len, str,
	                x = this;
	
	            // Enable constructor usage without new.
	            if ( !( x instanceof BigNumber ) ) {
	
	                // 'BigNumber() constructor call without new: {n}'
	                if (ERRORS) raise( 26, 'constructor call without new', n );
	                return new BigNumber( n, b );
	            }
	
	            // 'new BigNumber() base not an integer: {b}'
	            // 'new BigNumber() base out of range: {b}'
	            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {
	
	                // Duplicate.
	                if ( n instanceof BigNumber ) {
	                    x.s = n.s;
	                    x.e = n.e;
	                    x.c = ( n = n.c ) ? n.slice() : n;
	                    id = 0;
	                    return;
	                }
	
	                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
	                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;
	
	                    // Fast path for integers.
	                    if ( n === ~~n ) {
	                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
	                        x.e = e;
	                        x.c = [n];
	                        id = 0;
	                        return;
	                    }
	
	                    str = n + '';
	                } else {
	                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }
	            } else {
	                b = b | 0;
	                str = n + '';
	
	                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
	                // Allow exponential notation to be used with base 10 argument.
	                if ( b == 10 ) {
	                    x = new BigNumber( n instanceof BigNumber ? n : str );
	                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
	                }
	
	                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	                // Any number in exponential form will fail due to the [Ee][+-].
	                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
	                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
	                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
	                    return parseNumeric( x, str, num, b );
	                }
	
	                if (num) {
	                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;
	
	                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {
	
	                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                        raise( id, tooManyDigits, n );
	                    }
	
	                    // Prevent later check for length on converted number.
	                    num = false;
	                } else {
	                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
	                }
	
	                str = convertBase( str, 10, b, x.s );
	            }
	
	            // Decimal point?
	            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );
	
	            // Exponential form?
	            if ( ( i = str.search( /e/i ) ) > 0 ) {
	
	                // Determine exponent.
	                if ( e < 0 ) e = i;
	                e += +str.slice( i + 1 );
	                str = str.substring( 0, i );
	            } else if ( e < 0 ) {
	
	                // Integer.
	                e = str.length;
	            }
	
	            // Determine leading zeros.
	            for ( i = 0; str.charCodeAt(i) === 48; i++ );
	
	            // Determine trailing zeros.
	            for ( len = str.length; str.charCodeAt(--len) === 48; );
	            str = str.slice( i, len + 1 );
	
	            if (str) {
	                len = str.length;
	
	                // Disallow numbers with over 15 significant digits if number type.
	                // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
	                    raise( id, tooManyDigits, x.s * n );
	                }
	
	                e = e - i - 1;
	
	                 // Overflow?
	                if ( e > MAX_EXP ) {
	
	                    // Infinity.
	                    x.c = x.e = null;
	
	                // Underflow?
	                } else if ( e < MIN_EXP ) {
	
	                    // Zero.
	                    x.c = [ x.e = 0 ];
	                } else {
	                    x.e = e;
	                    x.c = [];
	
	                    // Transform base
	
	                    // e is the base 10 exponent.
	                    // i is where to slice str to get the first element of the coefficient array.
	                    i = ( e + 1 ) % LOG_BASE;
	                    if ( e < 0 ) i += LOG_BASE;
	
	                    if ( i < len ) {
	                        if (i) x.c.push( +str.slice( 0, i ) );
	
	                        for ( len -= LOG_BASE; i < len; ) {
	                            x.c.push( +str.slice( i, i += LOG_BASE ) );
	                        }
	
	                        str = str.slice(i);
	                        i = LOG_BASE - str.length;
	                    } else {
	                        i -= len;
	                    }
	
	                    for ( ; i--; str += '0' );
	                    x.c.push( +str );
	                }
	            } else {
	
	                // Zero.
	                x.c = [ x.e = 0 ];
	            }
	
	            id = 0;
	        }
	
	
	        // CONSTRUCTOR PROPERTIES
	
	
	        BigNumber.another = constructorFactory;
	
	        BigNumber.ROUND_UP = 0;
	        BigNumber.ROUND_DOWN = 1;
	        BigNumber.ROUND_CEIL = 2;
	        BigNumber.ROUND_FLOOR = 3;
	        BigNumber.ROUND_HALF_UP = 4;
	        BigNumber.ROUND_HALF_DOWN = 5;
	        BigNumber.ROUND_HALF_EVEN = 6;
	        BigNumber.ROUND_HALF_CEIL = 7;
	        BigNumber.ROUND_HALF_FLOOR = 8;
	        BigNumber.EUCLID = 9;
	
	
	        /*
	         * Configure infrequently-changing library-wide settings.
	         *
	         * Accept an object or an argument list, with one or many of the following properties or
	         * parameters respectively:
	         *
	         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
	         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
	         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
	         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
	         *   ERRORS          {boolean|number}   true, false, 1 or 0
	         *   CRYPTO          {boolean|number}   true, false, 1 or 0
	         *   MODULO_MODE     {number}           0 to 9 inclusive
	         *   POW_PRECISION   {number}           0 to MAX inclusive
	         *   FORMAT          {object}           See BigNumber.prototype.toFormat
	         *      decimalSeparator       {string}
	         *      groupSeparator         {string}
	         *      groupSize              {number}
	         *      secondaryGroupSize     {number}
	         *      fractionGroupSeparator {string}
	         *      fractionGroupSize      {number}
	         *
	         * (The values assigned to the above FORMAT object properties are not checked for validity.)
	         *
	         * E.g.
	         * BigNumber.config(20, 4) is equivalent to
	         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	         *
	         * Ignore properties/parameters set to null or undefined.
	         * Return an object with the properties current values.
	         */
	        BigNumber.config = BigNumber.set = function () {
	            var v, p,
	                i = 0,
	                r = {},
	                a = arguments,
	                o = a[0],
	                has = o && typeof o == 'object'
	                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
	                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };
	
	            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	            // 'config() DECIMAL_PLACES not an integer: {v}'
	            // 'config() DECIMAL_PLACES out of range: {v}'
	            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                DECIMAL_PLACES = v | 0;
	            }
	            r[p] = DECIMAL_PLACES;
	
	            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	            // 'config() ROUNDING_MODE not an integer: {v}'
	            // 'config() ROUNDING_MODE out of range: {v}'
	            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
	                ROUNDING_MODE = v | 0;
	            }
	            r[p] = ROUNDING_MODE;
	
	            // EXPONENTIAL_AT {number|number[]}
	            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	            // 'config() EXPONENTIAL_AT not an integer: {v}'
	            // 'config() EXPONENTIAL_AT out of range: {v}'
	            if ( has( p = 'EXPONENTIAL_AT' ) ) {
	
	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
	                        TO_EXP_NEG = v[0] | 0;
	                        TO_EXP_POS = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
	                }
	            }
	            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];
	
	            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	            // 'config() RANGE not an integer: {v}'
	            // 'config() RANGE cannot be zero: {v}'
	            // 'config() RANGE out of range: {v}'
	            if ( has( p = 'RANGE' ) ) {
	
	                if ( isArray(v) ) {
	                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
	                        MIN_EXP = v[0] | 0;
	                        MAX_EXP = v[1] | 0;
	                    }
	                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
	                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
	                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
	                }
	            }
	            r[p] = [ MIN_EXP, MAX_EXP ];
	
	            // ERRORS {boolean|number} true, false, 1 or 0.
	            // 'config() ERRORS not a boolean or binary digit: {v}'
	            if ( has( p = 'ERRORS' ) ) {
	
	                if ( v === !!v || v === 1 || v === 0 ) {
	                    id = 0;
	                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = ERRORS;
	
	            // CRYPTO {boolean|number} true, false, 1 or 0.
	            // 'config() CRYPTO not a boolean or binary digit: {v}'
	            // 'config() crypto unavailable: {crypto}'
	            if ( has( p = 'CRYPTO' ) ) {
	
	                if ( v === true || v === false || v === 1 || v === 0 ) {
	                    if (v) {
	                        v = typeof crypto == 'undefined';
	                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
	                            CRYPTO = true;
	                        } else if (ERRORS) {
	                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
	                        } else {
	                            CRYPTO = false;
	                        }
	                    } else {
	                        CRYPTO = false;
	                    }
	                } else if (ERRORS) {
	                    raise( 2, p + notBool, v );
	                }
	            }
	            r[p] = CRYPTO;
	
	            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	            // 'config() MODULO_MODE not an integer: {v}'
	            // 'config() MODULO_MODE out of range: {v}'
	            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
	                MODULO_MODE = v | 0;
	            }
	            r[p] = MODULO_MODE;
	
	            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	            // 'config() POW_PRECISION not an integer: {v}'
	            // 'config() POW_PRECISION out of range: {v}'
	            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
	                POW_PRECISION = v | 0;
	            }
	            r[p] = POW_PRECISION;
	
	            // FORMAT {object}
	            // 'config() FORMAT not an object: {v}'
	            if ( has( p = 'FORMAT' ) ) {
	
	                if ( typeof v == 'object' ) {
	                    FORMAT = v;
	                } else if (ERRORS) {
	                    raise( 2, p + ' not an object', v );
	                }
	            }
	            r[p] = FORMAT;
	
	            return r;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the maximum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };
	
	
	        /*
	         * Return a new BigNumber whose value is the minimum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };
	
	
	        /*
	         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	         * zeros are produced).
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         *
	         * 'random() decimal places not an integer: {dp}'
	         * 'random() decimal places out of range: {dp}'
	         * 'random() crypto unavailable: {crypto}'
	         */
	        BigNumber.random = (function () {
	            var pow2_53 = 0x20000000000000;
	
	            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	            // Check if Math.random() produces more than 32 bits of randomness.
	            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
	              ? function () { return mathfloor( Math.random() * pow2_53 ); }
	              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
	                  (Math.random() * 0x800000 | 0); };
	
	            return function (dp) {
	                var a, b, e, k, v,
	                    i = 0,
	                    c = [],
	                    rand = new BigNumber(ONE);
	
	                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
	                k = mathceil( dp / LOG_BASE );
	
	                if (CRYPTO) {
	
	                    // Browsers supporting crypto.getRandomValues.
	                    if (crypto.getRandomValues) {
	
	                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );
	
	                        for ( ; i < k; ) {
	
	                            // 53 bits:
	                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
	                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
	                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
	                            //                                     11111 11111111 11111111
	                            // 0x20000 is 2^21.
	                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);
	
	                            // Rejection sampling:
	                            // 0 <= v < 9007199254740992
	                            // Probability that v >= 9e15, is
	                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
	                            if ( v >= 9e15 ) {
	                                b = crypto.getRandomValues( new Uint32Array(2) );
	                                a[i] = b[0];
	                                a[i + 1] = b[1];
	                            } else {
	
	                                // 0 <= v <= 8999999999999999
	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 2;
	                            }
	                        }
	                        i = k / 2;
	
	                    // Node.js supporting crypto.randomBytes.
	                    } else if (crypto.randomBytes) {
	
	                        // buffer
	                        a = crypto.randomBytes( k *= 7 );
	
	                        for ( ; i < k; ) {
	
	                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	                            // 0x100000000 is 2^32, 0x1000000 is 2^24
	                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	                            // 0 <= v < 9007199254740992
	                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
	                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
	                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];
	
	                            if ( v >= 9e15 ) {
	                                crypto.randomBytes(7).copy( a, i );
	                            } else {
	
	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push( v % 1e14 );
	                                i += 7;
	                            }
	                        }
	                        i = k / 7;
	                    } else {
	                        CRYPTO = false;
	                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
	                    }
	                }
	
	                // Use Math.random.
	                if (!CRYPTO) {
	
	                    for ( ; i < k; ) {
	                        v = random53bitInt();
	                        if ( v < 9e15 ) c[i++] = v % 1e14;
	                    }
	                }
	
	                k = c[--i];
	                dp %= LOG_BASE;
	
	                // Convert trailing digits to zeros according to dp.
	                if ( k && dp ) {
	                    v = POWS_TEN[LOG_BASE - dp];
	                    c[i] = mathfloor( k / v ) * v;
	                }
	
	                // Remove trailing elements which are zero.
	                for ( ; c[i] === 0; c.pop(), i-- );
	
	                // Zero?
	                if ( i < 0 ) {
	                    c = [ e = 0 ];
	                } else {
	
	                    // Remove leading elements which are zero and adjust exponent accordingly.
	                    for ( e = -1 ; c[0] === 0; c.shift(), e -= LOG_BASE);
	
	                    // Count the digits of the first element of c to determine leading zeros, and...
	                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);
	
	                    // adjust the exponent accordingly.
	                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
	                }
	
	                rand.e = e;
	                rand.c = c;
	                return rand;
	            };
	        })();
	
	
	        // PRIVATE FUNCTIONS
	
	
	        // Convert a numeric string of baseIn to a numeric string of baseOut.
	        function convertBase( str, baseOut, baseIn, sign ) {
	            var d, e, k, r, x, xc, y,
	                i = str.indexOf( '.' ),
	                dp = DECIMAL_PLACES,
	                rm = ROUNDING_MODE;
	
	            if ( baseIn < 37 ) str = str.toLowerCase();
	
	            // Non-integer.
	            if ( i >= 0 ) {
	                k = POW_PRECISION;
	
	                // Unlimited precision.
	                POW_PRECISION = 0;
	                str = str.replace( '.', '' );
	                y = new BigNumber(baseIn);
	                x = y.pow( str.length - i );
	                POW_PRECISION = k;
	
	                // Convert str as if an integer, then restore the fraction part by dividing the
	                // result by its base raised to a power.
	                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
	                y.e = y.c.length;
	            }
	
	            // Convert the number as integer.
	            xc = toBaseOut( str, baseIn, baseOut );
	            e = k = xc.length;
	
	            // Remove trailing zeros.
	            for ( ; xc[--k] == 0; xc.pop() );
	            if ( !xc[0] ) return '0';
	
	            if ( i < 0 ) {
	                --e;
	            } else {
	                x.c = xc;
	                x.e = e;
	
	                // sign is needed for correct rounding.
	                x.s = sign;
	                x = div( x, y, dp, rm, baseOut );
	                xc = x.c;
	                r = x.r;
	                e = x.e;
	            }
	
	            d = e + dp + 1;
	
	            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
	            i = xc[d];
	            k = baseOut / 2;
	            r = r || d < 0 || xc[d + 1] != null;
	
	            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
	                         rm == ( x.s < 0 ? 8 : 7 ) );
	
	            if ( d < 1 || !xc[0] ) {
	
	                // 1^-dp or 0.
	                str = r ? toFixedPoint( '1', -dp ) : '0';
	            } else {
	                xc.length = d;
	
	                if (r) {
	
	                    // Rounding up may mean the previous digit has to be rounded up and so on.
	                    for ( --baseOut; ++xc[--d] > baseOut; ) {
	                        xc[d] = 0;
	
	                        if ( !d ) {
	                            ++e;
	                            xc.unshift(1);
	                        }
	                    }
	                }
	
	                // Determine trailing zeros.
	                for ( k = xc.length; !xc[--k]; );
	
	                // E.g. [4, 11, 15] becomes 4bf.
	                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
	                str = toFixedPoint( str, e );
	            }
	
	            // The caller will add the sign.
	            return str;
	        }
	
	
	        // Perform division in the specified base. Called by div and convertBase.
	        div = (function () {
	
	            // Assume non-zero x and k.
	            function multiply( x, k, base ) {
	                var m, temp, xlo, xhi,
	                    carry = 0,
	                    i = x.length,
	                    klo = k % SQRT_BASE,
	                    khi = k / SQRT_BASE | 0;
	
	                for ( x = x.slice(); i--; ) {
	                    xlo = x[i] % SQRT_BASE;
	                    xhi = x[i] / SQRT_BASE | 0;
	                    m = khi * xlo + xhi * klo;
	                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
	                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
	                    x[i] = temp % base;
	                }
	
	                if (carry) x.unshift(carry);
	
	                return x;
	            }
	
	            function compare( a, b, aL, bL ) {
	                var i, cmp;
	
	                if ( aL != bL ) {
	                    cmp = aL > bL ? 1 : -1;
	                } else {
	
	                    for ( i = cmp = 0; i < aL; i++ ) {
	
	                        if ( a[i] != b[i] ) {
	                            cmp = a[i] > b[i] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }
	                return cmp;
	            }
	
	            function subtract( a, b, aL, base ) {
	                var i = 0;
	
	                // Subtract b from a.
	                for ( ; aL--; ) {
	                    a[aL] -= i;
	                    i = a[aL] < b[aL] ? 1 : 0;
	                    a[aL] = i * base + a[aL] - b[aL];
	                }
	
	                // Remove leading zeros.
	                for ( ; !a[0] && a.length > 1; a.shift() );
	            }
	
	            // x: dividend, y: divisor.
	            return function ( x, y, dp, rm, base ) {
	                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
	                    yL, yz,
	                    s = x.s == y.s ? 1 : -1,
	                    xc = x.c,
	                    yc = y.c;
	
	                // Either NaN, Infinity or 0?
	                if ( !xc || !xc[0] || !yc || !yc[0] ) {
	
	                    return new BigNumber(
	
	                      // Return NaN if either NaN, or both Infinity or 0.
	                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :
	
	                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
	                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
	                    );
	                }
	
	                q = new BigNumber(s);
	                qc = q.c = [];
	                e = x.e - y.e;
	                s = dp + e + 1;
	
	                if ( !base ) {
	                    base = BASE;
	                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
	                    s = s / LOG_BASE | 0;
	                }
	
	                // Result exponent may be one less then the current value of e.
	                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
	                if ( yc[i] > ( xc[i] || 0 ) ) e--;
	
	                if ( s < 0 ) {
	                    qc.push(1);
	                    more = true;
	                } else {
	                    xL = xc.length;
	                    yL = yc.length;
	                    i = 0;
	                    s += 2;
	
	                    // Normalise xc and yc so highest order digit of yc is >= base / 2.
	
	                    n = mathfloor( base / ( yc[0] + 1 ) );
	
	                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
	                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
	                    if ( n > 1 ) {
	                        yc = multiply( yc, n, base );
	                        xc = multiply( xc, n, base );
	                        yL = yc.length;
	                        xL = xc.length;
	                    }
	
	                    xi = yL;
	                    rem = xc.slice( 0, yL );
	                    remL = rem.length;
	
	                    // Add zeros to make remainder as long as divisor.
	                    for ( ; remL < yL; rem[remL++] = 0 );
	                    yz = yc.slice();
	                    yz.unshift(0);
	                    yc0 = yc[0];
	                    if ( yc[1] >= base / 2 ) yc0++;
	                    // Not necessary, but to prevent trial digit n > base, when using base 3.
	                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;
	
	                    do {
	                        n = 0;
	
	                        // Compare divisor and remainder.
	                        cmp = compare( yc, rem, yL, remL );
	
	                        // If divisor < remainder.
	                        if ( cmp < 0 ) {
	
	                            // Calculate trial digit, n.
	
	                            rem0 = rem[0];
	                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );
	
	                            // n is how many times the divisor goes into the current remainder.
	                            n = mathfloor( rem0 / yc0 );
	
	                            //  Algorithm:
	                            //  1. product = divisor * trial digit (n)
	                            //  2. if product > remainder: product -= divisor, n--
	                            //  3. remainder -= product
	                            //  4. if product was < remainder at 2:
	                            //    5. compare new remainder and divisor
	                            //    6. If remainder > divisor: remainder -= divisor, n++
	
	                            if ( n > 1 ) {
	
	                                // n may be > base only when base is 3.
	                                if (n >= base) n = base - 1;
	
	                                // product = divisor * trial digit.
	                                prod = multiply( yc, n, base );
	                                prodL = prod.length;
	                                remL = rem.length;
	
	                                // Compare product and remainder.
	                                // If product > remainder.
	                                // Trial digit n too high.
	                                // n is 1 too high about 5% of the time, and is not known to have
	                                // ever been more than 1 too high.
	                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
	                                    n--;
	
	                                    // Subtract divisor from product.
	                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
	                                    prodL = prod.length;
	                                    cmp = 1;
	                                }
	                            } else {
	
	                                // n is 0 or 1, cmp is -1.
	                                // If n is 0, there is no need to compare yc and rem again below,
	                                // so change cmp to 1 to avoid it.
	                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                                if ( n == 0 ) {
	
	                                    // divisor < remainder, so n must be at least 1.
	                                    cmp = n = 1;
	                                }
	
	                                // product = divisor
	                                prod = yc.slice();
	                                prodL = prod.length;
	                            }
	
	                            if ( prodL < remL ) prod.unshift(0);
	
	                            // Subtract product from remainder.
	                            subtract( rem, prod, remL, base );
	                            remL = rem.length;
	
	                             // If product was < remainder.
	                            if ( cmp == -1 ) {
	
	                                // Compare divisor and new remainder.
	                                // If divisor < new remainder, subtract divisor from remainder.
	                                // Trial digit n too low.
	                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                                while ( compare( yc, rem, yL, remL ) < 1 ) {
	                                    n++;
	
	                                    // Subtract divisor from remainder.
	                                    subtract( rem, yL < remL ? yz : yc, remL, base );
	                                    remL = rem.length;
	                                }
	                            }
	                        } else if ( cmp === 0 ) {
	                            n++;
	                            rem = [0];
	                        } // else cmp === 1 and n will be 0
	
	                        // Add the next digit, n, to the result array.
	                        qc[i++] = n;
	
	                        // Update the remainder.
	                        if ( rem[0] ) {
	                            rem[remL++] = xc[xi] || 0;
	                        } else {
	                            rem = [ xc[xi] ];
	                            remL = 1;
	                        }
	                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );
	
	                    more = rem[0] != null;
	
	                    // Leading zero?
	                    if ( !qc[0] ) qc.shift();
	                }
	
	                if ( base == BASE ) {
	
	                    // To calculate q.e, first get the number of digits of qc[0].
	                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
	                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );
	
	                // Caller is convertBase.
	                } else {
	                    q.e = e;
	                    q.r = +more;
	                }
	
	                return q;
	            };
	        })();
	
	
	        /*
	         * Return a string representing the value of BigNumber n in fixed-point or exponential
	         * notation rounded to the specified decimal places or significant digits.
	         *
	         * n is a BigNumber.
	         * i is the index of the last digit required (i.e. the digit that may be rounded up).
	         * rm is the rounding mode.
	         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
	         */
	        function format( n, i, rm, caller ) {
	            var c0, e, ne, len, str;
	
	            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
	              ? rm | 0 : ROUNDING_MODE;
	
	            if ( !n.c ) return n.toString();
	            c0 = n.c[0];
	            ne = n.e;
	
	            if ( i == null ) {
	                str = coeffToString( n.c );
	                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
	                  ? toExponential( str, ne )
	                  : toFixedPoint( str, ne );
	            } else {
	                n = round( new BigNumber(n), i, rm );
	
	                // n.e may have changed if the value was rounded up.
	                e = n.e;
	
	                str = coeffToString( n.c );
	                len = str.length;
	
	                // toPrecision returns exponential notation if the number of significant digits
	                // specified is less than the number of digits necessary to represent the integer
	                // part of the value in fixed-point notation.
	
	                // Exponential notation.
	                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {
	
	                    // Append zeros?
	                    for ( ; len < i; str += '0', len++ );
	                    str = toExponential( str, e );
	
	                // Fixed-point notation.
	                } else {
	                    i -= ne;
	                    str = toFixedPoint( str, e );
	
	                    // Append zeros?
	                    if ( e + 1 > len ) {
	                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
	                    } else {
	                        i += e - len;
	                        if ( i > 0 ) {
	                            if ( e + 1 == len ) str += '.';
	                            for ( ; i--; str += '0' );
	                        }
	                    }
	                }
	            }
	
	            return n.s < 0 && c0 ? '-' + str : str;
	        }
	
	
	        // Handle BigNumber.max and BigNumber.min.
	        function maxOrMin( args, method ) {
	            var m, n,
	                i = 0;
	
	            if ( isArray( args[0] ) ) args = args[0];
	            m = new BigNumber( args[0] );
	
	            for ( ; ++i < args.length; ) {
	                n = new BigNumber( args[i] );
	
	                // If any number is NaN, return NaN.
	                if ( !n.s ) {
	                    m = n;
	                    break;
	                } else if ( method.call( m, n ) ) {
	                    m = n;
	                }
	            }
	
	            return m;
	        }
	
	
	        /*
	         * Return true if n is an integer in range, otherwise throw.
	         * Use for argument validation when ERRORS is true.
	         */
	        function intValidatorWithErrors( n, min, max, caller, name ) {
	            if ( n < min || n > max || n != truncate(n) ) {
	                raise( caller, ( name || 'decimal places' ) +
	                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
	            }
	
	            return true;
	        }
	
	
	        /*
	         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	         * Called by minus, plus and times.
	         */
	        function normalise( n, c, e ) {
	            var i = 1,
	                j = c.length;
	
	             // Remove trailing zeros.
	            for ( ; !c[--j]; c.pop() );
	
	            // Calculate the base 10 exponent. First get the number of digits of c[0].
	            for ( j = c[0]; j >= 10; j /= 10, i++ );
	
	            // Overflow?
	            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {
	
	                // Infinity.
	                n.c = n.e = null;
	
	            // Underflow?
	            } else if ( e < MIN_EXP ) {
	
	                // Zero.
	                n.c = [ n.e = 0 ];
	            } else {
	                n.e = e;
	                n.c = c;
	            }
	
	            return n;
	        }
	
	
	        // Handle values that fail the validity test in BigNumber.
	        parseNumeric = (function () {
	            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
	                dotAfter = /^([^.]+)\.$/,
	                dotBefore = /^\.([^.]+)$/,
	                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
	                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
	
	            return function ( x, str, num, b ) {
	                var base,
	                    s = num ? str : str.replace( whitespaceOrPlus, '' );
	
	                // No exception on ±Infinity or NaN.
	                if ( isInfinityOrNaN.test(s) ) {
	                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	                } else {
	                    if ( !num ) {
	
	                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
	                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	                            return !b || b == base ? p1 : m;
	                        });
	
	                        if (b) {
	                            base = b;
	
	                            // E.g. '1.' to '1', '.1' to '0.1'
	                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
	                        }
	
	                        if ( str != s ) return new BigNumber( s, base );
	                    }
	
	                    // 'new BigNumber() not a number: {n}'
	                    // 'new BigNumber() not a base {b} number: {n}'
	                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
	                    x.s = null;
	                }
	
	                x.c = x.e = null;
	                id = 0;
	            }
	        })();
	
	
	        // Throw a BigNumber Error.
	        function raise( caller, msg, val ) {
	            var error = new Error( [
	                'new BigNumber',     // 0
	                'cmp',               // 1
	                'config',            // 2
	                'div',               // 3
	                'divToInt',          // 4
	                'eq',                // 5
	                'gt',                // 6
	                'gte',               // 7
	                'lt',                // 8
	                'lte',               // 9
	                'minus',             // 10
	                'mod',               // 11
	                'plus',              // 12
	                'precision',         // 13
	                'random',            // 14
	                'round',             // 15
	                'shift',             // 16
	                'times',             // 17
	                'toDigits',          // 18
	                'toExponential',     // 19
	                'toFixed',           // 20
	                'toFormat',          // 21
	                'toFraction',        // 22
	                'pow',               // 23
	                'toPrecision',       // 24
	                'toString',          // 25
	                'BigNumber'          // 26
	            ][caller] + '() ' + msg + ': ' + val );
	
	            error.name = 'BigNumber Error';
	            id = 0;
	            throw error;
	        }
	
	
	        /*
	         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	         * If r is truthy, it is known that there are more digits after the rounding digit.
	         */
	        function round( x, sd, rm, r ) {
	            var d, i, j, k, n, ni, rd,
	                xc = x.c,
	                pows10 = POWS_TEN;
	
	            // if x is not Infinity or NaN...
	            if (xc) {
	
	                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
	                // n is a base 1e14 number, the value of the element of array x.c containing rd.
	                // ni is the index of n within x.c.
	                // d is the number of digits of n.
	                // i is the index of rd within n including leading zeros.
	                // j is the actual index of rd within n (if < 0, rd is a leading zero).
	                out: {
	
	                    // Get the number of digits of the first element of xc.
	                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
	                    i = sd - d;
	
	                    // If the rounding digit is in the first element of xc...
	                    if ( i < 0 ) {
	                        i += LOG_BASE;
	                        j = sd;
	                        n = xc[ ni = 0 ];
	
	                        // Get the rounding digit at index j of n.
	                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
	                    } else {
	                        ni = mathceil( ( i + 1 ) / LOG_BASE );
	
	                        if ( ni >= xc.length ) {
	
	                            if (r) {
	
	                                // Needed by sqrt.
	                                for ( ; xc.length <= ni; xc.push(0) );
	                                n = rd = 0;
	                                d = 1;
	                                i %= LOG_BASE;
	                                j = i - LOG_BASE + 1;
	                            } else {
	                                break out;
	                            }
	                        } else {
	                            n = k = xc[ni];
	
	                            // Get the number of digits of n.
	                            for ( d = 1; k >= 10; k /= 10, d++ );
	
	                            // Get the index of rd within n.
	                            i %= LOG_BASE;
	
	                            // Get the index of rd within n, adjusted for leading zeros.
	                            // The number of leading zeros of n is given by LOG_BASE - d.
	                            j = i - LOG_BASE + d;
	
	                            // Get the rounding digit at index j of n.
	                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
	                        }
	                    }
	
	                    r = r || sd < 0 ||
	
	                    // Are there any non-zero digits after the rounding digit?
	                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
	                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );
	
	                    r = rm < 4
	                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
	                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&
	
	                        // Check whether the digit to the left of the rounding digit is odd.
	                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
	                          rm == ( x.s < 0 ? 8 : 7 ) );
	
	                    if ( sd < 1 || !xc[0] ) {
	                        xc.length = 0;
	
	                        if (r) {
	
	                            // Convert sd to decimal places.
	                            sd -= x.e + 1;
	
	                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
	                            x.e = -sd || 0;
	                        } else {
	
	                            // Zero.
	                            xc[0] = x.e = 0;
	                        }
	
	                        return x;
	                    }
	
	                    // Remove excess digits.
	                    if ( i == 0 ) {
	                        xc.length = ni;
	                        k = 1;
	                        ni--;
	                    } else {
	                        xc.length = ni + 1;
	                        k = pows10[ LOG_BASE - i ];
	
	                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	                        // j > 0 means i > number of leading zeros of n.
	                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
	                    }
	
	                    // Round up?
	                    if (r) {
	
	                        for ( ; ; ) {
	
	                            // If the digit to be rounded up is in the first element of xc...
	                            if ( ni == 0 ) {
	
	                                // i will be the length of xc[0] before k is added.
	                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
	                                j = xc[0] += k;
	                                for ( k = 1; j >= 10; j /= 10, k++ );
	
	                                // if i != k the length has increased.
	                                if ( i != k ) {
	                                    x.e++;
	                                    if ( xc[0] == BASE ) xc[0] = 1;
	                                }
	
	                                break;
	                            } else {
	                                xc[ni] += k;
	                                if ( xc[ni] != BASE ) break;
	                                xc[ni--] = 0;
	                                k = 1;
	                            }
	                        }
	                    }
	
	                    // Remove trailing zeros.
	                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
	                }
	
	                // Overflow? Infinity.
	                if ( x.e > MAX_EXP ) {
	                    x.c = x.e = null;
	
	                // Underflow? Zero.
	                } else if ( x.e < MIN_EXP ) {
	                    x.c = [ x.e = 0 ];
	                }
	            }
	
	            return x;
	        }
	
	
	        // PROTOTYPE/INSTANCE METHODS
	
	
	        /*
	         * Return a new BigNumber whose value is the absolute value of this BigNumber.
	         */
	        P.absoluteValue = P.abs = function () {
	            var x = new BigNumber(this);
	            if ( x.s < 0 ) x.s = 1;
	            return x;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of Infinity.
	         */
	        P.ceil = function () {
	            return round( new BigNumber(this), this.e + 1, 2 );
	        };
	
	
	        /*
	         * Return
	         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * 0 if they have the same value,
	         * or null if the value of either is NaN.
	         */
	        P.comparedTo = P.cmp = function ( y, b ) {
	            id = 1;
	            return compare( this, new BigNumber( y, b ) );
	        };
	
	
	        /*
	         * Return the number of decimal places of the value of this BigNumber, or null if the value
	         * of this BigNumber is ±Infinity or NaN.
	         */
	        P.decimalPlaces = P.dp = function () {
	            var n, v,
	                c = this.c;
	
	            if ( !c ) return null;
	            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;
	
	            // Subtract the number of trailing zeros of the last number.
	            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
	            if ( n < 0 ) n = 0;
	
	            return n;
	        };
	
	
	        /*
	         *  n / 0 = I
	         *  n / N = N
	         *  n / I = 0
	         *  0 / n = 0
	         *  0 / 0 = N
	         *  0 / N = N
	         *  0 / I = 0
	         *  N / n = N
	         *  N / 0 = N
	         *  N / N = N
	         *  N / I = N
	         *  I / n = I
	         *  I / 0 = I
	         *  I / N = N
	         *  I / I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
	         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.dividedBy = P.div = function ( y, b ) {
	            id = 3;
	            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the integer part of dividing the value of this
	         * BigNumber by the value of BigNumber(y, b).
	         */
	        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
	            id = 4;
	            return div( this, new BigNumber( y, b ), 0, 1 );
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.equals = P.eq = function ( y, b ) {
	            id = 5;
	            return compare( this, new BigNumber( y, b ) ) === 0;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of -Infinity.
	         */
	        P.floor = function () {
	            return round( new BigNumber(this), this.e + 1, 3 );
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.greaterThan = P.gt = function ( y, b ) {
	            id = 6;
	            return compare( this, new BigNumber( y, b ) ) > 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is greater than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
	            id = 7;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;
	
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
	         */
	        P.isFinite = function () {
	            return !!this.c;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is an integer, otherwise return false.
	         */
	        P.isInteger = P.isInt = function () {
	            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is NaN, otherwise returns false.
	         */
	        P.isNaN = function () {
	            return !this.s;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is negative, otherwise returns false.
	         */
	        P.isNegative = P.isNeg = function () {
	            return this.s < 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
	         */
	        P.isZero = function () {
	            return !!this.c && this.c[0] == 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.lessThan = P.lt = function ( y, b ) {
	            id = 8;
	            return compare( this, new BigNumber( y, b ) ) < 0;
	        };
	
	
	        /*
	         * Return true if the value of this BigNumber is less than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
	            id = 9;
	            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
	        };
	
	
	        /*
	         *  n - 0 = n
	         *  n - N = N
	         *  n - I = -I
	         *  0 - n = -n
	         *  0 - 0 = 0
	         *  0 - N = N
	         *  0 - I = -I
	         *  N - n = N
	         *  N - 0 = N
	         *  N - N = N
	         *  N - I = N
	         *  I - n = I
	         *  I - 0 = I
	         *  I - N = N
	         *  I - I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
	         * BigNumber(y, b).
	         */
	        P.minus = P.sub = function ( y, b ) {
	            var i, j, t, xLTy,
	                x = this,
	                a = x.s;
	
	            id = 10;
	            y = new BigNumber( y, b );
	            b = y.s;
	
	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);
	
	            // Signs differ?
	            if ( a != b ) {
	                y.s = -b;
	                return x.plus(y);
	            }
	
	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;
	
	            if ( !xe || !ye ) {
	
	                // Either Infinity?
	                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );
	
	                // Either zero?
	                if ( !xc[0] || !yc[0] ) {
	
	                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :
	
	                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	                      ROUNDING_MODE == 3 ? -0 : 0 );
	                }
	            }
	
	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();
	
	            // Determine which is the bigger number.
	            if ( a = xe - ye ) {
	
	                if ( xLTy = a < 0 ) {
	                    a = -a;
	                    t = xc;
	                } else {
	                    ye = xe;
	                    t = yc;
	                }
	
	                t.reverse();
	
	                // Prepend zeros to equalise exponents.
	                for ( b = a; b--; t.push(0) );
	                t.reverse();
	            } else {
	
	                // Exponents equal. Check digit by digit.
	                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;
	
	                for ( a = b = 0; b < j; b++ ) {
	
	                    if ( xc[b] != yc[b] ) {
	                        xLTy = xc[b] < yc[b];
	                        break;
	                    }
	                }
	            }
	
	            // x < y? Point xc to the array of the bigger number.
	            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;
	
	            b = ( j = yc.length ) - ( i = xc.length );
	
	            // Append zeros to xc if shorter.
	            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
	            b = BASE - 1;
	
	            // Subtract yc from xc.
	            for ( ; j > a; ) {
	
	                if ( xc[--j] < yc[j] ) {
	                    for ( i = j; i && !xc[--i]; xc[i] = b );
	                    --xc[i];
	                    xc[j] += BASE;
	                }
	
	                xc[j] -= yc[j];
	            }
	
	            // Remove leading zeros and adjust exponent accordingly.
	            for ( ; xc[0] == 0; xc.shift(), --ye );
	
	            // Zero?
	            if ( !xc[0] ) {
	
	                // Following IEEE 754 (2008) 6.3,
	                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	                y.s = ROUNDING_MODE == 3 ? -1 : 1;
	                y.c = [ y.e = 0 ];
	                return y;
	            }
	
	            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	            // for finite x and y.
	            return normalise( y, xc, ye );
	        };
	
	
	        /*
	         *   n % 0 =  N
	         *   n % N =  N
	         *   n % I =  n
	         *   0 % n =  0
	         *  -0 % n = -0
	         *   0 % 0 =  N
	         *   0 % N =  N
	         *   0 % I =  0
	         *   N % n =  N
	         *   N % 0 =  N
	         *   N % N =  N
	         *   N % I =  N
	         *   I % n =  N
	         *   I % 0 =  N
	         *   I % N =  N
	         *   I % I =  N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
	         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
	         */
	        P.modulo = P.mod = function ( y, b ) {
	            var q, s,
	                x = this;
	
	            id = 11;
	            y = new BigNumber( y, b );
	
	            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	            if ( !x.c || !y.s || y.c && !y.c[0] ) {
	                return new BigNumber(NaN);
	
	            // Return x if y is Infinity or x is zero.
	            } else if ( !y.c || x.c && !x.c[0] ) {
	                return new BigNumber(x);
	            }
	
	            if ( MODULO_MODE == 9 ) {
	
	                // Euclidian division: q = sign(y) * floor(x / abs(y))
	                // r = x - qy    where  0 <= r < abs(y)
	                s = y.s;
	                y.s = 1;
	                q = div( x, y, 0, 3 );
	                y.s = s;
	                q.s *= s;
	            } else {
	                q = div( x, y, 0, MODULO_MODE );
	            }
	
	            return x.minus( q.times(y) );
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber negated,
	         * i.e. multiplied by -1.
	         */
	        P.negated = P.neg = function () {
	            var x = new BigNumber(this);
	            x.s = -x.s || null;
	            return x;
	        };
	
	
	        /*
	         *  n + 0 = n
	         *  n + N = N
	         *  n + I = I
	         *  0 + n = n
	         *  0 + 0 = 0
	         *  0 + N = N
	         *  0 + I = I
	         *  N + n = N
	         *  N + 0 = N
	         *  N + N = N
	         *  N + I = N
	         *  I + n = I
	         *  I + 0 = I
	         *  I + N = N
	         *  I + I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
	         * BigNumber(y, b).
	         */
	        P.plus = P.add = function ( y, b ) {
	            var t,
	                x = this,
	                a = x.s;
	
	            id = 12;
	            y = new BigNumber( y, b );
	            b = y.s;
	
	            // Either NaN?
	            if ( !a || !b ) return new BigNumber(NaN);
	
	            // Signs differ?
	             if ( a != b ) {
	                y.s = -b;
	                return x.minus(y);
	            }
	
	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;
	
	            if ( !xe || !ye ) {
	
	                // Return ±Infinity if either ±Infinity.
	                if ( !xc || !yc ) return new BigNumber( a / 0 );
	
	                // Either zero?
	                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
	            }
	
	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();
	
	            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	            if ( a = xe - ye ) {
	                if ( a > 0 ) {
	                    ye = xe;
	                    t = yc;
	                } else {
	                    a = -a;
	                    t = xc;
	                }
	
	                t.reverse();
	                for ( ; a--; t.push(0) );
	                t.reverse();
	            }
	
	            a = xc.length;
	            b = yc.length;
	
	            // Point xc to the longer array, and b to the shorter length.
	            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;
	
	            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	            for ( a = 0; b; ) {
	                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
	                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
	            }
	
	            if (a) {
	                xc.unshift(a);
	                ++ye;
	            }
	
	            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	            // ye = MAX_EXP + 1 possible
	            return normalise( y, xc, ye );
	        };
	
	
	        /*
	         * Return the number of significant digits of the value of this BigNumber.
	         *
	         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	         */
	        P.precision = P.sd = function (z) {
	            var n, v,
	                x = this,
	                c = x.c;
	
	            // 'precision() argument not a boolean or binary digit: {z}'
	            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
	                if (ERRORS) raise( 13, 'argument' + notBool, z );
	                if ( z != !!z ) z = null;
	            }
	
	            if ( !c ) return null;
	            v = c.length - 1;
	            n = v * LOG_BASE + 1;
	
	            if ( v = c[v] ) {
	
	                // Subtract the number of trailing zeros of the last element.
	                for ( ; v % 10 == 0; v /= 10, n-- );
	
	                // Add the number of digits of the first element.
	                for ( v = c[0]; v >= 10; v /= 10, n++ );
	            }
	
	            if ( z && x.e + 1 > n ) n = x.e + 1;
	
	            return n;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
	         * omitted.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'round() decimal places out of range: {dp}'
	         * 'round() decimal places not an integer: {dp}'
	         * 'round() rounding mode not an integer: {rm}'
	         * 'round() rounding mode out of range: {rm}'
	         */
	        P.round = function ( dp, rm ) {
	            var n = new BigNumber(this);
	
	            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
	                round( n, ~~dp + this.e + 1, rm == null ||
	                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
	            }
	
	            return n;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	         *
	         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	         *
	         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
	         * otherwise.
	         *
	         * 'shift() argument not an integer: {k}'
	         * 'shift() argument out of range: {k}'
	         */
	        P.shift = function (k) {
	            var n = this;
	            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )
	
	              // k < 1e+21, or truncate(k) will produce exponential notation.
	              ? n.times( '1e' + truncate(k) )
	              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
	                ? n.s * ( k < 0 ? 0 : 1 / 0 )
	                : n );
	        };
	
	
	        /*
	         *  sqrt(-n) =  N
	         *  sqrt( N) =  N
	         *  sqrt(-I) =  N
	         *  sqrt( I) =  I
	         *  sqrt( 0) =  0
	         *  sqrt(-0) = -0
	         *
	         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
	         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.squareRoot = P.sqrt = function () {
	            var m, n, r, rep, t,
	                x = this,
	                c = x.c,
	                s = x.s,
	                e = x.e,
	                dp = DECIMAL_PLACES + 4,
	                half = new BigNumber('0.5');
	
	            // Negative/NaN/Infinity/zero?
	            if ( s !== 1 || !c || !c[0] ) {
	                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
	            }
	
	            // Initial estimate.
	            s = Math.sqrt( +x );
	
	            // Math.sqrt underflow/overflow?
	            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	            if ( s == 0 || s == 1 / 0 ) {
	                n = coeffToString(c);
	                if ( ( n.length + e ) % 2 == 0 ) n += '0';
	                s = Math.sqrt(n);
	                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );
	
	                if ( s == 1 / 0 ) {
	                    n = '1e' + e;
	                } else {
	                    n = s.toExponential();
	                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
	                }
	
	                r = new BigNumber(n);
	            } else {
	                r = new BigNumber( s + '' );
	            }
	
	            // Check for zero.
	            // r could be zero if MIN_EXP is changed after the this value was created.
	            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	            // coeffToString to throw.
	            if ( r.c[0] ) {
	                e = r.e;
	                s = e + dp;
	                if ( s < 3 ) s = 0;
	
	                // Newton-Raphson iteration.
	                for ( ; ; ) {
	                    t = r;
	                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );
	
	                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
	                         coeffToString( r.c ) ).slice( 0, s ) ) {
	
	                        // The exponent of r may here be one less than the final result exponent,
	                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	                        // are indexed correctly.
	                        if ( r.e < e ) --s;
	                        n = n.slice( s - 3, s + 1 );
	
	                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	                        // iteration.
	                        if ( n == '9999' || !rep && n == '4999' ) {
	
	                            // On the first iteration only, check to see if rounding up gives the
	                            // exact result as the nines may infinitely repeat.
	                            if ( !rep ) {
	                                round( t, t.e + DECIMAL_PLACES + 2, 0 );
	
	                                if ( t.times(t).eq(x) ) {
	                                    r = t;
	                                    break;
	                                }
	                            }
	
	                            dp += 4;
	                            s += 4;
	                            rep = 1;
	                        } else {
	
	                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
	                            // result. If not, then there are further digits and m will be truthy.
	                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {
	
	                                // Truncate to the first rounding digit.
	                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
	                                m = !r.times(r).eq(x);
	                            }
	
	                            break;
	                        }
	                    }
	                }
	            }
	
	            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
	        };
	
	
	        /*
	         *  n * 0 = 0
	         *  n * N = N
	         *  n * I = I
	         *  0 * n = 0
	         *  0 * 0 = 0
	         *  0 * N = N
	         *  0 * I = N
	         *  N * n = N
	         *  N * 0 = N
	         *  N * N = N
	         *  N * I = N
	         *  I * n = I
	         *  I * 0 = N
	         *  I * N = N
	         *  I * I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber times the value of
	         * BigNumber(y, b).
	         */
	        P.times = P.mul = function ( y, b ) {
	            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
	                base, sqrtBase,
	                x = this,
	                xc = x.c,
	                yc = ( id = 17, y = new BigNumber( y, b ) ).c;
	
	            // Either NaN, ±Infinity or ±0?
	            if ( !xc || !yc || !xc[0] || !yc[0] ) {
	
	                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
	                    y.c = y.e = y.s = null;
	                } else {
	                    y.s *= x.s;
	
	                    // Return ±Infinity if either is ±Infinity.
	                    if ( !xc || !yc ) {
	                        y.c = y.e = null;
	
	                    // Return ±0 if either is ±0.
	                    } else {
	                        y.c = [0];
	                        y.e = 0;
	                    }
	                }
	
	                return y;
	            }
	
	            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
	            y.s *= x.s;
	            xcL = xc.length;
	            ycL = yc.length;
	
	            // Ensure xc points to longer array and xcL to its length.
	            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;
	
	            // Initialise the result array with zeros.
	            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );
	
	            base = BASE;
	            sqrtBase = SQRT_BASE;
	
	            for ( i = ycL; --i >= 0; ) {
	                c = 0;
	                ylo = yc[i] % sqrtBase;
	                yhi = yc[i] / sqrtBase | 0;
	
	                for ( k = xcL, j = i + k; j > i; ) {
	                    xlo = xc[--k] % sqrtBase;
	                    xhi = xc[k] / sqrtBase | 0;
	                    m = yhi * xlo + xhi * ylo;
	                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
	                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
	                    zc[j--] = xlo % base;
	                }
	
	                zc[j] = c;
	            }
	
	            if (c) {
	                ++e;
	            } else {
	                zc.shift();
	            }
	
	            return normalise( y, zc, e );
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toDigits() precision out of range: {sd}'
	         * 'toDigits() precision not an integer: {sd}'
	         * 'toDigits() rounding mode not an integer: {rm}'
	         * 'toDigits() rounding mode out of range: {rm}'
	         */
	        P.toDigits = function ( sd, rm ) {
	            var n = new BigNumber(this);
	            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
	            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
	            return sd ? round( n, sd, rm ) : n;
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in exponential notation and
	         * rounded using ROUNDING_MODE to dp fixed decimal places.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toExponential() decimal places not an integer: {dp}'
	         * 'toExponential() decimal places out of range: {dp}'
	         * 'toExponential() rounding mode not an integer: {rm}'
	         * 'toExponential() rounding mode out of range: {rm}'
	         */
	        P.toExponential = function ( dp, rm ) {
	            return format( this,
	              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounding
	         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	         * but e.g. (-0.00001).toFixed(0) is '-0'.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFixed() decimal places not an integer: {dp}'
	         * 'toFixed() decimal places out of range: {dp}'
	         * 'toFixed() rounding mode not an integer: {rm}'
	         * 'toFixed() rounding mode out of range: {rm}'
	         */
	        P.toFixed = function ( dp, rm ) {
	            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
	              ? ~~dp + this.e + 1 : null, rm, 20 );
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounded
	         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	         * of the FORMAT object (see BigNumber.config).
	         *
	         * FORMAT = {
	         *      decimalSeparator : '.',
	         *      groupSeparator : ',',
	         *      groupSize : 3,
	         *      secondaryGroupSize : 0,
	         *      fractionGroupSeparator : '\xA0',    // non-breaking space
	         *      fractionGroupSize : 0
	         * };
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFormat() decimal places not an integer: {dp}'
	         * 'toFormat() decimal places out of range: {dp}'
	         * 'toFormat() rounding mode not an integer: {rm}'
	         * 'toFormat() rounding mode out of range: {rm}'
	         */
	        P.toFormat = function ( dp, rm ) {
	            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
	              ? ~~dp + this.e + 1 : null, rm, 21 );
	
	            if ( this.c ) {
	                var i,
	                    arr = str.split('.'),
	                    g1 = +FORMAT.groupSize,
	                    g2 = +FORMAT.secondaryGroupSize,
	                    groupSeparator = FORMAT.groupSeparator,
	                    intPart = arr[0],
	                    fractionPart = arr[1],
	                    isNeg = this.s < 0,
	                    intDigits = isNeg ? intPart.slice(1) : intPart,
	                    len = intDigits.length;
	
	                if (g2) i = g1, g1 = g2, g2 = i, len -= i;
	
	                if ( g1 > 0 && len > 0 ) {
	                    i = len % g1 || g1;
	                    intPart = intDigits.substr( 0, i );
	
	                    for ( ; i < len; i += g1 ) {
	                        intPart += groupSeparator + intDigits.substr( i, g1 );
	                    }
	
	                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
	                    if (isNeg) intPart = '-' + intPart;
	                }
	
	                str = fractionPart
	                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
	                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
	                      '$&' + FORMAT.fractionGroupSeparator )
	                    : fractionPart )
	                  : intPart;
	            }
	
	            return str;
	        };
	
	
	        /*
	         * Return a string array representing the value of this BigNumber as a simple fraction with
	         * an integer numerator and an integer denominator. The denominator will be a positive
	         * non-zero value less than or equal to the specified maximum denominator. If a maximum
	         * denominator is not specified, the denominator will be the lowest value necessary to
	         * represent the number exactly.
	         *
	         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
	         *
	         * 'toFraction() max denominator not an integer: {md}'
	         * 'toFraction() max denominator out of range: {md}'
	         */
	        P.toFraction = function (md) {
	            var arr, d0, d2, e, exp, n, n0, q, s,
	                k = ERRORS,
	                x = this,
	                xc = x.c,
	                d = new BigNumber(ONE),
	                n1 = d0 = new BigNumber(ONE),
	                d1 = n0 = new BigNumber(ONE);
	
	            if ( md != null ) {
	                ERRORS = false;
	                n = new BigNumber(md);
	                ERRORS = k;
	
	                if ( !( k = n.isInt() ) || n.lt(ONE) ) {
	
	                    if (ERRORS) {
	                        raise( 22,
	                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
	                    }
	
	                    // ERRORS is false:
	                    // If md is a finite non-integer >= 1, round it to an integer and use it.
	                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
	                }
	            }
	
	            if ( !xc ) return x.toString();
	            s = coeffToString(xc);
	
	            // Determine initial denominator.
	            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	            e = d.e = s.length - x.e - 1;
	            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
	            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;
	
	            exp = MAX_EXP;
	            MAX_EXP = 1 / 0;
	            n = new BigNumber(s);
	
	            // n0 = d1 = 0
	            n0.c[0] = 0;
	
	            for ( ; ; )  {
	                q = div( n, d, 0, 1 );
	                d2 = d0.plus( q.times(d1) );
	                if ( d2.cmp(md) == 1 ) break;
	                d0 = d1;
	                d1 = d2;
	                n1 = n0.plus( q.times( d2 = n1 ) );
	                n0 = d2;
	                d = n.minus( q.times( d2 = d ) );
	                n = d2;
	            }
	
	            d2 = div( md.minus(d0), d1, 0, 1 );
	            n0 = n0.plus( d2.times(n1) );
	            d0 = d0.plus( d2.times(d1) );
	            n0.s = n1.s = x.s;
	            e *= 2;
	
	            // Determine which fraction is closer to x, n0/d0 or n1/d1
	            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
	                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
	                    ? [ n1.toString(), d1.toString() ]
	                    : [ n0.toString(), d0.toString() ];
	
	            MAX_EXP = exp;
	            return arr;
	        };
	
	
	        /*
	         * Return the value of this BigNumber converted to a number primitive.
	         */
	        P.toNumber = function () {
	            return +this;
	        };
	
	
	        /*
	         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
	         * If m is present, return the result modulo m.
	         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
	         * ROUNDING_MODE.
	         *
	         * The modular power operation works efficiently when x, n, and m are positive integers,
	         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
	         *
	         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	         * [m] {number|string|BigNumber} The modulus.
	         *
	         * 'pow() exponent not an integer: {n}'
	         * 'pow() exponent out of range: {n}'
	         *
	         * Performs 54 loop iterations for n of 9007199254740991.
	         */
	        P.toPower = P.pow = function ( n, m ) {
	            var k, y, z,
	                i = mathfloor( n < 0 ? -n : +n ),
	                x = this;
	
	            if ( m != null ) {
	                id = 23;
	                m = new BigNumber(m);
	            }
	
	            // Pass ±Infinity to Math.pow if exponent is out of range.
	            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
	              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
	                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
	                k = Math.pow( +x, n );
	                return new BigNumber( m ? k % m : k );
	            }
	
	            if (m) {
	                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
	                    x = x.mod(m);
	                } else {
	                    z = m;
	
	                    // Nullify m so only a single mod operation is performed at the end.
	                    m = null;
	                }
	            } else if (POW_PRECISION) {
	
	                // Truncating each coefficient array to a length of k after each multiplication
	                // equates to truncating significant digits to POW_PRECISION + [28, 41],
	                // i.e. there will be a minimum of 28 guard digits retained.
	                // (Using + 1.5 would give [9, 21] guard digits.)
	                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
	            }
	
	            y = new BigNumber(ONE);
	
	            for ( ; ; ) {
	                if ( i % 2 ) {
	                    y = y.times(x);
	                    if ( !y.c ) break;
	                    if (k) {
	                        if ( y.c.length > k ) y.c.length = k;
	                    } else if (m) {
	                        y = y.mod(m);
	                    }
	                }
	
	                i = mathfloor( i / 2 );
	                if ( !i ) break;
	                x = x.times(x);
	                if (k) {
	                    if ( x.c && x.c.length > k ) x.c.length = k;
	                } else if (m) {
	                    x = x.mod(m);
	                }
	            }
	
	            if (m) return y;
	            if ( n < 0 ) y = ONE.div(y);
	
	            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber rounded to sd significant digits
	         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
	         * necessary to represent the integer part of the value in fixed-point notation, then use
	         * exponential notation.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toPrecision() precision not an integer: {sd}'
	         * 'toPrecision() precision out of range: {sd}'
	         * 'toPrecision() rounding mode not an integer: {rm}'
	         * 'toPrecision() rounding mode out of range: {rm}'
	         */
	        P.toPrecision = function ( sd, rm ) {
	            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
	              ? sd | 0 : null, rm, 24 );
	        };
	
	
	        /*
	         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	         * TO_EXP_NEG, return exponential notation.
	         *
	         * [b] {number} Integer, 2 to 64 inclusive.
	         *
	         * 'toString() base not an integer: {b}'
	         * 'toString() base out of range: {b}'
	         */
	        P.toString = function (b) {
	            var str,
	                n = this,
	                s = n.s,
	                e = n.e;
	
	            // Infinity or NaN?
	            if ( e === null ) {
	
	                if (s) {
	                    str = 'Infinity';
	                    if ( s < 0 ) str = '-' + str;
	                } else {
	                    str = 'NaN';
	                }
	            } else {
	                str = coeffToString( n.c );
	
	                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
	                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	                      ? toExponential( str, e )
	                      : toFixedPoint( str, e );
	                } else {
	                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
	                }
	
	                if ( s < 0 && n.c[0] ) str = '-' + str;
	            }
	
	            return str;
	        };
	
	
	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
	         * number.
	         */
	        P.truncated = P.trunc = function () {
	            return round( new BigNumber(this), this.e + 1, 1 );
	        };
	
	
	        /*
	         * Return as toString, but do not accept a base argument, and include the minus sign for
	         * negative zero.
	         */
	        P.valueOf = P.toJSON = function () {
	            var str,
	                n = this,
	                e = n.e;
	
	            if ( e === null ) return n.toString();
	
	            str = coeffToString( n.c );
	
	            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	                ? toExponential( str, e )
	                : toFixedPoint( str, e );
	
	            return n.s < 0 ? '-' + str : str;
	        };
	
	
	        P.isBigNumber = true;
	
	        if ( config != null ) BigNumber.config(config);
	
	        return BigNumber;
	    }
	
	
	    // PRIVATE HELPER FUNCTIONS
	
	
	    function bitFloor(n) {
	        var i = n | 0;
	        return n > 0 || n === i ? i : i - 1;
	    }
	
	
	    // Return a coefficient array as a string of base 10 digits.
	    function coeffToString(a) {
	        var s, z,
	            i = 1,
	            j = a.length,
	            r = a[0] + '';
	
	        for ( ; i < j; ) {
	            s = a[i++] + '';
	            z = LOG_BASE - s.length;
	            for ( ; z--; s = '0' + s );
	            r += s;
	        }
	
	        // Determine trailing zeros.
	        for ( j = r.length; r.charCodeAt(--j) === 48; );
	        return r.slice( 0, j + 1 || 1 );
	    }
	
	
	    // Compare the value of BigNumbers x and y.
	    function compare( x, y ) {
	        var a, b,
	            xc = x.c,
	            yc = y.c,
	            i = x.s,
	            j = y.s,
	            k = x.e,
	            l = y.e;
	
	        // Either NaN?
	        if ( !i || !j ) return null;
	
	        a = xc && !xc[0];
	        b = yc && !yc[0];
	
	        // Either zero?
	        if ( a || b ) return a ? b ? 0 : -j : i;
	
	        // Signs differ?
	        if ( i != j ) return i;
	
	        a = i < 0;
	        b = k == l;
	
	        // Either Infinity?
	        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;
	
	        // Compare exponents.
	        if ( !b ) return k > l ^ a ? 1 : -1;
	
	        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;
	
	        // Compare digit by digit.
	        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;
	
	        // Compare lengths.
	        return k == l ? 0 : k > l ^ a ? 1 : -1;
	    }
	
	
	    /*
	     * Return true if n is a valid number in range, otherwise false.
	     * Use for argument validation when ERRORS is false.
	     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
	     */
	    function intValidatorNoErrors( n, min, max ) {
	        return ( n = truncate(n) ) >= min && n <= max;
	    }
	
	
	    function isArray(obj) {
	        return Object.prototype.toString.call(obj) == '[object Array]';
	    }
	
	
	    /*
	     * Convert string of baseIn to an array of numbers of baseOut.
	     * Eg. convertBase('255', 10, 16) returns [15, 15].
	     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	     */
	    function toBaseOut( str, baseIn, baseOut ) {
	        var j,
	            arr = [0],
	            arrL,
	            i = 0,
	            len = str.length;
	
	        for ( ; i < len; ) {
	            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
	            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );
	
	            for ( ; j < arr.length; j++ ) {
	
	                if ( arr[j] > baseOut - 1 ) {
	                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
	                    arr[j + 1] += arr[j] / baseOut | 0;
	                    arr[j] %= baseOut;
	                }
	            }
	        }
	
	        return arr.reverse();
	    }
	
	
	    function toExponential( str, e ) {
	        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
	          ( e < 0 ? 'e' : 'e+' ) + e;
	    }
	
	
	    function toFixedPoint( str, e ) {
	        var len, z;
	
	        // Negative exponent?
	        if ( e < 0 ) {
	
	            // Prepend zeros.
	            for ( z = '0.'; ++e; z += '0' );
	            str = z + str;
	
	        // Positive exponent
	        } else {
	            len = str.length;
	
	            // Append zeros.
	            if ( ++e > len ) {
	                for ( z = '0', e -= len; --e; z += '0' );
	                str += z;
	            } else if ( e < len ) {
	                str = str.slice( 0, e ) + '.' + str.slice(e);
	            }
	        }
	
	        return str;
	    }
	
	
	    function truncate(n) {
	        n = parseFloat(n);
	        return n < 0 ? mathceil(n) : mathfloor(n);
	    }
	
	
	    // EXPORT
	
	
	    BigNumber = constructorFactory();
	    BigNumber.default = BigNumber.BigNumber = BigNumber;
	
	
	    // AMD.
	    if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return BigNumber; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	    // Node.js and other environments that support module.exports.
	    } else if ( typeof module != 'undefined' && module.exports ) {
	        module.exports = BigNumber;
	
	    // Browser.
	    } else {
	        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
	        globalObj.BigNumber = BigNumber;
	    }
	})(this);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	var jStat = __webpack_require__(22).jStat;
	var text = __webpack_require__(19);
	var utils = __webpack_require__(16);
	var bessel = __webpack_require__(27);
	
	function isValidBinaryNumber(number) {
	  return (/^[01]{1,10}$/).test(number);
	}
	
	exports.BESSELI = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	
	  return bessel.besseli(x, n);
	};
	
	exports.BESSELJ = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	
	  return bessel.besselj(x, n);
	};
	
	exports.BESSELK = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	
	  return bessel.besselk(x, n);
	};
	
	exports.BESSELY = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	
	  return bessel.bessely(x, n);
	};
	
	exports.BIN2DEC = function(number) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }
	
	  // Convert binary number to decimal
	  var result = parseInt(number, 2);
	
	  // Handle negative numbers
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return parseInt(stringified.substring(1), 2) - 512;
	  } else {
	    return result;
	  }
	};
	
	
	exports.BIN2HEX = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16);
	  }
	
	  // Convert binary number to hexadecimal
	  var result = parseInt(number, 2).toString(16);
	
	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.BIN2OCT = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character octal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
	  }
	
	  // Convert binary number to octal
	  var result = parseInt(number, 2).toString(8);
	
	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.BITAND = function(number1, number2) {
	  // Return error if either number is a non-numeric value
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }
	
	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }
	
	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }
	
	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }
	
	  // Return bitwise AND of two numbers
	  return number1 & number2;
	};
	
	exports.BITLSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  shift = utils.parseNumber(shift);
	  if (utils.anyIsError(number, shift)) {
	    return error.value;
	  }
	
	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }
	
	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }
	
	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }
	
	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }
	
	  // Return number shifted by shift bits to the left or to the right if shift is negative
	  return (shift >= 0) ? number << shift : number >> -shift;
	};
	
	exports.BITOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }
	
	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }
	
	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }
	
	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }
	
	  // Return bitwise OR of two numbers
	  return number1 | number2;
	};
	
	exports.BITRSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  shift = utils.parseNumber(shift);
	  if (utils.anyIsError(number, shift)) {
	    return error.value;
	  }
	
	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }
	
	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }
	
	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }
	
	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }
	
	  // Return number shifted by shift bits to the right or to the left if shift is negative
	  return (shift >= 0) ? number >> shift : number << -shift;
	};
	
	exports.BITXOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }
	
	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }
	
	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }
	
	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }
	
	  // Return bitwise XOR of two numbers
	  return number1 ^ number2;
	};
	
	exports.COMPLEX = function(real, imaginary, suffix) {
	  real = utils.parseNumber(real);
	  imaginary = utils.parseNumber(imaginary);
	  if (utils.anyIsError(real, imaginary)) {
	    return real;
	  }
	
	  // Set suffix
	  suffix = (suffix === undefined) ? 'i' : suffix;
	
	  // Return error if suffix is neither "i" nor "j"
	  if (suffix !== 'i' && suffix !== 'j') {
	    return error.value;
	  }
	
	  // Return complex number
	  if (real === 0 && imaginary === 0) {
	    return 0;
	  } else if (real === 0) {
	    return (imaginary === 1) ? suffix : imaginary.toString() + suffix;
	  } else if (imaginary === 0) {
	    return real.toString();
	  } else {
	    var sign = (imaginary > 0) ? '+' : '';
	    return real.toString() + sign + ((imaginary === 1) ? suffix : imaginary.toString() + suffix);
	  }
	};
	
	exports.CONVERT = function(number, from_unit, to_unit) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	
	  // List of units supported by CONVERT and units defined by the International System of Units
	  // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion ratio]
	  var units = [
	    ["a.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
	    ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
	    ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
	    ["a.u. of length", "a?", null, "length", false, false, 5.29177210818182e-11],
	    ["a.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
	    ["a.u. of time", "?/Eh", null, "time", false, false, 2.41888432650516e-17],
	    ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
	    ["ampere", "A", null, "electric_current", true, false, 1],
	    ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
	    ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
	    ["are", "ar", null, "area", false, true, 100],
	    ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
	    ["bar", "bar", null, "pressure", false, false, 100000],
	    ["barn", "b", null, "area", false, false, 1e-28],
	    ["becquerel", "Bq", null, "radioactivity", true, false, 1],
	    ["bit", "bit", ["b"], "information", false, true, 1],
	    ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
	    ["byte", "byte", null, "information", false, true, 8],
	    ["candela", "cd", null, "luminous_intensity", true, false, 1],
	    ["candela per square metre", "cd/m?", null, "luminance", true, false, 1],
	    ["coulomb", "C", null, "electric_charge", true, false, 1],
	    ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
	    ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
	    ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
	    ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
	    ["cubic metre", "m?", null, "volume", true, true, 1],
	    ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
	    ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
	    ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
	    ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
	    ["cup", "cup", null, "volume", false, true, 0.0002365882365],
	    ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
	    ["day", "d", ["day"], "time", false, true, 86400],
	    ["degree", "°", null, "angle", false, false, 0.0174532925199433],
	    ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
	    ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
	    ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
	    ["ell", "ell", null, "length", false, true, 1.143],
	    ["erg", "erg", ["e"], "energy", false, true, 1e-7],
	    ["farad", "F", null, "electric_capacitance", true, false, 1],
	    ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
	    ["foot", "ft", null, "length", false, true, 0.3048],
	    ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
	    ["gal", "Gal", null, "acceleration", false, false, 0.01],
	    ["gallon", "gal", null, "volume", false, true, 0.003785411784],
	    ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
	    ["grain", "grain", null, "mass", false, true, 0.0000647989],
	    ["gram", "g", null, "mass", false, true, 0.001],
	    ["gray", "Gy", null, "absorbed_dose", true, false, 1],
	    ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
	    ["hectare", "ha", null, "area", false, true, 10000],
	    ["henry", "H", null, "inductance", true, false, 1],
	    ["hertz", "Hz", null, "frequency", true, false, 1],
	    ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
	    ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
	    ["hour", "h", ["hr"], "time", false, true, 3600],
	    ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
	    ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
	    ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
	    ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
	    ["inch", "in", null, "length", false, true, 0.0254],
	    ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
	    ["IT calorie", "cal", null, "energy", false, true, 4.1868],
	    ["joule", "J", null, "energy", true, true, 1],
	    ["katal", "kat", null, "catalytic_activity", true, false, 1],
	    ["kelvin", "K", ["kel"], "temperature", true, true, 1],
	    ["kilogram", "kg", null, "mass", true, true, 1],
	    ["knot", "kn", null, "speed", false, true, 0.514444444444444],
	    ["light-year", "ly", null, "length", false, true, 9460730472580800],
	    ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
	    ["lumen", "lm", null, "luminous_flux", true, false, 1],
	    ["lux", "lx", null, "illuminance", true, false, 1],
	    ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
	    ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
	    ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
	    ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
	    ["meter per second squared", "m?s??", null, "acceleration", true, false, 1],
	    ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
	    ["meter squared per second", "m?/s", null, "kinematic_viscosity", true, false, 1],
	    ["metre", "m", null, "length", true, true, 1],
	    ["miles per hour", "mph", null, "speed", false, true, 0.44704],
	    ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
	    ["minute", "?", null, "angle", false, false, 0.000290888208665722],
	    ["minute", "min", ["mn"], "time", false, true, 60],
	    ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
	    ["mole", "mol", null, "amount_of_substance", true, false, 1],
	    ["morgen", "Morgen", null, "area", false, true, 2500],
	    ["n.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
	    ["n.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
	    ["n.u. of speed", "c?", null, "speed", false, false, 299792458],
	    ["n.u. of time", "?/(me?c??)", null, "time", false, false, 1.28808866778687e-21],
	    ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
	    ["newton", "N", null, "force", true, true, 1],
	    ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
	    ["ohm", "Ω", null, "electric_resistance", true, false, 1],
	    ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
	    ["pascal", "Pa", null, "pressure", true, false, 1],
	    ["pascal second", "Pa?s", null, "dynamic_viscosity", true, false, 1],
	    ["pferdestärke", "PS", null, "power", false, true, 735.49875],
	    ["phot", "ph", null, "illuminance", false, false, 0.0001],
	    ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
	    ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
	    ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
	    ["pond", "pond", null, "force", false, true, 0.00980665],
	    ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
	    ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
	    ["quart", "qt", null, "volume", false, true, 0.000946352946],
	    ["radian", "rad", null, "angle", true, false, 1],
	    ["second", "?", null, "angle", false, false, 0.00000484813681109536],
	    ["second", "s", ["sec"], "time", true, true, 1],
	    ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
	    ["siemens", "S", null, "electrical_conductance", true, false, 1],
	    ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
	    ["slug", "sg", null, "mass", false, true, 14.59390294],
	    ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
	    ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
	    ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
	    ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
	    ["square meter", "m?", null, "area", true, true, 1],
	    ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
	    ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
	    ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
	    ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
	    ["statute mile", "mi", null, "length", false, true, 1609.344],
	    ["steradian", "sr", null, "solid_angle", true, false, 1],
	    ["stilb", "sb", null, "luminance", false, false, 0.0001],
	    ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
	    ["stone", "stone", null, "mass", false, true, 6.35029318],
	    ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
	    ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
	    ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
	    ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
	    ["ton", "ton", null, "mass", false, true, 907.18474],
	    ["tonne", "t", null, "mass", false, false, 1000],
	    ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
	    ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
	    ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
	    ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
	    ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
	    ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
	    ["volt", "V", null, "voltage", true, false, 1],
	    ["watt", "W", null, "power", true, true, 1],
	    ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
	    ["weber", "Wb", null, "magnetic_flux", true, false, 1],
	    ["yard", "yd", null, "length", false, true, 0.9144],
	    ["year", "yr", null, "time", false, true, 31557600]
	  ];
	
	  // Binary prefixes
	  // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
	  var binary_prefixes = {
	    Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
	    Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
	    Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
	    Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
	    Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
	    Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
	    Mi: ["mebi", 20, 1048576, "Mi", "mega"],
	    ki: ["kibi", 10, 1024, "ki", "kilo"]
	  };
	
	  // Unit prefixes
	  // [Name, Multiplier, Abbreviation]
	  var unit_prefixes = {
	    Y: ["yotta", 1e+24, "Y"],
	    Z: ["zetta", 1e+21, "Z"],
	    E: ["exa", 1e+18, "E"],
	    P: ["peta", 1e+15, "P"],
	    T: ["tera", 1e+12, "T"],
	    G: ["giga", 1e+09, "G"],
	    M: ["mega", 1e+06, "M"],
	    k: ["kilo", 1e+03, "k"],
	    h: ["hecto", 1e+02, "h"],
	    e: ["dekao", 1e+01, "e"],
	    d: ["deci", 1e-01, "d"],
	    c: ["centi", 1e-02, "c"],
	    m: ["milli", 1e-03, "m"],
	    u: ["micro", 1e-06, "u"],
	    n: ["nano", 1e-09, "n"],
	    p: ["pico", 1e-12, "p"],
	    f: ["femto", 1e-15, "f"],
	    a: ["atto", 1e-18, "a"],
	    z: ["zepto", 1e-21, "z"],
	    y: ["yocto", 1e-24, "y"]
	  };
	
	  // Initialize units and multipliers
	  var from = null;
	  var to = null;
	  var base_from_unit = from_unit;
	  var base_to_unit = to_unit;
	  var from_multiplier = 1;
	  var to_multiplier = 1;
	  var alt;
	
	  // Lookup from and to units
	  for (var i = 0; i < units.length; i++) {
	    alt = (units[i][2] === null) ? [] : units[i][2];
	    if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	      from = units[i];
	    }
	    if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	      to = units[i];
	    }
	  }
	
	  // Lookup from prefix
	  if (from === null) {
	    var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
	    var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];
	
	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (from_unit.substring(0, 2) === 'da') {
	      from_unit_prefix = ["dekao", 1e+01, "da"];
	    }
	
	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (from_binary_prefix) {
	      from_multiplier = from_binary_prefix[2];
	      base_from_unit = from_unit.substring(2);
	    } else if (from_unit_prefix) {
	      from_multiplier = from_unit_prefix[1];
	      base_from_unit = from_unit.substring(from_unit_prefix[2].length);
	    }
	
	    // Lookup from unit
	    for (var j = 0; j < units.length; j++) {
	      alt = (units[j][2] === null) ? [] : units[j][2];
	      if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	        from = units[j];
	      }
	    }
	  }
	
	  // Lookup to prefix
	  if (to === null) {
	    var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
	    var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];
	
	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (to_unit.substring(0, 2) === 'da') {
	      to_unit_prefix = ["dekao", 1e+01, "da"];
	    }
	
	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (to_binary_prefix) {
	      to_multiplier = to_binary_prefix[2];
	      base_to_unit = to_unit.substring(2);
	    } else if (to_unit_prefix) {
	      to_multiplier = to_unit_prefix[1];
	      base_to_unit = to_unit.substring(to_unit_prefix[2].length);
	    }
	
	    // Lookup to unit
	    for (var k = 0; k < units.length; k++) {
	      alt = (units[k][2] === null) ? [] : units[k][2];
	      if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	        to = units[k];
	      }
	    }
	  }
	
	  // Return error if a unit does not exist
	  if (from === null || to === null) {
	    return error.na;
	  }
	
	  // Return error if units represent different quantities
	  if (from[3] !== to[3]) {
	    return error.na;
	  }
	
	  // Return converted number
	  return number * from[6] * from_multiplier / (to[6] * to_multiplier);
	};
	
	exports.DEC2BIN = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	
	  // Return error if number is not decimal, is lower than -512, or is greater than 511
	  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character binary number if number is negative
	  if (number < 0) {
	    return '1' + text.REPT('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
	  }
	
	  // Convert decimal number to binary
	  var result = parseInt(number, 10).toString(2);
	
	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.DEC2HEX = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	
	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  if (number < 0) {
	    return (1099511627776 + number).toString(16);
	  }
	
	  // Convert decimal number to hexadecimal
	  var result = parseInt(number, 10).toString(16);
	
	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.DEC2OCT = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	
	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character octal number if number is negative
	  if (number < 0) {
	    return (1073741824 + number).toString(8);
	  }
	
	  // Convert decimal number to octal
	  var result = parseInt(number, 10).toString(8);
	
	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.DELTA = function(number1, number2) {
	  // Set number2 to zero if undefined
	  number2 = (number2 === undefined) ? 0 : number2;
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }
	
	  // Return delta
	  return (number1 === number2) ? 1 : 0;
	};
	
	// TODO: why is upper_bound not used ? The excel documentation has no examples with upper_bound
	exports.ERF = function(lower_bound, upper_bound) {
	  // Set number2 to zero if undefined
	  upper_bound = (upper_bound === undefined) ? 0 : upper_bound;
	
	  lower_bound = utils.parseNumber(lower_bound);
	  upper_bound = utils.parseNumber(upper_bound);
	  if (utils.anyIsError(lower_bound, upper_bound)) {
	    return error.value;
	  }
	
	  return jStat.erf(lower_bound);
	};
	
	// TODO
	exports.ERF.PRECISE = function() {
	  throw new Error('ERF.PRECISE is not implemented');
	};
	
	exports.ERFC = function(x) {
	  // Return error if x is not a number
	  if (isNaN(x)) {
	    return error.value;
	  }
	
	  return jStat.erfc(x);
	};
	
	// TODO
	exports.ERFC.PRECISE = function() {
	  throw new Error('ERFC.PRECISE is not implemented');
	};
	
	exports.GESTEP = function(number, step) {
	  step = step || 0;
	  number = utils.parseNumber(number);
	  if (utils.anyIsError(step, number)) {
	    return number;
	  }
	
	  // Return delta
	  return (number >= step) ? 1 : 0;
	};
	
	exports.HEX2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }
	
	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;
	
	  // Convert hexadecimal number to decimal
	  var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);
	
	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }
	
	  // Convert decimal number to binary
	  var result = decimal.toString(2);
	
	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.HEX2DEC = function(number) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }
	
	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);
	
	  // Return decimal number
	  return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
	};
	
	exports.HEX2OCT = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }
	
	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);
	
	  // Return error if number is positive and greater than 0x1fffffff (536870911)
	  if (decimal > 536870911 && decimal < 1098974756864) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 1098974756864) {
	    return (decimal - 1098437885952).toString(8);
	  }
	
	  // Convert decimal number to octal
	  var result = decimal.toString(8);
	
	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.IMABS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Return absolute value of complex number
	  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	};
	
	exports.IMAGINARY = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }
	
	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }
	
	  // Handle special cases
	  if (['i', 'j'].indexOf(inumber) >= 0) {
	    return 1;
	  }
	
	  // Normalize imaginary coefficient
	  inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');
	
	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }
	
	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }
	
	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');
	
	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }
	
	    // Return imaginary coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(plus + 1, inumber.length - 1));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        -Number(inumber.substring(minus + 1, inumber.length - 1));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : inumber.substring(0, inumber.length - 1);
	    } else {
	      return (isNaN(inumber)) ? error.num : 0;
	    }
	  }
	};
	
	exports.IMARGUMENT = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Return error if inumber is equal to zero
	  if (x === 0 && y === 0) {
	    return error.div0;
	  }
	
	  // Return PI/2 if x is equal to zero and y is positive
	  if (x === 0 && y > 0) {
	    return Math.PI / 2;
	  }
	
	  // Return -PI/2 if x is equal to zero and y is negative
	  if (x === 0 && y < 0) {
	    return -Math.PI / 2;
	  }
	
	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x > 0) {
	    return 0;
	  }
	
	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x < 0) {
	    return -Math.PI;
	  }
	
	  // Return argument of complex number
	  if (x > 0) {
	    return Math.atan(y / x);
	  } else if (x < 0 && y >= 0) {
	    return Math.atan(y / x) + Math.PI;
	  } else {
	    return Math.atan(y / x) - Math.PI;
	  }
	};
	
	exports.IMCONJUGATE = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return conjugate of complex number
	  return (y !== 0) ? exports.COMPLEX(x, -y, unit) : inumber;
	};
	
	exports.IMCOS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return cosine of complex number
	  return exports.COMPLEX(Math.cos(x) * (Math.exp(y) + Math.exp(-y)) / 2, -Math.sin(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};
	
	exports.IMCOSH = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return hyperbolic cosine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) + Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) - Math.exp(-x)) / 2, unit);
	};
	
	exports.IMCOT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Return cotangent of complex number
	  return exports.IMDIV(exports.IMCOS(inumber), exports.IMSIN(inumber));
	};
	
	exports.IMDIV = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = exports.IMREAL(inumber1);
	  var b = exports.IMAGINARY(inumber1);
	  var c = exports.IMREAL(inumber2);
	  var d = exports.IMAGINARY(inumber2);
	
	  if (utils.anyIsError(a, b, c, d)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }
	
	  // Return error if inumber2 is null
	  if (c === 0 && d === 0) {
	    return error.num;
	  }
	
	  // Return exponential of complex number
	  var den = c * c + d * d;
	  return exports.COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit);
	};
	
	exports.IMEXP = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return exponential of complex number
	  var e = Math.exp(x);
	  return exports.COMPLEX(e * Math.cos(y), e * Math.sin(y), unit);
	};
	
	exports.IMLN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit);
	};
	
	exports.IMLOG10 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit);
	};
	
	exports.IMLOG2 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit);
	};
	
	exports.IMPOWER = function(inumber, number) {
	  number = utils.parseNumber(number);
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	  if (utils.anyIsError(number, x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Calculate power of modulus
	  var p = Math.pow(exports.IMABS(inumber), number);
	
	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);
	
	  // Return exponential of complex number
	  return exports.COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit);
	};
	
	exports.IMPRODUCT = function() {
	  // Initialize result
	  var result = arguments[0];
	
	  if (!arguments.length) {
	    return error.value;
	  }
	
	  // Loop on all numbers
	  for (var i = 1; i < arguments.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = exports.IMREAL(result);
	    var b = exports.IMAGINARY(result);
	    var c = exports.IMREAL(arguments[i]);
	    var d = exports.IMAGINARY(arguments[i]);
	
	    if (utils.anyIsError(a, b, c, d)) {
	      return error.value;
	    }
	
	    // Complute product of two complex numbers
	    result = exports.COMPLEX(a * c - b * d, a * d + b * c);
	  }
	
	  // Return product of complex numbers
	  return result;
	};
	
	exports.IMREAL = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }
	
	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }
	
	  // Handle special cases
	  if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) {
	    return 0;
	  }
	
	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }
	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }
	
	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');
	
	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }
	
	    // Return real coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, plus));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, minus));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : 0;
	    } else {
	      return (isNaN(inumber)) ? error.num : inumber;
	    }
	  }
	};
	
	exports.IMSEC = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }
	
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Return secant of complex number
	  return exports.IMDIV('1', exports.IMCOS(inumber));
	};
	
	exports.IMSECH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Return hyperbolic secant of complex number
	  return exports.IMDIV('1', exports.IMCOSH(inumber));
	};
	
	exports.IMSIN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return sine of complex number
	  return exports.COMPLEX(Math.sin(x) * (Math.exp(y) + Math.exp(-y)) / 2, Math.cos(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};
	
	exports.IMSINH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Return hyperbolic sine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) - Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) + Math.exp(-x)) / 2, unit);
	};
	
	exports.IMSQRT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';
	
	  // Calculate power of modulus
	  var s = Math.sqrt(exports.IMABS(inumber));
	
	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);
	
	  // Return exponential of complex number
	  return exports.COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit);
	};
	
	exports.IMCSC = function (inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }
	
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.num;
	  }
	
	  // Return cosecant of complex number
	  return exports.IMDIV('1', exports.IMSIN(inumber));
	};
	
	exports.IMCSCH = function (inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }
	
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.num;
	  }
	
	  // Return hyperbolic cosecant of complex number
	  return exports.IMDIV('1', exports.IMSINH(inumber));
	};
	
	exports.IMSUB = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = this.IMREAL(inumber1);
	  var b = this.IMAGINARY(inumber1);
	  var c = this.IMREAL(inumber2);
	  var d = this.IMAGINARY(inumber2);
	
	  if (utils.anyIsError(a, b, c, d)) {
	    return error.value;
	  }
	
	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }
	
	  // Return _ of two complex numbers
	  return this.COMPLEX(a - c, b - d, unit);
	};
	
	exports.IMSUM = function() {
	  if (!arguments.length) {
	    return error.value;
	  }
	  var args = utils.flatten(arguments);
	
	  // Initialize result
	  var result = args[0];
	
	  // Loop on all numbers
	  for (var i = 1; i < args.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = this.IMREAL(result);
	    var b = this.IMAGINARY(result);
	    var c = this.IMREAL(args[i]);
	    var d = this.IMAGINARY(args[i]);
	
	    if (utils.anyIsError(a, b, c, d)) {
	      return error.value;
	    }
	
	    // Complute product of two complex numbers
	    result = this.COMPLEX(a + c, b + d);
	  }
	
	  // Return sum of complex numbers
	  return result;
	};
	
	exports.IMTAN = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }
	
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }
	
	  // Return tangent of complex number
	  return this.IMDIV(this.IMSIN(inumber), this.IMCOS(inumber));
	};
	
	exports.OCT2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }
	
	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;
	
	  // Convert octal number to decimal
	  var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);
	
	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }
	
	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }
	
	  // Convert decimal number to binary
	  var result = decimal.toString(2);
	
	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};
	
	exports.OCT2DEC = function(number) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }
	
	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);
	
	  // Return decimal number
	  return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
	};
	
	exports.OCT2HEX = function(number, places) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }
	
	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);
	
	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 536870912) {
	    return 'ff' + (decimal + 3221225472).toString(16);
	  }
	
	  // Convert decimal number to hexadecimal
	  var result = decimal.toString(16);
	
	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }
	
	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }
	
	    // Truncate places in case it is not an integer
	    places = Math.floor(places);
	
	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var M = Math;
	function _horner(arr, v) { return arr.reduce(function(z,w){return v * z + w;},0); };
	function _bessel_iter(x, n, f0, f1, sign) {
	  if(!sign) sign = -1;
	  var tdx = 2 / x, f2;
	  if(n === 0) return f0;
	  if(n === 1) return f1;
	  for(var o = 1; o != n; ++o) {
	    f2 = f1 * o * tdx + sign * f0;
	    f0 = f1; f1 = f2;
	  }
	  return f1;
	}
	function _bessel_wrap(bessel0, bessel1, name, nonzero, sign) {
	  return function bessel(x,n) {
	    if(n === 0) return bessel0(x);
	    if(n === 1) return bessel1(x);
	    if(n < 0) throw name + ': Order (' + n + ') must be nonnegative';
	    if(nonzero == 1 && x === 0) throw name + ': Undefined when x == 0';
	    if(nonzero == 2 && x <= 0) throw name + ': Undefined when x <= 0';
	    var b0 = bessel0(x), b1 = bessel1(x);
	    return _bessel_iter(x, n, b0, b1, sign);
	  };
	}
	var besselj = (function() {
	  var b0_a1a = [57568490574.0,-13362590354.0,651619640.7,-11214424.18,77392.33017,-184.9052456].reverse();
	  var b0_a2a = [57568490411.0,1029532985.0,9494680.718,59272.64853,267.8532712,1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934935152e-7].reverse();
	  var W = 0.636619772; // 2 / Math.PI
	
	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = M.abs(x) - 0.785398164;
	    if(M.abs(x) < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2;
	    }
	    else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	    }
	    return a;
	  }
	  var b1_a1a = [72362614232.0,-7895059235.0,242396853.1,-2972611.439, 15704.48260, -30.16036606].reverse();
	  var b1_a2a = [144725228442.0, 2300535178.0, 18583304.74, 99447.43394, 376.9991397, 1.0].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = M.abs(x) - 2.356194491;
	    if(Math.abs(x)< 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1 / a2;
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	      if(x < 0) a = -a;
	    }
	    return a;
	  }
	  return function besselj(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(M.abs(x));
	    if(n === 1) return bessel1(M.abs(x));
	    if(n < 0) throw 'BESSELJ: Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;
	
	    var ret, j, tox = 2 / M.abs(x), m, jsum, sum, bjp, bj, bjm;
	    if(M.abs(x) > n) {
	      ret = _bessel_iter(x, n, bessel0(M.abs(x)), bessel1(M.abs(x)),-1);
	    } else {
	      m=2*M.floor((n+M.floor(M.sqrt(40*n)))/2);
	      jsum=0;
	      bjp=ret=sum=0.0;
	      bj=1.0;
	      for (j=m;j>0;j--) {
	        bjm=j*tox*bj-bjp;
	        bjp=bj;
	        bj=bjm;
	        if (M.abs(bj) > 1E10) {
	          bj *= 1E-10;
	          bjp *= 1E-10;
	          ret *= 1E-10;
	          sum *= 1E-10;
	        }
	        if (jsum) sum += bj;
	        jsum=!jsum;
	        if (j == n) ret=bjp;
	      }
	      sum=2.0*sum-bj;
	      ret /= sum;
	    }
	    return x < 0 && (n%2) ? -ret : ret;
	  };
	})();
	var bessely = (function() {
	  var b0_a1a = [-2957821389.0, 7062834065.0, -512359803.6, 10879881.29, -86327.92757, 228.4622733].reverse();
	  var b0_a2a = [40076544269.0, 745249964.8, 7189466.438, 47447.26470, 226.1030244, 1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934945152e-7].reverse();
	
	  var W = 0.636619772;
	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = x - 0.785398164;
	    if(x < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2 + W * besselj(x,0) * M.log(x);
	    } else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }
	
	  var b1_a1a = [-0.4900604943e13, 0.1275274390e13, -0.5153438139e11, 0.7349264551e9, -0.4237922726e7, 0.8511937935e4].reverse();
	  var b1_a2a = [0.2499580570e14, 0.4244419664e12, 0.3733650367e10, 0.2245904002e8, 0.1020426050e6, 0.3549632885e3, 1].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = x - 2.356194491;
	    if(x < 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1/a2 + W * (besselj(x,1) * M.log(x) - 1 / x);
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }
	
	  return _bessel_wrap(bessel0, bessel1, 'BESSELY', 1, -1);
	})();
	var besseli = (function() {
	  var b0_a = [1.0, 3.5156229, 3.0899424, 1.2067492, 0.2659732, 0.360768e-1, 0.45813e-2].reverse();
	  var b0_b = [0.39894228, 0.1328592e-1, 0.225319e-2, -0.157565e-2, 0.916281e-2, -0.2057706e-1, 0.2635537e-1, -0.1647633e-1, 0.392377e-2].reverse();
	  function bessel0(x) {
	    if(x <= 3.75) return _horner(b0_a, x*x/(3.75*3.75));
	    return M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b0_b, 3.75/M.abs(x));
	  }
	
	  var b1_a = [0.5, 0.87890594, 0.51498869, 0.15084934, 0.2658733e-1, 0.301532e-2, 0.32411e-3].reverse();
	  var b1_b = [0.39894228, -0.3988024e-1, -0.362018e-2, 0.163801e-2, -0.1031555e-1, 0.2282967e-1, -0.2895312e-1, 0.1787654e-1, -0.420059e-2].reverse();
	  function bessel1(x) {
	    if(x < 3.75) return x * _horner(b1_a, x*x/(3.75*3.75));
	    return (x < 0 ? -1 : 1) * M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b1_b, 3.75/M.abs(x));
	  }
	
	  return function besseli(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(x);
	    if(n == 1) return bessel1(x);
	    if(n < 0) throw 'BESSELI Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;
	
	    var ret, j, tox = 2 / M.abs(x), m, bip, bi, bim;
	    m=2*M.round((n+M.round(M.sqrt(40*n)))/2);
	    bip=ret=0.0;
	    bi=1.0;
	    for (j=m;j>0;j--) {
	      bim=j*tox*bi + bip;
	      bip=bi; bi=bim;
	      if (M.abs(bi) > 1E10) {
	        bi *= 1E-10;
	        bip *= 1E-10;
	        ret *= 1E-10;
	      }
	      if(j == n) ret = bip;
	    }
	    ret *= besseli(x, 0) / bi;
	    return x < 0 && (n%2) ? -ret : ret;
	  };
	
	})();
	
	var besselk = (function() {
	  var b0_a = [-0.57721566, 0.42278420, 0.23069756, 0.3488590e-1, 0.262698e-2, 0.10750e-3, 0.74e-5].reverse();
	  var b0_b = [1.25331414, -0.7832358e-1, 0.2189568e-1, -0.1062446e-1, 0.587872e-2, -0.251540e-2, 0.53208e-3].reverse();
	  function bessel0(x) {
	    if(x <= 2) return -M.log(x/2)*besseli(x,0) + _horner(b0_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b0_b, 2/x);
	  }
	
	  var b1_a = [1.0, 0.15443144, -0.67278579, -0.18156897, -0.1919402e-1, -0.110404e-2, -0.4686e-4].reverse();
	  var b1_b = [1.25331414, 0.23498619, -0.3655620e-1, 0.1504268e-1, -0.780353e-2, 0.325614e-2, -0.68245e-3].reverse();
	  function bessel1(x) {
	    if(x <= 2) return M.log(x/2)*besseli(x,1) + (1/x)*_horner(b1_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b1_b, 2/x);
	  }
	
	  return _bessel_wrap(bessel0, bessel1, 'BESSELK', 2, 1);
	})();
	if(true) {
	  exports.besselj = besselj;
	  exports.bessely = bessely;
	  exports.besseli = besseli;
	  exports.besselk = besselk;
	}
	


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	var utils = __webpack_require__(16);
	
	var d1900 = new Date(1900, 0, 1);
	var WEEK_STARTS = [
	  undefined,
	  0,
	  1,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  1,
	  2,
	  3,
	  4,
	  5,
	  6,
	  0
	];
	var WEEK_TYPES = [
	  [],
	  [1, 2, 3, 4, 5, 6, 7],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 0, 1, 2, 3, 4, 5],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 7, 1, 2, 3, 4, 5],
	  [5, 6, 7, 1, 2, 3, 4],
	  [4, 5, 6, 7, 1, 2, 3],
	  [3, 4, 5, 6, 7, 1, 2],
	  [2, 3, 4, 5, 6, 7, 1],
	  [1, 2, 3, 4, 5, 6, 7]
	];
	var WEEKEND_TYPES = [
	  [],
	  [6, 0],
	  [0, 1],
	  [1, 2],
	  [2, 3],
	  [3, 4],
	  [4, 5],
	  [5, 6],
	  undefined,
	  undefined,
	  undefined, [0, 0],
	  [1, 1],
	  [2, 2],
	  [3, 3],
	  [4, 4],
	  [5, 5],
	  [6, 6]
	];
	
	exports.DATE = function(year, month, day) {
	  var result;
	
	  year = utils.parseNumber(year);
	  month = utils.parseNumber(month);
	  day = utils.parseNumber(day);
	
	  if (utils.anyIsError(year, month, day)) {
	    result = error.value;
	
	  } else if (year < 0 || month < 0 || day < 0) {
	    result = error.num;
	
	  } else {
	    result = new Date(year, month - 1, day);
	  }
	
	  return result;
	};
	
	exports.DATEVALUE = function(date_text) {
	  if (typeof date_text !== 'string') {
	    return error.value;
	  }
	  var date = Date.parse(date_text);
	
	  if (isNaN(date)) {
	    return error.value;
	  }
	  if (date <= -2203891200000) {
	    return (date - d1900) / 86400000 + 1;
	  }
	
	  return (date - d1900) / 86400000 + 2;
	};
	
	exports.DAY = function(serial_number) {
	  var date = utils.parseDate(serial_number);
	  if (date instanceof Error) {
	    return date;
	  }
	
	  return date.getDate();
	};
	
	exports.DAYS = function(end_date, start_date) {
	  end_date = utils.parseDate(end_date);
	  start_date = utils.parseDate(start_date);
	
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	
	  return serial(end_date) - serial(start_date);
	};
	
	exports.DAYS360 = function(start_date, end_date, method) {
	  method = utils.parseBool(method);
	  start_date = utils.parseDate(start_date);
	  end_date = utils.parseDate(end_date);
	
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (method instanceof Error) {
	    return method;
	  }
	  var sm = start_date.getMonth();
	  var em = end_date.getMonth();
	  var sd, ed;
	
	  if (method) {
	    sd = start_date.getDate() === 31 ? 30 : start_date.getDate();
	    ed = end_date.getDate() === 31 ? 30 : end_date.getDate();
	  } else {
	    var smd = new Date(start_date.getFullYear(), sm + 1, 0).getDate();
	    var emd = new Date(end_date.getFullYear(), em + 1, 0).getDate();
	    sd = start_date.getDate() === smd ? 30 : start_date.getDate();
	    if (end_date.getDate() === emd) {
	      if (sd < 30) {
	        em++;
	        ed = 1;
	      } else {
	        ed = 30;
	      }
	    } else {
	      ed = end_date.getDate();
	    }
	  }
	
	  return 360 * (end_date.getFullYear() - start_date.getFullYear()) +
	    30 * (em - sm) + (ed - sd);
	};
	
	exports.EDATE = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	  start_date.setMonth(start_date.getMonth() + months);
	
	  return serial(start_date);
	};
	
	exports.EOMONTH = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	
	  return serial(new Date(start_date.getFullYear(), start_date.getMonth() + months + 1, 0));
	};
	
	exports.HOUR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	
	  return serial_number.getHours();
	};
	
	exports.INTERVAL = function (second) {
	  if (typeof second !== 'number' && typeof second !== 'string') {
	    return error.value;
	  } else {
	    second = parseInt(second, 10);
	  }
	
	  var year  = Math.floor(second/946080000);
	  second    = second%946080000;
	  var month = Math.floor(second/2592000);
	  second    = second%2592000;
	  var day   = Math.floor(second/86400);
	  second    = second%86400;
	
	  var hour  = Math.floor(second/3600);
	  second    = second%3600;
	  var min   = Math.floor(second/60);
	  second    = second%60;
	  var sec   = second;
	
	  year  = (year  > 0) ? year  + 'Y' : '';
	  month = (month > 0) ? month + 'M' : '';
	  day   = (day   > 0) ? day   + 'D' : '';
	  hour  = (hour  > 0) ? hour  + 'H' : '';
	  min   = (min   > 0) ? min   + 'M' : '';
	  sec   = (sec   > 0) ? sec   + 'S' : '';
	
	  return 'P' + year + month + day + 'T' + hour + min + sec;
	};
	
	exports.ISOWEEKNUM = function(date) {
	  date = utils.parseDate(date);
	
	  if (date instanceof Error) {
	    return date;
	  }
	
	  date.setHours(0, 0, 0);
	  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
	  var yearStart = new Date(date.getFullYear(), 0, 1);
	
	  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
	};
	
	exports.MINUTE = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	
	  return serial_number.getMinutes();
	};
	
	exports.MONTH = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	
	  return serial_number.getMonth() + 1;
	};
	
	exports.NETWORKDAYS = function(start_date, end_date, holidays) {
	  return this.NETWORKDAYS.INTL(start_date, end_date, 1, holidays);
	};
	
	exports.NETWORKDAYS.INTL = function(start_date, end_date, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var days = (end_date - start_date) / (1000 * 60 * 60 * 24) + 1;
	  var total = days;
	  var day = start_date;
	  for (i = 0; i < days; i++) {
	    var d = (new Date().getTimezoneOffset() > 0) ? day.getUTCDay() : day.getDay();
	    var dec = false;
	    if (d === weekend[0] || d === weekend[1]) {
	      dec = true;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getDate() === day.getDate() &&
	        holiday.getMonth() === day.getMonth() &&
	        holiday.getFullYear() === day.getFullYear()) {
	        dec = true;
	        break;
	      }
	    }
	    if (dec) {
	      total--;
	    }
	    day.setDate(day.getDate() + 1);
	  }
	
	  return total;
	};
	
	exports.NOW = function() {
	  return new Date();
	};
	
	exports.SECOND = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	
	  return serial_number.getSeconds();
	};
	
	exports.TIME = function(hour, minute, second) {
	  hour = utils.parseNumber(hour);
	  minute = utils.parseNumber(minute);
	  second = utils.parseNumber(second);
	  if (utils.anyIsError(hour, minute, second)) {
	    return error.value;
	  }
	  if (hour < 0 || minute < 0 || second < 0) {
	    return error.num;
	  }
	
	  return (3600 * hour + 60 * minute + second) / 86400;
	};
	
	exports.TIMEVALUE = function(time_text) {
	  time_text = utils.parseDate(time_text);
	
	  if (time_text instanceof Error) {
	    return time_text;
	  }
	
	  return (3600 * time_text.getHours() + 60 * time_text.getMinutes() + time_text.getSeconds()) / 86400;
	};
	
	exports.TODAY = function() {
	  return new Date();
	};
	
	exports.WEEKDAY = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  var day = serial_number.getDay();
	
	  return WEEK_TYPES[return_type][day];
	};
	
	exports.WEEKNUM = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  if (return_type === 21) {
	    return this.ISOWEEKNUM(serial_number);
	  }
	  var week_start = WEEK_STARTS[return_type];
	  var jan = new Date(serial_number.getFullYear(), 0, 1);
	  var inc = jan.getDay() < week_start ? 1 : 0;
	  jan -= Math.abs(jan.getDay() - week_start) * 24 * 60 * 60 * 1000;
	
	  return Math.floor(((serial_number - jan) / (1000 * 60 * 60 * 24)) / 7 + 1) + inc;
	};
	
	exports.WORKDAY = function(start_date, days, holidays) {
	  return this.WORKDAY.INTL(start_date, days, 1, holidays);
	};
	
	exports.WORKDAY.INTL = function(start_date, days, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  days = utils.parseNumber(days);
	  if (days instanceof Error) {
	    return days;
	  }
	  if (days < 0) {
	    return error.num;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var d = 0;
	  while (d < days) {
	    start_date.setDate(start_date.getDate() + 1);
	    var day = start_date.getDay();
	    if (day === weekend[0] || day === weekend[1]) {
	      continue;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getDate() === start_date.getDate() &&
	        holiday.getMonth() === start_date.getMonth() &&
	        holiday.getFullYear() === start_date.getFullYear()) {
	        d--;
	        break;
	      }
	    }
	    d++;
	  }
	
	  return start_date;
	};
	
	exports.YEAR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	
	  return serial_number.getFullYear();
	};
	
	function isLeapYear(year) {
	  return new Date(year, 1, 29).getMonth() === 1;
	}
	
	// TODO : Use DAYS ?
	function daysBetween(start_date, end_date) {
	  return Math.ceil((end_date - start_date) / 1000 / 60 / 60 / 24);
	}
	
	exports.YEARFRAC = function(start_date, end_date, basis) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	
	  basis = basis || 0;
	  var sd = start_date.getDate();
	  var sm = start_date.getMonth() + 1;
	  var sy = start_date.getFullYear();
	  var ed = end_date.getDate();
	  var em = end_date.getMonth() + 1;
	  var ey = end_date.getFullYear();
	
	  switch (basis) {
	    case 0:
	      // US (NASD) 30/360
	      if (sd === 31 && ed === 31) {
	        sd = 30;
	        ed = 30;
	      } else if (sd === 31) {
	        sd = 30;
	      } else if (sd === 30 && ed === 31) {
	        ed = 30;
	      }
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	    case 1:
	      // Actual/actual
	      var feb29Between = function(date1, date2) {
	        var year1 = date1.getFullYear();
	        var mar1year1 = new Date(year1, 2, 1);
	        if (isLeapYear(year1) && date1 < mar1year1 && date2 >= mar1year1) {
	          return true;
	        }
	        var year2 = date2.getFullYear();
	        var mar1year2 = new Date(year2, 2, 1);
	        return (isLeapYear(year2) && date2 >= mar1year2 && date1 < mar1year2);
	      };
	      var ylength = 365;
	      if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
	        if ((sy === ey && isLeapYear(sy)) ||
	          feb29Between(start_date, end_date) ||
	          (em === 1 && ed === 29)) {
	          ylength = 366;
	        }
	        return daysBetween(start_date, end_date) / ylength;
	      }
	      var years = (ey - sy) + 1;
	      var days = (new Date(ey + 1, 0, 1) - new Date(sy, 0, 1)) / 1000 / 60 / 60 / 24;
	      var average = days / years;
	      return daysBetween(start_date, end_date) / average;
	    case 2:
	      // Actual/360
	      return daysBetween(start_date, end_date) / 360;
	    case 3:
	      // Actual/365
	      return daysBetween(start_date, end_date) / 365;
	    case 4:
	      // European 30/360
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	  }
	};
	
	function serial(date) {
	  var addOn = (date > -2203891200000) ? 2 : 1;
	
	  return (date - d1900) / 86400000 + addOn;
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	var stats = __webpack_require__(18);
	var maths = __webpack_require__(15);
	var utils = __webpack_require__(16);
	
	function compact(array) {
	  var result = [];
	
	  utils.arrayEach(array, function(value) {
	    if (value) {
	      result.push(value);
	    }
	  });
	
	  return result;
	}
	
	exports.FINDFIELD = function(database, title) {
	  var index = null;
	
	  utils.arrayEach(database, function(value, i) {
	    if (value[0] === title) {
	      index = i;
	      return false;
	    }
	  });
	
	  // Return error if the input field title is incorrect
	  if (index == null) {
	    return error.value;
	  }
	
	  return index;
	};
	
	function findResultIndex(database, criterias) {
	  var matches = {};
	  for (var i = 1; i < database[0].length; ++i) {
	    matches[i] = true;
	  }
	  var maxCriteriaLength = criterias[0].length;
	  for (i = 1; i < criterias.length; ++i) {
	    if (criterias[i].length > maxCriteriaLength) {
	      maxCriteriaLength = criterias[i].length;
	    }
	  }
	
	  for (var k = 1; k < database.length; ++k) {
	    for (var l = 1; l < database[k].length; ++l) {
	      var currentCriteriaResult = false;
	      var hasMatchingCriteria   = false;
	      for (var j = 0; j < criterias.length; ++j) {
	        var criteria = criterias[j];
	        if (criteria.length < maxCriteriaLength) {
	          continue;
	        }
	
	        var criteriaField = criteria[0];
	        if (database[k][0] !== criteriaField) {
	          continue;
	        }
	        hasMatchingCriteria = true;
	        for (var p = 1; p < criteria.length; ++p) {
	          currentCriteriaResult = currentCriteriaResult || eval(database[k][l] + criteria[p]);  // jshint ignore:line
	        }
	      }
	      if (hasMatchingCriteria) {
	        matches[l] = matches[l] && currentCriteriaResult;
	      }
	    }
	  }
	
	  var result = [];
	  for (var n = 0; n < database[0].length; ++n) {
	    if (matches[n]) {
	      result.push(n - 1);
	    }
	  }
	
	  return result;
	}
	
	// Database functions
	exports.DAVERAGE = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var sum = 0;
	
	  utils.arrayEach(resultIndexes, function(value) {
	    sum += targetFields[value];
	  });
	
	  return resultIndexes.length === 0 ? error.div0 : sum / resultIndexes.length;
	};
	
	exports.DCOUNT = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	
	  return stats.COUNT(targetValues);
	};
	
	exports.DCOUNTA = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	
	  return stats.COUNTA(targetValues);
	};
	
	exports.DGET = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  // Return error if no record meets the criteria
	  if (resultIndexes.length === 0) {
	    return error.value;
	  }
	  // Returns the #NUM! error value because more than one record meets the
	  // criteria
	  if (resultIndexes.length > 1) {
	    return error.num;
	  }
	
	  return targetFields[resultIndexes[0]];
	};
	
	exports.DMAX = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  var maxValue = targetFields[resultIndexes[0]];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    if (maxValue < targetFields[value]) {
	      maxValue = targetFields[value];
	    }
	  });
	
	  return maxValue;
	};
	
	exports.DMIN = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  var minValue = targetFields[resultIndexes[0]];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    if (minValue > targetFields[value]) {
	      minValue = targetFields[value];
	    }
	  });
	
	  return minValue;
	};
	
	exports.DPRODUCT = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	  targetValues = compact(targetValues);
	
	  var result = 1;
	
	  utils.arrayEach(targetValues, function(value) {
	    result *= value;
	  });
	
	  return result;
	};
	
	exports.DSTDEV = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	  targetValues = compact(targetValues);
	
	  return stats.STDEV.S(targetValues);
	};
	
	exports.DSTDEVP = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	  targetValues = compact(targetValues);
	
	  return stats.STDEV.P(targetValues);
	};
	
	exports.DSUM = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	
	  return maths.SUM(targetValues);
	};
	
	exports.DVAR = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	
	  return stats.VAR.S(targetValues);
	};
	
	exports.DVARP = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	
	  utils.arrayEach(resultIndexes, function(value) {
	    targetValues.push(targetFields[value]);
	  });
	
	  return stats.VAR.P(targetValues);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	var utils = __webpack_require__(16);
	var information = __webpack_require__(24);
	
	exports.AND = function() {
	  var args = utils.flatten(arguments);
	  var result = true;
	  for (var i = 0; i < args.length; i++) {
	    if (!args[i]) {
	      result = false;
	    }
	  }
	  return result;
	};
	
	exports.CHOOSE = function() {
	  if (arguments.length < 2) {
	    return error.na;
	  }
	
	  var index = arguments[0];
	  if (index < 1 || index > 254) {
	    return error.value;
	  }
	
	  if (arguments.length < index + 1) {
	    return error.value;
	  }
	
	  return arguments[index];
	};
	
	exports.FALSE = function() {
	  return false;
	};
	
	exports.IF = function(test, then_value, otherwise_value) {
	  return test ? then_value : otherwise_value;
	};
	
	exports.IFERROR = function(value, valueIfError) {
	  if (information.ISERROR(value)) {
	    return valueIfError;
	  }
	  return value;
	};
	
	exports.IFNA = function(value, value_if_na) {
	  return value === error.na ? value_if_na : value;
	};
	
	exports.NOT = function(logical) {
	  return !logical;
	};
	
	exports.OR = function() {
	  var args = utils.flatten(arguments);
	  var result = false;
	  for (var i = 0; i < args.length; i++) {
	    if (args[i]) {
	      result = true;
	    }
	  }
	  return result;
	};
	
	exports.TRUE = function() {
	  return true;
	};
	
	exports.XOR = function() {
	  var args = utils.flatten(arguments);
	  var result = 0;
	  for (var i = 0; i < args.length; i++) {
	    if (args[i]) {
	      result++;
	    }
	  }
	  return (Math.floor(Math.abs(result)) & 1) ? true : false;
	};
	
	exports.SWITCH = function () {
	  var result;
	
	  if (arguments.length > 0)  {
	    var targetValue = arguments[0];
	    var argc = arguments.length - 1;
	    var switchCount = Math.floor(argc / 2);
	    var switchSatisfied = false;
	    var hasDefaultClause = argc % 2 !== 0;
	    var defaultClause = argc % 2 === 0 ? null : arguments[arguments.length - 1];
	
	    if (switchCount) {
	      for (var index = 0; index < switchCount; index++) {
	        if (targetValue === arguments[index * 2 + 1]) {
	          result = arguments[index * 2 + 2];
	          switchSatisfied = true;
	          break;
	        }
	      }
	    }
	
	    if (!switchSatisfied) {
	      result = hasDefaultClause ? defaultClause : error.na;
	    }
	  } else {
	    result = error.value;
	  }
	
	  return result;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	var dateTime = __webpack_require__(28);
	var utils = __webpack_require__(16);
	
	function validDate(d) {
	  return d && d.getTime && !isNaN(d.getTime());
	}
	
	function ensureDate(d) {
	  return (d instanceof Date)?d:new Date(d);
	}
	
	exports.ACCRINT = function(issue, first, settlement, rate, par, frequency, basis) {
	  // Return error if either date is invalid
	  issue      = ensureDate(issue);
	  first      = ensureDate(first);
	  settlement = ensureDate(settlement);
	  if (!validDate(issue) || !validDate(first) || !validDate(settlement)) {
	    return error.value;
	  }
	
	  // Return error if either rate or par are lower than or equal to zero
	  if (rate <= 0 || par <= 0) {
	    return error.num;
	  }
	
	  // Return error if frequency is neither 1, 2, or 4
	  if ([1, 2, 4].indexOf(frequency) === -1) {
	    return error.num;
	  }
	
	  // Return error if basis is neither 0, 1, 2, 3, or 4
	  if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
	    return error.num;
	  }
	
	  // Return error if settlement is before or equal to issue
	  if (settlement <= issue) {
	    return error.num;
	  }
	
	  // Set default values
	  par   = par   || 0;
	  basis = basis || 0;
	
	  // Compute accrued interest
	  return par * rate * dateTime.YEARFRAC(issue, settlement, basis);
	};
	
	// TODO
	exports.ACCRINTM = function() {
	  throw new Error('ACCRINTM is not implemented');
	};
	
	// TODO
	exports.AMORDEGRC = function() {
	  throw new Error('AMORDEGRC is not implemented');
	};
	
	// TODO
	exports.AMORLINC = function() {
	  throw new Error('AMORLINC is not implemented');
	};
	
	// TODO
	exports.COUPDAYBS = function() {
	  throw new Error('COUPDAYBS is not implemented');
	};
	
	// TODO
	exports.COUPDAYS = function() {
	  throw new Error('COUPDAYS is not implemented');
	};
	
	// TODO
	exports.COUPDAYSNC = function() {
	  throw new Error('COUPDAYSNC is not implemented');
	};
	
	// TODO
	exports.COUPNCD = function() {
	  throw new Error('COUPNCD is not implemented');
	};
	
	// TODO
	exports.COUPNUM = function() {
	  throw new Error('COUPNUM is not implemented');
	};
	
	// TODO
	exports.COUPPCD = function() {
	  throw new Error('COUPPCD is not implemented');
	};
	
	exports.CUMIPMT = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
	  // Requires exports.FV() and exports.PMT() from exports.js [http://stoic.com/exports/]
	
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, periods, value)) {
	    return error.value;
	  }
	
	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }
	
	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }
	
	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }
	
	  // Compute cumulative interest
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var interest = 0;
	
	  if (start === 1) {
	    if (type === 0) {
	      interest = -value;
	      start++;
	    }
	  }
	
	  for (var i = start; i <= end; i++) {
	    if (type === 1) {
	      interest += exports.FV(rate, i - 2, payment, value, 1) - payment;
	    } else {
	      interest += exports.FV(rate, i - 1, payment, value, 0);
	    }
	  }
	  interest *= rate;
	
	  // Return cumulative interest
	  return interest;
	};
	
	exports.CUMPRINC = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
	
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, periods, value)) {
	    return error.value;
	  }
	
	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }
	
	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }
	
	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }
	
	  // Compute cumulative principal
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var principal = 0;
	  if (start === 1) {
	    if (type === 0) {
	      principal = payment + value * rate;
	    } else {
	      principal = payment;
	    }
	    start++;
	  }
	  for (var i = start; i <= end; i++) {
	    if (type > 0) {
	      principal += payment - (exports.FV(rate, i - 2, payment, value, 1) - payment) * rate;
	    } else {
	      principal += payment - exports.FV(rate, i - 1, payment, value, 0) * rate;
	    }
	  }
	
	  // Return cumulative principal
	  return principal;
	};
	
	exports.DB = function(cost, salvage, life, period, month) {
	  // Initialize month
	  month = (month === undefined) ? 12 : month;
	
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  month = utils.parseNumber(month);
	  if (utils.anyIsError(cost, salvage, life, period, month)) {
	    return error.value;
	  }
	
	  // Return error if any of the parameters is negative
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
	    return error.num;
	  }
	
	  // Return error if month is not an integer between 1 and 12
	  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) === -1) {
	    return error.num;
	  }
	
	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }
	
	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }
	
	  // Rate is rounded to three decimals places
	  var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);
	
	  // Compute initial depreciation
	  var initial = cost * rate * month / 12;
	
	  // Compute total depreciation
	  var total = initial;
	  var current = 0;
	  var ceiling = (period === life) ? life - 1 : period;
	  for (var i = 2; i <= ceiling; i++) {
	    current = (cost - total) * rate;
	    total += current;
	  }
	
	  // Depreciation for the first and last periods are special cases
	  if (period === 1) {
	    // First period
	    return initial;
	  } else if (period === life) {
	    // Last period
	    return (cost - total) * rate;
	  } else {
	    return current;
	  }
	};
	
	exports.DDB = function(cost, salvage, life, period, factor) {
	  // Initialize factor
	  factor = (factor === undefined) ? 2 : factor;
	
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  factor = utils.parseNumber(factor);
	  if (utils.anyIsError(cost, salvage, life, period, factor)) {
	    return error.value;
	  }
	
	  // Return error if any of the parameters is negative or if factor is null
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
	    return error.num;
	  }
	
	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }
	
	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }
	
	  // Compute depreciation
	  var total = 0;
	  var current = 0;
	  for (var i = 1; i <= period; i++) {
	    current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
	    total += current;
	  }
	
	  // Return depreciation
	  return current;
	};
	
	// TODO
	exports.DISC = function() {
	  throw new Error('DISC is not implemented');
	};
	
	exports.DOLLARDE = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice
	
	  dollar = utils.parseNumber(dollar);
	  fraction = utils.parseNumber(fraction);
	  if (utils.anyIsError(dollar, fraction)) {
	    return error.value;
	  }
	
	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }
	
	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }
	
	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);
	
	  // Compute integer part
	  var result = parseInt(dollar, 10);
	
	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;
	
	  // Round result
	  var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
	  result = Math.round(result * power) / power;
	
	  // Return converted dollar price
	  return result;
	};
	
	exports.DOLLARFR = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice
	
	  dollar = utils.parseNumber(dollar);
	  fraction = utils.parseNumber(fraction);
	  if (utils.anyIsError(dollar, fraction)) {
	    return error.value;
	  }
	
	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }
	
	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }
	
	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);
	
	  // Compute integer part
	  var result = parseInt(dollar, 10);
	
	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;
	
	  // Return converted dollar price
	  return result;
	};
	
	// TODO
	exports.DURATION = function() {
	  throw new Error('DURATION is not implemented');
	};
	
	exports.EFFECT = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  if (utils.anyIsError(rate, periods)) {
	    return error.value;
	  }
	
	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }
	
	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);
	
	  // Return effective annual interest rate
	  return Math.pow(1 + rate / periods, periods) - 1;
	};
	
	exports.FV = function(rate, periods, payment, value, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	
	  value = value || 0;
	  type = type || 0;
	
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  value = utils.parseNumber(value);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, payment, value, type)) {
	    return error.value;
	  }
	
	  // Return future value
	  var result;
	  if (rate === 0) {
	    result = value + payment * periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = value * term + payment * (1 + rate) * (term - 1) / rate;
	    } else {
	      result = value * term + payment * (term - 1) / rate;
	    }
	  }
	  return -result;
	};
	
	exports.FVSCHEDULE = function(principal, schedule) {
	  principal = utils.parseNumber(principal);
	  schedule = utils.parseNumberArray(utils.flatten(schedule));
	  if (utils.anyIsError(principal, schedule)) {
	    return error.value;
	  }
	
	  var n = schedule.length;
	  var future = principal;
	
	  // Apply all interests in schedule
	  for (var i = 0; i < n; i++) {
	    // Apply scheduled interest
	    future *= 1 + schedule[i];
	  }
	
	  // Return future value
	  return future;
	};
	
	// TODO
	exports.INTRATE = function() {
	  throw new Error('INTRATE is not implemented');
	};
	
	exports.IPMT = function(rate, period, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	
	  future = future || 0;
	  type = type || 0;
	
	  rate = utils.parseNumber(rate);
	  period = utils.parseNumber(period);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, period, periods, present, future, type)) {
	    return error.value;
	  }
	
	  // Compute payment
	  var payment = exports.PMT(rate, periods, present, future, type);
	
	  // Compute interest
	  var interest;
	  if (period === 1) {
	    if (type === 1) {
	      interest = 0;
	    } else {
	      interest = -present;
	    }
	  } else {
	    if (type === 1) {
	      interest = exports.FV(rate, period - 2, payment, present, 1) - payment;
	    } else {
	      interest = exports.FV(rate, period - 1, payment, present, 0);
	    }
	  }
	
	  // Return interest
	  return interest * rate;
	};
	
	exports.IRR = function(values, guess) {
	  // Credits: algorithm inspired by Apache OpenOffice
	
	  guess = guess || 0;
	
	  values = utils.parseNumberArray(utils.flatten(values));
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(values, guess)) {
	    return error.value;
	  }
	
	  // Calculates the resulting amount
	  var irrResult = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = values[0];
	    for (var i = 1; i < values.length; i++) {
	      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
	    }
	    return result;
	  };
	
	  // Calculates the first derivation
	  var irrResultDeriv = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = 0;
	    for (var i = 1; i < values.length; i++) {
	      var frac = (dates[i] - dates[0]) / 365;
	      result -= frac * values[i] / Math.pow(r, frac + 1);
	    }
	    return result;
	  };
	
	  // Initialize dates and check that values contains at least one positive value and one negative value
	  var dates = [];
	  var positive = false;
	  var negative = false;
	  for (var i = 0; i < values.length; i++) {
	    dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
	    if (values[i] > 0) {
	      positive = true;
	    }
	    if (values[i] < 0) {
	      negative = true;
	    }
	  }
	
	  // Return error if values does not contain at least one positive value and one negative value
	  if (!positive || !negative) {
	    return error.num;
	  }
	
	  // Initialize guess and resultRate
	  guess = (guess === undefined) ? 0.1 : guess;
	  var resultRate = guess;
	
	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;
	
	  // Implement Newton's method
	  var newRate, epsRate, resultValue;
	  var contLoop = true;
	  do {
	    resultValue = irrResult(values, dates, resultRate);
	    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	    epsRate = Math.abs(newRate - resultRate);
	    resultRate = newRate;
	    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	  } while (contLoop);
	
	  // Return internal rate of return
	  return resultRate;
	};
	
	exports.ISPMT = function(rate, period, periods, value) {
	  rate = utils.parseNumber(rate);
	  period = utils.parseNumber(period);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, period, periods, value)) {
	    return error.value;
	  }
	
	  // Return interest
	  return value * rate * (period / periods - 1);
	};
	
	// TODO
	exports.MDURATION = function() {
	  throw new Error('MDURATION is not implemented');
	};
	
	exports.MIRR = function(values, finance_rate, reinvest_rate) {
	  values = utils.parseNumberArray(utils.flatten(values));
	  finance_rate = utils.parseNumber(finance_rate);
	  reinvest_rate = utils.parseNumber(reinvest_rate);
	  if (utils.anyIsError(values, finance_rate, reinvest_rate)) {
	    return error.value;
	  }
	
	  // Initialize number of values
	  var n = values.length;
	
	  // Lookup payments (negative values) and incomes (positive values)
	  var payments = [];
	  var incomes = [];
	  for (var i = 0; i < n; i++) {
	    if (values[i] < 0) {
	      payments.push(values[i]);
	    } else {
	      incomes.push(values[i]);
	    }
	  }
	
	  // Return modified internal rate of return
	  var num = -exports.NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
	  var den = exports.NPV(finance_rate, payments) * (1 + finance_rate);
	  return Math.pow(num / den, 1 / (n - 1)) - 1;
	};
	
	exports.NOMINAL = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  if (utils.anyIsError(rate, periods)) {
	    return error.value;
	  }
	
	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }
	
	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);
	
	  // Return nominal annual interest rate
	  return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
	};
	
	exports.NPER = function(rate, payment, present, future, type) {
	  type = (type === undefined) ? 0 : type;
	  future = (future === undefined) ? 0 : future;
	
	  rate = utils.parseNumber(rate);
	  payment = utils.parseNumber(payment);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, payment, present, future, type)) {
	    return error.value;
	  }
	
	  // Return number of periods
	  var num = payment * (1 + rate * type) - future * rate;
	  var den = (present * rate + payment * (1 + rate * type));
	  return Math.log(num / den) / Math.log(1 + rate);
	};
	
	exports.NPV = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	
	  // Lookup rate
	  var rate = args[0];
	
	  // Initialize net present value
	  var value = 0;
	
	  // Loop on all values
	  for (var j = 1; j < args.length; j++) {
	    value += args[j] / Math.pow(1 + rate, j);
	  }
	
	  // Return net present value
	  return value;
	};
	
	// TODO
	exports.ODDFPRICE = function() {
	  throw new Error('ODDFPRICE is not implemented');
	};
	
	// TODO
	exports.ODDFYIELD = function() {
	  throw new Error('ODDFYIELD is not implemented');
	};
	
	// TODO
	exports.ODDLPRICE = function() {
	  throw new Error('ODDLPRICE is not implemented');
	};
	
	// TODO
	exports.ODDLYIELD = function() {
	  throw new Error('ODDLYIELD is not implemented');
	};
	
	exports.PDURATION = function(rate, present, future) {
	  rate = utils.parseNumber(rate);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  if (utils.anyIsError(rate, present, future)) {
	    return error.value;
	  }
	
	  // Return error if rate <=0
	  if (rate <= 0) {
	    return error.num;
	  }
	
	  // Return number of periods
	  return (Math.log(future) - Math.log(present)) / Math.log(1 + rate);
	};
	
	exports.PMT = function(rate, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	
	  future = future || 0;
	  type = type || 0;
	
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, present, future, type)) {
	    return error.value;
	  }
	
	  // Return payment
	  var result;
	  if (rate === 0) {
	    result = (present + future) / periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
	    } else {
	      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
	    }
	  }
	  return -result;
	};
	
	exports.PPMT = function(rate, period, periods, present, future, type) {
	  future = future || 0;
	  type = type || 0;
	
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, present, future, type)) {
	    return error.value;
	  }
	
	  return exports.PMT(rate, periods, present, future, type) - exports.IPMT(rate, period, periods, present, future, type);
	};
	
	// TODO
	exports.PRICE = function() {
	  throw new Error('PRICE is not implemented');
	};
	
	// TODO
	exports.PRICEDISC = function() {
	  throw new Error('PRICEDISC is not implemented');
	};
	
	// TODO
	exports.PRICEMAT = function() {
	  throw new Error('PRICEMAT is not implemented');
	};
	
	exports.PV = function(rate, periods, payment, future, type) {
	  future = future || 0;
	  type = type || 0;
	
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, payment, future, type)) {
	    return error.value;
	  }
	
	  // Return present value
	  if (rate === 0) {
	    return -payment * periods - future;
	  } else {
	    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
	  }
	};
	
	exports.RATE = function(periods, payment, present, future, type, guess) {
	  // Credits: rabugento
	
	  guess = (guess === undefined) ? 0.01 : guess;
	  future = (future === undefined) ? 0 : future;
	  type = (type === undefined) ? 0 : type;
	
	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(periods, payment, present, future, type, guess)) {
	    return error.value;
	  }
	
	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;
	
	  // Set maximum number of iterations
	  var iterMax = 50;
	
	  // Implement Newton's method
	  var y, y0, y1, x0, x1 = 0,
	    f = 0,
	    i = 0;
	  var rate = guess;
	  if (Math.abs(rate) < epsMax) {
	    y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
	  } else {
	    f = Math.exp(periods * Math.log(1 + rate));
	    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
	  }
	  y0 = present + payment * periods + future;
	  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
	  i = x0 = 0;
	  x1 = rate;
	  while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
	    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
	    x0 = x1;
	    x1 = rate;
	    if (Math.abs(rate) < epsMax) {
	      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
	    } else {
	      f = Math.exp(periods * Math.log(1 + rate));
	      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
	    }
	    y0 = y1;
	    y1 = y;
	    ++i;
	  }
	  return rate;
	};
	
	// TODO
	exports.RECEIVED = function() {
	  throw new Error('RECEIVED is not implemented');
	};
	
	exports.RRI = function(periods, present, future) {
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  if (utils.anyIsError(periods, present, future)) {
	    return error.value;
	  }
	
	  // Return error if periods or present is equal to 0 (zero)
	  if (periods === 0 || present === 0) {
	    return error.num;
	  }
	
	  // Return equivalent interest rate
	  return Math.pow(future / present, 1 / periods) - 1;
	};
	
	exports.SLN = function(cost, salvage, life) {
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  if (utils.anyIsError(cost, salvage, life)) {
	    return error.value;
	  }
	
	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }
	
	  // Return straight-line depreciation
	  return (cost - salvage) / life;
	};
	
	exports.SYD = function(cost, salvage, life, period) {
	  // Return error if any of the parameters is not a number
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  if (utils.anyIsError(cost, salvage, life, period)) {
	    return error.value;
	  }
	
	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }
	
	  // Return error if period is lower than 1 or greater than life
	  if (period < 1 || period > life) {
	    return error.num;
	  }
	
	  // Truncate period if it is not an integer
	  period = parseInt(period, 10);
	
	  // Return straight-line depreciation
	  return ((cost - salvage) * (life - period + 1) * 2) / (life * (life + 1));
	};
	
	exports.TBILLEQ = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  discount = utils.parseNumber(discount);
	  if (utils.anyIsError(settlement, maturity, discount)) {
	    return error.value;
	  }
	
	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }
	
	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }
	
	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }
	
	  // Return bond-equivalent yield
	  return (365 * discount) / (360 - discount * dateTime.DAYS360(settlement, maturity, false));
	};
	
	exports.TBILLPRICE = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  discount = utils.parseNumber(discount);
	  if (utils.anyIsError(settlement, maturity, discount)) {
	    return error.value;
	  }
	
	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }
	
	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }
	
	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }
	
	  // Return bond-equivalent yield
	  return 100 * (1 - discount * dateTime.DAYS360(settlement, maturity, false) / 360);
	};
	
	exports.TBILLYIELD = function(settlement, maturity, price) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  price = utils.parseNumber(price);
	  if (utils.anyIsError(settlement, maturity, price)) {
	    return error.value;
	  }
	
	  // Return error if price is lower than or equal to zero
	  if (price <= 0) {
	    return error.num;
	  }
	
	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }
	
	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }
	
	  // Return bond-equivalent yield
	  return (100 - price) * 360 / (price * dateTime.DAYS360(settlement, maturity, false));
	};
	
	// TODO
	exports.VDB = function() {
	  throw new Error('VDB is not implemented');
	};
	
	// TODO needs better support for date
	// exports.XIRR = function(values, dates, guess) {
	//   // Credits: algorithm inspired by Apache OpenOffice
	//
	//   values = utils.parseNumberArray(utils.flatten(values));
	//   dates = utils.parseDateArray(utils.flatten(dates));
	//   guess = utils.parseNumber(guess);
	//
	//   if (utils.anyIsError(values, dates, guess)) {
	//     return error.value;
	//   }
	//
	//   // Calculates the resulting amount
	//   var irrResult = function(values, dates, rate) {
	//     var r = rate + 1;
	//     var result = values[0];
	//     for (var i = 1; i < values.length; i++) {
	//       result += values[i] / Math.pow(r, dateTime.DAYS(dates[i], dates[0]) / 365);
	//     }
	//     return result;
	//   };
	//
	//   // Calculates the first derivation
	//   var irrResultDeriv = function(values, dates, rate) {
	//     var r = rate + 1;
	//     var result = 0;
	//     for (var i = 1; i < values.length; i++) {
	//       var frac = dateTime.DAYS(dates[i], dates[0]) / 365;
	//       result -= frac * values[i] / Math.pow(r, frac + 1);
	//     }
	//     return result;
	//   };
	//
	//   // Check that values contains at least one positive value and one negative value
	//   var positive = false;
	//   var negative = false;
	//   for (var i = 0; i < values.length; i++) {
	//     if (values[i] > 0) {
	//       positive = true;
	//     }
	//     if (values[i] < 0) {
	//       negative = true;
	//     }
	//   }
	//
	//   // Return error if values does not contain at least one positive value and one negative value
	//   if (!positive || !negative) {
	//     return error.num;
	//   }
	//
	//   // Initialize guess and resultRate
	//   guess = guess || 0.1;
	//   var resultRate = guess;
	//
	//   // Set maximum epsilon for end of iteration
	//   var epsMax = 1e-10;
	//
	//   // Implement Newton's method
	//   var newRate, epsRate, resultValue;
	//   var contLoop = true;
	//   do {
	//     resultValue = irrResult(values, dates, resultRate);
	//     newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	//     epsRate = Math.abs(newRate - resultRate);
	//     resultRate = newRate;
	//     contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	//   } while (contLoop);
	//
	//   // Return internal rate of return
	//   return resultRate;
	// };
	
	exports.XNPV = function(rate, values, dates) {
	  rate = utils.parseNumber(rate);
	  values = utils.parseNumberArray(utils.flatten(values));
	  dates = utils.parseDateArray(utils.flatten(dates));
	  if (utils.anyIsError(rate, values, dates)) {
	    return error.value;
	  }
	
	  var result = 0;
	  for (var i = 0; i < values.length; i++) {
	    result += values[i] / Math.pow(1 + rate, dateTime.DAYS(dates[i], dates[0]) / 365);
	  }
	  return result;
	};
	
	// TODO
	exports.YIELD = function() {
	  throw new Error('YIELD is not implemented');
	};
	
	// TODO
	exports.YIELDDISC = function() {
	  throw new Error('YIELDDISC is not implemented');
	};
	
	// TODO
	exports.YIELDMAT = function() {
	  throw new Error('YIELDMAT is not implemented');
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(17);
	var utils = __webpack_require__(16);
	
	exports.MATCH = function(lookupValue, lookupArray, matchType) {
	  if (!lookupValue && !lookupArray) {
	    return error.na;
	  }
	
	  if (arguments.length === 2) {
	    matchType = 1;
	  }
	  if (!(lookupArray instanceof Array)) {
	    return error.na;
	  }
	
	  if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
	    return error.na;
	  }
	  var index;
	  var indexValue;
	  for (var idx = 0; idx < lookupArray.length; idx++) {
	    if (matchType === 1) {
	      if (lookupArray[idx] === lookupValue) {
	        return idx + 1;
	      } else if (lookupArray[idx] < lookupValue) {
	        if (!indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        } else if (lookupArray[idx] > indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        }
	      }
	    } else if (matchType === 0) {
	      if (typeof lookupValue === 'string') {
	        lookupValue = lookupValue.replace(/\?/g, '.');
	        if (lookupArray[idx].toLowerCase().match(lookupValue.toLowerCase())) {
	          return idx + 1;
	        }
	      } else {
	        if (lookupArray[idx] === lookupValue) {
	          return idx + 1;
	        }
	      }
	    } else if (matchType === -1) {
	      if (lookupArray[idx] === lookupValue) {
	        return idx + 1;
	      } else if (lookupArray[idx] > lookupValue) {
	        if (!indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        } else if (lookupArray[idx] < indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        }
	      }
	    }
	  }
	
	  return index ? index : error.na;
	};
	
	exports.VLOOKUP = function (needle, table, index, rangeLookup) {
	  if (process && process.env && process.env.NODE_ENV === 'compile') {
	    return 0;
	  }
	
	  if (!needle || !table || !index) {
	    return error.na;
	  }
	
	  rangeLookup = rangeLookup || false;
	  for (var i = 0; i < table.length; i++) {
	    var row = table[i];
	    if (!rangeLookup) {
	      if (row[0] === needle) {
	        return (index < (row.length + 1) ? row[index - 1] : error.ref);
	      }
	    } else {
	      if (!isNaN(needle)) {
	        needle = utils.parseNumber(needle);
	        var startRange = utils.parseNumber(row[0]);
	        var isLastIndex = i === (table.length - 1) ? true : false;
	        if (isLastIndex) {
	          return (index < (row.length + 1) ? row[index - 1] : error.ref);
	        } else {
	          var endRange = utils.parseNumber(table[i + 1][0]) - 1;
	          if (needle >= startRange && needle <= endRange) {
	            return (index < (row.length + 1) ? row[index - 1] : error.ref);
	          }
	        }
	      } else {
	        if (row[0].toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
	          return (index < (row.length + 1) ? row[index - 1] : error.ref);
	        }
	      }
	    }
	  }
	  return error.na;
	};
	
	exports.HLOOKUP = function (needle, table, index, rangeLookup) {
	  if (process && process.env && process.env.NODE_ENV === 'compile') {
	    return 0;
	  }
	  
	  if (!needle || !table || !index) {
	    return error.na;
	  }
	
	  rangeLookup = rangeLookup || false;
	
	  var transposedTable = utils.transpose(table);
	
	  for (var i = 0; i < transposedTable.length; i++) {
	    var row = transposedTable[i];
	    if ((!rangeLookup && row[0] === needle) ||
	      ((row[0] === needle) ||
	        (rangeLookup && typeof row[0] === "string" && row[0].toLowerCase().indexOf(needle.toLowerCase()) !== -1))) {
	      return (index < (row.length + 1) ? row[index - 1] : error.ref);
	    }
	  }
	
	  return error.na;
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = func;
	var SYMBOL = exports.SYMBOL = '>';
	
	function func(exp1, exp2) {
	  return exp1 > exp2;
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = func;
	var SYMBOL = exports.SYMBOL = '>=';
	
	function func(exp1, exp2) {
	  return exp1 >= exp2;
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = func;
	var SYMBOL = exports.SYMBOL = '<';
	
	function func(exp1, exp2) {
	  return exp1 < exp2;
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = func;
	var SYMBOL = exports.SYMBOL = '<=';
	
	function func(exp1, exp2) {
	  return exp1 <= exp2;
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SYMBOL = undefined;
	exports.default = func;
	
	var _number = __webpack_require__(6);
	
	var _error = __webpack_require__(7);
	
	var _decimal = __webpack_require__(8);
	
	var _decimal2 = _interopRequireDefault(_decimal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SYMBOL = exports.SYMBOL = '-';
	
	function func(first) {
	  try {
	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }
	
	    var result = rest.reduce(function (acc, value) {
	      return new _decimal2.default(acc).minus(new _decimal2.default(value)).toNumber();
	    }, first);
	
	    if (isNaN(result)) {
	      throw Error(_error.ERROR_VALUE);
	    }
	
	    return result;
	  } catch (error) {
	    throw Error(_error.ERROR_VALUE);
	  }
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SYMBOL = undefined;
	exports.default = func;
	
	var _number = __webpack_require__(6);
	
	var _error = __webpack_require__(7);
	
	var _decimal = __webpack_require__(8);
	
	var _decimal2 = _interopRequireDefault(_decimal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SYMBOL = exports.SYMBOL = '*';
	
	function func(first) {
	  try {
	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }
	
	    var result = rest.reduce(function (acc, value) {
	      return new _decimal2.default(acc).mul(new _decimal2.default(value)).toNumber();
	    }, first);
	
	    if (isNaN(result)) {
	      throw Error(_error.ERROR_VALUE);
	    }
	
	    return result;
	  } catch (error) {
	    throw Error(_error.ERROR_VALUE);
	  }
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = func;
	var SYMBOL = exports.SYMBOL = '<>';
	
	function func(exp1, exp2) {
	  return exp1 !== exp2;
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SYMBOL = undefined;
	exports.default = func;
	
	var _number = __webpack_require__(6);
	
	var _error = __webpack_require__(7);
	
	var _decimal = __webpack_require__(8);
	
	var _decimal2 = _interopRequireDefault(_decimal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SYMBOL = exports.SYMBOL = '^';
	
	function func(exp1, exp2) {
	  if (!Number.isInteger((0, _number.toNumber)(exp2))) {
	    throw Error(_error.ERROR_VALUE);
	  }
	
	  var result = new _decimal2.default((0, _number.toNumber)(exp1)).toPower((0, _number.toNumber)(exp2)).toNumber();
	  if (isNaN(result)) {
	    throw Error(_error.ERROR_VALUE);
	  }
	
	  return result;
	};
	
	func.SYMBOL = SYMBOL;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	/* parser generated by jison 0.4.17 */
	/*
	  Returns a Parser object of the following structure:
	
	  Parser: {
	    yy: {}
	  }
	
	  Parser.prototype: {
	    yy: {},
	    trace: function(),
	    symbols_: {associative list: name ==> number},
	    terminals_: {associative list: number ==> name},
	    productions_: [...],
	    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
	    table: [...],
	    defaultActions: {...},
	    parseError: function(str, hash),
	    parse: function(input),
	
	    lexer: {
	        EOF: 1,
	        parseError: function(str, hash),
	        setInput: function(input),
	        input: function(),
	        unput: function(str),
	        more: function(),
	        less: function(n),
	        pastInput: function(),
	        upcomingInput: function(),
	        showPosition: function(),
	        test_match: function(regex_match_array, rule_index),
	        next: function(),
	        lex: function(),
	        begin: function(condition),
	        popState: function(),
	        _currentRules: function(),
	        topState: function(),
	        pushState: function(condition),
	
	        options: {
	            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
	            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
	            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
	        },
	
	        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
	        rules: [...],
	        conditions: {associative list: name ==> set},
	    }
	  }
	
	
	  token location info (@$, _$, etc.): {
	    first_line: n,
	    last_line: n,
	    first_column: n,
	    last_column: n,
	    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
	  }
	
	
	  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
	    text:        (matched text)
	    token:       (the produced terminal token, if any)
	    line:        (yylineno)
	  }
	  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
	    loc:         (yylloc)
	    expected:    (string describing the set of expected tokens)
	    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
	  }
	*/
	var parser = function () {
	    var o = function o(k, v, _o, l) {
	        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
	    },
	        $V0 = [1, 5],
	        $V1 = [1, 8],
	        $V2 = [1, 6],
	        $V3 = [1, 7],
	        $V4 = [1, 9],
	        $V5 = [1, 10],
	        $V6 = [1, 11],
	        $V7 = [1, 19],
	        $V8 = [1, 20],
	        $V9 = [1, 21],
	        $Va = [1, 22],
	        $Vb = [1, 17],
	        $Vc = [1, 18],
	        $Vd = [1, 23],
	        $Ve = [1, 25],
	        $Vf = [1, 26],
	        $Vg = [1, 27],
	        $Vh = [1, 28],
	        $Vi = [1, 29],
	        $Vj = [1, 30],
	        $Vk = [1, 31],
	        $Vl = [1, 32],
	        $Vm = [1, 33],
	        $Vn = [1, 34],
	        $Vo = [5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 35, 36],
	        $Vp = [5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 35, 36, 38],
	        $Vq = [5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 35, 36, 40],
	        $Vr = [5, 10, 11, 13, 14, 15, 16, 17, 35, 36],
	        $Vs = [5, 10, 13, 14, 15, 16, 35, 36],
	        $Vt = [5, 10, 11, 13, 14, 15, 16, 17, 18, 19, 35, 36],
	        $Vu = [13, 35, 36];
	    var parser = { trace: function trace() {},
	        yy: {},
	        symbols_: { "error": 2, "expressions": 3, "expression": 4, "EOF": 5, "variableSequence": 6, "number": 7, "STRING": 8, "&": 9, "=": 10, "+": 11, "(": 12, ")": 13, "<": 14, ">": 15, "NOT": 16, "-": 17, "*": 18, "/": 19, "^": 20, "FUNCTION": 21, "expseq": 22, "ARRAYCONSTANT": 23, "ARRAY": 24, "cell": 25, "refCell": 26, "range": 27, "refRange": 28, "ABSOLUTE_CELL": 29, "RELATIVE_CELL": 30, "MIXED_CELL": 31, "REFSHEET": 32, "!": 33, ":": 34, ";": 35, ",": 36, "VARIABLE": 37, "DECIMAL": 38, "NUMBER": 39, "%": 40, "ERROR": 41, "$accept": 0, "$end": 1 },
	        terminals_: { 5: "EOF", 8: "STRING", 9: "&", 10: "=", 11: "+", 12: "(", 13: ")", 14: "<", 15: ">", 16: "NOT", 17: "-", 18: "*", 19: "/", 20: "^", 21: "FUNCTION", 23: "ARRAYCONSTANT", 24: "ARRAY", 29: "ABSOLUTE_CELL", 30: "RELATIVE_CELL", 31: "MIXED_CELL", 32: "REFSHEET", 33: "!", 34: ":", 35: ";", 36: ",", 37: "VARIABLE", 38: "DECIMAL", 39: "NUMBER", 40: "%", 41: "ERROR" },
	        productions_: [0, [3, 2], [4, 1], [4, 1], [4, 1], [4, 3], [4, 3], [4, 3], [4, 3], [4, 4], [4, 4], [4, 4], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 2], [4, 2], [4, 3], [4, 4], [4, 1], [4, 1], [4, 1], [4, 1], [4, 1], [4, 1], [4, 1], [4, 2], [25, 1], [25, 1], [25, 1], [26, 3], [26, 3], [26, 3], [27, 3], [27, 3], [27, 3], [27, 3], [27, 3], [27, 3], [27, 3], [27, 3], [27, 3], [28, 5], [28, 5], [28, 5], [28, 5], [28, 5], [28, 5], [28, 5], [28, 5], [28, 5], [22, 1], [22, 3], [22, 3], [6, 1], [6, 3], [7, 1], [7, 3], [7, 2], [2, 1]],
	        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
	            /* this == yyval */
	
	            var $0 = $$.length - 1;
	            switch (yystate) {
	                case 1:
	
	                    return $$[$0 - 1];
	
	                    break;
	                case 2:
	
	                    this.$ = yy.callVariable($$[$0][0]);
	
	                    break;
	                case 3:
	
	                    this.$ = yy.toNumber($$[$0]);
	
	                    break;
	                case 4:
	
	                    this.$ = yy.trimEdges($$[$0]);
	
	                    break;
	                case 5:
	
	                    this.$ = yy.evaluateByOperator('&', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 6:
	
	                    this.$ = yy.evaluateByOperator('=', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 7:
	
	                    this.$ = yy.evaluateByOperator('+', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 8:
	
	                    this.$ = $$[$0 - 1];
	
	                    break;
	                case 9:
	
	                    this.$ = yy.evaluateByOperator('<=', [$$[$0 - 3], $$[$0]]);
	
	                    break;
	                case 10:
	
	                    this.$ = yy.evaluateByOperator('>=', [$$[$0 - 3], $$[$0]]);
	
	                    break;
	                case 11:
	
	                    this.$ = yy.evaluateByOperator('<>', [$$[$0 - 3], $$[$0]]);
	
	                    break;
	                case 12:
	
	                    this.$ = yy.evaluateByOperator('NOT', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 13:
	
	                    this.$ = yy.evaluateByOperator('>', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 14:
	
	                    this.$ = yy.evaluateByOperator('<', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 15:
	
	                    this.$ = yy.evaluateByOperator('-', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 16:
	
	                    this.$ = yy.evaluateByOperator('*', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 17:
	
	                    this.$ = yy.evaluateByOperator('/', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 18:
	
	                    this.$ = yy.evaluateByOperator('^', [$$[$0 - 2], $$[$0]]);
	
	                    break;
	                case 19:
	
	                    var n1 = yy.invertNumber($$[$0]);
	
	                    this.$ = n1;
	
	                    if (isNaN(this.$)) {
	                        this.$ = 0;
	                    }
	
	                    break;
	                case 20:
	
	                    var n1 = yy.toNumber($$[$0]);
	
	                    this.$ = n1;
	
	                    if (isNaN(this.$)) {
	                        this.$ = 0;
	                    }
	
	                    break;
	                case 21:
	
	                    this.$ = yy.callFunction($$[$0 - 2]);
	
	                    break;
	                case 22:
	
	                    this.$ = yy.callFunction($$[$0 - 3], $$[$0 - 1]);
	
	                    break;
	                case 23:
	
	                    var result = [];
	
	                    var textInArray = yytext.replace('{', '').replace('}', '');
	
	                    var arr = textInArray.split(';');
	                    if (arr.length <= 1) {
	                        var arr = eval("[[" + arr + "]]");
	                        arr.forEach(function (item) {
	                            result.push(item);
	                        });
	                    } else {
	                        for (var i = 0; i < arr.length; i++) {
	                            result.push(eval("[" + arr[i] + "]"));
	                        }
	                    }
	
	                    this.$ = result;
	
	                    break;
	                case 24:
	
	                    var result = [];
	                    var arr = eval("[" + yytext + "]");
	
	                    arr.forEach(function (item) {
	                        result.push(item);
	                    });
	                    this.$ = result;
	
	                    break;
	                case 31:case 32:case 33:
	
	                    this.$ = yy.cellValue($$[$0]);
	
	                    break;
	                case 34:case 35:
	
	                    this.$ = yy.cellValue($$[$0], $$[$0 - 2]);
	
	                    break;
	                case 36:
	
	                    this.$ = yy.cellValue($$[$0], $$[$0 - 2]);
	
	                    break;
	                case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:
	
	                    this.$ = yy.rangeValue($$[$0 - 2], $$[$0]);
	
	                    break;
	                case 46:case 47:case 48:case 49:case 50:case 51:case 52:case 53:case 54:
	
	                    this.$ = yy.rangeValue($$[$0 - 2], $$[$0], $$[$0 - 4]);
	
	                    break;
	                case 55:case 58:
	
	                    this.$ = [$$[$0]];
	
	                    break;
	                case 56:case 57:
	
	                    $$[$0 - 2].push($$[$0]);
	                    this.$ = $$[$0 - 2];
	
	                    break;
	                case 59:
	
	                    this.$ = Array.isArray($$[$0 - 2]) ? $$[$0 - 2] : [$$[$0 - 2]];
	                    this.$.push($$[$0]);
	
	                    break;
	                case 60:
	
	                    this.$ = $$[$0];
	
	                    break;
	                case 61:
	
	                    this.$ = ($$[$0 - 2] + '.' + $$[$0]) * 1;
	
	                    break;
	                case 62:
	
	                    this.$ = $$[$0 - 1] * 0.01;
	
	                    break;
	                case 63:
	
	                    this.$ = yy.throwError($$[$0]);
	
	                    break;
	            }
	        },
	        table: [{ 2: 16, 3: 1, 4: 2, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 1: [3] }, { 5: [1, 24], 9: $Ve, 10: $Vf, 11: $Vg, 14: $Vh, 15: $Vi, 16: $Vj, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }, o($Vo, [2, 2], { 38: [1, 35] }), o($Vo, [2, 3], { 40: [1, 36] }), o($Vo, [2, 4]), { 2: 16, 4: 37, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 38, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 39, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 12: [1, 40] }, o($Vo, [2, 23]), o($Vo, [2, 24]), o($Vo, [2, 25]), o($Vo, [2, 26]), o($Vo, [2, 27]), o($Vo, [2, 28]), o($Vo, [2, 29], { 2: 41, 41: $Vd }), o($Vp, [2, 58]), o($Vq, [2, 60], { 38: [1, 42] }), o($Vo, [2, 31], { 34: [1, 43] }), o($Vo, [2, 32], { 34: [1, 44] }), o($Vo, [2, 33], { 34: [1, 45] }), { 33: [1, 46] }, o([5, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 35, 36, 41], [2, 63]), { 1: [2, 1] }, { 2: 16, 4: 47, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 48, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 49, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 52, 6: 3, 7: 4, 8: $V0, 10: [1, 50], 11: $V1, 12: $V2, 15: [1, 51], 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 54, 6: 3, 7: 4, 8: $V0, 10: [1, 53], 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 55, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 56, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 57, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 58, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 59, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 37: [1, 60] }, o($Vq, [2, 62]), { 9: $Ve, 10: $Vf, 11: $Vg, 13: [1, 61], 14: $Vh, 15: $Vi, 16: $Vj, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }, o($Vr, [2, 19], { 9: $Ve, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vr, [2, 20], { 9: $Ve, 18: $Vl, 19: $Vm, 20: $Vn }), { 2: 16, 4: 64, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 13: [1, 62], 17: $V3, 21: $V4, 22: 63, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, o($Vo, [2, 30]), { 39: [1, 65] }, { 29: [1, 66], 30: [1, 67], 31: [1, 68] }, { 29: [1, 69], 30: [1, 70], 31: [1, 71] }, { 29: [1, 72], 30: [1, 73], 31: [1, 74] }, { 29: [1, 75], 30: [1, 76], 31: [1, 77] }, o($Vo, [2, 5]), o([5, 10, 13, 35, 36], [2, 6], { 9: $Ve, 11: $Vg, 14: $Vh, 15: $Vi, 16: $Vj, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vr, [2, 7], { 9: $Ve, 18: $Vl, 19: $Vm, 20: $Vn }), { 2: 16, 4: 78, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 79, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, o($Vs, [2, 14], { 9: $Ve, 11: $Vg, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), { 2: 16, 4: 80, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, o($Vs, [2, 13], { 9: $Ve, 11: $Vg, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o([5, 10, 13, 16, 35, 36], [2, 12], { 9: $Ve, 11: $Vg, 14: $Vh, 15: $Vi, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vr, [2, 15], { 9: $Ve, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vt, [2, 16], { 9: $Ve, 20: $Vn }), o($Vt, [2, 17], { 9: $Ve, 20: $Vn }), o([5, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 35, 36], [2, 18], { 9: $Ve }), o($Vp, [2, 59]), o($Vo, [2, 8]), o($Vo, [2, 21]), { 13: [1, 81], 35: [1, 82], 36: [1, 83] }, o($Vu, [2, 55], { 9: $Ve, 10: $Vf, 11: $Vg, 14: $Vh, 15: $Vi, 16: $Vj, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vq, [2, 61]), o($Vo, [2, 37]), o($Vo, [2, 38]), o($Vo, [2, 39]), o($Vo, [2, 40]), o($Vo, [2, 41]), o($Vo, [2, 42]), o($Vo, [2, 43]), o($Vo, [2, 44]), o($Vo, [2, 45]), o($Vo, [2, 34], { 34: [1, 84] }), o($Vo, [2, 35], { 34: [1, 85] }), o($Vo, [2, 36], { 34: [1, 86] }), o($Vs, [2, 9], { 9: $Ve, 11: $Vg, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vs, [2, 11], { 9: $Ve, 11: $Vg, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vs, [2, 10], { 9: $Ve, 11: $Vg, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vo, [2, 22]), { 2: 16, 4: 87, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 2: 16, 4: 88, 6: 3, 7: 4, 8: $V0, 11: $V1, 12: $V2, 17: $V3, 21: $V4, 23: $V5, 24: $V6, 25: 12, 26: 13, 27: 14, 28: 15, 29: $V7, 30: $V8, 31: $V9, 32: $Va, 37: $Vb, 39: $Vc, 41: $Vd }, { 29: [1, 89], 30: [1, 90], 31: [1, 91] }, { 29: [1, 92], 30: [1, 93], 31: [1, 94] }, { 29: [1, 95], 30: [1, 96], 31: [1, 97] }, o($Vu, [2, 56], { 9: $Ve, 10: $Vf, 11: $Vg, 14: $Vh, 15: $Vi, 16: $Vj, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vu, [2, 57], { 9: $Ve, 10: $Vf, 11: $Vg, 14: $Vh, 15: $Vi, 16: $Vj, 17: $Vk, 18: $Vl, 19: $Vm, 20: $Vn }), o($Vo, [2, 46]), o($Vo, [2, 47]), o($Vo, [2, 48]), o($Vo, [2, 49]), o($Vo, [2, 50]), o($Vo, [2, 51]), o($Vo, [2, 52]), o($Vo, [2, 53]), o($Vo, [2, 54])],
	        defaultActions: { 24: [2, 1] },
	        parseError: function parseError(str, hash) {
	            if (hash.recoverable) {
	                this.trace(str);
	            } else {
	                var _parseError = function _parseError(msg, hash) {
	                    this.message = msg;
	                    this.hash = hash;
	                };
	
	                _parseError.prototype = Error;
	
	                throw new _parseError(str, hash);
	            }
	        },
	        parse: function parse(input) {
	            var self = this,
	                stack = [0],
	                tstack = [],
	                // token stack
	            vstack = [null],
	                // semantic value stack
	            lstack = [],
	                // location stack
	            table = this.table,
	                yytext = '',
	                yylineno = 0,
	                yyleng = 0,
	                recovering = 0,
	                TERROR = 2,
	                EOF = 1;
	
	            var args = lstack.slice.call(arguments, 1);
	
	            //this.reductionCount = this.shiftCount = 0;
	
	            var lexer = Object.create(this.lexer);
	            var sharedState = { yy: {} };
	            // copy state
	            for (var k in this.yy) {
	                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
	                    sharedState.yy[k] = this.yy[k];
	                }
	            }
	
	            lexer.setInput(input, sharedState.yy);
	            sharedState.yy.lexer = lexer;
	            sharedState.yy.parser = this;
	            if (typeof lexer.yylloc == 'undefined') {
	                lexer.yylloc = {};
	            }
	            var yyloc = lexer.yylloc;
	            lstack.push(yyloc);
	
	            var ranges = lexer.options && lexer.options.ranges;
	
	            if (typeof sharedState.yy.parseError === 'function') {
	                this.parseError = sharedState.yy.parseError;
	            } else {
	                this.parseError = Object.getPrototypeOf(this).parseError;
	            }
	
	            function popStack(n) {
	                stack.length = stack.length - 2 * n;
	                vstack.length = vstack.length - n;
	                lstack.length = lstack.length - n;
	            }
	
	            _token_stack: var lex = function lex() {
	                var token;
	                token = lexer.lex() || EOF;
	                // if token isn't its numeric value, convert
	                if (typeof token !== 'number') {
	                    token = self.symbols_[token] || token;
	                }
	                return token;
	            };
	
	            var symbol,
	                preErrorSymbol,
	                state,
	                action,
	                a,
	                r,
	                yyval = {},
	                p,
	                len,
	                newState,
	                expected;
	            while (true) {
	                // retreive state number from top of stack
	                state = stack[stack.length - 1];
	
	                // use default actions if available
	                if (this.defaultActions[state]) {
	                    action = this.defaultActions[state];
	                } else {
	                    if (symbol === null || typeof symbol == 'undefined') {
	                        symbol = lex();
	                    }
	                    // read action for current state and first input
	                    action = table[state] && table[state][symbol];
	                }
	
	                _handle_error:
	                // handle parse error
	                if (typeof action === 'undefined' || !action.length || !action[0]) {
	
	                    // Return the rule stack depth where the nearest error rule can be found.
	                    // Return FALSE when no error recovery rule was found.
	                    var locateNearestErrorRecoveryRule = function locateNearestErrorRecoveryRule(state) {
	                        var stack_probe = stack.length - 1;
	                        var depth = 0;
	
	                        // try to recover from error
	                        for (;;) {
	                            // check for error recovery rule in this state
	                            if (TERROR.toString() in table[state]) {
	                                return depth;
	                            }
	                            if (state === 0 || stack_probe < 2) {
	                                return false; // No suitable error recovery rule available.
	                            }
	                            stack_probe -= 2; // popStack(1): [symbol, action]
	                            state = stack[stack_probe];
	                            ++depth;
	                        }
	                    };
	
	                    var error_rule_depth;
	                    var errStr = '';
	
	                    if (!recovering) {
	                        // first see if there's any chance at hitting an error recovery rule:
	                        error_rule_depth = locateNearestErrorRecoveryRule(state);
	
	                        // Report error
	                        expected = [];
	                        for (p in table[state]) {
	                            if (this.terminals_[p] && p > TERROR) {
	                                expected.push("'" + this.terminals_[p] + "'");
	                            }
	                        }
	                        if (lexer.showPosition) {
	                            errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                        } else {
	                            errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	                        }
	                        this.parseError(errStr, {
	                            text: lexer.match,
	                            token: this.terminals_[symbol] || symbol,
	                            line: lexer.yylineno,
	                            loc: yyloc,
	                            expected: expected,
	                            recoverable: error_rule_depth !== false
	                        });
	                    } else if (preErrorSymbol !== EOF) {
	                        error_rule_depth = locateNearestErrorRecoveryRule(state);
	                    }
	
	                    // just recovered from another error
	                    if (recovering == 3) {
	                        if (symbol === EOF || preErrorSymbol === EOF) {
	                            throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
	                        }
	
	                        // discard current lookahead and grab another
	                        yyleng = lexer.yyleng;
	                        yytext = lexer.yytext;
	                        yylineno = lexer.yylineno;
	                        yyloc = lexer.yylloc;
	                        symbol = lex();
	                    }
	
	                    // try to recover from error
	                    if (error_rule_depth === false) {
	                        throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
	                    }
	                    popStack(error_rule_depth);
	
	                    preErrorSymbol = symbol == TERROR ? null : symbol; // save the lookahead token
	                    symbol = TERROR; // insert generic error symbol as new lookahead
	                    state = stack[stack.length - 1];
	                    action = table[state] && table[state][TERROR];
	                    recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
	                }
	
	                // this shouldn't happen, unless resolve defaults are off
	                if (action[0] instanceof Array && action.length > 1) {
	                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
	                }
	
	                switch (action[0]) {
	                    case 1:
	                        // shift
	                        //this.shiftCount++;
	
	                        stack.push(symbol);
	                        vstack.push(lexer.yytext);
	                        lstack.push(lexer.yylloc);
	                        stack.push(action[1]); // push state
	                        symbol = null;
	                        if (!preErrorSymbol) {
	                            // normal execution/no error
	                            yyleng = lexer.yyleng;
	                            yytext = lexer.yytext;
	                            yylineno = lexer.yylineno;
	                            yyloc = lexer.yylloc;
	                            if (recovering > 0) {
	                                recovering--;
	                            }
	                        } else {
	                            // error just occurred, resume old lookahead f/ before error
	                            symbol = preErrorSymbol;
	                            preErrorSymbol = null;
	                        }
	                        break;
	
	                    case 2:
	                        // reduce
	                        //this.reductionCount++;
	
	                        len = this.productions_[action[1]][1];
	
	                        // perform semantic action
	                        yyval.$ = vstack[vstack.length - len]; // default to $$ = $1
	                        // default location, uses first token for firsts, last for lasts
	                        yyval._$ = {
	                            first_line: lstack[lstack.length - (len || 1)].first_line,
	                            last_line: lstack[lstack.length - 1].last_line,
	                            first_column: lstack[lstack.length - (len || 1)].first_column,
	                            last_column: lstack[lstack.length - 1].last_column
	                        };
	                        if (ranges) {
	                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	                        }
	                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
	
	                        if (typeof r !== 'undefined') {
	                            return r;
	                        }
	
	                        // pop off stack
	                        if (len) {
	                            stack = stack.slice(0, -1 * len * 2);
	                            vstack = vstack.slice(0, -1 * len);
	                            lstack = lstack.slice(0, -1 * len);
	                        }
	
	                        stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)
	                        vstack.push(yyval.$);
	                        lstack.push(yyval._$);
	                        // goto new state = table[STATE][NONTERMINAL]
	                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	                        stack.push(newState);
	                        break;
	
	                    case 3:
	                        // accept
	                        return true;
	                }
	            }
	
	            return true;
	        } };
	
	    /* generated by jison-lex 0.3.4 */
	    var lexer = function () {
	        var lexer = {
	
	            EOF: 1,
	
	            parseError: function parseError(str, hash) {
	                if (this.yy.parser) {
	                    this.yy.parser.parseError(str, hash);
	                } else {
	                    throw new Error(str);
	                }
	            },
	
	            // resets the lexer, sets new input
	            setInput: function setInput(input, yy) {
	                this.yy = yy || this.yy || {};
	                this._input = input;
	                this._more = this._backtrack = this.done = false;
	                this.yylineno = this.yyleng = 0;
	                this.yytext = this.matched = this.match = '';
	                this.conditionStack = ['INITIAL'];
	                this.yylloc = {
	                    first_line: 1,
	                    first_column: 0,
	                    last_line: 1,
	                    last_column: 0
	                };
	                if (this.options.ranges) {
	                    this.yylloc.range = [0, 0];
	                }
	                this.offset = 0;
	                return this;
	            },
	
	            // consumes and returns one char from the input
	            input: function input() {
	                var ch = this._input[0];
	                this.yytext += ch;
	                this.yyleng++;
	                this.offset++;
	                this.match += ch;
	                this.matched += ch;
	                var lines = ch.match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno++;
	                    this.yylloc.last_line++;
	                } else {
	                    this.yylloc.last_column++;
	                }
	                if (this.options.ranges) {
	                    this.yylloc.range[1]++;
	                }
	
	                this._input = this._input.slice(1);
	                return ch;
	            },
	
	            // unshifts one char (or a string) into the input
	            unput: function unput(ch) {
	                var len = ch.length;
	                var lines = ch.split(/(?:\r\n?|\n)/g);
	
	                this._input = ch + this._input;
	                this.yytext = this.yytext.substr(0, this.yytext.length - len);
	                //this.yyleng -= len;
	                this.offset -= len;
	                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	                this.match = this.match.substr(0, this.match.length - 1);
	                this.matched = this.matched.substr(0, this.matched.length - 1);
	
	                if (lines.length - 1) {
	                    this.yylineno -= lines.length - 1;
	                }
	                var r = this.yylloc.range;
	
	                this.yylloc = {
	                    first_line: this.yylloc.first_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.first_column,
	                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	                };
	
	                if (this.options.ranges) {
	                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	                }
	                this.yyleng = this.yytext.length;
	                return this;
	            },
	
	            // When called from action, caches matched text and appends it on next action
	            more: function more() {
	                this._more = true;
	                return this;
	            },
	
	            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
	            reject: function reject() {
	                if (this.options.backtrack_lexer) {
	                    this._backtrack = true;
	                } else {
	                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
	                        text: "",
	                        token: null,
	                        line: this.yylineno
	                    });
	                }
	                return this;
	            },
	
	            // retain first n characters of the match
	            less: function less(n) {
	                this.unput(this.match.slice(n));
	            },
	
	            // displays already matched input, i.e. for error messages
	            pastInput: function pastInput() {
	                var past = this.matched.substr(0, this.matched.length - this.match.length);
	                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
	            },
	
	            // displays upcoming input, i.e. for error messages
	            upcomingInput: function upcomingInput() {
	                var next = this.match;
	                if (next.length < 20) {
	                    next += this._input.substr(0, 20 - next.length);
	                }
	                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	            },
	
	            // displays the character position where the lexing error occurred, i.e. for error messages
	            showPosition: function showPosition() {
	                var pre = this.pastInput();
	                var c = new Array(pre.length + 1).join("-");
	                return pre + this.upcomingInput() + "\n" + c + "^";
	            },
	
	            // test the lexed token: return FALSE when not a match, otherwise return token
	            test_match: function test_match(match, indexed_rule) {
	                var token, lines, backup;
	
	                if (this.options.backtrack_lexer) {
	                    // save context
	                    backup = {
	                        yylineno: this.yylineno,
	                        yylloc: {
	                            first_line: this.yylloc.first_line,
	                            last_line: this.last_line,
	                            first_column: this.yylloc.first_column,
	                            last_column: this.yylloc.last_column
	                        },
	                        yytext: this.yytext,
	                        match: this.match,
	                        matches: this.matches,
	                        matched: this.matched,
	                        yyleng: this.yyleng,
	                        offset: this.offset,
	                        _more: this._more,
	                        _input: this._input,
	                        yy: this.yy,
	                        conditionStack: this.conditionStack.slice(0),
	                        done: this.done
	                    };
	                    if (this.options.ranges) {
	                        backup.yylloc.range = this.yylloc.range.slice(0);
	                    }
	                }
	
	                lines = match[0].match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno += lines.length;
	                }
	                this.yylloc = {
	                    first_line: this.yylloc.last_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.last_column,
	                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
	                };
	                this.yytext += match[0];
	                this.match += match[0];
	                this.matches = match;
	                this.yyleng = this.yytext.length;
	                if (this.options.ranges) {
	                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
	                }
	                this._more = false;
	                this._backtrack = false;
	                this._input = this._input.slice(match[0].length);
	                this.matched += match[0];
	                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
	                if (this.done && this._input) {
	                    this.done = false;
	                }
	                if (token) {
	                    return token;
	                } else if (this._backtrack) {
	                    // recover context
	                    for (var k in backup) {
	                        this[k] = backup[k];
	                    }
	                    return false; // rule action called reject() implying the next rule should be tested instead.
	                }
	                return false;
	            },
	
	            // return next match in input
	            next: function next() {
	                if (this.done) {
	                    return this.EOF;
	                }
	                if (!this._input) {
	                    this.done = true;
	                }
	
	                var token, match, tempMatch, index;
	                if (!this._more) {
	                    this.yytext = '';
	                    this.match = '';
	                }
	                var rules = this._currentRules();
	                for (var i = 0; i < rules.length; i++) {
	                    tempMatch = this._input.match(this.rules[rules[i]]);
	                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                        match = tempMatch;
	                        index = i;
	                        if (this.options.backtrack_lexer) {
	                            token = this.test_match(tempMatch, rules[i]);
	                            if (token !== false) {
	                                return token;
	                            } else if (this._backtrack) {
	                                match = false;
	                                continue; // rule action called reject() implying a rule MISmatch.
	                            } else {
	                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
	                                return false;
	                            }
	                        } else if (!this.options.flex) {
	                            break;
	                        }
	                    }
	                }
	                if (match) {
	                    token = this.test_match(match, rules[index]);
	                    if (token !== false) {
	                        return token;
	                    }
	                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
	                    return false;
	                }
	                if (this._input === "") {
	                    return this.EOF;
	                } else {
	                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
	                        text: "",
	                        token: null,
	                        line: this.yylineno
	                    });
	                }
	            },
	
	            // return next match that has a token
	            lex: function lex() {
	                var r = this.next();
	                if (r) {
	                    return r;
	                } else {
	                    return this.lex();
	                }
	            },
	
	            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
	            begin: function begin(condition) {
	                this.conditionStack.push(condition);
	            },
	
	            // pop the previously active lexer condition state off the condition stack
	            popState: function popState() {
	                var n = this.conditionStack.length - 1;
	                if (n > 0) {
	                    return this.conditionStack.pop();
	                } else {
	                    return this.conditionStack[0];
	                }
	            },
	
	            // produce the lexer rule set which is active for the currently active lexer condition state
	            _currentRules: function _currentRules() {
	                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
	                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	                } else {
	                    return this.conditions["INITIAL"].rules;
	                }
	            },
	
	            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
	            topState: function topState(n) {
	                n = this.conditionStack.length - 1 - Math.abs(n || 0);
	                if (n >= 0) {
	                    return this.conditionStack[n];
	                } else {
	                    return "INITIAL";
	                }
	            },
	
	            // alias for begin(condition)
	            pushState: function pushState(condition) {
	                this.begin(condition);
	            },
	
	            // return the number of states currently on the stack
	            stateStackSize: function stateStackSize() {
	                return this.conditionStack.length;
	            },
	            options: {},
	            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
	                var YYSTATE = YY_START;
	                switch ($avoiding_name_collisions) {
	                    case 0:
	                        break;
	                    case 1:
	                        return 8;
	                        break;
	                    case 2:
	                        return 8;
	                        break;
	                    case 3:
	                        return 21;
	                        break;
	                    case 4:
	                        return 41;
	                        break;
	                    case 5:
	                        return 29;
	                        break;
	                    case 6:
	                        return 31;
	                        break;
	                    case 7:
	                        return 31;
	                        break;
	                    case 8:
	                        return 30;
	                        break;
	                    case 9:
	                        return 32;
	                        break;
	                    case 10:
	                        return 21;
	                        break;
	                    case 11:
	                        return 37;
	                        break;
	                    case 12:
	                        return 37;
	                        break;
	                    case 13:
	                        return 39;
	                        break;
	                    case 14:
	                        return 24;
	                        break;
	                    case 15:
	                        return 23;
	                        break;
	                    case 16:
	                        return 9;
	                        break;
	                    case 17:
	                        return ' ';
	                        break;
	                    case 18:
	                        return 38;
	                        break;
	                    case 19:
	                        return 34;
	                        break;
	                    case 20:
	                        return 35;
	                        break;
	                    case 21:
	                        return 36;
	                        break;
	                    case 22:
	                        return 18;
	                        break;
	                    case 23:
	                        return 19;
	                        break;
	                    case 24:
	                        return 17;
	                        break;
	                    case 25:
	                        return 11;
	                        break;
	                    case 26:
	                        return 20;
	                        break;
	                    case 27:
	                        return 12;
	                        break;
	                    case 28:
	                        return 13;
	                        break;
	                    case 29:
	                        return 15;
	                        break;
	                    case 30:
	                        return 14;
	                        break;
	                    case 31:
	                        return 16;
	                        break;
	                    case 32:
	                        return '"';
	                        break;
	                    case 33:
	                        return "'";
	                        break;
	                    case 34:
	                        return "!";
	                        break;
	                    case 35:
	                        return 10;
	                        break;
	                    case 36:
	                        return 40;
	                        break;
	                    case 37:
	                        return '{';
	                        break;
	                    case 38:
	                        return '}';
	                        break;
	                    case 39:
	                        return '#';
	                        break;
	                    case 40:
	                        return 5;
	                        break;
	                }
	            },
	            rules: [/^(?:\s+)/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:[A-Za-z]{1,}[A-Za-z_0-9\.]+(?=[(]))/, /^(?:#[A-Z0-9\/]+(!|\?)?)/, /^(?:\$[A-Za-z]+\$[0-9]+)/, /^(?:\$[A-Za-z]+[0-9]+)/, /^(?:[A-Za-z]+\$[0-9]+)/, /^(?:[A-Za-z]+[0-9]+)/, /^(?:[A-Za-z_\.\d]+(?=[!]))/, /^(?:[A-Za-z\.]+(?=[(]))/, /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/, /^(?:[A-Za-z_]+)/, /^(?:[0-9]+)/, /^(?:\[([\w\,\;\s]*)?\])/, /^(?:\{([\w\,\;\"\.\s]*)?\})/, /^(?:&)/, /^(?: )/, /^(?:[.])/, /^(?::)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:\/)/, /^(?:-)/, /^(?:\+)/, /^(?:\^)/, /^(?:\()/, /^(?:\))/, /^(?:>)/, /^(?:<)/, /^(?:NOT\b)/, /^(?:")/, /^(?:')/, /^(?:!)/, /^(?:=)/, /^(?:%)/, /^(?:\{)/, /^(?:\})/, /^(?:[#])/, /^(?:$)/],
	            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], "inclusive": true } }
	        };
	        return lexer;
	    }();
	    parser.lexer = lexer;
	    function Parser() {
	        this.yy = {};
	    }
	    Parser.prototype = parser;parser.Parser = Parser;
	    return new Parser();
	}();
	
	if (true) {
	    exports.parser = parser;
	    exports.Parser = parser.Parser;
	    exports.parse = function () {
	        return parser.parse.apply(parser, arguments);
	    };
	    exports.main = function commonjsMain(args) {
	        if (!args[1]) {
	            console.log('Usage: ' + args[0] + ' FILE');
	            process.exit(1);
	        }
	        var source = __webpack_require__(43).readFileSync(__webpack_require__(44).normalize(args[1]), "utf8");
	        return exports.parser.parse(source);
	    };
	    if (typeof module !== 'undefined' && __webpack_require__.c[0] === module) {
	        exports.main(process.argv.slice(1));
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)(module)))

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.trimEdges = trimEdges;
	/**
	 * Trim value by cutting character starting from the beginning and ending at the same time.
	 *
	 * @param {String} string String to trimming.
	 * @param {Number} [margin=1] Number of character to cut.
	 * @returns {String}
	 */
	function trimEdges(string) {
	  var margin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	  string = string.substring(margin, string.length - margin);
	
	  return string;
	}

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.extractLabel = extractLabel;
	exports.toLabel = toLabel;
	exports.columnLabelToIndex = columnLabelToIndex;
	exports.columnIndexToLabel = columnIndexToLabel;
	exports.rowLabelToIndex = rowLabelToIndex;
	exports.rowIndexToLabel = rowIndexToLabel;
	var LABEL_EXTRACT_REGEXP = /^([$])?([A-Za-z]+)([$])?([0-9]+)$/;
	
	/**
	 * Extract cell coordinates.
	 *
	 * @param {String} label Cell coordinates (eq. 'A1', '$B6', '$N$98').
	 * @returns {Array} Returns an array of objects.
	 */
	function extractLabel(label) {
	  if (typeof label !== 'string' || !LABEL_EXTRACT_REGEXP.test(label)) {
	    return [];
	  }
	
	  var _label$toUpperCase$ma = label.toUpperCase().match(LABEL_EXTRACT_REGEXP),
	      _label$toUpperCase$ma2 = _slicedToArray(_label$toUpperCase$ma, 5),
	      columnAbs = _label$toUpperCase$ma2[1],
	      column = _label$toUpperCase$ma2[2],
	      rowAbs = _label$toUpperCase$ma2[3],
	      row = _label$toUpperCase$ma2[4];
	
	  return [{
	    index: rowLabelToIndex(row),
	    label: row,
	    isAbsolute: rowAbs === '$'
	  }, {
	    index: columnLabelToIndex(column),
	    label: column,
	    isAbsolute: columnAbs === '$'
	  }];
	}
	
	/**
	 * Convert row and column indexes into cell label.
	 *
	 * @param {Object} row Object with `index` and `isAbsolute` properties.
	 * @param {Object} column Object with `index` and `isAbsolute` properties.
	 * @returns {String} Returns cell label.
	 */
	function toLabel(row, column) {
	  var rowLabel = (row.isAbsolute ? '$' : '') + rowIndexToLabel(row.index);
	  var columnLabel = (column.isAbsolute ? '$' : '') + columnIndexToLabel(column.index);
	
	  return columnLabel + rowLabel;
	}
	
	var COLUMN_LABEL_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var COLUMN_LABEL_BASE_LENGTH = COLUMN_LABEL_BASE.length;
	
	/**
	 * Convert column label to index.
	 *
	 * @param {String} label Column label (eq. 'ABB', 'CNQ')
	 * @returns {Number} Returns -1 if label is not recognized otherwise proper column index.
	 */
	function columnLabelToIndex(label) {
	  var result = 0;
	
	  if (typeof label === 'string') {
	    label = label.toUpperCase();
	
	    for (var i = 0, j = label.length - 1; i < label.length; i += 1, j -= 1) {
	      result += Math.pow(COLUMN_LABEL_BASE_LENGTH, j) * (COLUMN_LABEL_BASE.indexOf(label[i]) + 1);
	    }
	  }
	  --result;
	
	  return result;
	}
	
	/**
	 * Convert column index to label.
	 *
	 * @param {Number} column Column index.
	 * @returns {String} Returns column label (eq. 'ABB', 'CNQ').
	 */
	function columnIndexToLabel(column) {
	  var result = '';
	
	  while (column >= 0) {
	    result = String.fromCharCode(column % COLUMN_LABEL_BASE_LENGTH + 97) + result;
	    column = Math.floor(column / COLUMN_LABEL_BASE_LENGTH) - 1;
	  }
	
	  return result.toUpperCase();
	}
	
	/**
	 * Convert row label to index.
	 *
	 * @param {String} label Row label (eq. '1', '5')
	 * @returns {Number} Returns -1 if label is not recognized otherwise proper row index.
	 */
	function rowLabelToIndex(label) {
	  var result = parseInt(label, 10);
	
	  if (isNaN(result)) {
	    result = -1;
	  } else {
	    result = Math.max(result - 1, -1);
	  }
	
	  return result;
	}
	
	/**
	 * Convert row index to label.
	 *
	 * @param {Number} row Row index.
	 * @returns {String} Returns row label (eq. '1', '7').
	 */
	function rowIndexToLabel(row) {
	  var result = '';
	
	  if (row >= 0) {
	    result = '' + (row + 1);
	  }
	
	  return result;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=formula-parser.js.map