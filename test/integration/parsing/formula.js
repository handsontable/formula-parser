import {Parser} from '../../../src/parser';

describe('.parse() formula', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('should return error about invalid numbers of argument', () => {
    // jscs:disable
    /*eslint-disable */
    expect(parser.parse('ACOTH("foo")')).to.deep.equal({error: '#VALUE?', result: null});
    expect(parser.parse("ACOTH('foo')")).to.deep.equal({error: '#VALUE?', result: null});
    /*eslint-enable */
    // jscs:enable
  });

  it('should return error about undefined variable name', () => {
    expect(parser.parse('ACOTH(foo)')).to.deep.equal({error: '#NAME?', result: null});
  });
});
