import Parser from '../../../src/parser';

describe('.parse() variable', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('should evaluate defaults variables', () => {
    expect(parser.parse('TRUE')).toMatchObject({error: null, result: true});
    expect(parser.parse('FALSE')).toMatchObject({error: null, result: false});
    expect(parser.parse('NULL')).toMatchObject({error: null, result: null});
  });

  it('should evaluate custom variables', () => {
    expect(parser.parse('foo')).toMatchObject({error: '#NAME?', result: null});

    parser.setVariable('foo', 'bar');
    parser.setVariable('baz', '6.6');

    expect(parser.parse('foo')).toMatchObject({error: null, result: 'bar'});
    expect(parser.parse('SUM(baz, 2.1, 0.2)')).toMatchObject({error: null, result: 8.899999999999999});
  });

  it('should evaluate custom json variables and absence of breaking changes for standard custom variables', () => {
    parser.setVariable('sew', 6);

    parser.on('callVariable', (name, done) => {
        done((name === 'bar') ? 12 : void 0);
    });

    parser.on('callJsonVariable', (name, done) => {
        done((name[0] === 'bar' && name[1] === 'gol') ? 9 : void 0);
    });

    expect(parser.parse('AVERAGE(jul, 2, 4)')).toMatchObject({error: '#NAME?', result: null});
    expect(parser.parse('AVERAGE(sew, 2, 4)')).toMatchObject({error: null, result: 4});
    expect(parser.parse('AVERAGE(bar, 2, 4)')).toMatchObject({error: null, result: 6});
    expect(parser.parse('AVERAGE(bar.golf, 2, 4)')).toMatchObject({error: null, result: 6});
    expect(parser.parse('AVERAGE(bar.gol, 2, 4)')).toMatchObject({error: null, result: 5});
  });
});
