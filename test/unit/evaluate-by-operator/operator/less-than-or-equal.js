import func from '../../../../src/evaluate-by-operator/operator/less-than-or-equal';

describe('less than or equal operator', () => {
  it('should set SYMBOL const', () => {
    expect(func.SYMBOL).to.eq('<=');
  });

  it('should correctly process values', () => {
    expect(func(2, 1)).to.eq(false);
    expect(func(2.2, 2.1)).to.eq(false);
    expect(func(void 0, null)).to.eq(false);
    expect(func(0, void 0)).to.eq(false);

    expect(func(0, null)).to.eq(true); // JS natively
    expect(func(1, '1')).to.eq(true);
    expect(func(1, 1)).to.eq(true);
    expect(func('2', 8.8)).to.eq(true);
    expect(func(2, 8.8)).to.eq(true);
  });
});
