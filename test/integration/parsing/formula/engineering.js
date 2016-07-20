import {Parser} from '../../../../src/parser';

describe('.parse() engineering formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('BESSELI', () => {
    expect(parser.parse('BESSELI()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELI(1.4)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELI(1.4, 1)')).to.almost.eql({error: null, result: 0.8860919793963105});
  });

  it('BESSELJ', () => {
    expect(parser.parse('BESSELJ()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELJ(1.4)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELJ(1.4, 1)')).to.almost.eql({error: null, result: 0.5419477138848564});
  });

  it('BESSELK', () => {
    expect(parser.parse('BESSELK()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELK(1.4)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELK(1.4, 1)')).to.deep.equal({error: null, result: 0.32083590550458985});
  });

  it('BESSELY', () => {
    expect(parser.parse('BESSELY()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELY(1.4)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BESSELY(1.4, 1)')).to.deep.equal({error: null, result: -0.47914697411134044});
  });

  it('BIN2DEC', () => {
    expect(parser.parse('BIN2DEC()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('BIN2DEC(1010)')).to.deep.equal({error: null, result: 10});
    expect(parser.parse('BIN2DEC(0)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('BIN2DEC(1)')).to.deep.equal({error: null, result: 1});
  });

  it('BIN2HEX', () => {
    expect(parser.parse('BIN2HEX()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('BIN2HEX(1010)')).to.deep.equal({error: null, result: 'a'});
    expect(parser.parse('BIN2HEX(1010, 4)')).to.deep.equal({error: null, result: '000a'});
    expect(parser.parse('BIN2HEX(0, 3)')).to.deep.equal({error: null, result: '000'});
    expect(parser.parse('BIN2HEX(1111)')).to.deep.equal({error: null, result: 'f'});
  });

  it('BIN2OCT', () => {
    expect(parser.parse('BIN2OCT()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('BIN2OCT(1010)')).to.deep.equal({error: null, result: '12'});
    expect(parser.parse('BIN2OCT(1010, 4)')).to.deep.equal({error: null, result: '0012'});
    expect(parser.parse('BIN2OCT(0, 3)')).to.deep.equal({error: null, result: '000'});
    expect(parser.parse('BIN2OCT(111)')).to.deep.equal({error: null, result: '7'});
  });

  it('BITAND', () => {
    expect(parser.parse('BITAND()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITAND(2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITAND(2, 4)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('BITAND(1, 5)')).to.deep.equal({error: null, result: 1});
  });

  it('BITLSHIFT', () => {
    expect(parser.parse('BITLSHIFT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITLSHIFT(2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITLSHIFT(2, 4)')).to.deep.equal({error: null, result: 32});
    expect(parser.parse('BITLSHIFT(1, 5)')).to.deep.equal({error: null, result: 32});
  });

  it('BITOR', () => {
    expect(parser.parse('BITOR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITOR(2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITOR(2, 4)')).to.deep.equal({error: null, result: 6});
    expect(parser.parse('BITOR(1, 5)')).to.deep.equal({error: null, result: 5});
  });

  it('BITRSHIFT', () => {
    expect(parser.parse('BITRSHIFT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITRSHIFT(2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITRSHIFT(4, 2)')).to.deep.equal({error: null, result: 1});
    expect(parser.parse('BITRSHIFT(1, 5)')).to.deep.equal({error: null, result: 0});
  });

  it('BITXOR', () => {
    expect(parser.parse('BITXOR()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITXOR(2)')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('BITXOR(4, 2)')).to.deep.equal({error: null, result: 6});
    expect(parser.parse('BITXOR(1, 5)')).to.deep.equal({error: null, result: 4});
  });

  it('COMPLEX', () => {
    expect(parser.parse('COMPLEX()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('COMPLEX(2, 0)')).to.deep.equal({error: null, result: '2'});
    expect(parser.parse('COMPLEX(4, 2)')).to.deep.equal({error: null, result: '4+2i'});
    expect(parser.parse('COMPLEX(1, 5)')).to.deep.equal({error: null, result: '1+5i'});
  });

  it('CONVERT', () => {
    expect(parser.parse('CONVERT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('CONVERT(1)')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('CONVERT(2, "lbm", "kg")')).to.deep.equal({error: null, result: 0.90718474});
    expect(parser.parse('CONVERT(100, "km", "mi")')).to.deep.equal({error: null, result: 62.13711922373339});
    expect(parser.parse('CONVERT(100, "km", "m")')).to.deep.equal({error: null, result: 100000});
    expect(parser.parse('CONVERT(2, "km/h", "mi")')).to.deep.equal({error: '#N/A', result: null});
  });

  it('DEC2BIN', () => {
    expect(parser.parse('DEC2BIN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DEC2BIN(10)')).to.deep.equal({error: null, result: '1010'});
    expect(parser.parse('DEC2BIN(0, 4)')).to.deep.equal({error: null, result: '0000'});
    expect(parser.parse('DEC2BIN(1)')).to.deep.equal({error: null, result: '1'});
  });

  it('DEC2HEX', () => {
    expect(parser.parse('DEC2HEX()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DEC2HEX(100)')).to.deep.equal({error: null, result: '64'});
    expect(parser.parse('DEC2HEX(100, 4)')).to.deep.equal({error: null, result: '0064'});
    expect(parser.parse('DEC2HEX(0)')).to.deep.equal({error: null, result: '0'});
    expect(parser.parse('DEC2HEX(1)')).to.deep.equal({error: null, result: '1'});
  });

  it('DEC2OCT', () => {
    expect(parser.parse('DEC2OCT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DEC2OCT(58)')).to.deep.equal({error: null, result: '72'});
    expect(parser.parse('DEC2OCT(58, 4)')).to.deep.equal({error: null, result: '0072'});
    expect(parser.parse('DEC2OCT(0)')).to.deep.equal({error: null, result: '0'});
    expect(parser.parse('DEC2OCT(1)')).to.deep.equal({error: null, result: '1'});
  });

  it('DELTA', () => {
    expect(parser.parse('DELTA()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('DELTA(58)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('DELTA(58, 4)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('DELTA(58, 58)')).to.deep.equal({error: null, result: 1});
  });

  it('ERF', () => {
    expect(parser.parse('ERF()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ERF(1)')).to.almost.eql({error: null, result: 0.8427007929497149});
    expect(parser.parse('ERF(2)')).to.almost.eql({error: null, result: 0.9953222650189527});
  });

  it('ERFC', () => {
    expect(parser.parse('ERFC()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('ERFC(0)')).to.almost.eql({error: null, result: 1});
    expect(parser.parse('ERFC(1)')).to.almost.eql({error: null, result: 0.1572992070502851});
  });

  it('GESTEP', () => {
    expect(parser.parse('GESTEP()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('GESTEP(1, 2)')).to.deep.equal({error: null, result: 0});
    expect(parser.parse('GESTEP(-1, -2)')).to.deep.equal({error: null, result: 1});
  });

  it('HEX2BIN', () => {
    expect(parser.parse('HEX2BIN()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('HEX2BIN("FA")')).to.deep.equal({error: null, result: '11111010'});
    expect(parser.parse('HEX2BIN("FA", 10)')).to.deep.equal({error: null, result: '0011111010'});
    expect(parser.parse('HEX2BIN(200)')).to.deep.equal({error: '#NUM!', result: null});
  });

  it('HEX2DEC', () => {
    expect(parser.parse('HEX2DEC()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('HEX2DEC("FA")')).to.deep.equal({error: null, result: 250});
    expect(parser.parse('HEX2DEC(200)')).to.deep.equal({error: null, result: 512});
  });

  it('HEX2OCT', () => {
    expect(parser.parse('HEX2OCT()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('HEX2OCT("FA")')).to.deep.equal({error: null, result: '372'});
    expect(parser.parse('HEX2OCT("FA", 6)')).to.deep.equal({error: null, result: '000372'});
    expect(parser.parse('HEX2OCT(200)')).to.deep.equal({error: null, result: '1000'});
  });

  it('IMABS', () => {
    expect(parser.parse('IMABS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMABS("5+12i")')).to.deep.equal({error: null, result: 13});
  });

  it('IMAGINARY', () => {
    expect(parser.parse('IMAGINARY()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMAGINARY("3+4i")')).to.deep.equal({error: null, result: 4});
    expect(parser.parse('IMAGINARY("+i")')).to.deep.equal({error: null, result: '+1'});
  });

  it('IMARGUMENT', () => {
    expect(parser.parse('IMARGUMENT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMARGUMENT(1)')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('IMARGUMENT(0)')).to.deep.equal({error: '#DIV/0!', result: null});
    expect(parser.parse('IMARGUMENT("3+4i")')).to.almost.eql({error: null, result: 0.9272952180016122});
  });

  it('IMCONJUGATE', () => {
    expect(parser.parse('IMCONJUGATE()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMCONJUGATE(1)')).to.deep.equal({error: '#ERROR!', result: null});
    expect(parser.parse('IMCONJUGATE("3+4i")')).to.deep.equal({error: null, result: '3-4i'});
  });

  it('IMCOS', () => {
    expect(parser.parse('IMCOS()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMCOS("3+4i")')).to.deep.equal({error: null, result: '-27.03494560307422-3.8511533348117766i'});
  });

  it('IMCOSH', () => {
    expect(parser.parse('IMCOSH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMCOSH("3+4i")')).to.deep.equal({error: null, result: '-6.580663040551157-7.581552742746545i'});
  });

  it('IMCOT', () => {
    expect(parser.parse('IMCOT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMCOT("3+4i")')).to.deep.equal({error: null, result: '-0.0001875877379836712-1.0006443924715591i'});
  });

  it('IMCSC', () => {
    expect(parser.parse('IMCSC()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('IMCSC("3+4i")')).to.deep.equal({error: null, result: '0.005174473184019398+0.03627588962862602i'});
  });

  it('IMCSCH', () => {
    expect(parser.parse('IMCSCH()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('IMCSCH("3+4i")')).to.deep.equal({error: null, result: '-0.0648774713706355+0.0754898329158637i'});
  });

  it('IMDIV', () => {
    expect(parser.parse('IMDIV()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMDIV("3+4i")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMDIV("3+4i", "2+2i")')).to.deep.equal({error: null, result: '1.75+0.25i'});
  });

  it('IMEXP', () => {
    expect(parser.parse('IMEXP()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMEXP("3+4i")')).to.deep.equal({error: null, result: '-13.128783081462158-15.200784463067954i'});
  });

  it('IMLN', () => {
    expect(parser.parse('IMLN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMLN("3+4i")')).to.deep.equal({error: null, result: '1.6094379124341003+0.9272952180016122i'});
  });

  it('IMLOG10', () => {
    expect(parser.parse('IMLOG10()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMLOG10("3+4i")')).to.deep.equal({error: null, result: '0.6989700043360187+0.4027191962733731i'});
  });

  it('IMLOG2', () => {
    expect(parser.parse('IMLOG2()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMLOG2("3+4i")')).to.deep.equal({error: null, result: '2.321928094887362+1.3378042124509761i'});
  });

  it('IMPOWER', () => {
    expect(parser.parse('IMPOWER()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMPOWER("3+4i")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMPOWER("3+4i", 3)')).to.deep.equal({error: null, result: '-117+44.000000000000036i'});
  });

  it('IMPRODUCT', () => {
    expect(parser.parse('IMPRODUCT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMPRODUCT("3+4i")')).to.deep.equal({error: null, result: '3+4i'});
    expect(parser.parse('IMPRODUCT("3+4i", "1+2i")')).to.deep.equal({error: null, result: '-5+10i'});
  });

  it('IMREAL', () => {
    expect(parser.parse('IMREAL()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMREAL("3+4i")')).to.deep.equal({error: null, result: 3});
  });

  it('IMSEC', () => {
    expect(parser.parse('IMSEC()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSEC("3+4i")')).to.deep.equal({error: null, result: '-0.03625349691586888+0.005164344607753179i'});
  });

  it('IMSECH', () => {
    expect(parser.parse('IMSECH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSECH("3+4i")')).to.deep.equal({error: null, result: '-0.06529402785794704+0.07522496030277322i'});
  });

  it('IMSIN', () => {
    expect(parser.parse('IMSIN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSIN("3+4i")')).to.deep.equal({error: null, result: '3.8537380379193764-27.01681325800393i'});
  });

  it('IMSINH', () => {
    expect(parser.parse('IMSINH()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSINH("3+4i")')).to.deep.equal({error: null, result: '-6.5481200409110025-7.61923172032141i'});
  });

  it('IMSQRT', () => {
    expect(parser.parse('IMSQRT()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSQRT("3+4i")')).to.deep.equal({error: null, result: '2+i'});
  });

  it('IMSUB', () => {
    expect(parser.parse('IMSUB()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSUB("3+4i")')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSUB("3+4i", "2+3i")')).to.deep.equal({error: null, result: '1+i'});
  });

  it('IMSUM', () => {
    expect(parser.parse('IMSUM()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMSUM("3+4i")')).to.deep.equal({error: null, result: '3+4i'});
    expect(parser.parse('IMSUM("3+4i", "2+3i")')).to.deep.equal({error: null, result: '5+7i'});
  });

  it('IMTAN', () => {
    expect(parser.parse('IMTAN()')).to.deep.equal({error: '#VALUE!', result: null});
    expect(parser.parse('IMTAN("3+4i")')).to.deep.equal({error: null, result: '-0.00018734620462949037+0.9993559873814729i'});
  });

  it('OCT2BIN', () => {
    expect(parser.parse('OCT2BIN()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('OCT2BIN(3)')).to.deep.equal({error: null, result: '11'});
    expect(parser.parse('OCT2BIN(3, 4)')).to.deep.equal({error: null, result: '0011'});
  });

  it('OCT2DEC', () => {
    expect(parser.parse('OCT2DEC()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('OCT2DEC(3)')).to.deep.equal({error: null, result: 3});
    expect(parser.parse('OCT2DEC(33)')).to.deep.equal({error: null, result: 27});
  });

  it('OCT2HEX', () => {
    expect(parser.parse('OCT2HEX()')).to.deep.equal({error: '#NUM!', result: null});
    expect(parser.parse('OCT2HEX(3)')).to.deep.equal({error: null, result: '3'});
    expect(parser.parse('OCT2HEX(33)')).to.deep.equal({error: null, result: '1b'});
    expect(parser.parse('OCT2HEX(33, 3)')).to.deep.equal({error: null, result: '01b'});
  });
});
