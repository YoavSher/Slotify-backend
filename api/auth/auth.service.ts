import { MiniUser, NewUser, User } from "../../interfaces/user"

const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
const saltRounds = 10
export { }

async function login(username: string, password: string) {
    logger.debug(`auth.service - login with username: ${username}`)
    try {
        const user = await userService.getByUsername(username)
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error('Invalid password')
        const { _id, fullName } = user
        return { _id, fullName }
    } catch (err) {
        logger.info('Failed login attempt', err)
        throw new Error('Invalid username or password')
    }
}



async function signup({ username, password, fullName, email }: NewUser) {


    logger.debug(`auth.service - signup with username: ${username}, fullName: ${fullName}`)
    if (!username || !password || !fullName || !email) return Promise.reject('Missing required signup information')

    try {
        const hash = await bcrypt.hash(password, saltRounds)
        return userService.add({ username, password: hash, fullName, email })
    } catch (err) {
        throw new Error('Username already taken')
    }


}


function getLoginToken({ _id, fullName }: MiniUser) {

    return cryptr.encrypt(JSON.stringify({ _id, fullName }))
}

function validateToken(loginToken: string): MiniUser | null {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}


module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}