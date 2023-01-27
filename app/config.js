'use strict';

const logger = require('./logger');

module.exports = {
    port: 3000,
    db: {
      host: 'db',
      port: 5432,
      database: 'example',
      user: 'user',
      password: 'password',
    },
    transport: 'http',
    logger: 'logger',
}