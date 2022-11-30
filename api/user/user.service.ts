const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')



async function add(user: any) {
    try {
       
    } catch (err) {
        logger.error('cannot add song', err)
    }
}


module.exports = {
    // query,
    // remove,
    add,
    // getById,
    // update
}