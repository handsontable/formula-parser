import {extractLabel, columnIndexToLabel, columnLabelToIndex} from '../../../src/helper/cell';

describe('.extractLabel()', () => {
  it('should correctly extract coordinates', () => {
    expect(extractLabel('A1')).to.deep.equal([
      {
        index: 0,
        label: '1',
        isAbsolute: false,
      },
      {
        index: 0,
        label: 'A',
        isAbsolute: false,
      }
    ]);
    expect(extractLabel('A$1')).to.deep.equal([
      {
        index: 0,
        label: '1',
        isAbsolute: true,
      },
      {
        index: 0,
        label: 'A',
        isAbsolute: false,
      }
    ]);
    expect(extractLabel('$A1')).to.deep.equal([
      {
        index: 0,
        label: '1',
        isAbsolute: false,
      },
      {
        index: 0,
        label: 'A',
        isAbsolute: true,
      }
    ]);
    expect(extractLabel('$A$1')).to.deep.equal([
      {
        index: 0,
        label: '1',
        isAbsolute: true,
      },
      {
        index: 0,
        label: 'A',
        isAbsolute: true,
      }
    ]);
    expect(extractLabel('$AG199')).to.deep.equal([
      {
        index: 198,
        label: '199',
        isAbsolute: false,
      },
      {
        index: 32,
        label: 'AG',
        isAbsolute: true,
      }
    ]);
    expect(extractLabel('$$AG199')).to.deep.equal([]);
    expect(extractLabel('AG$$199')).to.deep.equal([]);
    expect(extractLabel(null)).to.deep.equal([]);
    expect(extractLabel(void 0)).to.deep.equal([]);
    expect(extractLabel(0)).to.deep.equal([]);
  });
});

describe('.columnIndexToLabel()', () => {
  it('should correctly convert column index to label ', () => {
    expect(columnIndexToLabel(-100)).to.eq('');
    expect(columnIndexToLabel(-1)).to.eq('');
    expect(columnIndexToLabel(0)).to.eq('A');
    expect(columnIndexToLabel(1)).to.eq('B');
    expect(columnIndexToLabel(10)).to.eq('K');
    expect(columnIndexToLabel(100)).to.eq('CW');
    expect(columnIndexToLabel(1000)).to.eq('ALM');
    expect(columnIndexToLabel(10000)).to.eq('NTQ');
  });
});

describe('.columnLabelToIndex()', () => {
  it('should correctly convert column label to index', () => {
    expect(columnLabelToIndex('')).to.eq(-1);
    expect(columnLabelToIndex('')).to.eq(-1);
    expect(columnLabelToIndex('A')).to.eq(0);
    expect(columnLabelToIndex('B')).to.eq(1);
    expect(columnLabelToIndex('K')).to.eq(10);
    expect(columnLabelToIndex('CW')).to.eq(100);
    expect(columnLabelToIndex('ALM')).to.eq(1000);
    expect(columnLabelToIndex('NTQ')).to.eq(10000);
  });
});
