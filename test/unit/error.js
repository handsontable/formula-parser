import error from '../../src/error';

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

  it('should return `#NEED_UPDATE!`', () => {
    expect(error('NEED_UPDATE')).to.eq('#NEED_UPDATE!');
    expect(error('NEED_UPDATE!')).to.eq('#NEED_UPDATE!');
    expect(error('#NEED_UPDATE')).to.eq('#NEED_UPDATE!');
    expect(error('#NEED_UPDATE!')).to.eq('#NEED_UPDATE!');
    expect(error('#NEED_UPDATE?')).to.eq('#NEED_UPDATE!');
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
