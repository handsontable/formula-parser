import {Parser} from '../../../src/parser';

describe('.parse() error', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('should parse general error', () => {
    expect(parser.parse('#ERROR!')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#ERRfefweOR!')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse(' #ERRfefweOR! ')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse DIV/0 error', () => {
    expect(parser.parse('#DIV/0!')).to.deep.equal({error: '#DIV/0!', result: null});
    expect(parser.parse('#DIV/0?')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#DIV/1!')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#DIV/')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse NAME error', () => {
    expect(parser.parse('#NAME?')).to.deep.equal({error: '#NAME?', result: null});
    expect(parser.parse('#NAME!')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#NAMe!')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse N/A error', () => {
    expect(parser.parse('#N/A')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('#N/A!')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#N/A?')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#N\A')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse NULL error', () => {
    expect(parser.parse('#NULL!')).to.deep.equal({error: '#NULL!', result: null});
    expect(parser.parse('#NULL?')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#NULl!')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse NUM error', () => {
    expect(parser.parse('#NUM!')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('#NUM?')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#NuM!')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse REF error', () => {
    expect(parser.parse('#REF!')).to.deep.equal({error: '#REF!', result: null});
    expect(parser.parse('#REF?')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#REf!')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse VALUE error', () => {
    expect(parser.parse('#VALUE!')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('#VALUE?')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('#VALUe!')).to.deep.equal({error: '#ERROR!', result: null});
  });
});
