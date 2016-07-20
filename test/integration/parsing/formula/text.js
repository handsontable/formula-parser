import {Parser} from '../../../../src/parser';

describe('.parse() text formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('CHAR', () => {
    expect(parser.parse('CHAR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CHAR(33)')).to.deep.equal({error: null, result: '!'});
  });

  it('CLEAN', () => {
    expect(parser.parse('CLEAN()')).to.deep.equal({error: null, result: ''});
    expect(parser.parse('CLEAN(CHAR(9)&"Monthly report"&CHAR(10))')).to.deep.equal({error: null, result: 'Monthly report'});
  });

  it('CODE', () => {
    expect(parser.parse('CODE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('CODE("a")')).to.deep.equal({error: null, result: 97});
  });

  it('CONCATENATE', () => {
    expect(parser.parse('CONCATENATE()')).to.deep.equal({error: null, result: ''});
    expect(parser.parse('CONCATENATE("a")')).to.deep.equal({error: null, result: 'a'});
    expect(parser.parse('CONCATENATE("a", 1)')).to.deep.equal({error: null, result: 'a1'});
    expect(parser.parse('CONCATENATE("a", 1, TRUE)')).to.deep.equal({error: null, result: 'a1TRUE'});
  });

  it('DOLLAR', () => {
    expect(parser.parse('DOLLAR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DOLLAR(1100)')).to.deep.equal({error: null, result: '$1,100.00'});
    expect(parser.parse('DOLLAR(1100, -2)')).to.deep.equal({error: null, result: '$1,100'});
  });

  it('EXACT', () => {
    expect(parser.parse('EXACT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('EXACT(1100)')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('EXACT(1100, -2)')).to.deep.equal({error: null, result: false});
    expect(parser.parse('EXACT(1100, 1100)')).to.deep.equal({error: null, result: true});
    expect(parser.parse('EXACT(1100, "1100")')).to.deep.equal({error: null, result: false});
  });

  it('FIND', () => {
    expect(parser.parse('FIND()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FIND("o")')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('FIND("o", "FooBar")')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('FIND("O", "FooBar")')).to.deep.equal({error: null, result: 0});
  });

  it('FIXED', () => {
    expect(parser.parse('FIXED()')).to.deep.equal({error: '#VALUE!', result: null});
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
    expect(parser.parse('LEFT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LEFT("Foo Bar")')).to.deep.equal({error: null, result: 'F'});
    expect(parser.parse('LEFT("Foo Bar", 3)')).to.deep.equal({error: null, result: 'Foo'});
  });

  it('LEN', () => {
    expect(parser.parse('LEN()')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('LEN(TRUE)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LEN(1023)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LEN("Foo Bar")')).to.deep.equal({error: null, result: 7});
  });

  it('LOWER', () => {
    expect(parser.parse('LOWER()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('LOWER("")')).to.deep.equal({error: null, result: ''});
    expect(parser.parse('LOWER("Foo Bar")')).to.deep.equal({error: null, result: 'foo bar'});
  });

  it('MID', () => {
    expect(parser.parse('MID()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MID("")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MID("Foo Bar", 2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('MID("Foo Bar", 2, 5)')).to.deep.equal({error: null, result: 'oo Ba'});
  });

  it('PROPER', () => {
    expect(parser.parse('PROPER()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('PROPER("")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('PROPER(TRUE)')).to.deep.equal({error: null, result: 'True'});
    expect(parser.parse('PROPER(1234)')).to.deep.equal({error: null, result: '1234'});
    expect(parser.parse('PROPER("foo bar")')).to.deep.equal({error: null, result: 'Foo Bar'});
  });

  it('REGEXEXTRACT', () => {
    expect(parser.parse('REGEXEXTRACT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('REGEXEXTRACT("extract foo bar", "(foo)")')).to.deep.equal({error: null, result: 'foo'});
    expect(parser.parse('REGEXEXTRACT("pressure 12.21bar", "([0-9]+.[0-9]+)")')).to.deep.equal({error: null, result: '12.21'});
  });

  it('REGEXREPLACE', () => {
    expect(parser.parse('REGEXREPLACE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('REGEXREPLACE("extract foo bar", "(foo)", "baz")')).to.deep.equal({error: null, result: 'extract baz bar'});
    expect(parser.parse('REGEXREPLACE("pressure 12.21bar", "([0-9]+.[0-9]+)", "43.1")')).to.deep.equal({error: null, result: 'pressure 43.1bar'});
  });

  it('REGEXMATCH', () => {
    expect(parser.parse('REGEXMATCH()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('REGEXMATCH("pressure 12.21bar", "([0-9]+.[0-9]+)")')).to.deep.equal({error: null, result: true});

    const result = parser.parse('REGEXMATCH("pressure 12.33bar", "([0-9]+.[0-9]+)", TRUE)');

    expect(result).to.be.an('object');
  });

  it('REPLACE', () => {
    expect(parser.parse('REPLACE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('REPLACE("foo bar")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('REPLACE("foo bar", 2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('REPLACE("foo bar", 2, 5)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('REPLACE("foo bar", 2, 5, "*")')).to.deep.equal({error: null, result: 'f*r'});
  });

  it('REPT', () => {
    expect(parser.parse('REPT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('REPT("foo ")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('REPT("foo ", 5)')).to.deep.equal({error: null, result: 'foo foo foo foo foo '});
  });

  it('RIGHT', () => {
    expect(parser.parse('RIGHT()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('RIGHT("foo bar")')).to.deep.equal({error: null, result: 'r'});
    expect(parser.parse('RIGHT("foo bar", 4)')).to.deep.equal({error: null, result: ' bar'});
  });

  it('SEARCH', () => {
    expect(parser.parse('SEARCH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SEARCH("bar")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SEARCH("bar", "foo bar")')).to.deep.equal({error: null, result: 5});
  });

  it('SPLIT', () => {
    expect(parser.parse('SPLIT()')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('SPLIT("foo bar baz")')).to.deep.equal({error: null, result: ['foo bar baz']});
    expect(parser.parse('SPLIT("foo bar baz", " ")')).to.deep.equal({error: null, result: ['foo', 'bar', 'baz']});
  });

  it('SUBSTITUTE', () => {
    expect(parser.parse('SUBSTITUTE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('SUBSTITUTE("foo bar baz")')).to.deep.equal({error: '#N/A', result: null});
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
    expect(parser.parse('TRIM()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('TRIM("")')).to.deep.equal({error: null, result: ''});
    expect(parser.parse('TRIM("     ")')).to.deep.equal({error: null, result: ''});
    expect(parser.parse('TRIM("   foo  ")')).to.deep.equal({error: null, result: 'foo'});
  });

  it('UNICHAR', () => {
    expect(parser.parse('UNICHAR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('UNICHAR(33)')).to.deep.equal({error: null, result: '!'});
  });

  it('UNICODE', () => {
    expect(parser.parse('UNICODE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('UNICODE("!")')).to.deep.equal({error: null, result: 33});
  });

  it('UPPER', () => {
    expect(parser.parse('UPPER()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('UPPER("foo Bar")')).to.deep.equal({error: null, result: 'FOO BAR'});
  });

  it('VALUE', () => {
    expect(parser.parse('VALUE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('VALUE("$1,000")')).to.deep.equal({error: null, result: 1000});
    expect(parser.parse('VALUE("01:00:00")')).to.deep.equal({error: null, result: 3600});
    expect(parser.parse('VALUE("foo Bar")')).to.deep.equal({error: null, result: 0});
  });
});
