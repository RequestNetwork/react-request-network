'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./request-network-lw.cjs.production.js');
} else {
  module.exports = require('./request-network-lw.cjs.development.js');
}
