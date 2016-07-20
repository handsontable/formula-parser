import {Parser} from '../../../../src/parser';

describe('.parse() logical formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('AND', () => {
    expect(parser.parse('AND()')).to.deep.equal({error: null, result: true});
    expect(parser.parse('AND(TRUE, TRUE, FALSE)')).to.deep.equal({error: null, result: false});
    expect(parser.parse('AND(TRUE, TRUE, TRUE)')).to.deep.equal({error: null, result: true});
  });

  it('CHOOSE', () => {
    expect(parser.parse('CHOOSE()')).to.deep.equal({error: '#N/A', result: null});
    expect(parser.parse('CHOOSE(1, "foo", "bar", "baz")')).to.deep.equal({error: null, result: 'foo'});
    expect(parser.parse('CHOOSE(3, "foo", "bar", "baz")')).to.deep.equal({error: null, result: 'baz'});
    expect(parser.parse('CHOOSE(4, "foo", "bar", "baz")')).to.deep.equal({error: '#VALUE!', result: null});
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
    expect(parser.parse('SWITCH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('SWITCH(7, "foo")')).to.deep.equal({error: null, result: 'foo'});
    expect(parser.parse('SWITCH(7, 9, "foo", 7, "bar")')).to.deep.equal({error: null, result: 'bar'});
    expect(parser.parse('SWITCH(10, 9, "foo", 7, "bar")')).to.deep.equal({error: '#N/A', result: null});
  });
});
