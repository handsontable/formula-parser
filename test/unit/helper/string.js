import {trimEdges} from '../../../src/helper/string';

describe('.trimEdges()', () => {
  it('should correctly trim edges', () => {
    expect(trimEdges('hello')).to.eq('ell');
    expect(trimEdges('hello', 1)).to.eq('ell');
    expect(trimEdges('hello', 2)).to.eq('l');
  });
});
