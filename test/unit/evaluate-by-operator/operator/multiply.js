import func from '../../../../src/evaluate-by-operator/operator/multiply';

describe('multiply operator', () => {
  it('should set SYMBOL const', () => {
    expect(func.SYMBOL).to.eq('*');
  });

  it('should correctly process values', () => {
    expect(func(2, 8.8)).to.eq(17.6);
    expect(func('2', 8.8)).to.eq(17.6);
    expect(func('2', '8.8')).to.eq(17.6);
    expect(func('2', '-8.8', 6, 0.4)).to.eq(-42.24000000000001);
    expect(() => func('foo', ' ', 'bar', ' baz')).to.throw('VALUE');
    expect(() => func('foo', 2)).to.throw('VALUE');
  });
});
