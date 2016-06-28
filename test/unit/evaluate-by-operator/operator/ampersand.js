import func from '../../../../src/evaluate-by-operator/operator/ampersand';

describe('ampersand operator', () => {
  it('should set SYMBOL const', () => {
    expect(func.SYMBOL).to.eq('&');
  });

  it('should correctly process values', () => {
    expect(func(2, 8.8)).to.eq('28.8');
    expect(func('2', 8.8)).to.eq('28.8');
    expect(func('2', '-8.8', 6, 0.4)).to.eq('2-8.860.4');
    expect(func('foo', ' ', 'bar', ' baz')).to.eq('foo bar baz');
  });
});
