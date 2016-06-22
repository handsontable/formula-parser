import {FormulaParser} from '../../../src/formula-parser';

describe('FormulaParser parse() formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new FormulaParser();
  });
  afterEach(() => {
    parser = null;
  });

  it('Invalid argument', () => {
    // jscs:disable
    /*eslint-disable */
    expect(parser.parse('ACOTH("foo")')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse("ACOTH('foo')")).to.deep.equal({error: '#VALUE?', result: null});
    /*eslint-enable */
    // jscs:enable
  });

  it('Invalid variable', () => {
    expect(parser.parse('ACOTH(foo)')).to.deep.equal({error: '#NAME?', result: null});
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/date-time.js
  describe('Date & Time', () => {
    it('DATE', () => {
      expect(parser.parse('DATE()')).to.deep.equal({error: '#VALUE?', result: null});

      const {error, result} = parser.parse('DATE(2001, 5, 12)');

      expect(error).to.be.null;
      expect(result.getFullYear()).to.be.eq(2001);
      expect(result.getMonth()).to.be.eq(4); // counting from zero
      expect(result.getDate()).to.be.eq(12);
    });

    it('DATEVALUE', () => {
      expect(parser.parse('DATEVALUE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DATEVALUE("1/1/1900")')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('DATEVALUE("1/1/2000")')).to.deep.equal({error: null, result: 36526});
    });

    it('DAY', () => {
      expect(parser.parse('DAY()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DAY(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('DAY(2958465)')).to.deep.equal({error: null, result: 31});
      expect(parser.parse('DAY("2958465")')).to.deep.equal({error: null, result: 31});
    });

    it('DAYS', () => {
      expect(parser.parse('DAYS()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DAYS(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DAYS(1, 6)')).to.deep.equal({error: null, result: -5});
      expect(parser.parse('DAYS("1/2/2000", "1/10/2001")')).to.deep.equal({error: null, result: -374});
    });

    it('DAYS360', () => {
      expect(parser.parse('DAYS360()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DAYS360(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DAYS360(1, 6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DAYS360("1/1/1901", "2/1/1901", TRUE)')).to.deep.equal({error: null, result: 30});
      expect(parser.parse('DAYS360("1/1/1901", "12/31/1901", FALSE)')).to.deep.equal({error: null, result: 360});
    });

    it('EDATE', () => {
      expect(parser.parse('EDATE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EDATE(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EDATE("1/1/1900", 1)')).to.deep.equal({error: null, result: 32});
    });

    it('EOMONTH', () => {
      expect(parser.parse('EOMONTH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EOMONTH(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EOMONTH("1/1/1900", 1)')).to.deep.equal({error: null, result: 59});
    });

    it('HOUR', () => {
      expect(parser.parse('HOUR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('HOUR("1/1/1900 16:33")')).to.deep.equal({error: null, result: 16});
    });

    it('INTERVAL', () => {
      expect(parser.parse('INTERVAL()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('INTERVAL(0)')).to.deep.equal({error: null, result: 'PT'});
      expect(parser.parse('INTERVAL(1)')).to.deep.equal({error: null, result: 'PT1S'});
      expect(parser.parse('INTERVAL(60)')).to.deep.equal({error: null, result: 'PT1M'});
      expect(parser.parse('INTERVAL(10000000)')).to.deep.equal({error: null, result: 'P3M25DT17H46M40S'});
    });

    it('ISOWEEKNUM', () => {
      expect(parser.parse('ISOWEEKNUM()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ISOWEEKNUM("1/8/1901")')).to.deep.equal({error: null, result: 2});
      expect(parser.parse('ISOWEEKNUM("6/6/1902")')).to.deep.equal({error: null, result: 23});
    });

    it('MINUTE', () => {
      expect(parser.parse('MINUTE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MINUTE("1/1/1901 1:01")')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('MINUTE("1/1/1901 15:36")')).to.deep.equal({error: null, result: 36});
    });

    it('MONTH', () => {
      expect(parser.parse('MONTH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MONTH("2/1/1901")')).to.deep.equal({error: null, result: 2});
      expect(parser.parse('MONTH("10/1/1901")')).to.deep.equal({error: null, result: 10});
    });

    it('NETWORKDAYS', () => {
      expect(parser.parse('NETWORKDAYS()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NETWORKDAYS("2/1/1901")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NETWORKDAYS("2013-12-04", "2013-12-05")')).to.deep.equal({error: null, result: 2});
      expect(parser.parse('NETWORKDAYS("2013-11-04", "2013-12-05")')).to.deep.equal({error: null, result: 24});
    });

    it('NOW', () => {
      const {error, result} = parser.parse('NOW()');
      const now = new Date();

      expect(error).to.be.null;
      expect(result.toString()).to.be.eq(now.toString());
    });

    it('SECOND', () => {
      expect(parser.parse('SECOND()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SECOND("2/1/1901 13:33:12")')).to.deep.equal({error: null, result: 12});
    });

    it('TIME', () => {
      expect(parser.parse('TIME()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TIME(0)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TIME(0, 0)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TIME(0, 0, 0)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('TIME(1, 1, 1)')).to.deep.equal({error: null, result: 0.04237268518518519});
      expect(parser.parse('TIME(24, 0, 0)')).to.deep.equal({error: null, result: 1});
    });

    it('TIMEVALUE', () => {
      expect(parser.parse('TIMEVALUE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TIMEVALUE("1/1/1900 00:00:00")')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('TIMEVALUE("1/1/1900 23:00:00")')).to.deep.equal({error: null, result: 0.9583333333333334});
    });

    it('TODAY', () => {
      const {error, result} = parser.parse('TODAY()');
      const now = new Date();

      expect(error).to.be.null;
      expect(result.getDate()).to.be.eq(now.getDate());
    });

    it('WEEKDAY', () => {
      expect(parser.parse('WEEKDAY()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('WEEKDAY("1/1/1901")')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('WEEKDAY("1/1/1901", 2)')).to.deep.equal({error: null, result: 2});
    });

    it('WEEKNUM', () => {
      expect(parser.parse('WEEKNUM()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('WEEKNUM("2/1/1900")')).to.deep.equal({error: null, result: 5});
      expect(parser.parse('WEEKNUM("2/1/1909", 2)')).to.deep.equal({error: null, result: 6});
    });

    it('WORKDAY', () => {
      expect(parser.parse('WORKDAY()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('WORKDAY("1/1/1900")')).to.deep.equal({error: '#VALUE?', result: null});

      const {result, error} = parser.parse('WORKDAY("1/1/1900", 1)');

      expect(error).to.be.null;
      expect(result.getDate()).to.be.eq(2);
    });

    it('YEAR', () => {
      expect(parser.parse('YEAR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('YEAR("1/1/1904")')).to.deep.equal({error: null, result: 1904});
      expect(parser.parse('YEAR("12/12/2001")')).to.deep.equal({error: null, result: 2001});
    });

    it('YEARFRAC', () => {
      expect(parser.parse('YEARFRAC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('YEARFRAC("1/1/1904")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('YEARFRAC("1/1/1900", "1/2/1900")')).to.deep.equal({error: null, result: 0.002777777777777778});
    });
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/engineering.js
  describe('Engineering', () => {
    it('BESSELI', () => {
      expect(parser.parse('BESSELI()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELI(1.4)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELI(1.4, 1)')).to.deep.equal({error: null, result: 0.8860919793963105});
    });

    it('BESSELJ', () => {
      expect(parser.parse('BESSELJ()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELJ(1.4)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELJ(1.4, 1)')).to.deep.equal({error: null, result: 0.5419477138848564});
    });

    it('BESSELK', () => {
      expect(parser.parse('BESSELK()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELK(1.4)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELK(1.4, 1)')).to.deep.equal({error: null, result: 0.32083590550458985});
    });

    it('BESSELY', () => {
      expect(parser.parse('BESSELY()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELY(1.4)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BESSELY(1.4, 1)')).to.deep.equal({error: null, result: -0.47914697411134044});
    });

    it('BIN2DEC', () => {
      expect(parser.parse('BIN2DEC()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('BIN2DEC(1010)')).to.deep.equal({error: null, result: 10});
      expect(parser.parse('BIN2DEC(0)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('BIN2DEC(1)')).to.deep.equal({error: null, result: 1});
    });

    it('BIN2HEX', () => {
      expect(parser.parse('BIN2HEX()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('BIN2HEX(1010)')).to.deep.equal({error: null, result: 'a'});
      expect(parser.parse('BIN2HEX(1010, 4)')).to.deep.equal({error: null, result: '000a'});
      expect(parser.parse('BIN2HEX(0, 3)')).to.deep.equal({error: null, result: '000'});
      expect(parser.parse('BIN2HEX(1111)')).to.deep.equal({error: null, result: 'f'});
    });

    it('BIN2OCT', () => {
      expect(parser.parse('BIN2OCT()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('BIN2OCT(1010)')).to.deep.equal({error: null, result: '12'});
      expect(parser.parse('BIN2OCT(1010, 4)')).to.deep.equal({error: null, result: '0012'});
      expect(parser.parse('BIN2OCT(0, 3)')).to.deep.equal({error: null, result: '000'});
      expect(parser.parse('BIN2OCT(111)')).to.deep.equal({error: null, result: '7'});
    });

    it('BITAND', () => {
      expect(parser.parse('BITAND()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITAND(2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITAND(2, 4)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('BITAND(1, 5)')).to.deep.equal({error: null, result: 1});
    });

    it('BITLSHIFT', () => {
      expect(parser.parse('BITLSHIFT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITLSHIFT(2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITLSHIFT(2, 4)')).to.deep.equal({error: null, result: 32});
      expect(parser.parse('BITLSHIFT(1, 5)')).to.deep.equal({error: null, result: 32});
    });

    it('BITOR', () => {
      expect(parser.parse('BITOR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITOR(2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITOR(2, 4)')).to.deep.equal({error: null, result: 6});
      expect(parser.parse('BITOR(1, 5)')).to.deep.equal({error: null, result: 5});
    });

    it('BITRSHIFT', () => {
      expect(parser.parse('BITRSHIFT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITRSHIFT(2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITRSHIFT(4, 2)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('BITRSHIFT(1, 5)')).to.deep.equal({error: null, result: 0});
    });

    it('BITXOR', () => {
      expect(parser.parse('BITXOR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITXOR(2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BITXOR(4, 2)')).to.deep.equal({error: null, result: 6});
      expect(parser.parse('BITXOR(1, 5)')).to.deep.equal({error: null, result: 4});
    });

    it('COMPLEX', () => {
      expect(parser.parse('COMPLEX()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COMPLEX(2, 0)')).to.deep.equal({error: null, result: '2'});
      expect(parser.parse('COMPLEX(4, 2)')).to.deep.equal({error: null, result: '4+2i'});
      expect(parser.parse('COMPLEX(1, 5)')).to.deep.equal({error: null, result: '1+5i'});
    });

    it('CONVERT', () => {
      expect(parser.parse('CONVERT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CONVERT(1)')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('CONVERT(2, "lbm", "kg")')).to.deep.equal({error: null, result: 0.90718474});
      expect(parser.parse('CONVERT(100, "km", "mi")')).to.deep.equal({error: null, result: 62.13711922373339});
      expect(parser.parse('CONVERT(100, "km", "m")')).to.deep.equal({error: null, result: 100000});
      expect(parser.parse('CONVERT(2, "km/h", "mi")')).to.deep.equal({error: '#N/A', result: null});
    });

    it('DEC2BIN', () => {
      expect(parser.parse('DEC2BIN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DEC2BIN(10)')).to.deep.equal({error: null, result: '1010'});
      expect(parser.parse('DEC2BIN(0, 4)')).to.deep.equal({error: null, result: '0000'});
      expect(parser.parse('DEC2BIN(1)')).to.deep.equal({error: null, result: '1'});
    });

    it('DEC2HEX', () => {
      expect(parser.parse('DEC2HEX()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DEC2HEX(100)')).to.deep.equal({error: null, result: '64'});
      expect(parser.parse('DEC2HEX(100, 4)')).to.deep.equal({error: null, result: '0064'});
      expect(parser.parse('DEC2HEX(0)')).to.deep.equal({error: null, result: '0'});
      expect(parser.parse('DEC2HEX(1)')).to.deep.equal({error: null, result: '1'});
    });

    it('DEC2OCT', () => {
      expect(parser.parse('DEC2OCT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DEC2OCT(58)')).to.deep.equal({error: null, result: '72'});
      expect(parser.parse('DEC2OCT(58, 4)')).to.deep.equal({error: null, result: '0072'});
      expect(parser.parse('DEC2OCT(0)')).to.deep.equal({error: null, result: '0'});
      expect(parser.parse('DEC2OCT(1)')).to.deep.equal({error: null, result: '1'});
    });

    it('DELTA', () => {
      expect(parser.parse('DELTA()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DELTA(58)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('DELTA(58, 4)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('DELTA(58, 58)')).to.deep.equal({error: null, result: 1});
    });

    it('ERF', () => {
      expect(parser.parse('ERF()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ERF(1)')).to.deep.equal({error: null, result: 0.8427007929497149});
      expect(parser.parse('ERF(2)')).to.deep.equal({error: null, result: 0.9953222650189527});
    });

    it('ERFC', () => {
      expect(parser.parse('ERFC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ERFC(0)')).to.deep.equal({error: null, result: 0.9999999999999999});
      expect(parser.parse('ERFC(1)')).to.deep.equal({error: null, result: 0.1572992070502851});
    });

    it('GESTEP', () => {
      expect(parser.parse('GESTEP()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('GESTEP(1, 2)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('GESTEP(-1, -2)')).to.deep.equal({error: null, result: 1});
    });

    it('HEX2BIN', () => {
      expect(parser.parse('HEX2BIN()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('HEX2BIN("FA")')).to.deep.equal({error: null, result: '11111010'});
      expect(parser.parse('HEX2BIN("FA", 10)')).to.deep.equal({error: null, result: '0011111010'});
      expect(parser.parse('HEX2BIN(200)')).to.deep.equal({error: '#NUM!', result: null});
    });

    it('HEX2DEC', () => {
      expect(parser.parse('HEX2DEC()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('HEX2DEC("FA")')).to.deep.equal({error: null, result: 250});
      expect(parser.parse('HEX2DEC(200)')).to.deep.equal({error: null, result: 512});
    });

    it('HEX2OCT', () => {
      expect(parser.parse('HEX2OCT()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('HEX2OCT("FA")')).to.deep.equal({error: null, result: '372'});
      expect(parser.parse('HEX2OCT("FA", 6)')).to.deep.equal({error: null, result: '000372'});
      expect(parser.parse('HEX2OCT(200)')).to.deep.equal({error: null, result: '1000'});
    });

    it('IMABS', () => {
      expect(parser.parse('IMABS()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMABS("5+12i")')).to.deep.equal({error: null, result: 13});
    });

    it('IMAGINARY', () => {
      expect(parser.parse('IMAGINARY()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMAGINARY("3+4i")')).to.deep.equal({error: null, result: 4});
      expect(parser.parse('IMAGINARY("+i")')).to.deep.equal({error: null, result: '+1'});
    });

    it('IMARGUMENT', () => {
      expect(parser.parse('IMARGUMENT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMARGUMENT(1)')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('IMARGUMENT(0)')).to.deep.equal({error: '#DIV/0!', result: null});
      expect(parser.parse('IMARGUMENT("3+4i")')).to.deep.equal({error: null, result: 0.9272952180016122});
    });

    it('IMCONJUGATE', () => {
      expect(parser.parse('IMCONJUGATE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMCONJUGATE(1)')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('IMCONJUGATE("3+4i")')).to.deep.equal({error: null, result: '3-4i'});
    });

    it('IMCOS', () => {
      expect(parser.parse('IMCOS()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMCOS("3+4i")')).to.deep.equal({error: null, result: '-27.03494560307422-3.8511533348117766i'});
    });

    it('IMCOSH', () => {
      expect(parser.parse('IMCOSH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMCOSH("3+4i")')).to.deep.equal({error: null, result: '-6.580663040551157-7.581552742746545i'});
    });

    it('IMCOT', () => {
      expect(parser.parse('IMCOT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMCOT("3+4i")')).to.deep.equal({error: null, result: '-0.0001875877379836712-1.0006443924715591i'});
    });

    it('IMCSC', () => {
      expect(parser.parse('IMCSC()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('IMCSC("3+4i")')).to.deep.equal({error: null, result: '0.005174473184019398+0.03627588962862602i'});
    });

    it('IMCSCH', () => {
      expect(parser.parse('IMCSCH()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('IMCSCH("3+4i")')).to.deep.equal({error: null, result: '-0.0648774713706355+0.0754898329158637i'});
    });

    it('IMDIV', () => {
      expect(parser.parse('IMDIV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMDIV("3+4i")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMDIV("3+4i", "2+2i")')).to.deep.equal({error: null, result: '1.75+0.25i'});
    });

    it('IMEXP', () => {
      expect(parser.parse('IMEXP()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMEXP("3+4i")')).to.deep.equal({error: null, result: '-13.128783081462158-15.200784463067954i'});
    });

    it('IMLN', () => {
      expect(parser.parse('IMLN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMLN("3+4i")')).to.deep.equal({error: null, result: '1.6094379124341003+0.9272952180016122i'});
    });

    it('IMLOG10', () => {
      expect(parser.parse('IMLOG10()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMLOG10("3+4i")')).to.deep.equal({error: null, result: '0.6989700043360187+0.4027191962733731i'});
    });

    it('IMLOG2', () => {
      expect(parser.parse('IMLOG2()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMLOG2("3+4i")')).to.deep.equal({error: null, result: '2.321928094887362+1.3378042124509761i'});
    });

    it('IMPOWER', () => {
      expect(parser.parse('IMPOWER()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMPOWER("3+4i")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMPOWER("3+4i", 3)')).to.deep.equal({error: null, result: '-117+44.000000000000036i'});
    });

    it('IMPOWER', () => {
      expect(parser.parse('IMPRODUCT()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('IMPRODUCT("3+4i")')).to.deep.equal({error: null, result: '3+4i'});
      expect(parser.parse('IMPRODUCT("3+4i", "1+2i")')).to.deep.equal({error: null, result: '-5+10i'});
    });

    it('IMREAL', () => {
      expect(parser.parse('IMREAL()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMREAL("3+4i")')).to.deep.equal({error: null, result: 3});
    });

    it('IMSEC', () => {
      expect(parser.parse('IMSEC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMSEC("3+4i")')).to.deep.equal({error: null, result: '-0.03625349691586888+0.005164344607753179i'});
    });

    it('IMSECH', () => {
      expect(parser.parse('IMSECH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMSECH("3+4i")')).to.deep.equal({error: null, result: '-0.06529402785794704+0.07522496030277322i'});
    });

    it('IMSIN', () => {
      expect(parser.parse('IMSIN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMSIN("3+4i")')).to.deep.equal({error: null, result: '3.8537380379193764-27.01681325800393i'});
    });

    it('IMSINH', () => {
      expect(parser.parse('IMSINH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMSINH("3+4i")')).to.deep.equal({error: null, result: '-6.5481200409110025-7.61923172032141i'});
    });

    it('IMSQRT', () => {
      expect(parser.parse('IMSQRT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMSQRT("3+4i")')).to.deep.equal({error: null, result: '2+i'});
    });

    it('IMSUB', () => {
      expect(parser.parse('IMSUB()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMSUB("3+4i")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMSUB("3+4i", "2+3i")')).to.deep.equal({error: null, result: '1+i'});
    });

    it('IMSUM', () => {
      expect(parser.parse('IMSUM()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('IMSUM("3+4i")')).to.deep.equal({error: null, result: '3+4i'});
      expect(parser.parse('IMSUM("3+4i", "2+3i")')).to.deep.equal({error: null, result: '5+7i'});
    });

    it('IMTAN', () => {
      expect(parser.parse('IMTAN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IMTAN("3+4i")')).to.deep.equal({error: null, result: '-0.00018734620462949037+0.9993559873814729i'});
    });

    it('OCT2BIN', () => {
      expect(parser.parse('OCT2BIN()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('OCT2BIN(3)')).to.deep.equal({error: null, result: '11'});
      expect(parser.parse('OCT2BIN(3, 4)')).to.deep.equal({error: null, result: '0011'});
    });

    it('OCT2DEC', () => {
      expect(parser.parse('OCT2DEC()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('OCT2DEC(3)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('OCT2DEC(33)')).to.deep.equal({error: null, result: 27});
    });

    it('OCT2HEX', () => {
      expect(parser.parse('OCT2HEX()')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('OCT2HEX(3)')).to.deep.equal({error: null, result: '3'});
      expect(parser.parse('OCT2HEX(33)')).to.deep.equal({error: null, result: '1b'});
      expect(parser.parse('OCT2HEX(33, 3)')).to.deep.equal({error: null, result: '01b'});
    });
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/financial.js
  describe('Financial', () => {
    it('ACCRINT', () => {
      expect(parser.parse('ACCRINT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ACCRINT("2/2/2012")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ACCRINT("2/2/2012", "3/30/2012")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ACCRINT("2/2/2012", "3/30/2012", "12/4/2013")')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('ACCRINT("2/2/2012", "3/30/2012", "12/4/2013", 0.1)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('ACCRINT("2/2/2012", "3/30/2012", "12/4/2013", 0.1, 1000)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('ACCRINT("2/2/2012", "3/30/2012", "12/4/2013", 0.1, 1000, 1)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('ACCRINT("2/2/2012", "3/30/2012", "12/4/2013", 0.1, 1000, 1, 0)')).to.deep.equal({error: null, result: 183.88888888888889});
    });

    it('CUMIPMT', () => {
      expect(parser.parse('CUMIPMT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CUMIPMT(0.1/12)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CUMIPMT(0.1/12, 30*12)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CUMIPMT(0.1/12, 30*12, 100000)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CUMIPMT(0.1/12, 30*12, 100000, 13)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CUMIPMT(0.1/12, 30*12, 100000, 13, 24)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CUMIPMT(0.1/12, 30*12, 100000, 13, 24, 0)')).to.deep.equal({error: null, result: -9916.77251395708});
    });

    it('CUMPRINC', () => {
      expect(parser.parse('CUMPRINC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CUMPRINC(0.1/12)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CUMPRINC(0.1/12, 30*12)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CUMPRINC(0.1/12, 30*12, 100000)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CUMPRINC(0.1/12, 30*12, 100000, 13)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CUMPRINC(0.1/12, 30*12, 100000, 13, 24)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CUMPRINC(0.1/12, 30*12, 100000, 13, 24, 0)')).to.deep.equal({error: null, result: -614.0863271085149});
    });

    it('DB', () => {
      expect(parser.parse('DB()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DB(10000)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DB(10000, 1000)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DB(10000, 1000, 6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DB(10000, 1000, 6, 1)')).to.deep.equal({error: null, result: 3190});
    });

    it('DDB', () => {
      expect(parser.parse('DDB()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DDB(10000)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DDB(10000, 1000)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DDB(10000, 1000, 6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DDB(10000, 1000, 6, 1)')).to.deep.equal({error: null, result: 3333.333333333333});
    });

    it('DOLLARDE', () => {
      expect(parser.parse('DOLLARDE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DOLLARDE(1.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DOLLARDE(1.1, 4)')).to.deep.equal({error: null, result: 1.25});
    });

    it('DOLLARFR', () => {
      expect(parser.parse('DOLLARFR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DOLLARFR(1.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DOLLARFR(1.1, 4)')).to.deep.equal({error: null, result: 1.04});
    });

    it('EFFECT', () => {
      expect(parser.parse('EFFECT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EFFECT(1.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EFFECT(1.1, 4)')).to.deep.equal({error: null, result: 1.6426566406249994});
    });

    it('FV', () => {
      expect(parser.parse('FV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FV(1.1, 10)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FV(1.1, 10, -200)')).to.deep.equal({error: null, result: 303088.7450582});
      expect(parser.parse('FV(1.1, 10, -200, -500)')).to.deep.equal({error: null, result: 1137082.79396825});
      expect(parser.parse('FV(1.1, 10, -200, -500, 1)')).to.deep.equal({error: null, result: 1470480.4135322701});
    });

    it('FVSCHEDULE', () => {});

    it('IPMT', () => {
      expect(parser.parse('IPMT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IPMT(0.2, 6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IPMT(0.2, 6, 24)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('IPMT(0.2, 6, 24, 1000)')).to.deep.equal({error: null, result: -196.20794961065468});
      expect(parser.parse('IPMT(0.2, 6, 24, 1000, 200)')).to.deep.equal({error: null, result: -195.44953953278565});
      expect(parser.parse('IPMT(0.2, 6, 24, 1000, 200, 1)')).to.deep.equal({error: null, result: -162.87461627732137});
    });

    it('IRR', () => {});

    it('ISPMT', () => {
      expect(parser.parse('ISPMT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ISPMT(1.1, 2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ISPMT(1.1, 2, 16)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ISPMT(1.1, 2, 16)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ISPMT(1.1, 2, 16, 1000)')).to.deep.equal({error: null, result: -962.5});
    });

    it('MIRR', () => {});

    it('NOMINAL', () => {
      expect(parser.parse('NOMINAL()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NOMINAL(1.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NOMINAL(1.1, 2)')).to.deep.equal({error: null, result: 0.8982753492378879});
    });

    it('NPER', () => {
      expect(parser.parse('NPER()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NPER(1.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NPER(1.1, -2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NPER(1.1, -2, -100)')).to.deep.equal({error: null, result: -5.4254604102768305});
      expect(parser.parse('NPER(1.1, -2, -100, 1000)')).to.deep.equal({error: null, result: 3.081639082679854});
      expect(parser.parse('NPER(1.1, -2, -100, 1000, 1)')).to.deep.equal({error: null, result: 3.058108732153963});
    });

    it('NPV', () => {
      expect(parser.parse('NPV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NPV(1.1)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('NPV(1.1, -2)')).to.deep.equal({error: null, result: -0.9523809523809523});
      expect(parser.parse('NPV(1.1, -2, -100)')).to.deep.equal({error: null, result: -23.6281179138322});
      expect(parser.parse('NPV(1.1, -2, -100, 1000)')).to.deep.equal({error: null, result: 84.3515819026023});
      expect(parser.parse('NPV(1.1, -2, -100, 1000, 1)')).to.deep.equal({error: null, result: 84.4030008072768});
    });

    it('PDURATION', () => {
      expect(parser.parse('PDURATION()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PDURATION(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PDURATION(0.1, 200)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PDURATION(0.1, 200, 400)')).to.deep.equal({error: null, result: 7.272540897341714});
    });

    it('PMT', () => {
      expect(parser.parse('PMT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PMT(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PMT(0.1, 200)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PMT(0.1, 200, 400)')).to.deep.equal({error: null, result: -40.00000021063133});
      expect(parser.parse('PMT(0.1, 200, 400, 500)')).to.deep.equal({error: null, result: -40.00000047392049});
    });

    it('PPMT', () => {
      expect(parser.parse('PPMT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PPMT(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PPMT(0.1, 200)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PPMT(0.1, 200, 400)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PPMT(0.1, 200, 400, 5000)')).to.deep.equal({error: null, result: 0.000012207031261368684});
    });

    it('PV', () => {
      expect(parser.parse('PV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PV(1.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PV(1.1, 200)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PV(1.1, 200, 400)')).to.deep.equal({error: null, result: -363.6363636363636});
      expect(parser.parse('PV(1.1, 200, 400, 5000)')).to.deep.equal({error: null, result: -363.6363636363636});
      expect(parser.parse('PV(1.1, 200, 400, 5000, 1)')).to.deep.equal({error: null, result: -763.6363636363636});
    });

    it('RATE', () => {
      expect(parser.parse('RATE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('RATE(24)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('RATE(24, -1000)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('RATE(24, -1000, -10000)')).to.deep.equal({error: null, result: -1.2079096886965142});
      expect(parser.parse('RATE(24, -1000, -10000, 10000)')).to.deep.equal({error: null, result: -0.1});
      expect(parser.parse('RATE(24, -1000, -10000, 10000, 1)')).to.deep.equal({error: null, result: -0.09090909090909093});
      expect(parser.parse('RATE(24, -1000, -10000, 10000, 1, 0.1)')).to.deep.equal({error: null, result: -0.09090909090909091});
    });

    it('RRI', () => {
      expect(parser.parse('RRI()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('RRI(8)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('RRI(8, 100)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('RRI(8, 100, 300)')).to.deep.equal({error: null, result: 0.1472026904398771});
    });

    it('SLN', () => {
      expect(parser.parse('SLN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SLN(200)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SLN(200, 750)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SLN(200, 750, 10)')).to.deep.equal({error: null, result: -55});
    });

    it('SYD', () => {
      expect(parser.parse('SYD()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SYD(200)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SYD(200, 750)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SYD(200, 750, 10)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SYD(200, 750, 10, 1)')).to.deep.equal({error: null, result: -100});
    });

    it('TBILLEQ', () => {
      expect(parser.parse('TBILLEQ()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLEQ("03/31/2008")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLEQ("03/31/2008", "06/01/2008")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLEQ("03/31/2008", "06/01/2008", 0.09)')).to.deep.equal({error: null, result: 0.09266311246509266});
    });

    it('TBILLPRICE', () => {
      expect(parser.parse('TBILLPRICE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLPRICE("03/31/2008")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLPRICE("03/31/2008", "06/01/2008")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLPRICE("03/31/2008", "06/01/2008", 0.09)')).to.deep.equal({error: null, result: 98.475});
    });

    it('TBILLYIELD', () => {
      expect(parser.parse('TBILLYIELD()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLYIELD("03/31/2008")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLYIELD("03/31/2008", "06/01/2008")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TBILLYIELD("03/31/2008", "06/01/2008", 0.09)')).to.deep.equal({error: null, result: 6551.475409836065});
    });

    it('XIRR', () => {});
    it('XNPV', () => {});
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/information.js
  describe('Information', () => {
    it('ISBINARY', () => {
      expect(parser.parse('ISBINARY()')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISBINARY(1)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISBINARY(0)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISBINARY("1010")')).to.deep.equal({error: null, result: true});
    });

    it('ISBLANK', () => {
      expect(parser.parse('ISBLANK(NULL)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISBLANK(FALSE)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISBLANK(0)')).to.deep.equal({error: null, result: false});
    });

    it('ISEVEN', () => {
      expect(parser.parse('ISEVEN(1)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISEVEN(2)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISEVEN(2.5)')).to.deep.equal({error: null, result: true});
    });

    it('ISLOGICAL', () => {
      expect(parser.parse('ISLOGICAL(1)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISLOGICAL(TRUE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISLOGICAL(FALSE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISLOGICAL(NULL)')).to.deep.equal({error: null, result: false});
    });

    it('ISNONTEXT', () => {
      expect(parser.parse('ISNONTEXT()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISNONTEXT(1)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISNONTEXT(TRUE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISNONTEXT("FALSE")')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISNONTEXT("foo")')).to.deep.equal({error: null, result: false});
    });

    it('ISNUMBER', () => {
      expect(parser.parse('ISNUMBER()')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISNUMBER(1)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISNUMBER(0.142342)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISNUMBER(TRUE)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISNUMBER("FALSE")')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISNUMBER("foo")')).to.deep.equal({error: null, result: false});
    });

    it('ISODD', () => {
      expect(parser.parse('ISODD(1)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISODD(2)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISODD(2.5)')).to.deep.equal({error: null, result: false});
    });

    it('ISTEXT', () => {
      expect(parser.parse('ISTEXT()')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISTEXT(1)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISTEXT(TRUE)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('ISTEXT("FALSE")')).to.deep.equal({error: null, result: true});
      expect(parser.parse('ISTEXT("foo")')).to.deep.equal({error: null, result: true});
    });
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/logical.js
  describe('Logical', () => {
    it('AND', () => {
      expect(parser.parse('AND()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('AND(TRUE, TRUE, FALSE)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('AND(TRUE, TRUE, TRUE)')).to.deep.equal({error: null, result: true});
    });

    it('CHOOSE', () => {
      expect(parser.parse('CHOOSE()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('CHOOSE(1, "foo", "bar", "baz")')).to.deep.equal({error: null, result: 'foo'});
      expect(parser.parse('CHOOSE(3, "foo", "bar", "baz")')).to.deep.equal({error: null, result: 'baz'});
      expect(parser.parse('CHOOSE(4, "foo", "bar", "baz")')).to.deep.equal({error: '#VALUE?', result: null});
    });

    it('FALSE', () => {
      expect(parser.parse('FALSE()')).to.deep.equal({error: null, result: false});
    });

    it('IF', () => {
      expect(parser.parse('IF()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('IF(TRUE, 1, 2)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('IF(FALSE, 1, 2)')).to.deep.equal({error: null, result: 2});
    });

    it('NOT', () => {
      expect(parser.parse('NOT()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('NOT(TRUE)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('NOT(FALSE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('NOT(0)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('NOT(1)')).to.deep.equal({error: null, result: false});
    });

    it('OR', () => {
      expect(parser.parse('OR()')).to.deep.equal({error: null, result: false});
      expect(parser.parse('OR(TRUE, TRUE, TRUE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('OR(TRUE, FALSE, FALSE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('OR(FALSE, FALSE, FALSE)')).to.deep.equal({error: null, result: false});
    });

    it('TRUE', () => {
      expect(parser.parse('TRUE()')).to.deep.equal({error: null, result: true});
    });

    it('XOR', () => {
      expect(parser.parse('XOR()')).to.deep.equal({error: null, result: false});
      expect(parser.parse('XOR(TRUE, TRUE)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('XOR(TRUE, FALSE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('XOR(FALSE, TRUE)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('XOR(FALSE, FALSE)')).to.deep.equal({error: null, result: false});
    });

    it('SWITCH', () => {
      expect(parser.parse('SWITCH()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('SWITCH(7, "foo")')).to.deep.equal({error: null, result: 'foo'});
      expect(parser.parse('SWITCH(7, 9, "foo", 7, "bar")')).to.deep.equal({error: null, result: 'bar'});
    });
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/lookup-reference.js
  describe('Lookup Reference', () => {
    it('MATCH', () => {});
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/math-trig.js
  describe('Math & Trig', () => {
    it('ABS', () => {
      expect(parser.parse('ABS(-8)')).to.deep.equal({error: null, result: 8});
      expect(parser.parse('ABS(-8.89)')).to.deep.equal({error: null, result: 8.89});
      expect(parser.parse('ABS(8)')).to.deep.equal({error: null, result: 8});
    });

    it('ACOS', () => {
      expect(parser.parse('ACOS(1)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('ACOS(-1)')).to.deep.equal({error: null, result: Math.PI});
    });

    it('ACOSH', () => {
      expect(parser.parse('ACOSH(1)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('ACOSH(-1)')).to.deep.equal({error: null, result: NaN});
    });

    it('ACOT', () => {
      expect(parser.parse('ACOT(1)')).to.deep.equal({error: null, result: 0.7853981633974483});
      expect(parser.parse('ACOT(-1)')).to.deep.equal({error: null, result: -0.7853981633974483});
    });

    it('ACOTH', () => {
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

    it('AGGREGATE', () => {});

    it('ARABIC', () => {
      expect(parser.parse('ARABIC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ARABIC("ABC")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ARABIC("X")')).to.deep.equal({error: null, result: 10});
      expect(parser.parse('ARABIC("MXL")')).to.deep.equal({error: null, result: 1040});
    });

    it('ASIN', () => {
      expect(parser.parse('ASIN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ASIN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ASIN(0.5)')).to.deep.equal({error: null, result: 0.5235987755982988});
    });

    it('ASINH', () => {
      expect(parser.parse('ASINH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ASINH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ASINH(0.5)')).to.deep.equal({error: null, result: 0.48121182505960347});
    });

    it('ATAN', () => {
      expect(parser.parse('ATAN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ATAN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ATAN(0.5)')).to.deep.equal({error: null, result: 0.46364760900080615});
    });

    it('ATAN2', () => {
      expect(parser.parse('ATAN2()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ATAN2(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ATAN2("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ATAN2(1, 1)')).to.deep.equal({error: null, result: 0.7853981633974483});
    });

    it('ATANH', () => {
      expect(parser.parse('ATANH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ATANH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ATANH(1)')).to.deep.equal({error: null, result: Infinity});
    });

    it('BASE', () => {
      expect(parser.parse('BASE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BASE("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BASE(7)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BASE(7, 2)')).to.deep.equal({error: null, result: '111'});
      expect(parser.parse('BASE(7, 2, 8)')).to.deep.equal({error: null, result: '00000111'});
    });

    it('CEILING', () => {
      expect(parser.parse('CEILING()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CEILING("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CEILING(7.2)')).to.deep.equal({error: null, result: 8});
      expect(parser.parse('CEILING(7, 2, 8)')).to.deep.equal({error: null, result: 8});
      expect(parser.parse('CEILING(-4.3)')).to.deep.equal({error: null, result: -4});
      expect(parser.parse('CEILING(-1.234, 0.1)')).to.deep.equal({error: null, result: -1.2});
      expect(parser.parse('CEILING(-1.234, 0.1, "value")')).to.deep.equal({error: '#VALUE?', result: null});
    });

    it('COMBIN', () => {
      expect(parser.parse('COMBIN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COMBIN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COMBIN(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COMBIN(0, 0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COMBIN(1, 0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COMBIN(3, 1)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('COMBIN(3, 3)')).to.deep.equal({error: null, result: 1});
    });

    it('COMBINA', () => {
      expect(parser.parse('COMBINA()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COMBINA("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COMBINA(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COMBINA(0, 0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COMBINA(1, 0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COMBINA(3, 1)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('COMBINA(3, 3)')).to.deep.equal({error: null, result: 10});
    });

    it('COS', () => {
      expect(parser.parse('COS()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COS("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COS(0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COS(1)')).to.deep.equal({error: null, result: 0.5403023058681398});
    });

    it('COSH', () => {
      expect(parser.parse('COSH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COSH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COSH(0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COSH(1)')).to.deep.equal({error: null, result: 1.5430806348152437});
    });

    it('COT', () => {
      expect(parser.parse('COT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COT("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COT(0)')).to.deep.equal({error: null, result: Infinity});
      expect(parser.parse('COT(1)')).to.deep.equal({error: null, result: 0.6420926159343306});
      expect(parser.parse('COT(2)')).to.deep.equal({error: null, result: -0.45765755436028577});
    });

    it('COTH', () => {
      expect(parser.parse('COTH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COTH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('COTH(0)')).to.deep.equal({error: null, result: Infinity});
      expect(parser.parse('COTH(1)')).to.deep.equal({error: null, result: 1.3130352854993312});
      expect(parser.parse('COTH(2)')).to.deep.equal({error: null, result: 1.0373147207275482});
    });

    it('CSC', () => {
      expect(parser.parse('CSC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CSC("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CSC(0)')).to.deep.equal({error: null, result: Infinity});
      expect(parser.parse('CSC(1)')).to.deep.equal({error: null, result: 1.1883951057781212});
      expect(parser.parse('CSC(2)')).to.deep.equal({error: null, result: 1.0997501702946164});
    });

    it('CSCH', () => {
      expect(parser.parse('CSCH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CSCH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CSCH(0)')).to.deep.equal({error: null, result: Infinity});
      expect(parser.parse('CSCH(1)')).to.deep.equal({error: null, result: 0.8509181282393216});
      expect(parser.parse('CSCH(2)')).to.deep.equal({error: null, result: 0.27572056477178325});
    });

    it('DECIMAL', () => {
      expect(parser.parse('DECIMAL()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DECIMAL("value")')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('DECIMAL(1.3)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('DECIMAL("0", 2)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('DECIMAL("1010101", 2)')).to.deep.equal({error: null, result: 85});
      expect(parser.parse('DECIMAL("32b", 16)')).to.deep.equal({error: null, result: 811});
    });

    it('DEGREES', () => {
      expect(parser.parse('DEGREES()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DEGREES("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DEGREES(PI())')).to.deep.equal({error: null, result: 180});
      expect(parser.parse('DEGREES(PI() / 2)')).to.deep.equal({error: null, result: 90});
      expect(parser.parse('DEGREES(1.1)')).to.deep.equal({error: null, result: 63.02535746439057});
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
      expect(parser.parse('EVEN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EVEN("value")')).to.deep.equal({error: '#VALUE?', result: null});
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
      expect(parser.parse('FACT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FACT("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FACT(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('FACT(3)')).to.deep.equal({error: null, result: 6});
      expect(parser.parse('FACT(3.33)')).to.deep.equal({error: null, result: 6});
      expect(parser.parse('FACT(6)')).to.deep.equal({error: null, result: 720});
      expect(parser.parse('FACT(6.998)')).to.deep.equal({error: null, result: 720});
      expect(parser.parse('FACT(10)')).to.deep.equal({error: null, result: 3628800});
    });

    it('FACTDOUBLE', () => {
      expect(parser.parse('FACTDOUBLE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FACTDOUBLE("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FACTDOUBLE(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('FACTDOUBLE(3)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('FACTDOUBLE(3.33)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('FACTDOUBLE(6)')).to.deep.equal({error: null, result: 48});
      expect(parser.parse('FACTDOUBLE(6.998)')).to.deep.equal({error: null, result: 48});
      expect(parser.parse('FACTDOUBLE(10)')).to.deep.equal({error: null, result: 3840});
    });

    it('FLOOR', () => {
      expect(parser.parse('FLOOR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FLOOR("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FLOOR(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('FLOOR(3.33, 1.11)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('FLOOR(6.998, -1.99)')).to.deep.equal({error: null, result: 6});
      expect(parser.parse('FLOOR(-1, -10)')).to.deep.equal({error: null, result: -10});
    });

    it('GCD', () => {
      expect(parser.parse('GCD()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('GCD("value")')).to.deep.equal({error: '#VALUE?', result: null});
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
      expect(parser.parse('INT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('INT("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('INT(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('INT(1.1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('INT(1.5)')).to.deep.equal({error: null, result: 1});
    });

    it('LCM', () => {
      expect(parser.parse('LCM()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LCM("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LCM(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('LCM(1.1, 2)')).to.deep.equal({error: null, result: 2.2});
      expect(parser.parse('LCM(3, 8)')).to.deep.equal({error: null, result: 24});
    });

    it('LN', () => {
      expect(parser.parse('LN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LN(1)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse(`LN(${Math.E})`)).to.deep.equal({error: null, result: 1});
    });

    it('LOG', () => {
      expect(parser.parse('LOG()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOG("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOG(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOG(10, 10)')).to.deep.equal({error: null, result: 1});
    });

    it('LOG10', () => {
      expect(parser.parse('LOG10()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOG10("value")')).to.deep.equal({error: '#VALUE?', result: null});
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
      expect(parser.parse('MINUS(1.1, 1.2)')).to.deep.equal({error: null, result: -0.09999999999999987}); // JavaScript engine number precision
      expect(parser.parse('MINUS(1.2, 1.2)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('MINUS(1.3, 1.2)')).to.deep.equal({error: null, result: 0.10000000000000009}); // JavaScript engine number precision
    });

    it('MOD', () => {
      expect(parser.parse('MOD()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MOD("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MOD(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MOD(1, 2)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('MOD(3, 2)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('MOD(4, 0)')).to.deep.equal({error: '#DIV/0!', result: null});
    });

    it('MROUND', () => {
      expect(parser.parse('MROUND()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MROUND("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MROUND(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MROUND(1, 2)')).to.deep.equal({error: null, result: 2});
      expect(parser.parse('MROUND(3, 2)')).to.deep.equal({error: null, result: 4});
      expect(parser.parse('MROUND(-4, 1.1)')).to.deep.equal({error: '#NUM!', result: null});
    });

    it('MULTINOMIAL', () => {
      expect(parser.parse('MULTINOMIAL()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MULTINOMIAL("value")')).to.deep.equal({error: '#VALUE?', result: null});
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

    it('MUNIT', () => {
      expect(parser.parse('MUNIT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MUNIT("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MUNIT(3)')).to.deep.equal({error: null, result: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ]});
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
      expect(parser.parse('ODD()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ODD("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ODD(2)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('ODD(-34)')).to.deep.equal({error: null, result: -35});
      expect(parser.parse('ODD(11)')).to.deep.equal({error: null, result: 11});
    });

    it('PI', () => {
      expect(parser.parse('PI()')).to.deep.equal({error: null, result: Math.PI});
    });

    it('POWER', () => {
      expect(parser.parse('POWER()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('POWER("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('POWER(2)')).to.deep.equal({error: '#VALUE?', result: null});
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
      expect(parser.parse('PRODUCT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PRODUCT("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PRODUCT(2)')).to.deep.equal({error: null, result: 2});
      expect(parser.parse('PRODUCT(2, 4)')).to.deep.equal({error: null, result: 8});
      expect(parser.parse('PRODUCT(2, 8)')).to.deep.equal({error: null, result: 16});
      expect(parser.parse('PRODUCT(2, 8, 10, 10)')).to.deep.equal({error: null, result: 1600});
    });

    it('QUOTIENT', () => {
      expect(parser.parse('QUOTIENT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('QUOTIENT("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('QUOTIENT(2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('QUOTIENT(2, 4)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('QUOTIENT(8, 2)')).to.deep.equal({error: null, result: 4});
      expect(parser.parse('QUOTIENT(9, 2)')).to.deep.equal({error: null, result: 4});
      expect(parser.parse('QUOTIENT(-9, 2)')).to.deep.equal({error: null, result: -4});
    });

    it('RADIANS', () => {
      expect(parser.parse('RADIANS()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('RADIANS("value")')).to.deep.equal({error: '#VALUE?', result: null});
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
      expect(parser.parse('ROMAN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROMAN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROMAN(1)')).to.deep.equal({error: null, result: 'I'});
      expect(parser.parse('ROMAN(12)')).to.deep.equal({error: null, result: 'XII'});
      expect(parser.parse('ROMAN(12)')).to.deep.equal({error: null, result: 'XII'});
      expect(parser.parse('ROMAN(992)')).to.deep.equal({error: null, result: 'CMXCII'});
      expect(parser.parse('ROMAN(2000)')).to.deep.equal({error: null, result: 'MM'});
    });

    it('ROUND', () => {
      expect(parser.parse('ROUND()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUND("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUND(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUND(1.2234, 0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('ROUND(1.2234, 2)')).to.deep.equal({error: null, result: 1.22});
      expect(parser.parse('ROUND(1.2234578, 4)')).to.deep.equal({error: null, result: 1.2235});
      expect(parser.parse('ROUND(2345.2234578, -1)')).to.deep.equal({error: null, result: 2350});
      expect(parser.parse('ROUND(2345.2234578, -2)')).to.deep.equal({error: null, result: 2300});
    });

    it('ROUNDDOWN', () => {
      expect(parser.parse('ROUNDDOWN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUNDDOWN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUNDDOWN(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUNDDOWN(1.2234, 0)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('ROUNDDOWN(1.2234, 2)')).to.deep.equal({error: null, result: 1.22});
      expect(parser.parse('ROUNDDOWN(1.2234578, 4)')).to.deep.equal({error: null, result: 1.2234});
      expect(parser.parse('ROUNDDOWN(2345.2234578, -1)')).to.deep.equal({error: null, result: 2340});
      expect(parser.parse('ROUNDDOWN(2345.2234578, -2)')).to.deep.equal({error: null, result: 2300});
    });

    it('ROUNDUP', () => {
      expect(parser.parse('ROUNDUP()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUNDUP("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUNDUP(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('ROUNDUP(1.2234, 0)')).to.deep.equal({error: null, result: 2});
      expect(parser.parse('ROUNDUP(1.2234, 2)')).to.deep.equal({error: null, result: 1.23});
      expect(parser.parse('ROUNDUP(1.2234578, 4)')).to.deep.equal({error: null, result: 1.2235});
      expect(parser.parse('ROUNDUP(2345.2234578, -1)')).to.deep.equal({error: null, result: 2350});
      expect(parser.parse('ROUNDUP(2345.2234578, -2)')).to.deep.equal({error: null, result: 2400});
    });

    it('SEC', () => {
      expect(parser.parse('SEC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SEC("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SEC(1)')).to.deep.equal({error: null, result: 1.8508157176809255});
      expect(parser.parse('SEC(30)')).to.deep.equal({error: null, result: 6.482921234962678});
    });

    it('SECH', () => {
      expect(parser.parse('SECH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SECH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SECH(1)')).to.deep.equal({error: null, result: 0.6480542736638855});
      expect(parser.parse('SECH(30)')).to.deep.equal({error: null, result: 1.8715245937680314e-13});
    });

    it('SERIESSUM', () => {});

    it('SIGN', () => {
      expect(parser.parse('SIGN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SIGN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SIGN(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('SIGN(30)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('SIGN(-1.1)')).to.deep.equal({error: null, result: -1});
      expect(parser.parse('SIGN(0)')).to.deep.equal({error: null, result: 0});
    });

    it('SIN', () => {
      expect(parser.parse('SIN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SIN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse(`SIN(${Math.PI / 2})`)).to.deep.equal({error: null, result: 1});
    });

    it('SINH', () => {
      expect(parser.parse('SINH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SINH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SINH(1)')).to.deep.equal({error: null, result: 1.1752011936438014});
    });

    it('SQRT', () => {
      expect(parser.parse('SQRT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SQRT("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SQRT(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('SQRT(9)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('SQRT(64)')).to.deep.equal({error: null, result: 8});
    });

    it('SQRTPI', () => {
      expect(parser.parse('SQRTPI()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SQRTPI("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SQRTPI(64)')).to.deep.equal({error: null, result: 14.179630807244127});
    });

    it('SUBTOTAL', () => {});

    it('SUM', () => {
      expect(parser.parse('SUM()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('SUM("value")')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('SUM(64)')).to.deep.equal({error: null, result: 64});
      expect(parser.parse('SUM(64, 3.3, 0.1)')).to.deep.equal({error: null, result: 67.39999999999999});
    });

    it('SUMIF', () => {});
    it('SUMIFS', () => {});
    it('SUMPRODUCT', () => {});

    it('SUMSQ', () => {
      expect(parser.parse('SUMSQ()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SUMSQ("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SUMSQ(64)')).to.deep.equal({error: null, result: 4096});
      expect(parser.parse('SUMSQ(64, 3.3, 0.1)')).to.deep.equal({error: null, result: 4106.900000000001});
    });

    it('SUMX2MY2', () => {});
    it('SUMX2PY2', () => {});
    it('SUMXMY2', () => {});

    it('TAN', () => {
      expect(parser.parse('TAN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TAN("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TAN(1)')).to.deep.equal({error: null, result: 1.5574077246549023});
      expect(parser.parse('TAN(RADIANS(45))')).to.deep.equal({error: null, result: 0.9999999999999999});
    });

    it('TANH', () => {
      expect(parser.parse('TANH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TANH("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TANH(1)')).to.deep.equal({error: null, result: 0.761594155955765});
    });

    it('TRUNC', () => {
      expect(parser.parse('TRUNC()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TRUNC("value")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TRUNC(1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('TRUNC(1.99988877)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('TRUNC(-221.99988877)')).to.deep.equal({error: null, result: -221});
      expect(parser.parse('TRUNC(0.99988877)')).to.deep.equal({error: null, result: 0});
    });
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/miscellaneous.js
  describe('Miscellaneous', () => {
    it('NUMERAL', () => {
      expect(parser.parse('NUMERAL()')).to.deep.equal({error: null, result: '0'});
      expect(parser.parse('NUMERAL(100, "0,0.000")')).to.deep.equal({error: null, result: '100.000'});
      expect(parser.parse('NUMERAL(100, "$0,0.0")')).to.deep.equal({error: null, result: '$100.0'});
    });

    it('UNIQUE', () => {
      expect(parser.parse('UNIQUE()')).to.deep.equal({error: null, result: []});
      expect(parser.parse('UNIQUE(1, 2, 3, 4, 4, 4, 4, 3)')).to.deep.equal({error: null, result: [1, 2, 3, 4]});
      expect(parser.parse('UNIQUE("foo", "bar", "foo")')).to.deep.equal({error: null, result: ['foo', 'bar']});
    });

    it('ARGS2ARRAY', () => {
      expect(parser.parse('ARGS2ARRAY()')).to.deep.equal({error: null, result: []});
      expect(parser.parse('ARGS2ARRAY(1, 4, 4, 3)')).to.deep.equal({error: null, result: [1, 4, 4, 3]});
      expect(parser.parse('ARGS2ARRAY("foo", "bar", "foo")')).to.deep.equal({error: null, result: ['foo', 'bar', 'foo']});
    });

    it('FLATTEN', () => {});
    it('JOIN', () => {});

    it('NUMBERS', () => {
      expect(parser.parse('NUMBERS()')).to.deep.equal({error: null, result: []});
      expect(parser.parse('NUMBERS(1, "4", "4", 3)')).to.deep.equal({error: null, result: [1, 3]});
      expect(parser.parse('NUMBERS("foo", 2, "bar", "foo")')).to.deep.equal({error: null, result: [2]});
    });

    it('REFERENCE', () => {});
  });

  // https://github.com/sutoiku/formula.js/blob/master/lib/statistical.js
  describe('Statistical', () => {
    it('AVEDEV', () => {
      expect(parser.parse('AVEDEV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('AVEDEV(1.1)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('AVEDEV(1.1, 2)')).to.deep.equal({error: null, result: 0.44999999999999996});
      expect(parser.parse('AVEDEV(1.1, 2, 5)')).to.deep.equal({error: null, result: 1.5333333333333332});
      expect(parser.parse('AVEDEV(1.1, 2, 5, 10)')).to.deep.equal({error: null, result: 2.975});
    });

    it('AVERAGE', () => {
      expect(parser.parse('AVERAGE()')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('AVERAGE(1.1)')).to.deep.equal({error: null, result: 1.1});
      expect(parser.parse('AVERAGE(1.1, 2, 5, 10)')).to.deep.equal({error: null, result: 4.525});
      expect(parser.parse('AVERAGE(1.1, TRUE, 2, NULL, 5, 10)')).to.deep.equal({error: null, result: 4.525});
    });

    it('AVERAGEA', () => {
      expect(parser.parse('AVERAGEA()')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('AVERAGEA(1.1)')).to.deep.equal({error: null, result: 1.1});
      expect(parser.parse('AVERAGEA(1.1, 2, 5, 10)')).to.deep.equal({error: null, result: 4.525});
      expect(parser.parse('AVERAGEA(1.1, TRUE, 2, NULL, 5, 10)')).to.deep.equal({error: null, result: 3.8200000000000003});
    });

    it('AVERAGEIF', () => {});
    it('AVERAGEIFS', () => {});

    it('BETADIST', () => {
      expect(parser.parse('BETADIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BETADIST(2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BETADIST(2, 8)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BETADIST(2, 8, 10)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BETADIST(2, 8, 10, TRUE, 1)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('BETADIST(2, 8, 10, TRUE, 1, 3)')).to.deep.equal({error: null, result: 0.6854705810117458});
      expect(parser.parse('BETA.DIST(2, 8, 10, TRUE, 1, 3)')).to.deep.equal({error: null, result: 0.6854705810117458});
    });

    it('BETAINV', () => {
      expect(parser.parse('BETAINV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BETAINV(0.6854705810117458, 8, 10, 1, 3)')).to.deep.equal({error: null, result: 1.9999999999999996});
      expect(parser.parse('BETA.INV(0.6854705810117458, 8, 10, 1, 3)')).to.deep.equal({error: null, result: 1.9999999999999996});
    });

    it('BINOMDIST', () => {
      expect(parser.parse('BINOMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOMDIST(6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOMDIST(6, 10)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOMDIST(6, 10, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOMDIST(6, 10, 0.5, FALSE)')).to.deep.equal({error: null, result: 0.205078125});
      expect(parser.parse('BINOM.DIST(6, 10, 0.5, FALSE)')).to.deep.equal({error: null, result: 0.205078125});
    });

    it('BINOM.DIST.RANGE', () => {
      expect(parser.parse('BINOM.DIST.RANGE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOM.DIST.RANGE(60)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOM.DIST.RANGE(60, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOM.DIST.RANGE(60, 0.5, 34)')).to.deep.equal({error: null, result: 0.060616586840172675});
    });

    it('BINOM.INV', () => {
      expect(parser.parse('BINOM.INV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOM.INV(6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOM.INV(6, 0.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('BINOM.INV(6, 0.5, 0.7)')).to.deep.equal({error: null, result: 4});
    });

    it('CHISQ.DIST', () => {
      expect(parser.parse('CHISQ.DIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CHISQ.DIST(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CHISQ.DIST(0.5, 1)')).to.deep.equal({error: null, result: 0.43939128946770356});
      expect(parser.parse('CHISQ.DIST(0.5, 1, TRUE)')).to.deep.equal({error: null, result: 0.5204998778130242});
    });

    it('CHISQ.DIST.RT', () => {
      expect(parser.parse('CHISQ.DIST.RT()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('CHISQ.DIST.RT(0.5)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('CHISQ.DIST.RT(0.5, 1)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CHISQ.DIST.RT(3, 5)')).to.deep.equal({error: null, result: 0.6999858358786271});
    });

    it('CHISQ.INV', () => {
      expect(parser.parse('CHISQ.INV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CHISQ.INV(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CHISQ.INV(0.5, 6)')).to.deep.equal({error: null, result: 5.348120627447116});
    });

    it('CHISQ.INV.RT', () => {
      expect(parser.parse('CHISQ.INV.RT()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('CHISQ.INV.RT(0.5)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('CHISQ.INV.RT(-1, 2)')).to.deep.equal({error: '#NUM!', result: null});
      expect(parser.parse('CHISQ.INV.RT(0.4, 6)')).to.deep.equal({error: null, result: 6.2107571945266935});
    });

    it('COLUMN', () => {});
    it('COLUMNS', () => {});

    it('CONFIDENCE', () => {
      expect(parser.parse('CONFIDENCE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CONFIDENCE(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CONFIDENCE(0.5, 1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CONFIDENCE(0.5, 1, 5)')).to.deep.equal({error: null, result: 0.301640986313058});
      expect(parser.parse('CONFIDENCE.NORM(0.5, 1, 5)')).to.deep.equal({error: null, result: 0.301640986313058});
    });

    it('CONFIDENCE.T', () => {
      expect(parser.parse('CONFIDENCE.T()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CONFIDENCE.T(0.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CONFIDENCE.T(0.5, 1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CONFIDENCE.T(0.5, 1, 5)')).to.deep.equal({error: null, result: 0.33124980616238564});
    });

    it('CORREL', () => {});

    it('COUNT', () => {
      expect(parser.parse('COUNT()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('COUNT(0.5)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COUNT(TRUE, 0.5, "foo", 1, 8)')).to.deep.equal({error: null, result: 3});
    });

    it('COUNTA', () => {
      expect(parser.parse('COUNTA()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('COUNTA(0.5)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('COUNTA(TRUE, 0.5, "foo", 1, 8)')).to.deep.equal({error: null, result: 5});
    });

    it('COUNTBLANK', () => {
      expect(parser.parse('COUNTBLANK()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('COUNTBLANK(0.5)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('COUNTBLANK(TRUE, 0.5, "", 1, 8)')).to.deep.equal({error: null, result: 1});
    });

    it('COUNTIF', () => {});
    it('COUNTIFS', () => {});
    it('COUNTIN', () => {});

    it('COUNTUNIQUE', () => {
      expect(parser.parse('COUNTUNIQUE()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('COUNTUNIQUE(1, 1, 2, 2, 3)')).to.deep.equal({error: null, result: 3});
      expect(parser.parse('COUNTUNIQUE(1, 1, 2, 2, 3, "a", "a")')).to.deep.equal({error: null, result: 4});
    });

    it('COVARIANCE.P', () => {});
    it('COVARIANCE.S', () => {});
    it('DEVSQ', () => {});

    it('EXPONDIST', () => {
      expect(parser.parse('EXPONDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EXPONDIST(0.2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('EXPONDIST(0.2, 10)')).to.deep.equal({error: null, result: 1.353352832366127});
      expect(parser.parse('EXPONDIST(0.2, 10, TRUE)')).to.deep.equal({error: null, result: 0.8646647167633873});
      expect(parser.parse('EXPONDIST(0.2, 10, TRUE)')).to.deep.equal({error: null, result: 0.8646647167633873});
    });

    it('FDIST', () => {
      expect(parser.parse('FDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FDIST(15)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FDIST(15, 6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FDIST(15, 6, 4)')).to.deep.equal({error: null, result: 0.001271446907932903});
      expect(parser.parse('FDIST(15, 6, 4, TRUE)')).to.deep.equal({error: null, result: 0.9897419523940192});
      expect(parser.parse('F.DIST(15, 6, 4, TRUE)')).to.deep.equal({error: null, result: 0.9897419523940192});
    });

    it('FDISTRT', () => {
      expect(parser.parse('FDISTRT()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('FDISTRT(15)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('FDISTRT(15, 6)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('FDISTRT(15, 6, 4)')).to.deep.equal({error: null, result: 0.010258047605980813});
      expect(parser.parse('F.DIST.RT(15, 6, 4)')).to.deep.equal({error: null, result: 0.010258047605980813});
    });

    it('FINV', () => {
      expect(parser.parse('FINV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FINV(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FINV(0.1, 6)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FINV(0.1, 6, 4)')).to.deep.equal({error: null, result: 0.31438998832176834});
      expect(parser.parse('F.INV(0.1, 6, 4)')).to.deep.equal({error: null, result: 0.31438998832176834});
    });

    it('FINV', () => {
      expect(parser.parse('FINVRT()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('FINVRT(0.1)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('FINVRT(0.1, 6)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('FINVRT(0.1, 6, 4)')).to.deep.equal({error: null, result: 4.009749312673947});
      expect(parser.parse('F.INV.RT(0.1, 6, 4)')).to.deep.equal({error: null, result: 4.009749312673947});
    });

    it('FISHER', () => {
      expect(parser.parse('FISHER()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FISHER(0.1)')).to.deep.equal({error: null, result: 0.10033534773107562});
      expect(parser.parse('FISHER(1)')).to.deep.equal({error: null, result: Infinity});
    });

    it('FISHERINV', () => {
      expect(parser.parse('FISHERINV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FISHERINV(0.1)')).to.deep.equal({error: null, result: 0.09966799462495583});
      expect(parser.parse('FISHERINV(1)')).to.deep.equal({error: null, result: 0.761594155955765});
    });

    it('FORECAST', () => {});
    it('FREQUENCY', () => {});

    it('GAMMA', () => {
      expect(parser.parse('GAMMA()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('GAMMA(0.1)')).to.deep.equal({error: null, result: 9.51350769866877});
    });

    it('GAMMADIST', () => {
      expect(parser.parse('GAMMADIST()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMADIST(1)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMADIST(1, 3)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMADIST(1, 3, 7)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMADIST(1, 3, 7, TRUE)')).to.deep.equal({error: null, result: 0.00043670743091302124});
      expect(parser.parse('GAMMA.DIST(1, 3, 7, TRUE)')).to.deep.equal({error: null, result: 0.00043670743091302124});
    });

    it('GAMMAINV', () => {
      expect(parser.parse('GAMMAINV()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMAINV(1)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMAINV(1, 3)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMAINV(1, 3, 7)')).to.deep.equal({error: null, result: 1233.435565298214});
      expect(parser.parse('GAMMA.INV(1, 3, 7)')).to.deep.equal({error: null, result: 1233.435565298214});
    });

    it('GAMMALN', () => {
      expect(parser.parse('GAMMALN()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('GAMMALN(4)')).to.deep.equal({error: null, result: 1.7917594692280547});
    });

    it('GAMMALN.PRECISE', () => {
      expect(parser.parse('GAMMALN.PRECISE()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('GAMMALN.PRECISE(4)')).to.deep.equal({error: null, result: 1.7917594692280547});
    });

    it('GAUSS', () => {
      expect(parser.parse('GAUSS()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('GAUSS(4)')).to.deep.equal({error: null, result: 0.4999683287581669});
    });

    it('GEOMEAN', () => {});
    it('GROWTH', () => {});
    it('HARMEAN', () => {});
    it('HYPGEOMDIST', () => {});
    it('INTERCEPT', () => {});
    it('KURT', () => {});
    it('LARGE', () => {});
    it('LINEST', () => {});
    it('LOGEST', () => {});

    it('LOGNORMDIST', () => {
      expect(parser.parse('LOGNORMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOGNORMDIST(4)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOGNORMDIST(4, 3.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOGNORMDIST(4, 3.5, 1.2)')).to.deep.equal({error: null, result: 0.01761759668181924});
      expect(parser.parse('LOGNORMDIST(4, 3.5, 1.2, TRUE)')).to.deep.equal({error: null, result: 0.0390835557068005});
      expect(parser.parse('LOGNORM.DIST(4, 3.5, 1.2, TRUE)')).to.deep.equal({error: null, result: 0.0390835557068005});
    });

    it('LOGNORMINV', () => {
      expect(parser.parse('LOGNORMINV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOGNORMINV(0.0390835557068005)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOGNORMINV(0.0390835557068005, 3.5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOGNORMINV(0.0390835557068005, 3.5, 1.2)')).to.deep.equal({error: null, result: 4.000000000000004});
      expect(parser.parse('LOGNORM.INV(0.0390835557068005, 3.5, 1.2)')).to.deep.equal({error: null, result: 4.000000000000004});
    });

    it('MAX', () => {
      expect(parser.parse('MAX()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('MAX(-1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: 9.2});
    });

    it('MAXA', () => {
      expect(parser.parse('MAXA()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('MAXA(-1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: 9.2});
    });

    it('MEDIAN', () => {
      expect(parser.parse('MEDIAN()')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('MEDIAN(1, 9, 9.2, 4)')).to.deep.equal({error: null, result: 6.5});
    });

    it('MIN', () => {
      expect(parser.parse('MIN()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('MIN(-1.1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: -1.1});
    });

    it('MINA', () => {
      expect(parser.parse('MINA()')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('MINA(-1.1, 9, 9.2, 4, "foo", TRUE)')).to.deep.equal({error: null, result: -1.1});
    });

    it('MODEMULT', () => {});
    it('MODESNGL', () => {});

    it('NEGBINOMDIST', () => {
      expect(parser.parse('NEGBINOMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NEGBINOMDIST(10)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NEGBINOMDIST(10, 5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NEGBINOMDIST(10, 5, 0.25)')).to.deep.equal({error: null, result: 0.05504866037517786});
      expect(parser.parse('NEGBINOMDIST(10, 5, 0.25, TRUE)')).to.deep.equal({error: null, result: 0.3135140584781766});
      expect(parser.parse('NEGBINOM.DIST(10, 5, 0.25, TRUE)')).to.deep.equal({error: null, result: 0.3135140584781766});
    });

    it('NORMDIST', () => {
      expect(parser.parse('NORMDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMDIST(1, 0)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMDIST(1, 0, 1)')).to.deep.equal({error: null, result: 0.24197072451914337});
      expect(parser.parse('NORMDIST(1, 0, 1, TRUE)')).to.deep.equal({error: null, result: 0.8413447460685429});
      expect(parser.parse('NORM.DIST(1, 0, 1, TRUE)')).to.deep.equal({error: null, result: 0.8413447460685429});
    });

    it('NORMINV', () => {
      expect(parser.parse('NORMINV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMINV(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMINV(1, 0)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMINV(1, 0, 1)')).to.deep.equal({error: null, result: 141.4213562373095});
      expect(parser.parse('NORM.INV(1, 0, 1)')).to.deep.equal({error: null, result: 141.4213562373095});
    });

    it('NORMSDIST', () => {
      expect(parser.parse('NORMSDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMSDIST(1)')).to.deep.equal({error: null, result: 0.24197072451914337});
      expect(parser.parse('NORMSDIST(1, TRUE)')).to.deep.equal({error: null, result: 0.8413447460685429});
      expect(parser.parse('NORM.S.DIST(1, TRUE)')).to.deep.equal({error: null, result: 0.8413447460685429});
    });

    it('NORMSINV', () => {
      expect(parser.parse('NORMSINV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('NORMSINV(1)')).to.deep.equal({error: null, result: 141.4213562373095});
      expect(parser.parse('NORM.S.INV(1)')).to.deep.equal({error: null, result: 141.4213562373095});
    });

    it('PEARSON', () => {});
    it('PERCENTILEEXC', () => {});
    it('PERCENTILEINC', () => {});
    it('PERCENTRANKEXC', () => {});
    it('PERCENTRANKINC', () => {});

    it('PERMUT', () => {
      expect(parser.parse('PERMUT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PERMUT(10)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PERMUT(10, 3)')).to.deep.equal({error: null, result: 720});
    });

    it('PERMUTATIONA', () => {
      expect(parser.parse('PERMUTATIONA()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PERMUTATIONA(10)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PERMUTATIONA(10, 3)')).to.deep.equal({error: null, result: 1000});
    });

    it('PHI', () => {
      expect(parser.parse('PHI()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PHI(1)')).to.deep.equal({error: null, result: 0.24197072451914337});
    });

    it('POISSONDIST', () => {
      expect(parser.parse('POISSONDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('POISSONDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('POISSONDIST(1, 3)')).to.deep.equal({error: null, result: 0.14936120510359185});
      expect(parser.parse('POISSONDIST(1, 3, TRUE)')).to.deep.equal({error: null, result: 0.1991482734714558});
      expect(parser.parse('POISSON.DIST(1, 3, TRUE)')).to.deep.equal({error: null, result: 0.1991482734714558});
    });

    it('PROB', () => {});
    it('QUARTILEEXC', () => {});
    it('QUARTILEINC', () => {});
    it('RANKAVG', () => {});
    it('RANKEQ', () => {});
    it('ROW', () => {});
    it('ROWS', () => {});
    it('RSQ', () => {});
    it('SKEW', () => {});
    it('SKEWP', () => {});
    it('SLOPE', () => {});
    it('SMALL', () => {});

    it('STANDARDIZE', () => {
      expect(parser.parse('STANDARDIZE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('STANDARDIZE(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('STANDARDIZE(1, 3)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('STANDARDIZE(1, 3, 5)')).to.deep.equal({error: null, result: -0.4});
    });

    it('STDEVP', () => {});
    it('STDEVS', () => {});
    it('STDEVA', () => {});
    it('STDEVPA', () => {});
    it('STEYX', () => {});
    it('TRANSPOSE', () => {});

    it('TDIST', () => {
      expect(parser.parse('TDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TDIST(1, 3)')).to.deep.equal({error: null, result: 0.20674833520290584});
      expect(parser.parse('TDIST(1, 3, TRUE)')).to.deep.equal({error: null, result: 0.8044988904727264});
      expect(parser.parse('T.DIST(1, 3, TRUE)')).to.deep.equal({error: null, result: 0.8044988904727264});
    });

    it('T.DIST.2T', () => {
      expect(parser.parse('T.DIST.2T()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('T.DIST.2T(1)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('T.DIST.2T(1, 6)')).to.deep.equal({error: null, result: 0.3559176837495821});
    });

    it('T.DIST.RT', () => {
      expect(parser.parse('T.DIST.RT()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('T.DIST.RT(1)')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('T.DIST.RT(1, 6)')).to.deep.equal({error: null, result: 0.17795884187479105});
    });

    it('TINV', () => {
      expect(parser.parse('TINV()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TINV(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TINV(0.1, 6)')).to.deep.equal({error: null, result: -1.4397557472652736});
      expect(parser.parse('T.INV(0.1, 6)')).to.deep.equal({error: null, result: -1.4397557472652736});
    });

    it('T.INV.2T', () => {
      expect(parser.parse('T.INV.2T()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('T.INV.2T(0.1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('T.INV.2T(0.1, 6)')).to.deep.equal({error: null, result: 1.9431802743487372});
    });

    it('TREND', () => {});
    it('TRIMMEAN', () => {});

    it('VARP', () => {
      expect(parser.parse('VARP()')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('VARP(1)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('VARP(1, 2)')).to.deep.equal({error: null, result: 0.25});
      expect(parser.parse('VARP(1, 2, 3)')).to.deep.equal({error: null, result: 0.6666666666666666});
      expect(parser.parse('VARP(1, 2, 3, 4)')).to.deep.equal({error: null, result: 1.25});
      expect(parser.parse('VAR.P(1, 2, 3, 4)')).to.deep.equal({error: null, result: 1.25});
    });

    it('VARS', () => {
      expect(parser.parse('VARS()')).to.deep.equal({error: null, result: -0});
      expect(parser.parse('VARS(1)')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('VARS(1, 2)')).to.deep.equal({error: null, result: 0.5});
      expect(parser.parse('VARS(1, 2, 3)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('VARS(1, 2, 3, 4)')).to.deep.equal({error: null, result: 1.6666666666666667});
      expect(parser.parse('VAR.S(1, 2, 3, 4)')).to.deep.equal({error: null, result: 1.6666666666666667});
      expect(parser.parse('VAR.S(1, 2, 3, 4, TRUE, "foo")')).to.deep.equal({error: null, result: 1.6666666666666667});
    });

    it('VARA', () => {
      expect(parser.parse('VARA()')).to.deep.equal({error: null, result: -0});
      expect(parser.parse('VARA(1)')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('VARA(1, 2)')).to.deep.equal({error: null, result: 0.5});
      expect(parser.parse('VARA(1, 2, 3)')).to.deep.equal({error: null, result: 1});
      expect(parser.parse('VARA(1, 2, 3, 4)')).to.deep.equal({error: null, result: 1.6666666666666667});
      expect(parser.parse('VARA(1, 2, 3, 4, TRUE, "foo")')).to.deep.equal({error: null, result: 2.166666666666667});
    });

    it('VARPA', () => {
      expect(parser.parse('VARPA()')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('VARPA(1)')).to.deep.equal({error: null, result: 0});
      expect(parser.parse('VARPA(1, 2)')).to.deep.equal({error: null, result: 0.25});
      expect(parser.parse('VARPA(1, 2, 3)')).to.deep.equal({error: null, result: 0.6666666666666666});
      expect(parser.parse('VARPA(1, 2, 3, 4)')).to.deep.equal({error: null, result: 1.25});
      expect(parser.parse('VARPA(1, 2, 3, 4, TRUE, "foo")')).to.deep.equal({error: null, result: 1.8055555555555556});
    });

    it('WEIBULLDIST', () => {
      expect(parser.parse('WEIBULLDIST()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('WEIBULLDIST(1)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('WEIBULLDIST(1, 2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('WEIBULLDIST(1, 2, 3)')).to.deep.equal({error: null, result: 0.1988531815143044});
      expect(parser.parse('WEIBULLDIST(1, 2, 3, TRUE)')).to.deep.equal({error: null, result: 0.10516068318563021});
      expect(parser.parse('WEIBULL.DIST(1, 2, 3, TRUE)')).to.deep.equal({error: null, result: 0.10516068318563021});
    });
  });

  // https://github.com/sutoiku/formula.js/blob/master/test/text.js
  describe('Text', () => {
    it('CHAR', () => {
      expect(parser.parse('CHAR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('CHAR(33)')).to.deep.equal({error: null, result: '!'});
    });

    it('CLEAN', () => {
      expect(parser.parse('CLEAN()')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('CLEAN(CHAR(9)&"Monthly report"&CHAR(10))')).to.deep.equal({error: null, result: 'Monthly report'});
    });

    it('CODE', () => {
      expect(parser.parse('CODE()')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('CODE("a")')).to.deep.equal({error: null, result: 97});
    });

    it('CONCATENATE', () => {
      expect(parser.parse('CONCATENATE()')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('CONCATENATE("a")')).to.deep.equal({error: null, result: 'a'});
      expect(parser.parse('CONCATENATE("a", 1)')).to.deep.equal({error: null, result: 'a1'});
      expect(parser.parse('CONCATENATE("a", 1, TRUE)')).to.deep.equal({error: null, result: 'a1TRUE'});
    });

    it('DOLLAR', () => {
      expect(parser.parse('DOLLAR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('DOLLAR(1100)')).to.deep.equal({error: null, result: '$1,100.00'});
      expect(parser.parse('DOLLAR(1100, -2)')).to.deep.equal({error: null, result: '$1,100'});
    });

    it('EXACT', () => {
      expect(parser.parse('EXACT()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('EXACT(1100)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('EXACT(1100, -2)')).to.deep.equal({error: null, result: false});
      expect(parser.parse('EXACT(1100, 1100)')).to.deep.equal({error: null, result: true});
      expect(parser.parse('EXACT(1100, "1100")')).to.deep.equal({error: null, result: false});
    });

    it('FIND', () => {
      expect(parser.parse('FIND()')).to.deep.equal({error: null, result: null});
      expect(parser.parse('FIND("o")')).to.deep.equal({error: null, result: null});
      expect(parser.parse('FIND("o", "FooBar")')).to.deep.equal({error: null, result: 2});
      expect(parser.parse('FIND("O", "FooBar")')).to.deep.equal({error: null, result: 0});
    });

    it('FIXED', () => {
      expect(parser.parse('FIXED()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('FIXED(12345.11, -1)')).to.deep.equal({error: null, result: '12,350'});
      expect(parser.parse('FIXED(12345.11, 0)')).to.deep.equal({error: null, result: '12,345'});
      expect(parser.parse('FIXED(12345.11, 0, TRUE)')).to.deep.equal({error: null, result: '12345'});
      expect(parser.parse('FIXED(12345.11, 4, TRUE)')).to.deep.equal({error: null, result: '12345.1100'});
    });

    it('HTML2TEXT', () => {
      expect(parser.parse('HTML2TEXT()')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('HTML2TEXT("Click <a>Link</a>")')).to.deep.equal({error: null, result: 'Click Link'});
    });

    it('LEFT', () => {
      expect(parser.parse('LEFT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LEFT("Foo Bar")')).to.deep.equal({error: null, result: 'F'});
      expect(parser.parse('LEFT("Foo Bar", 3)')).to.deep.equal({error: null, result: 'Foo'});
    });

    it('LEN', () => {
      expect(parser.parse('LEN()')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('LEN(TRUE)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LEN(1023)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LEN("Foo Bar")')).to.deep.equal({error: null, result: 7});
    });

    it('LOWER', () => {
      expect(parser.parse('LOWER()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('LOWER("")')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('LOWER("Foo Bar")')).to.deep.equal({error: null, result: 'foo bar'});
    });

    it('MID', () => {
      expect(parser.parse('MID()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MID("")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MID("Foo Bar", 2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('MID("Foo Bar", 2, 5)')).to.deep.equal({error: null, result: 'oo Ba'});
    });

    it('PROPER', () => {
      expect(parser.parse('PROPER()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PROPER("")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('PROPER(TRUE)')).to.deep.equal({error: null, result: 'True'});
      expect(parser.parse('PROPER(1234)')).to.deep.equal({error: null, result: '1234'});
      expect(parser.parse('PROPER("foo bar")')).to.deep.equal({error: null, result: 'Foo Bar'});
    });

    it('REGEXEXTRACT', () => {
      expect(parser.parse('REGEXEXTRACT()')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('REGEXEXTRACT("extract foo bar", "(foo)")')).to.deep.equal({error: null, result: 'foo'});
      expect(parser.parse('REGEXEXTRACT("pressure 12.21bar", "([0-9]+.[0-9]+)")')).to.deep.equal({error: null, result: '12.21'});
    });

    it('REGEXREPLACE', () => {
      expect(parser.parse('REGEXREPLACE()')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('REGEXREPLACE("extract foo bar", "(foo)", "baz")')).to.deep.equal({error: null, result: 'extract baz bar'});
      expect(parser.parse('REGEXREPLACE("pressure 12.21bar", "([0-9]+.[0-9]+)", "43.1")')).to.deep.equal({error: null, result: 'pressure 43.1bar'});
    });

    it('REGEXMATCH', () => {
      expect(parser.parse('REGEXMATCH()')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('REGEXMATCH("pressure 12.21bar", "([0-9]+.[0-9]+)")')).to.deep.equal({error: null, result: true});

      const result = parser.parse('REGEXMATCH("pressure 12.33bar", "([0-9]+.[0-9]+)", TRUE)');

      expect(result).to.be.an('object');
    });

    it('REPLACE', () => {
      expect(parser.parse('REPLACE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('REPLACE("foo bar")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('REPLACE("foo bar", 2)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('REPLACE("foo bar", 2, 5)')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('REPLACE("foo bar", 2, 5, "*")')).to.deep.equal({error: null, result: 'f*r'});
    });

    it('REPT', () => {
      expect(parser.parse('REPT()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('REPT("foo ")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('REPT("foo ", 5)')).to.deep.equal({error: null, result: 'foo foo foo foo foo '});
    });

    it('RIGHT', () => {
      expect(parser.parse('RIGHT()')).to.deep.equal({error: null, result: null});
      expect(parser.parse('RIGHT("foo bar")')).to.deep.equal({error: null, result: 'r'});
      expect(parser.parse('RIGHT("foo bar", 4)')).to.deep.equal({error: null, result: ' bar'});
    });

    it('SEARCH', () => {
      expect(parser.parse('SEARCH()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SEARCH("bar")')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('SEARCH("bar", "foo bar")')).to.deep.equal({error: null, result: 5});
    });

    it('SPLIT', () => {
      expect(parser.parse('SPLIT()')).to.deep.equal({error: '#ERROR!', result: null});
      expect(parser.parse('SPLIT("foo bar baz")')).to.deep.equal({error: null, result: ['foo bar baz']});
      expect(parser.parse('SPLIT("foo bar baz", " ")')).to.deep.equal({error: null, result: ['foo', 'bar', 'baz']});
    });

    it('SUBSTITUTE', () => {
      expect(parser.parse('SUBSTITUTE()')).to.deep.equal({error: null, result: true});
      expect(parser.parse('SUBSTITUTE("foo bar baz")')).to.deep.equal({error: null, result: 'foo bar baz'});
      expect(parser.parse('SUBSTITUTE("foo bar baz", "a", "A")')).to.deep.equal({error: null, result: 'foo bAr bAz'});
    });

    it('T', () => {
      expect(parser.parse('T()')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('T(TRUE)')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('T(9.887)')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('T("foo bar baz")')).to.deep.equal({error: null, result: 'foo bar baz'});
    });

    it('TEXT', () => {
      expect(parser.parse('TEXT()')).to.deep.equal({error: '#N/A', result: null});
      expect(parser.parse('TEXT(1234.99)')).to.deep.equal({error: null, result: '1,235'});
      expect(parser.parse('TEXT(1234.99, "####.#")')).to.deep.equal({error: null, result: '1235.0'});
      expect(parser.parse('TEXT(1234.99, "####.###")')).to.deep.equal({error: null, result: '1234.990'});
    });

    it('TRIM', () => {
      expect(parser.parse('TRIM()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('TRIM("")')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('TRIM("     ")')).to.deep.equal({error: null, result: ''});
      expect(parser.parse('TRIM("   foo  ")')).to.deep.equal({error: null, result: 'foo'});
    });

    it('UNICHAR', () => {
      expect(parser.parse('UNICHAR()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('UNICHAR(33)')).to.deep.equal({error: null, result: '!'});
    });

    it('UNICODE', () => {
      expect(parser.parse('UNICODE()')).to.deep.equal({error: null, result: NaN});
      expect(parser.parse('UNICODE("!")')).to.deep.equal({error: null, result: 33});
    });

    it('UPPER', () => {
      expect(parser.parse('UPPER()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('UPPER("foo Bar")')).to.deep.equal({error: null, result: 'FOO BAR'});
    });

    it('VALUE', () => {
      expect(parser.parse('VALUE()')).to.deep.equal({error: '#VALUE?', result: null});
      expect(parser.parse('VALUE("$1,000")')).to.deep.equal({error: null, result: 1000});
      expect(parser.parse('VALUE("01:00:00")')).to.deep.equal({error: null, result: 3600});
      expect(parser.parse('VALUE("foo Bar")')).to.deep.equal({error: null, result: 0});
    });
  });
});
