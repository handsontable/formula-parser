import {Parser} from '../../src/parser';

describe('Parser', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  describe('.parse()', () => {
    it('should be defined', () => {
      expect(parser.parse).to.be.a('function');
    });

    it('should internally call `parse` method of grammar parser object', () => {
      spy(parser.parser, 'parse');

      parser.parse('TRUE');

      sinon.assert.calledWith(parser.parser.parse, 'TRUE');
    });

    it('should return `#ERROR!` when parser throws unknown exception', () => {
      stub(parser.parser, 'parse').throws(new Error('some error'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#ERROR!', result: null});
    });

    it('should return `#ERROR!` when parser throws `#ERROR!` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#ERROR!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#ERROR!', result: null});
    });

    it('should return `#DIV/0!` when parser throws `#DIV/0!` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#DIV/0!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#DIV/0!', result: null});
    });

    it('should return `#NAME?` when parser throws `#NAME?` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#NAME?'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NAME?', result: null});
    });

    it('should return `#NEED_UPDATE!` when parser throws `#NEED_UPDATE!` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#NEED_UPDATE!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NEED_UPDATE!', result: null});
    });

    it('should return `#N/A` when parser throws `#N/A` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#N/A'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#N/A', result: null});
    });

    it('should return `#NULL!` when parser throws `#NULL!` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#NULL!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NULL!', result: null});
    });

    it('should return `#NUM!` when parser throws `#NUM!` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#NUM!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NUM!', result: null});
    });

    it('should return `#REF!` when parser throws `#REF!` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#REF!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#REF!', result: null});
    });

    it('should return `#VALUE!` when parser throws `#VALUE!` exception', () => {
      stub(parser.parser, 'parse').throws(new Error('#VALUE!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#VALUE!', result: null});
    });

    it('should return `#ERROR!` when parser returns error object (`some error`)', () => {
      stub(parser.parser, 'parse').returns(new Error('some error'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#ERROR!', result: null});
    });

    it('should return `#ERROR!` when parser returns error object (`#ERROR!`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#ERROR!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#ERROR!', result: null});
    });

    it('should return `#DIV/0!` when parser returns error object (`#DIV/0!`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#DIV/0!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#DIV/0!', result: null});
    });

    it('should return `#NAME?` when parser returns error object (`#NAME?`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#NAME?'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NAME?', result: null});
    });

    it('should return `#NEED_UPDATE!` when parser returns error object (`#NEED_UPDATE!`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#NEED_UPDATE!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NEED_UPDATE!', result: null});
    });

    it('should return `#N/A` when parser returns error object (`#N/A`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#N/A'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#N/A', result: null});
    });

    it('should return `#NULL!` when parser returns error object (`#NULL!`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#NULL!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NULL!', result: null});
    });

    it('should return `#NUM!` when parser returns error object (`#NUM!`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#NUM!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#NUM!', result: null});
    });

    it('should return `#REF!` when parser returns error object (`#REF!`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#REF!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#REF!', result: null});
    });

    it('should return `#VALUE!` when parser returns error object (`#VALUE!`)', () => {
      stub(parser.parser, 'parse').returns(new Error('#VALUE!'));
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: '#VALUE!', result: null});
    });

    it('should not return `#ERROR!` when parser evaluate expression as `ERROR`', () => {
      stub(parser.parser, 'parse').returns('ERROR');
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: null, result: 'ERROR'});
    });

    it('should not return `#ERROR!` when parser evaluate expression as `#ERROR!`', () => {
      stub(parser.parser, 'parse').returns('#ERROR!');
      spy(parser, 'parse');

      expect(parser.parse('foo')).to.deep.equal({error: null, result: '#ERROR!'});
    });
  });

  describe('.setVariable()/.getVariable()', () => {
    it('should return default variables', () => {
      expect(parser.getVariable('TRUE')).to.eq(true);
      expect(parser.getVariable('FALSE')).to.eq(false);
      expect(parser.getVariable('NULL')).to.eq(null);
      expect(parser.getVariable('foo')).to.be.undefined;
    });

    it('should return custom variables', () => {
      parser.setVariable('foo', 1234);
      parser.setVariable('bar', '1234');
      parser.setVariable('baz', [1, 2]);

      expect(parser.getVariable('foo')).to.eq(1234);
      expect(parser.getVariable('bar')).to.eq('1234');
      expect(parser.getVariable('baz')).to.deep.equal([1, 2]);
    });
  });

  describe('._callVariable()', () => {
    it('should return error (NAME) when variable not set', () => {
      stub(parser, 'getVariable').returns(void 0);

      expect(parser._callVariable.bind(parser)).to.throw(/NAME/);
    });

    it('should return variable when it was set', () => {
      stub(parser, 'getVariable', (name) => {
        return name === 'bar' ? 'foo' : 'baz';
      });

      expect(parser._callVariable('bar')).to.eq('foo');
      expect(parser._callVariable('barrr')).to.eq('baz');
    });

    it('should return variable set by event emitter', () => {
      stub(parser, 'getVariable').returns('baz');

      parser.on('callVariable', (name, done) => {
        done(name === 'bar' ? 'foo' : void 0);
      });

      expect(parser._callVariable('bar')).to.eq('foo');
      expect(parser._callVariable('barrr')).to.eq('baz');
    });
  });

  describe('._callCellValue()', () => {
    it('should return undefined if under specified coordinates data value not exist', () => {
      expect(parser._callCellValue('A1')).to.undefined;
    });

    it('should return value under specified coordinates', () => {
      parser.on('callCellValue', (cell, done) => {
        const {row, column} = cell;
        let value;

        if (row.index === 0 && column.index === 2) {
          value = '4';
        } else if (row.index === 0 && column.index === 7) {
          value = 45;
        } else if (row.index === 2 && column.index === 7) {
          value = [1, 2, 3];
        } else if (row.index === 3 && column.index === 7 && column.isAbsolute) {
          value = true;
        } else if (row.index === 4 && row.isAbsolute && column.index === 7 && column.isAbsolute) {
          value = .9;
        }

        done(value);
      });

      expect(parser._callCellValue('A1')).to.eq(void 0);
      expect(parser._callCellValue('C1')).to.eq('4');
      expect(parser._callCellValue('H1')).to.eq(45);
      expect(parser._callCellValue('H3')).to.deep.eq([1, 2, 3]);
      expect(parser._callCellValue('$H4')).to.eq(true);
      expect(parser._callCellValue('$H$5')).to.eq(0.9);
    });
  });

  describe('._callRangeValue()', () => {
    it('should return an empty array if under specified coordinates data value not exist', () => {
      expect(parser._callRangeValue('A1', 'B2')).to.deep.eq([]);
    });

    it('should return value under specified coordinates', () => {
      parser.on('callRangeValue', (firstCell, lastCell, done) => {
        const {row: row1, column: column1} = firstCell;
        const {row: row2, column: column2} = lastCell;
        let value;

        if (row1.index === 0 && column1.index === 2 && row2.index === 3 && column2.index === 3) {
          value = [[1, 2], [4, 5]];
        } else if (row1.index === 0 && row1.isAbsolute && column1.index === 0 &&
                   row2.index === 3 && column2.index === 3 && column2.isAbsolute) {
          value = [['a', 'b'], ['z', 'd']];
        } else if (row1.index === 0 && row1.isAbsolute && column1.index === 0 && column1.isAbsolute &&
                   row2.index === 4 && row2.isAbsolute && column2.index === 4 && column2.isAbsolute) {
          value = [[true, false], [true, true]];

        } else if (row1.index === 4 && row1.isAbsolute && column1.index === 7 && column1.isAbsolute) {
          value = .9;
        }

        done(value);
      });

      expect(parser._callRangeValue('C1', 'D4')).to.deep.equal([[1, 2], [4, 5]]);
      expect(parser._callRangeValue('A$1', '$D4')).to.deep.equal([['a', 'b'], ['z', 'd']]);
      expect(parser._callRangeValue('$A$1', '$E$5')).to.deep.equal([[true, false], [true, true]]);
    });

    it('should convert coordinates in top-left bottom-right format (from bottom-left to top-right)', () => {
      const obj = {cb: function() {}};

      spy(obj, 'cb');

      parser.on('callRangeValue', obj.cb);
      parser._callRangeValue('$A$9', 'B2');

      const startCell = {
        row: {index: 1, isAbsolute: false, label: '2'},
        column: {index: 0, isAbsolute: true, label: 'A'},
      };
      const endCell = {
        row: {index: 8, isAbsolute: true, label: '9'},
        column: {index: 1, isAbsolute: false, label: 'B'},
      };

      sinon.assert.calledWithMatch(obj.cb, startCell, endCell);
    });

    it('should convert coordinates in top-left bottom-right format (from top-right to bottom-left)', () => {
      const obj = {cb: function() {}};

      spy(obj, 'cb');

      parser.on('callRangeValue', obj.cb);
      parser._callRangeValue('B$2', 'A$8');

      const startCell = {
        row: {index: 1, isAbsolute: true, label: '2'},
        column: {index: 0, isAbsolute: false, label: 'A'},
      };
      const endCell = {
        row: {index: 7, isAbsolute: true, label: '8'},
        column: {index: 1, isAbsolute: false, label: 'B'},
      };

      sinon.assert.calledWithMatch(obj.cb, startCell, endCell);
    });
  });

  describe('._throwError()', () => {
    it('should throw general error', () => {
      expect(() => parser._throwError('#ERROR!')).to.throw('ERROR');
    });

    it('should throw dividing by 0 error', () => {
      expect(() => parser._throwError('#DIV/0!')).to.throw('DIV/0');
    });

    it('should throw name error', () => {
      expect(() => parser._throwError('#NAME?')).to.throw('NAME');
    });

    it('should throw not available error', () => {
      expect(() => parser._throwError('#N/A')).to.throw('N/A');
    });

    it('should throw null error', () => {
      expect(() => parser._throwError('#NULL!')).to.throw('NULL');
    });

    it('should throw num error', () => {
      expect(() => parser._throwError('#NUM!')).to.throw('NUM');
    });

    it('should throw ref error', () => {
      expect(() => parser._throwError('#REF!')).to.throw('REF');
    });

    it('should throw value error', () => {
      expect(() => parser._throwError('#VALUE!')).to.throw('VALUE');
    });

    it('should return value if not matched to any of defined error', () => {
      expect(parser._throwError('VALUE foo')).to.be.eq('VALUE foo');
    });
  });
});
