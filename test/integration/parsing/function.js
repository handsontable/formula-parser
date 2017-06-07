import Parser from '../../../src/parser';

describe('.parse() custom function', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('should evaluate custom functions', () => {
    expect(parser.parse('foo()')).toMatchObject({error: '#NAME?', result: null});

    parser.setFunction('ADD_5', (params) => params[0] + 5);
    parser.setFunction('GET_LETTER', (params) => {
      const string = params[0];
      const index = params[1] - 1;

      return string.charAt(index);
    });

    expect(parser.parse('SUM(4, ADD_5(1))')).toMatchObject({error: null, result: 10});
    expect(parser.parse('GET_LETTER("Some string", 3)')).toMatchObject({error: null, result: 'm'});
  });
});
