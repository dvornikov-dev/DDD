'use strict';

module.exports = {
    port: 3000,
    db: {
      host: 'db',
      port: 5432,
      database: 'example',
      user: 'user',
      password: 'password',
    },
    server: 'fastify',
    logger: 'pino',
}