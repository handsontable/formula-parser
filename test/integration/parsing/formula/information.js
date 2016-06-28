import {Parser} from '../../../../src/parser';

describe('.parse() information formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

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
