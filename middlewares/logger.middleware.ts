export {}
const logger = require('../services/logger.service')

async function log(req: any, res: any, next: () => void) {
  logger.info('Sample Logger Middleware')
  next()
}

module.exports = {
  log
}
