import func from '../../../../src/evaluate-by-operator/operator/add';

describe('add operator', () => {
  it('should set SYMBOL const', () => {
    expect(func.SYMBOL).to.eq('+');
  });

  it('should correctly process values', () => {
    expect(func(2, 8.8)).to.eq(10.8);
    expect(func('2', 8.8)).to.eq(10.8);
    expect(func('2', '8.8')).to.eq(10.8);
    expect(func('2', '-8.8', 6, 0.4)).to.eq(-0.4000000000000007);
    expect(() => func('foo', ' ', 'bar', ' baz')).to.throw('VALUE');
    expect(() => func('foo', 2)).to.throw('VALUE');
  });
});
