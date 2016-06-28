import {default as evaluateByOperator, registerOperation} from '../../../src/evaluate-by-operator/evaluate-by-operator';

describe('.registerOperation()', () => {
  it('should register new operator and evaluate it', () => {
    registerOperation('foo', function(a, b) {
      return a + b;
    });

    expect(evaluateByOperator('foo', [2, 8.8])).to.eq(10.8);
    expect(evaluateByOperator('foo', ['2', '8.8'])).to.eq('28.8');
  });
});

describe('.evaluateByOperator()', () => {
  it('should throw exception when operator do not exist', () => {
    expect(function() {
      evaluateByOperator('bar', [2, 8.8]);
    }).to.throw('NAME');
    expect(function() {
      evaluateByOperator('baz');
    }).to.throw('NAME');
  });

  it('should not to throw exception for `add` operator', () => {
    expect(function() {
      evaluateByOperator('+', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `ampersand` operator', () => {
    expect(function() {
      evaluateByOperator('&', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `divide` operator', () => {
    expect(function() {
      evaluateByOperator('/', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `equal` operator', () => {
    expect(function() {
      evaluateByOperator('=', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `formula function` operator', () => {
    expect(function() {
      evaluateByOperator('SUM', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `greater than` operator', () => {
    expect(function() {
      evaluateByOperator('>', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `greater than or equal` operator', () => {
    expect(function() {
      evaluateByOperator('>=', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `less than` operator', () => {
    expect(function() {
      evaluateByOperator('<', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `less than or equal` operator', () => {
    expect(function() {
      evaluateByOperator('<=', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `minus` operator', () => {
    expect(function() {
      evaluateByOperator('-', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `multiply` operator', () => {
    expect(function() {
      evaluateByOperator('*', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `not equal` operator', () => {
    expect(function() {
      evaluateByOperator('<>', [2, 8.8]);
    }).to.not.throw();
  });

  it('should not to throw exception for `power` operator', () => {
    expect(function() {
      evaluateByOperator('^', [2, 2]);
    }).to.not.throw();
  });
});
