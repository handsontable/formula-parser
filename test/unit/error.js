import {default as error, isValidStrict} from '../../src/error';

describe('.error()', () => {
  it('should return null for unrecognized error types', () => {
    expect(error()).to.eq(null);
    expect(error('')).to.eq(null);
    expect(error('dewdewdw')).to.eq(null);
    expect(error('ERROR1')).to.eq(null);
    expect(error(' ERROR!')).to.eq(null);
    expect(error(' #ERROR!')).to.eq(null);
  });

  it('should return `#ERROR!`', () => {
    expect(error('ERROR')).to.eq('#ERROR!');
    expect(error('ERROR!')).to.eq('#ERROR!');
    expect(error('#ERROR')).to.eq('#ERROR!');
    expect(error('#ERROR!')).to.eq('#ERROR!');
    expect(error('#ERROR?')).to.eq('#ERROR!');
  });

  it('should return `#DIV/0!`', () => {
    expect(error('DIV/0')).to.eq('#DIV/0!');
    expect(error('DIV/0!')).to.eq('#DIV/0!');
    expect(error('#DIV/0')).to.eq('#DIV/0!');
    expect(error('#DIV/0!')).to.eq('#DIV/0!');
    expect(error('#DIV/0?')).to.eq('#DIV/0!');
  });

  it('should return `#NAME?`', () => {
    expect(error('NAME')).to.eq('#NAME?');
    expect(error('NAME!')).to.eq('#NAME?');
    expect(error('#NAME')).to.eq('#NAME?');
    expect(error('#NAME!')).to.eq('#NAME?');
    expect(error('#NAME?')).to.eq('#NAME?');
  });

  it('should return `#N/A`', () => {
    expect(error('N/A')).to.eq('#N/A');
    expect(error('N/A!')).to.eq('#N/A');
    expect(error('#N/A')).to.eq('#N/A');
    expect(error('#N/A!')).to.eq('#N/A');
    expect(error('#N/A?')).to.eq('#N/A');
  });

  it('should return `#NULL!`', () => {
    expect(error('NULL')).to.eq('#NULL!');
    expect(error('NULL!')).to.eq('#NULL!');
    expect(error('#NULL')).to.eq('#NULL!');
    expect(error('#NULL!')).to.eq('#NULL!');
    expect(error('#NULL?')).to.eq('#NULL!');
  });

  it('should return `#NUM!`', () => {
    expect(error('NUM')).to.eq('#NUM!');
    expect(error('NUM!')).to.eq('#NUM!');
    expect(error('#NUM')).to.eq('#NUM!');
    expect(error('#NUM!')).to.eq('#NUM!');
    expect(error('#NUM?')).to.eq('#NUM!');
  });

  it('should return `#REF!`', () => {
    expect(error('REF')).to.eq('#REF!');
    expect(error('REF!')).to.eq('#REF!');
    expect(error('#REF')).to.eq('#REF!');
    expect(error('#REF!')).to.eq('#REF!');
    expect(error('#REF?')).to.eq('#REF!');
  });

  it('should return `#VALUE?`', () => {
    expect(error('VALUE')).to.eq('#VALUE!');
    expect(error('VALUE!')).to.eq('#VALUE!');
    expect(error('#VALUE')).to.eq('#VALUE!');
    expect(error('#VALUE!')).to.eq('#VALUE!');
    expect(error('#VALUE?')).to.eq('#VALUE!');
  });
});

describe('.isValidStrict()', () => {
  it('should return false for unrecognized error types', () => {
    expect(isValidStrict()).to.false;
    expect(isValidStrict('')).to.false;
    expect(isValidStrict('dewdewdw')).to.false;
    expect(isValidStrict('ERROR1')).to.false;
    expect(isValidStrict(' ERROR!')).to.false;
    expect(isValidStrict(' #ERROR!')).to.false;
  });

  it('should return true for valid general error (`#ERROR!`)', () => {
    expect(isValidStrict('#ERROR!')).to.true;
    expect(isValidStrict('ERROR')).to.false;
    expect(isValidStrict('ERROR!')).to.false;
    expect(isValidStrict('#ERROR')).to.false;
    expect(isValidStrict('#ERROR?')).to.false;
  });

  it('should return true for valid `#DIV/0!` error', () => {
    expect(isValidStrict('#DIV/0!')).to.true;
    expect(isValidStrict('DIV/0')).to.false;
    expect(isValidStrict('DIV/0!')).to.false;
    expect(isValidStrict('#DIV/0')).to.false;
    expect(isValidStrict('#DIV/0?')).to.false;
  });

  it('should return true for valid `#NAME?` error', () => {
    expect(isValidStrict('#NAME?')).to.true;
    expect(isValidStrict('NAME')).to.false;
    expect(isValidStrict('NAME!')).to.false;
    expect(isValidStrict('#NAME')).to.false;
    expect(isValidStrict('#NAME!')).to.false;
  });

  it('should return true for valid `#N/A` error', () => {
    expect(isValidStrict('#N/A')).to.true;
    expect(isValidStrict('N/A')).to.false;
    expect(isValidStrict('N/A!')).to.false;
    expect(isValidStrict('#N/A!')).to.false;
    expect(isValidStrict('#N/A?')).to.false;
  });

  it('should return true for valid `#NULL!` error', () => {
    expect(isValidStrict('#NULL!')).to.true;
    expect(isValidStrict('NULL')).to.false;
    expect(isValidStrict('NULL!')).to.false;
    expect(isValidStrict('#NULL')).to.false;
    expect(isValidStrict('#NULL?')).to.false;
  });

  it('should return true for valid `#NUM!` error', () => {
    expect(isValidStrict('#NUM!')).to.true;
    expect(isValidStrict('NUM')).to.false;
    expect(isValidStrict('NUM!')).to.false;
    expect(isValidStrict('#NUM')).to.false;
    expect(isValidStrict('#NUM?')).to.false;
  });

  it('should return true for valid `#REF!` error', () => {
    expect(isValidStrict('#REF!')).to.true;
    expect(isValidStrict('REF')).to.false;
    expect(isValidStrict('REF!')).to.false;
    expect(isValidStrict('#REF')).to.false;
    expect(isValidStrict('#REF?')).to.false;
  });

  it('should return true for valid `#VALUE!` error', () => {
    expect(isValidStrict('#VALUE!')).to.true;
    expect(isValidStrict('VALUE')).to.false;
    expect(isValidStrict('VALUE!')).to.false;
    expect(isValidStrict('#VALUE')).to.false;
    expect(isValidStrict('#VALUE?')).to.false;
  });
});
