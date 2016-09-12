import {Parser} from '../../../src/parser';

describe('.parse() coordinates', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();

    parser.on('callCellValue', function(cell, done) {
      done(55);
    });
    parser.on('callRangeValue', function(startCellCoord, endCellCoord, done) {
      done([[3, 6, 10]]);
    });
  });
  afterEach(() => {
    parser = null;
  });

  it('should parse relative cell', () => {
    expect(parser.parse('A1')).to.deep.equal({error: null, result: 55});
  });

  it('should parse absolute cell', () => {
    expect(parser.parse('$A$1')).to.deep.equal({error: null, result: 55});
  });

  it('should parse mixed cell', () => {
    expect(parser.parse('$A1')).to.deep.equal({error: null, result: 55});
    expect(parser.parse('A$1')).to.deep.equal({error: null, result: 55});
  });

  it('should parse relative cells range', () => {
    expect(parser.parse('A1:B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
  });

  it('should parse absolute cells range', () => {
    expect(parser.parse('$A$1:$B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
  });

  it('should parse mixed cells range', () => {
    expect(parser.parse('$A$1:B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(parser.parse('A1:$B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(parser.parse('$A$1:B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(parser.parse('A1:$B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(parser.parse('A$1:B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(parser.parse('A$1:$B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(parser.parse('A$1:$B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
  });
});
