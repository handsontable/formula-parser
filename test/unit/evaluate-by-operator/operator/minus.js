import func from '../../../../src/evaluate-by-operator/operator/minus';

describe('minus operator', () => {
  it('should set SYMBOL const', () => {
    expect(func.SYMBOL).to.eq('-');
  });

  it('should correctly process values', () => {
    expect(func(2, 8.8)).to.eq(-6.800000000000001);
    expect(func('2', 8.8)).to.eq(-6.800000000000001);
    expect(func('2', '8.8')).to.eq(-6.800000000000001);
    expect(func('2', '-8.8', 6, 0.4)).to.eq(4.4);
    expect(() => func('foo', ' ', 'bar', ' baz')).to.throw('VALUE');
    expect(() => func('foo', 2)).to.throw('VALUE');
  });
});
