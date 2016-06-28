import {Parser} from '../../../src/parser';

describe('.parse() logical', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('operator: =', () => {
    expect(parser.parse('10 = 10')).to.deep.equal({error: null, result: true});

    expect(parser.parse('10 = 11')).to.deep.equal({error: null, result: false});
  });

  it('operator: >', () => {
    expect(parser.parse('11 > 10')).to.deep.equal({error: null, result: true});
    expect(parser.parse('10 > 1.1')).to.deep.equal({error: null, result: true});
    expect(parser.parse('10 >- 10')).to.deep.equal({error: null, result: true});

    expect(parser.parse('10 > 11')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10 > 11.1')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10 > 10.00001')).to.deep.equal({error: null, result: false});
  });

  it('operator: <', () => {
    expect(parser.parse('10 < 11')).to.deep.equal({error: null, result: true});
    expect(parser.parse('10 < 11.1')).to.deep.equal({error: null, result: true});
    expect(parser.parse('10 < 10.00001')).to.deep.equal({error: null, result: true});

    expect(parser.parse('11 < 10')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10 < 1.1')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10 <- 10')).to.deep.equal({error: null, result: false});
  });

  it('operator: >=', () => {
    expect(parser.parse('11 >= 10')).to.deep.equal({error: null, result: true});
    expect(parser.parse('11 >= 11')).to.deep.equal({error: null, result: true});
    expect(parser.parse('10 >= 10')).to.deep.equal({error: null, result: true});
    expect(parser.parse('10 >= -10')).to.deep.equal({error: null, result: true});

    expect(parser.parse('10 >= 11')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10 >= 11.1')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10 >= 10.00001')).to.deep.equal({error: null, result: false});
  });

  it('operator: <=', () => {
    expect(parser.parse('10 <= 10')).to.deep.equal({error: null, result: true});
    expect(parser.parse('1.1 <= 10')).to.deep.equal({error: null, result: true});
    expect(parser.parse('-10 <= 10')).to.deep.equal({error: null, result: true});

    expect(parser.parse('11 <= 10')).to.deep.equal({error: null, result: false});
    expect(parser.parse('11.1 <= 10')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10.00001 <= 10')).to.deep.equal({error: null, result: false});
  });

  it('operator: <>', () => {
    expect(parser.parse('10 <> 11')).to.deep.equal({error: null, result: true});
    expect(parser.parse('1.1 <> 10')).to.deep.equal({error: null, result: true});
    expect(parser.parse('-10 <> 10')).to.deep.equal({error: null, result: true});

    expect(parser.parse('10 <> 10')).to.deep.equal({error: null, result: false});
    expect(parser.parse('11.1 <> 11.1')).to.deep.equal({error: null, result: false});
    expect(parser.parse('10.00001 <> 10.00001')).to.deep.equal({error: null, result: false});
  });
});
