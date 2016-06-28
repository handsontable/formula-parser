import {Parser} from '../../../src/parser';

describe('.parse() math', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('operator: +', () => {
    expect(parser.parse('10+10')).to.deep.equal({error: null, result: 20});
    expect(parser.parse('10 + 10')).to.deep.equal({error: null, result: 20});
    expect(parser.parse('10 + 11 + 23 + 11 + 2')).to.deep.equal({error: null, result: 57});
    expect(parser.parse('1.4425 + 4.333')).to.deep.equal({error: null, result: 5.7755});
  });

  it('operator: -', () => {
    expect(parser.parse('10-10')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('10 - 10')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('10 - 10 - 2')).to.deep.equal({error: null, result: -2});
    expect(parser.parse('10 - 11 - 23 - 11 - 2')).to.deep.equal({error: null, result: -37});
  });

  it('operator: /', () => {
    expect(parser.parse('2 / 1')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('64 / 2 / 4')).to.deep.equal({error: null, result: 8});
    expect(parser.parse('2 / 0')).to.deep.equal({error: '#DIV/0!', result: null});
  });

  it('operator: *', () => {
    expect(parser.parse('0 * 0 * 0 * 0 * 0')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('2 * 1')).to.deep.equal({error: null, result: 2});
    expect(parser.parse('64 * 2 * 4')).to.deep.equal({error: null, result: 512});
  });

  it('operator: ^', () => {
    expect(parser.parse('2 ^ 5')).to.deep.equal({error: null, result: 32});
  });

  it('mixed operators', () => {
    expect(parser.parse('1 + 10 - 20 * 3/2')).to.deep.equal({error: null, result: -19});
    expect(parser.parse('((1 + 10 - 20 * 3 / 2) + 20) * 10')).to.deep.equal({error: null, result: 10});
    expect(parser.parse('(((1 + 10 - 20 * 3/2) + 20) * 10) / 5.12')).to.deep.equal({error: null, result: 1.953125});
  });
});
