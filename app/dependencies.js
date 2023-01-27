'use strict';

module.exports = (config) => ({
    db: require('./db.js'),
    console: require(`./${config.logger}.js`),
    hash: require('./hash.js'),
});