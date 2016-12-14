import {Parser} from '../../../src/parser';

describe('.parse() coordinates', () => {
  let parser;
  let cellCoord;
  let startCellCoord;
  let endCellCoord;

  beforeEach(() => {
    parser = new Parser();

    parser.on('callCellValue', function(_cellCoord, done) {
      cellCoord = _cellCoord;

      if (_cellCoord.sheet === 'MASTER') {
        done(66);
      }

      done(55);
    });
    parser.on('callRangeValue', function(_startCellCoord, _endCellCoord, done) {
      startCellCoord = _startCellCoord;
      endCellCoord = _endCellCoord;
      done([[3, 6, 10]]);
    });
  });
  afterEach(() => {
    parser = null;
    cellCoord = null;
    startCellCoord = null;
    endCellCoord = null;
  });

  it('should parse sheet reference cell', () => {
    expect(parser.parse('MASTER!A1')).to.deep.equal({error: null, result: 66});

    expect(cellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
      sheet: 'MASTER'
    });
  });

  it('should parse relative cell', () => {
    expect(parser.parse('A1')).to.deep.equal({error: null, result: 55});
    expect(cellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });

    expect(parser.parse('a1')).to.deep.equal({error: null, result: 55});
    expect(cellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
  });

  it('should parse absolute cell', () => {
    expect(parser.parse('$A$1')).to.deep.equal({error: null, result: 55});
    expect(cellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });

    expect(parser.parse('$a$1')).to.deep.equal({error: null, result: 55});
    expect(cellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });

    expect(parser.parse('$A$$$$1')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('$$A$1')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse mixed cell', () => {
    expect(parser.parse('$A1')).to.deep.equal({error: null, result: 55});
    expect(cellCoord).to.deep.equal({
      label: '$A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });

    expect(parser.parse('A$1')).to.deep.equal({error: null, result: 55});
    expect(cellCoord).to.deep.equal({
      label: 'A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });

    expect(parser.parse('a$1')).to.deep.equal({error: null, result: 55});
    expect(cellCoord).to.deep.equal({
      label: 'A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });

    expect(parser.parse('A$$1')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('$$A1')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('A1$')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('A1$$$')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('a1$$$')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse relative cells range', () => {
    expect(parser.parse('A1:B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });

    expect(parser.parse('a1:B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });

    expect(parser.parse('A1:b2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });

    expect(parser.parse('a1:b2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });
  });

  it('should parse absolute cells range', () => {
    expect(parser.parse('$A$1:$B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B$2',
      row: {index: 1, isAbsolute: true, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('$a$1:$B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B$2',
      row: {index: 1, isAbsolute: true, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('$a$1:$b$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B$2',
      row: {index: 1, isAbsolute: true, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('$A$$1:$B$2')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('$A$1:$B$$2')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('$A$1:$$B$2')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('$$A$1:$B$2')).to.deep.equal({error: '#ERROR!', result: null});
  });

  it('should parse mixed cells range', () => {
    expect(parser.parse('$A$1:B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });

    expect(parser.parse('$A$1:b2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });

    expect(parser.parse('A1:$B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B$2',
      row: {index: 1, isAbsolute: true, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('$A$1:B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: '$A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: true, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B$2',
      row: {index: 1, isAbsolute: true, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });

    expect(parser.parse('A1:$B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A1',
      row: {index: 0, isAbsolute: false, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('A$1:B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: 'B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: false, label: 'B'},
    });

    expect(parser.parse('A$1:$B$2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B$2',
      row: {index: 1, isAbsolute: true, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('A$1:$B2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('a$1:$b2')).to.deep.equal({error: null, result: [[3, 6, 10]]});
    expect(startCellCoord).to.deep.equal({
      label: 'A$1',
      row: {index: 0, isAbsolute: true, label: '1'},
      column: {index: 0, isAbsolute: false, label: 'A'},
    });
    expect(endCellCoord).to.deep.equal({
      label: '$B2',
      row: {index: 1, isAbsolute: false, label: '2'},
      column: {index: 1, isAbsolute: true, label: 'B'},
    });

    expect(parser.parse('A1:$$B2')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('A1:B2$')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('a1:b2$')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('A1$:B2')).to.deep.equal({error: '#ERROR!', result: null});
  });
});
