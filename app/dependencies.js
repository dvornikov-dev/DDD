'use strict';

module.exports = (config) => ({
    db: require('./lib/db.js')(config.db),
    console: console,
    hash: require('./lib/hash.js'),
});