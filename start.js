//Loading esm module to support ECMA6
require = require('esm')(module);

//Start bot by loading index.js
module.exports = require('./index.js');