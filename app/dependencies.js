'use strict';

module.exports = (config) => ({
    db: require('./lib/db.js')(config.db),
    console: require(`./lib/${config.logger}.js`),
    hash: require('./lib/hash.js'),
});