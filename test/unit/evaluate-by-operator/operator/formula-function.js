import SUPPORTED_FORMULAS from '../../../../src/supported-formulas';
import proxyquire from 'proxyquire';

let func;
let spySUM;
let spySUMA;

describe('formula function operator', () => {
  beforeEach(() => {
    const formulajs = {
      SUM: (a, b, c, d) => a + b + c + d,
      SUMA: {
        T: {
          Z: (a, b, c, d) => a + b + c + d,
        }
      },
    };
    spySUM = spy(formulajs, 'SUM');
    spySUMA = spy(formulajs.SUMA.T, 'Z');

    func = proxyquire('../../../../src/evaluate-by-operator/operator/formula-function', {formulajs});
  });

  afterEach(() => {
    spySUM = null;
    spySUMA = null;
  });

  it('should set SYMBOL const', () => {
    expect(func.default.SYMBOL).to.eq(SUPPORTED_FORMULAS);
  });

  it('should set isFactory const', () => {
    expect(func.default.isFactory).to.eq(true);
  });

  it('should return error when formula not exist (shallow call)', () => {
    expect(() => func.default('SUMEE')(8.8, 2, 1, 4)).to.throw('NAME');
  });

  it('should return error when formula not exist (deep call)', () => {
    expect(() => func.default('SUMEE.INT')(8.8, 2, 1, 4)).to.throw('NAME');
  });

  it('should correctly process formula (shallow call)', () => {
    const result = func.default('SUM')(8.8, 2, 1, 4);

    expect(result).to.eq(15.8);
    sinon.assert.calledWith(spySUM, 8.8, 2, 1, 4);
  });

  it('should correctly process formula passed in lower case', () => {
    const result1 = func.default('Sum')(8.8, 2, 1, 4);
    const result2 = func.default('Rank.eq')(2, [7, 3.5, 3.5, 1, 2]);

    expect(result1).to.eq(15.8);
    expect(result2).to.eq(4);
  });

  it('should correctly process formula (deep call)', () => {
    const result = func.default('SUMA.T.Z')(8.8, 2, 1, 4);

    expect(result).to.eq(15.8);
    sinon.assert.calledWith(spySUMA, 8.8, 2, 1, 4);
  });
});
