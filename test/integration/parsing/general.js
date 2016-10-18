import {Parser} from '../../../src/parser';

describe('.parse() general', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('should parse an empty string as it is', () => {
    expect(parser.parse('')).to.deep.equal({error: null, result: ''});
  });

  it('should not parse an number type data', () => {
    expect(parser.parse(200)).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse(20.1)).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should not parse null type data', () => {
    expect(parser.parse(null)).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should not parse undefined type data', () => {
    expect(parser.parse(void 0)).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should not parse object type data', () => {
    expect(parser.parse({})).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse({a: 1})).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should not parse array type data', () => {
    expect(parser.parse([])).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse([1, 2])).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should not parse array type data', () => {
    expect(parser.parse(function() {})).to.deep.equal({error: '#ERROR!', result: null});
  });
});
