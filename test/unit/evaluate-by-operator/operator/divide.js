import func from '../../../../src/evaluate-by-operator/operator/divide';

describe('divide operator', () => {
  it('should set SYMBOL const', () => {
    expect(func.SYMBOL).to.eq('/');
  });

  it('should correctly process values', () => {
    expect(func(2, 8.8)).to.eq(0.22727272727272727);
    expect(func('2', 8.8)).to.eq(0.22727272727272727);
    expect(func('2', '-8.8', 6, 0.4)).to.eq(-0.0946969696969697);
    expect(() => func('foo', ' ', 'bar', ' baz')).to.throw('VALUE');
    expect(func(0, 1)).to.eq(0);
    expect(() => func(1, 0)).to.throw('DIV/0');
  });
});
