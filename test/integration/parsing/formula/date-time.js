import {Parser} from '../../../../src/parser';

describe('.parse() date & time formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('DATE', () => {
    expect(parser.parse('DATE()')).to.deep.equal({error: '#VALUE!', result: null});

    const {error, result} = parser.parse('DATE(2001, 5, 12)');

    expect(error).to.be.null;
    expect(result.getFullYear()).to.be.eq(2001);
    expect(result.getMonth()).to.be.eq(4); // counting from zero
    expect(result.getDate()).to.be.eq(12);
  });

  it('DATEVALUE', () => {
    expect(parser.parse('DATEVALUE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DATEVALUE("1/1/1900")')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('DATEVALUE("1/1/2000")')).to.deep.equal({error: null, result: 36526});
  });

  it('DAY', () => {
    expect(parser.parse('DAY()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DAY(1)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('DAY(2958465)')).to.deep.equal({error: null, result: 31});
    expect(parser.parse('DAY("2958465")')).to.deep.equal({error: null, result: 31});
  });

  it('DAYS', () => {
    expect(parser.parse('DAYS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DAYS(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DAYS(1, 6)')).to.deep.equal({error: null, result: -5});
    expect(parser.parse('DAYS("1/2/2000", "1/10/2001")')).to.deep.equal({error: null, result: -374});
  });

  it('DAYS360', () => {
    expect(parser.parse('DAYS360()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DAYS360(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DAYS360(1, 6)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DAYS360("1/1/1901", "2/1/1901", TRUE)')).to.deep.equal({error: null, result: 30});
    expect(parser.parse('DAYS360("1/1/1901", "12/31/1901", FALSE)')).to.deep.equal({error: null, result: 360});
  });

  it('EDATE', () => {
    expect(parser.parse('EDATE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('EDATE(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('EDATE("1/1/1900", 1)')).to.deep.equal({error: null, result: 32});
  });

  it('EOMONTH', () => {
    expect(parser.parse('EOMONTH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('EOMONTH(1)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('EOMONTH("1/1/1900", 1)')).to.deep.equal({error: null, result: 59});
  });

  it('HOUR', () => {
    expect(parser.parse('HOUR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('HOUR("1/1/1900 16:33")')).to.deep.equal({error: null, result: 16});
  });

  it('INTERVAL', () => {
    expect(parser.parse('INTERVAL()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('INTERVAL(0)')).to.deep.equal({error: null, result: 'PT'});
    expect(parser.parse('INTERVAL(1)')).to.deep.equal({error: null, result: 'PT1S'});
    expect(parser.parse('INTERVAL(60)')).to.deep.equal({error: null, result: 'PT1M'});
    expect(parser.parse('INTERVAL(10000000)')).to.deep.equal({error: null, result: 'P3M25DT17H46M40S'});
  });

  it('ISOWEEKNUM', () => {
    expect(parser.parse('ISOWEEKNUM()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ISOWEEKNUM("1/8/1901")')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('ISOWEEKNUM("6/6/1902")')).to.deep.equal({error: null, result: 23});
  });

  it('MINUTE', () => {
    expect(parser.parse('MINUTE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MINUTE("1/1/1901 1:01")')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('MINUTE("1/1/1901 15:36")')).to.deep.equal({error: null, result: 36});
  });

  it('MONTH', () => {
    expect(parser.parse('MONTH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MONTH("2/1/1901")')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('MONTH("10/1/1901")')).to.deep.equal({error: null, result: 10});
  });

  it('NETWORKDAYS', () => {
    expect(parser.parse('NETWORKDAYS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('NETWORKDAYS("2/1/1901")')).to.deep.equal({error: '#VALUE!', result: null});
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
    expect(parser.parse('SECOND()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SECOND("2/1/1901 13:33:12")')).to.deep.equal({error: null, result: 12});
  });

  it('TIME', () => {
    expect(parser.parse('TIME()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TIME(0)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TIME(0, 0)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TIME(0, 0, 0)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('TIME(1, 1, 1)')).to.deep.equal({error: null, result: 0.04237268518518519});
    expect(parser.parse('TIME(24, 0, 0)')).to.deep.equal({error: null, result: 1});
  });

  it('TIMEVALUE', () => {
    expect(parser.parse('TIMEVALUE()')).to.deep.equal({error: '#VALUE!', result: null});
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
    expect(parser.parse('WEEKDAY()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('WEEKDAY("1/1/1901")')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('WEEKDAY("1/1/1901", 2)')).to.deep.equal({error: null, result: 2});
  });

  it('WEEKNUM', () => {
    expect(parser.parse('WEEKNUM()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('WEEKNUM("2/1/1900")')).to.deep.equal({error: null, result: 5});
    expect(parser.parse('WEEKNUM("2/1/1909", 2)')).to.deep.equal({error: null, result: 6});
  });

  it('WORKDAY', () => {
    expect(parser.parse('WORKDAY()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('WORKDAY("1/1/1900")')).to.deep.equal({error: '#VALUE!', result: null});

    const {result, error} = parser.parse('WORKDAY("1/1/1900", 1)');

    expect(error).to.be.null;
    expect(result.getDate()).to.be.eq(2);
  });

  it('YEAR', () => {
    expect(parser.parse('YEAR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('YEAR("1/1/1904")')).to.deep.equal({error: null, result: 1904});
    expect(parser.parse('YEAR("12/12/2001")')).to.deep.equal({error: null, result: 2001});
  });

  it('YEARFRAC', () => {
    expect(parser.parse('YEARFRAC()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('YEARFRAC("1/1/1904")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('YEARFRAC("1/1/1900", "1/2/1900")')).to.deep.equal({error: null, result: 0.002777777777777778});
  });
});
