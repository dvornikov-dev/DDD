import db from './lib/db.js';
import hash from './lib/hash.js';

export default (config) => ({
    db: db(config.db),
    console: console,
    hash: hash,
});