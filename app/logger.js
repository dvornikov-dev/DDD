'use strict';

const pino = require('pino')

class Logger {
  constructor(logPath) {
    const transport = pino.transport({
      targets: [
      {
        level: 'info',
        target: 'pino-pretty' // must be installed separately
      }, 
      {
        level: 'trace',
        target: 'pino/file',
        options: { destination: logPath }
      }]
    });
    this.logger = pino(transport);
  }

  log(...args) {
    this.logger.info(...args);
  }

  dir(...args) {
    this.logger.info(...args);
  }

  debug(...args) {
    this.logger.debug(...args);
  }

  error(...args) {
    this.logger.error(...args);
  }

  system(...args) {
    this.logger.info(...args);
  }

  access(...args) {
    this.logger.info(...args);
  }
}

module.exports = new Logger('./log/logs.log');
