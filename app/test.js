const pino = require('pino')
const transport = pino.transport({
  targets: [{
    level: 'info',
    target: 'pino-pretty' // must be installed separately
  }, {
    level: 'trace',
    target: 'pino/file',
    options: { destination: 'log/log.log' }
  }]
})
const logger = pino(transport);

logger.info({p: 1})