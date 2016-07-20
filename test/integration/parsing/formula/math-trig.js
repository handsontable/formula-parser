import {Parser} from '../../../../src/parser';

describe('.parse() math-trig formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('ABS', () => {
    expect(parser.parse('ABS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ABS(-8)')).to.deep.equal({error: null, result: 8});
    expect(parser.parse('ABS(-8.89)')).to.deep.equal({error: null, result: 8.89});
    expect(parser.parse('ABS(8)')).to.deep.equal({error: null, result: 8});
  });

  it('ACOS', () => {
    expect(parser.parse('ACOS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ACOS(1)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('ACOS(-1)')).to.deep.equal({error: null, result: Math.PI});
  });

  it('ACOSH', () => {
    expect(parser.parse('ACOSH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ACOSH(1)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('ACOSH(-1)')).to.deep.equal({error: '#NUM!', result: null});
  });

  it('ACOT', () => {
    expect(parser.parse('ACOT()')).to.deep.eql({error: '#VALUE!', result: null});
    expect(parser.parse('ACOT(1)')).to.almost.eql({error: null, result: 0.7853981633974483});
    expect(parser.parse('ACOT(-1)')).to.almost.eql({error: null, result: -0.7853981633974483});
  });

  it('ACOTH', () => {
    expect(parser.parse('ACOTH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ACOTH(1)')).to.deep.equal({error: null, result: Infinity});
    expect(parser.parse('ACOTH(-1)')).to.deep.equal({error: null, result: -Infinity});
  });

  it('ADD', () => {
    expect(parser.parse('ADD()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('ADD(3)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('ADD(3, 5, 6, 7, 1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('ADD(3, 5)')).to.deep.equal({error: null, result: 8});
    expect(parser.parse('ADD(3.01, 5.02)')).to.deep.equal({error: null, result: 8.03});
    expect(parser.parse('ADD(3, -5)')).to.deep.equal({error: null, result: -2});
  });

  it('AGGREGATE', () => {
    parser.on('callRangeValue', (a, b, done) => {
      done([[1, 2, 3]]);
    });

    expect(parser.parse('AGGREGATE(1, 4, A1:C1)')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('AGGREGATE(6, 4, A1:C1)')).to.deep.equal({error: null, result: 6});
    expect(parser.parse('AGGREGATE(10, 4, A1:C1, 2)')).to.deep.equal({error: null, result: 1});
  });

  it('ARABIC', () => {
    expect(parser.parse('ARABIC()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ARABIC("ABC")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ARABIC("X")')).to.deep.equal({error: null, result: 10});
    expect(parser.parse('ARABIC("MXL")')).to.deep.equal({error: null, result: 1040});
  });

  it('ASIN', () => {
    expect(parser.parse('ASIN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ASIN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ASIN(0.5)')).to.almost.eql({error: null, result: 0.5235987755982989});
  });

  it('ASINH', () => {
    expect(parser.parse('ASINH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ASINH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ASINH(0.5)')).to.almost.eql({error: null, result: 0.48121182505960347});
  });

  it('ATAN', () => {
    expect(parser.parse('ATAN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ATAN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ATAN(0.5)')).to.almost.eql({error: null, result: 0.4636476090008061});
  });

  it('ATAN2', () => {
    expect(parser.parse('ATAN2()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ATAN2(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ATAN2("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ATAN2(1, 1)')).to.almost.eql({error: null, result: 0.7853981633974483});
  });

  it('ATANH', () => {
    expect(parser.parse('ATANH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ATANH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ATANH(1)')).to.deep.equal({error: null, result: Infinity});
  });

  it('BASE', () => {
    expect(parser.parse('BASE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BASE("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BASE(7)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BASE(7, 2)')).to.deep.equal({error: null, result: '111'});
    expect(parser.parse('BASE(7, 2, 8)')).to.deep.equal({error: null, result: '00000111'});
  });

  it('CEILING', () => {
    expect(parser.parse('CEILING()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CEILING("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CEILING(7.2)')).to.deep.equal({error: null, result: 8});
    expect(parser.parse('CEILING(7, 2, 8)')).to.deep.equal({error: null, result: 8});
    expect(parser.parse('CEILING(-4.3)')).to.deep.equal({error: null, result: -4});
    expect(parser.parse('CEILING(-1.234, 0.1)')).to.deep.equal({error: null, result: -1.2});
    expect(parser.parse('CEILING(-1.234, 0.1, "value")')).to.deep.equal({error: '#VALUE!', result: null});
  });

  it('COMBIN', () => {
    expect(parser.parse('COMBIN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COMBIN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COMBIN(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COMBIN(0, 0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COMBIN(1, 0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COMBIN(3, 1)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('COMBIN(3, 3)')).to.deep.equal({error: null, result: 1});
  });

  it('COMBINA', () => {
    expect(parser.parse('COMBINA()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COMBINA("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COMBINA(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COMBINA(0, 0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COMBINA(1, 0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COMBINA(3, 1)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('COMBINA(3, 3)')).to.deep.equal({error: null, result: 10});
  });

  it('COS', () => {
    expect(parser.parse('COS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COS("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COS(0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COS(1)')).to.almost.eql({error: null, result: 0.5403023058681398});
  });

  it('COSH', () => {
    expect(parser.parse('COSH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COSH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COSH(0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('COSH(1)')).to.almost.eql({error: null, result: 1.5430806348152437});
  });

  it('COT', () => {
    expect(parser.parse('COT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COT("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COT(0)')).to.deep.equal({error: null, result: Infinity});
    expect(parser.parse('COT(1)')).to.almost.eql({error: null, result: 0.6420926159343306});
    expect(parser.parse('COT(2)')).to.almost.eql({error: null, result: -0.45765755436028577});
  });

  it('COTH', () => {
    expect(parser.parse('COTH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COTH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COTH(0)')).to.deep.equal({error: null, result: Infinity});
    expect(parser.parse('COTH(1)')).to.almost.eql({error: null, result: 1.3130352854993312});
    expect(parser.parse('COTH(2)')).to.almost.eql({error: null, result: 1.0373147207275482});
  });

  it('CSC', () => {
    expect(parser.parse('CSC()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CSC("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CSC(0)')).to.deep.equal({error: null, result: Infinity});
    expect(parser.parse('CSC(1)')).to.almost.eql({error: null, result: 1.1883951057781212});
    expect(parser.parse('CSC(2)')).to.almost.eql({error: null, result: 1.0997501702946164});
  });

  it('CSCH', () => {
    expect(parser.parse('CSCH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CSCH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CSCH(0)')).to.deep.equal({error: null, result: Infinity});
    expect(parser.parse('CSCH(1)')).to.almost.eql({error: null, result: 0.8509181282393216});
    expect(parser.parse('CSCH(2)')).to.almost.eql({error: null, result: 0.27572056477178325});
  });

  it('DECIMAL', () => {
    expect(parser.parse('DECIMAL()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DECIMAL("value")')).to.deep.equal({error: null, result: NaN});
    expect(parser.parse('DECIMAL(1.3)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('DECIMAL("0", 2)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('DECIMAL("1010101", 2)')).to.deep.equal({error: null, result: 85});
    expect(parser.parse('DECIMAL("32b", 16)')).to.deep.equal({error: null, result: 811});
  });

  it('DEGREES', () => {
    expect(parser.parse('DEGREES()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DEGREES("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DEGREES(PI())')).to.deep.equal({error: null, result: 180});
    expect(parser.parse('DEGREES(PI() / 2)')).to.deep.equal({error: null, result: 90});
    expect(parser.parse('DEGREES(1.1)')).to.almost.eql({error: null, result: 63.02535746439057});
  });

  it('DIVIDE', () => {
    expect(parser.parse('DIVIDE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('DIVIDE("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('DIVIDE(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('DIVIDE(0, 0)')).to.deep.equal({error: '#DIV/0!', result: null});
    expect(parser.parse('DIVIDE(2, 0)')).to.deep.equal({error: '#DIV/0!', result: null});
    expect(parser.parse('DIVIDE(0, 2)')).to.deep.equal({error: null, result: 0});
  });

  it('EVEN', () => {
    expect(parser.parse('EVEN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('EVEN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('EVEN(1)')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('EVEN(-33)')).to.deep.equal({error: null, result: -34});
  });

  it('EQ', () => { // Equal
    expect(parser.parse('EQ()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('EQ("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('EQ(1, 1)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('EQ("foo", "foo")')).to.deep.equal({error: null, result: true});
    expect(parser.parse('EQ("bar", "foo")')).to.deep.equal({error: null, result: false});
    expect(parser.parse('EQ(12.2, 12.3)')).to.deep.equal({error: null, result: false});
  });

  it('FACT', () => {
    expect(parser.parse('FACT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('FACT("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('FACT(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('FACT(3)')).to.deep.equal({error: null, result: 6});
    expect(parser.parse('FACT(3.33)')).to.deep.equal({error: null, result: 6});
    expect(parser.parse('FACT(6)')).to.deep.equal({error: null, result: 720});
    expect(parser.parse('FACT(6.998)')).to.deep.equal({error: null, result: 720});
    expect(parser.parse('FACT(10)')).to.deep.equal({error: null, result: 3628800});
  });

  it('FACTDOUBLE', () => {
    expect(parser.parse('FACTDOUBLE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('FACTDOUBLE("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('FACTDOUBLE(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('FACTDOUBLE(3)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('FACTDOUBLE(3.33)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('FACTDOUBLE(6)')).to.deep.equal({error: null, result: 48});
    expect(parser.parse('FACTDOUBLE(6.998)')).to.deep.equal({error: null, result: 48});
    expect(parser.parse('FACTDOUBLE(10)')).to.deep.equal({error: null, result: 3840});
  });

  it('FLOOR', () => {
    expect(parser.parse('FLOOR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('FLOOR("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('FLOOR(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('FLOOR(3.33, 1.11)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('FLOOR(6.998, -1.99)')).to.deep.equal({error: null, result: 6});
    expect(parser.parse('FLOOR(-1, -10)')).to.deep.equal({error: null, result: -10});
  });

  it('GCD', () => {
    expect(parser.parse('GCD()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('GCD("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('GCD(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('GCD(2, 36)')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('GCD(200, -12, 22, 9)')).to.deep.equal({error: null, result: 1});
  });

  it('GTE', () => { // Greater than or equal
    expect(parser.parse('GTE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GTE("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GTE(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('GTE(1, 2)')).to.deep.equal({error: null, result: false});
    expect(parser.parse('GTE(1.1, 1.1)')).to.deep.equal({error: null, result: true});
  });

  it('INT', () => {
    expect(parser.parse('INT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('INT("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('INT(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('INT(1.1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('INT(1.5)')).to.deep.equal({error: null, result: 1});
  });

  it('LCM', () => {
    expect(parser.parse('LCM()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LCM("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LCM(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('LCM(1.1, 2)')).to.deep.equal({error: null, result: 2.2});
    expect(parser.parse('LCM(3, 8)')).to.deep.equal({error: null, result: 24});
  });

  it('LN', () => {
    expect(parser.parse('LN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LN(1)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse(`LN(${Math.E})`)).to.deep.equal({error: null, result: 1});
  });

  it('LOG', () => {
    expect(parser.parse('LOG()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LOG("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LOG(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LOG(10, 10)')).to.deep.equal({error: null, result: 1});
  });

  it('LOG10', () => {
    expect(parser.parse('LOG10()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LOG10("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LOG10(10)')).to.deep.equal({error: null, result: 1});
  });

  it('LT', () => { // Less than
    expect(parser.parse('LT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('LT("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('LT(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('LT(1, 2)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('LT(1.1, 1.2)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('LT(1.2, 1.2)')).to.deep.equal({error: null, result: false});
    expect(parser.parse('LT(1.3, 1.2)')).to.deep.equal({error: null, result: false});
  });

  it('LTE', () => { // Less than or equal
    expect(parser.parse('LTE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('LTE("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('LTE(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('LTE(1, 2)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('LTE(1.1, 1.2)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('LTE(1.2, 1.2)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('LTE(1.3, 1.2)')).to.deep.equal({error: null, result: false});
  });

  it('MINUS', () => {
    expect(parser.parse('MINUS()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('MINUS("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('MINUS(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('MINUS(1, 2)')).to.deep.equal({error: null, result: -1});
    expect(parser.parse('MINUS(1.1, 1.2)')).to.almost.eql({error: null, result: -0.1});
    expect(parser.parse('MINUS(1.2, 1.2)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('MINUS(1.3, 1.2)')).to.almost.eql({error: null, result: 0.1});
  });

  it('MOD', () => {
    expect(parser.parse('MOD()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MOD("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MOD(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MOD(1, 2)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('MOD(3, 2)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('MOD(4, 0)')).to.deep.equal({error: '#DIV/0!', result: null});
  });

  it('MROUND', () => {
    expect(parser.parse('MROUND()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MROUND("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MROUND(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MROUND(1, 2)')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('MROUND(3, 2)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('MROUND(-4, 1.1)')).to.deep.equal({error: '#NUM!', result: null});
  });

  it('MULTINOMIAL', () => {
    expect(parser.parse('MULTINOMIAL()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MULTINOMIAL("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MULTINOMIAL(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('MULTINOMIAL(1, 3, 4)')).to.deep.equal({error: null, result: 280});
  });

  it('MULTIPLY', () => {
    expect(parser.parse('MULTIPLY()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('MULTIPLY("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('MULTIPLY(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('MULTIPLY(3, 4)')).to.deep.equal({error: null, result: 12});
    expect(parser.parse('MULTIPLY(3, -4)')).to.deep.equal({error: null, result: -12});
    expect(parser.parse('MULTIPLY(2, 2.2)')).to.deep.equal({error: null, result: 4.4});
  });

  it('NE', () => { // Not Equal
    expect(parser.parse('NE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('NE("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('NE(1)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('NE(3, 4)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('NE(3, -4)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('NE(2, 2.2)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('NE(2.2, 2.2)')).to.deep.equal({error: null, result: false});
  });

  it('ODD', () => {
    expect(parser.parse('ODD()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ODD("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ODD(2)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('ODD(-34)')).to.deep.equal({error: null, result: -35});
    expect(parser.parse('ODD(11)')).to.deep.equal({error: null, result: 11});
  });

  it('PI', () => {
    expect(parser.parse('PI()')).to.deep.equal({error: null, result: Math.PI});
  });

  it('POWER', () => {
    expect(parser.parse('POWER()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('POWER("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('POWER(2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('POWER(2, 4)')).to.deep.equal({error: null, result: 16});
    expect(parser.parse('POWER(2, 8)')).to.deep.equal({error: null, result: 256});
  });

  it('POW', () => {
    expect(parser.parse('POW()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('POW("value")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('POW(2)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('POW(2, 4)')).to.deep.equal({error: null, result: 16});
    expect(parser.parse('POW(2, 8)')).to.deep.equal({error: null, result: 256});
  });

  it('PRODUCT', () => {
    expect(parser.parse('PRODUCT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('PRODUCT("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('PRODUCT(2)')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('PRODUCT(2, 4)')).to.deep.equal({error: null, result: 8});
    expect(parser.parse('PRODUCT(2, 8)')).to.deep.equal({error: null, result: 16});
    expect(parser.parse('PRODUCT(2, 8, 10, 10)')).to.deep.equal({error: null, result: 1600});
  });

  it('QUOTIENT', () => {
    expect(parser.parse('QUOTIENT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('QUOTIENT("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('QUOTIENT(2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('QUOTIENT(2, 4)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('QUOTIENT(8, 2)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('QUOTIENT(9, 2)')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('QUOTIENT(-9, 2)')).to.deep.equal({error: null, result: -4});
  });

  it('RADIANS', () => {
    expect(parser.parse('RADIANS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('RADIANS("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('RADIANS(180)')).to.deep.equal({error: null, result: Math.PI});
    expect(parser.parse('RADIANS(90)')).to.deep.equal({error: null, result: Math.PI / 2});
  });

  it('RAND', () => {
    const result = parser.parse('RAND()');

    expect(result.error).to.be.null;
    expect(result.result).to.be.within(0, 1);
  });

  it('RANDBETWEEN', () => {
    const result = parser.parse('RANDBETWEEN(-5, -3)');

    expect(result.error).to.be.null;
    expect(result.result).to.be.within(-5, -3);
  });

  it('ROMAN', () => {
    expect(parser.parse('ROMAN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROMAN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROMAN(1)')).to.deep.equal({error: null, result: 'I'});
    expect(parser.parse('ROMAN(12)')).to.deep.equal({error: null, result: 'XII'});
    expect(parser.parse('ROMAN(12)')).to.deep.equal({error: null, result: 'XII'});
    expect(parser.parse('ROMAN(992)')).to.deep.equal({error: null, result: 'CMXCII'});
    expect(parser.parse('ROMAN(2000)')).to.deep.equal({error: null, result: 'MM'});
  });

  it('ROUND', () => {
    expect(parser.parse('ROUND()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUND("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUND(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUND(1.2234, 0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('ROUND(1.2234, 2)')).to.deep.equal({error: null, result: 1.22});
    expect(parser.parse('ROUND(1.2234578, 4)')).to.deep.equal({error: null, result: 1.2235});
    expect(parser.parse('ROUND(2345.2234578, -1)')).to.deep.equal({error: null, result: 2350});
    expect(parser.parse('ROUND(2345.2234578, -2)')).to.deep.equal({error: null, result: 2300});
  });

  it('ROUNDDOWN', () => {
    expect(parser.parse('ROUNDDOWN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUNDDOWN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUNDDOWN(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUNDDOWN(1.2234, 0)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('ROUNDDOWN(1.2234, 2)')).to.deep.equal({error: null, result: 1.22});
    expect(parser.parse('ROUNDDOWN(1.2234578, 4)')).to.deep.equal({error: null, result: 1.2234});
    expect(parser.parse('ROUNDDOWN(2345.2234578, -1)')).to.deep.equal({error: null, result: 2340});
    expect(parser.parse('ROUNDDOWN(2345.2234578, -2)')).to.deep.equal({error: null, result: 2300});
  });

  it('ROUNDUP', () => {
    expect(parser.parse('ROUNDUP()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUNDUP("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUNDUP(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ROUNDUP(1.2234, 0)')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('ROUNDUP(1.2234, 2)')).to.deep.equal({error: null, result: 1.23});
    expect(parser.parse('ROUNDUP(1.2234578, 4)')).to.deep.equal({error: null, result: 1.2235});
    expect(parser.parse('ROUNDUP(2345.2234578, -1)')).to.deep.equal({error: null, result: 2350});
    expect(parser.parse('ROUNDUP(2345.2234578, -2)')).to.deep.equal({error: null, result: 2400});
  });

  it('SEC', () => {
    expect(parser.parse('SEC()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SEC("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SEC(1)')).to.almost.eql({error: null, result: 1.8508157176809255});
    expect(parser.parse('SEC(30)')).to.almost.eql({error: null, result: 6.482921234962678});
  });

  it('SECH', () => {
    expect(parser.parse('SECH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SECH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SECH(1)')).to.almost.eql({error: null, result: 0.6480542736638855});
    expect(parser.parse('SECH(30)')).to.almost.eql({error: null, result: 1.8715245937680314e-13});
  });

  it('SERIESSUM', () => {
    parser.setVariable('SERIESSUM_ARR', [
      1,
      -1 / parser.parse('FACT(2)').result,
      1 / parser.parse('FACT(4)').result,
      -1 / parser.parse('FACT(6)').result,
    ]);

    expect(parser.parse('SERIESSUM(PI() / 4, 0, 2, SERIESSUM_ARR)')).to.almost.eql({error: null, result: 0.7071032148228457});
  });

  it('SIGN', () => {
    expect(parser.parse('SIGN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SIGN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SIGN(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('SIGN(30)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('SIGN(-1.1)')).to.deep.equal({error: null, result: -1});
    expect(parser.parse('SIGN(0)')).to.deep.equal({error: null, result: 0});
  });

  it('SIN', () => {
    expect(parser.parse('SIN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SIN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse(`SIN(${Math.PI / 2})`)).to.deep.equal({error: null, result: 1});
  });

  it('SINH', () => {
    expect(parser.parse('SINH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SINH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SINH(1)')).to.almost.eql({error: null, result: 1.1752011936438014});
  });

  it('SQRT', () => {
    expect(parser.parse('SQRT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SQRT("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SQRT(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('SQRT(9)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('SQRT(64)')).to.deep.equal({error: null, result: 8});
  });

  it('SQRTPI', () => {
    expect(parser.parse('SQRTPI()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SQRTPI("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SQRTPI(64)')).to.almost.eql({error: null, result: 14.179630807244127});
  });

  it('SUBTOTAL', () => {
    parser.on('callRangeValue', (a, b, done) => {
      done([[120, 10, 150, 23]]);
    });

    expect(parser.parse('SUBTOTAL(9, A1:C1)')).to.deep.equal({error: null, result: 303});
  });

  it('SUM', () => {
    expect(parser.parse('SUM()')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('SUM("value")')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('SUM(64)')).to.deep.equal({error: null, result: 64});
    expect(parser.parse('SUM(64, 3.3, 0.1)')).to.almost.eql({error: null, result: 67.4});
  });

  it('SUMIF', () => {
    parser.on('callRangeValue', (a, b, done) => {
      done([[1, 2, 3]]);
    });

    expect(parser.parse('SUMIF(A1:C1, ">2")')).to.deep.equal({error: null, result: 3});
  });

  it('SUMIFS', () => {
    parser.on('callRangeValue', (a, b, done) => {
      done([[1, 2, 3]]);
    });

    expect(parser.parse('SUMIFS(A1:C1, ">1", "<3")')).to.deep.equal({error: null, result: 2});
  });

  it('SUMPRODUCT', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'B3') {
        done([[3, 4], [8, 6], [1, 9]]);
      } else if (a.label === 'A4' && b.label === 'B6') {
        done([[2, 7], [6, 7], [5, 3]]);
      }
    });

    expect(parser.parse('SUMPRODUCT(A1:B3, A4:B6)')).to.deep.equal({error: null, result: 156});
  });

  it('SUMSQ', () => {
    expect(parser.parse('SUMSQ()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SUMSQ("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SUMSQ(64)')).to.deep.equal({error: null, result: 4096});
    expect(parser.parse('SUMSQ(64, 3.3, 0.1)')).to.almost.eql({error: null, result: 4106.9});
  });

  it('SUMX2MY2', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'B3') {
        done([[1, 2, 3]]);
      } else if (a.label === 'A4' && b.label === 'B6') {
        done([[4, 5, 6]]);
      }
    });

    expect(parser.parse('SUMX2MY2(A1:B3, A4:B6)')).to.deep.equal({error: null, result: -63});
  });

  it('SUMX2PY2', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'B3') {
        done([[1, 2, 3]]);
      } else if (a.label === 'A4' && b.label === 'B6') {
        done([[4, 5, 6]]);
      }
    });

    expect(parser.parse('SUMX2PY2(A1:B3, A4:B6)')).to.deep.equal({error: null, result: 91});
  });

  it('SUMXMY2', () => {
    parser.on('callRangeValue', (a, b, done) => {
      if (a.label === 'A1' && b.label === 'B3') {
        done([[1, 2, 3]]);
      } else if (a.label === 'A4' && b.label === 'B6') {
        done([[4, 5, 6]]);
      }
    });

    expect(parser.parse('SUMXMY2(A1:B3, A4:B6)')).to.deep.equal({error: null, result: 27});
  });

  it('TAN', () => {
    expect(parser.parse('TAN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TAN("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TAN(1)')).to.almost.eql({error: null, result: 1.5574077246549023});
    expect(parser.parse('TAN(RADIANS(45))')).to.almost.eql({error: null, result: 1});
  });

  it('TANH', () => {
    expect(parser.parse('TANH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TANH("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TANH(1)')).to.almost.eql({error: null, result: 0.761594155955765});
  });

  it('TRUNC', () => {
    expect(parser.parse('TRUNC()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TRUNC("value")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TRUNC(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('TRUNC(1.99988877)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('TRUNC(-221.99988877)')).to.deep.equal({error: null, result: -221});
    expect(parser.parse('TRUNC(0.99988877)')).to.deep.equal({error: null, result: 0});
  });
});
