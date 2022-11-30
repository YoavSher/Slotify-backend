import { NewUser, User } from "../../interfaces/user"
export { }
const logger = require('../../services/logger.service')
const sqlService = require('../../services/db.service')

async function add({ username, password, fullName, email }: NewUser) {
    try {
        const query = `INSERT INTO users (username,fullName,password,email) 
        VALUES ("${username}","${fullName}","${password}","${email}")`
        await sqlService.runSQL(query)
        return true
    } catch (err) {
        logger.error('cannot add user', err)
    }
}

async function getByUsername(username: string) {
    try {
        const query = `SELECT * FROM users WHERE username='${username}';`
        const [user] = await sqlService.runSQL(query)
        return user as User
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

module.exports = {
    add,
    getByUsername
}