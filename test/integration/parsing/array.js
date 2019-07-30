import Parser from '../../../src/parser';

describe('.parse() array', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('parse empty arrays', () => {
    expect(parser.parse('{}')).toMatchObject({error: null, result: []});
  });

  it('parse arrays with one item', () => {
    expect(parser.parse('{2}')).toMatchObject({error: null, result: [2]});
  });

  it('parse arrays with many items', () => {
    expect(parser.parse('{2; 3; 4; 6}'))
      .toMatchObject({error: null, result: [2, 3, 4, 6]});
  });

  it('parse arrays with nested expressions', () => {
    expect(parser.parse('{2; SUM(3, 4); {"foo"; "bar"}}'))
      .toMatchObject({error: null, result: [2, 7, ['foo', 'bar']]});
  });
});
