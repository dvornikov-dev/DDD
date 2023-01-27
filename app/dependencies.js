'use strict';

module.exports = (config) => ({
    db: require('./db.js')(config.db),
    console: require(`./${config.logger}.js`),
    hash: require('./hash.js'),
});