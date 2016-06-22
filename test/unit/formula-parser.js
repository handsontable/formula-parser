import {FormulaParser} from '../../src/formula-parser';

describe('FormulaParser', () => {
  let parser;

  beforeEach(() => {
    parser = new FormulaParser();
  });
  afterEach(() => {
    parser = null;
  });

  it('should have defined `parse` method', () => {
    expect(parser.parse).to.be.a('function');
  });

  it('should parse default variables', () => {
    expect(parser.parse('TRUE')).to.deep.equal({error: null, result: true});
    expect(parser.parse('FALSE')).to.deep.equal({error: null, result: false});
    expect(parser.parse('NULL')).to.deep.equal({error: null, result: null});
  });

  it('should parse custom variables', () => {
    expect(parser.parse('foo')).to.deep.equal({error: '#NAME?', result: null});

    parser.setVariable('foo', 'bar');
    parser.setVariable('baz', '6.6');

    expect(parser.parse('foo')).to.deep.equal({error: null, result: 'bar'});
    expect(parser.parse('SUM(baz, 2.1, 0.2)')).to.deep.equal({error: null, result: 8.899999999999999});
  });
});
