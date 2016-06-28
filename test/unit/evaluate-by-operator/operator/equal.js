import func from '../../../../src/evaluate-by-operator/operator/equal';

describe('equal operator', () => {
  it('should set SYMBOL const', () => {
    expect(func.SYMBOL).to.eq('=');
  });

  it('should correctly process values', () => {
    expect(func(2, 8.8)).to.eq(false);
    expect(func('2', 8.8)).to.eq(false);
    expect(func(1, '1')).to.eq(false);
    expect(func(void 0, null)).to.eq(false);
    expect(func(0, null)).to.eq(false);
    expect(func(0, void 0)).to.eq(false);

    expect(func(1, 1)).to.eq(true);
    expect(func(null, null)).to.eq(true);
    expect(func(void 0, void 0)).to.eq(true);
  });
});
