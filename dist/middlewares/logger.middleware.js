"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../services/logger.service');
async function log(req, res, next) {
    logger.info('Sample Logger Middleware');
    next();
}
module.exports = {
    log
};
//# sourceMappingURL=logger.middleware.js.map