import * as lib from '../../index';

describe('Public API', () => {
  it('Parser should be defined', () => {
    expect(lib.Parser).to.be.a('function');
  });

  it('SUPPORTED_FORMULAS should be defined', () => {
    expect(lib.SUPPORTED_FORMULAS).to.be.a('array');
  });

  it('error should be defined', () => {
    expect(lib.error).to.be.a('function');
  });

  it('extractLabel should be defined', () => {
    expect(lib.extractLabel).to.be.a('function');
  });

  it('toLabel should be defined', () => {
    expect(lib.toLabel).to.be.a('function');
  });

  it('columnIndexToLabel should be defined', () => {
    expect(lib.columnIndexToLabel).to.be.a('function');
  });

  it('columnLabelToIndex should be defined', () => {
    expect(lib.columnLabelToIndex).to.be.a('function');
  });

  it('rowIndexToLabel should be defined', () => {
    expect(lib.rowIndexToLabel).to.be.a('function');
  });

  it('rowLabelToIndex should be defined', () => {
    expect(lib.rowLabelToIndex).to.be.a('function');
  });
});
