"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const sqlService = require('../../services/db.service');
async function add({ username, password, fullName, email }) {
    try {
        const query = `INSERT INTO users (username,fullName,email,password) 
        VALUES ("${username}","${fullName}","${email}","${password}")`;
        await sqlService.runSQL(query);
        return true;
    }
    catch (err) {
        logger.error('cannot add user', err);
    }
}
async function getByUsername(username) {
    try {
        const query = `SELECT * FROM users WHERE username='${username}';`;
        const [user] = await sqlService.runSQL(query);
        return user;
    }
    catch (err) {
        logger.error(`while finding user by username: ${username}`, err);
        throw err;
    }
}
module.exports = {
    add,
    getByUsername
};
//# sourceMappingURL=user.service.js.map