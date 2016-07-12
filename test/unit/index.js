import * as lib from '../../index';

describe('Public API', () => {
  it('Parser should be defined', () => {
    expect(lib.Parser).to.be.a('function');
  });

  it('SUPPORTED_FORMULAS should be defined', () => {
    expect(lib.SUPPORTED_FORMULAS).to.be.a('array');
  });

  it('ERROR should be defined', () => {
    expect(lib.ERROR).to.be.a('string');
  });

  it('ERROR_DIV_ZERO should be defined', () => {
    expect(lib.ERROR_DIV_ZERO).to.be.a('string');
  });

  it('ERROR_NAME should be defined', () => {
    expect(lib.ERROR_NAME).to.be.a('string');
  });

  it('ERROR_NEED_UPDATE should be defined', () => {
    expect(lib.ERROR_NEED_UPDATE).to.be.a('string');
  });

  it('ERROR_NOT_AVAILABLE should be defined', () => {
    expect(lib.ERROR_NOT_AVAILABLE).to.be.a('string');
  });

  it('ERROR_NULL should be defined', () => {
    expect(lib.ERROR_NULL).to.be.a('string');
  });

  it('ERROR_NUM should be defined', () => {
    expect(lib.ERROR_NUM).to.be.a('string');
  });

  it('ERROR_REF should be defined', () => {
    expect(lib.ERROR_REF).to.be.a('string');
  });

  it('ERROR_VALUE should be defined', () => {
    expect(lib.ERROR_VALUE).to.be.a('string');
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
