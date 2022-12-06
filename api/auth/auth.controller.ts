const authService = require('./auth.service')
const logger = require('../../services/logger.service')
const asyncLocalStorage = require('../../services/als.service')
export { }

import { Request, Response } from 'express';
import { NewUser } from '../../interfaces/user';

async function login(req: Request, res: Response) {
    const { username, password } = req.body
    try {
        const miniUser = await authService.login(username, password)
        const loginToken = authService.getLoginToken(miniUser)
        logger.info('User login: ', miniUser)
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
        res.json(miniUser)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req: Request, res: Response) {
    try {
        const credentials = req.body
        console.log('req.body:', req.body)
        const account = await authService.signup(credentials as NewUser)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(credentials))
        if (account) {
            const miniUser = await authService.login(credentials.username, credentials.password)
            const loginToken = authService.getLoginToken(miniUser)
            logger.info('User login:', miniUser)
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true })
            res.json(miniUser)
        }
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req: Request, res: Response) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

async function validateCookie(req: Request, res: Response) {
    console.log('getting to the backend')
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        if (loggedinUser) res.json(loggedinUser)
    } catch (err) {
        res.status(500).send({ err: 'no cookie' })
    }
}

module.exports = {
    login,
    signup,
    logout,
    validateCookie
}