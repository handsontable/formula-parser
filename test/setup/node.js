global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

chai.use(require('chai-stats'));

require('babel-core/register');
require('./setup')();
