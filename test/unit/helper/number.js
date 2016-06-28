import {toNumber, invertNumber} from '../../../src/helper/number';

describe('.toNumber()', () => {
  it('should correctly convert passed value into number', () => {
    expect(toNumber(-100)).to.eq(-100);
    expect(toNumber(-1)).to.eq(-1);
    expect(toNumber(19)).to.eq(19);
    expect(toNumber(19.9)).to.eq(19.9);
    expect(toNumber(0.9)).to.eq(0.9);
    expect(toNumber('0.9')).to.eq(0.9);
    expect(toNumber('0')).to.eq(0);
    expect(toNumber('-10')).to.eq(-10);
    expect(toNumber(' -10 ')).to.eq(-10);
    expect(toNumber('foo')).to.be.NaN;
  });
});

describe('.invertNumber()', () => {
  it('should correctly invert number', () => {
    expect(invertNumber(-100)).to.eq(100);
    expect(invertNumber(-1)).to.eq(1);
    expect(invertNumber(19)).to.eq(-19);
    expect(invertNumber(19.9)).to.eq(-19.9);
    expect(invertNumber(0.9)).to.eq(-0.9);
    expect(invertNumber('0.9')).to.eq(-0.9);
    expect(invertNumber('0')).to.eq(0);
    expect(invertNumber('-10')).to.eq(10);
    expect(invertNumber(' -10 ')).to.eq(10);
    expect(invertNumber('foo')).to.be.NaN;
  });
});
