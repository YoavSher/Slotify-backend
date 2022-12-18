"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService = require('./auth.service');
const logger = require('../../services/logger.service');
const asyncLocalStorage = require('../../services/als.service');
async function login(req, res) {
    const { username, password } = req.body;
    try {
        const miniUser = await authService.login(username, password);
        const loginToken = authService.getLoginToken(miniUser);
        logger.info('User login: ', miniUser);
        res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
        res.json(miniUser);
    }
    catch (err) {
        logger.error('Failed to Login ' + err);
        res.status(401).send({ err: 'Failed to Login' });
    }
}
async function signup(req, res) {
    try {
        const credentials = req.body;
        console.log('req.body:', req.body);
        const account = await authService.signup(credentials);
        logger.debug(`auth.route - new account created: ` + JSON.stringify(credentials));
        if (account) {
            const miniUser = await authService.login(credentials.username, credentials.password);
            const loginToken = authService.getLoginToken(miniUser);
            logger.info('User login:', miniUser);
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
            res.json(miniUser);
        }
    }
    catch (err) {
        logger.error('Failed to signup ' + err);
        res.status(500).send({ err: 'Failed to signup' });
    }
}
async function logout(req, res) {
    try {
        res.clearCookie('loginToken');
        res.send({ msg: 'Logged out successfully' });
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to logout' });
    }
}
async function validateCookie(req, res) {
    console.log('getting to the backend');
    try {
        const { loggedinUser } = asyncLocalStorage.getStore();
        if (loggedinUser)
            res.json(loggedinUser);
    }
    catch (err) {
        res.status(500).send({ err: 'no cookie' });
    }
}
module.exports = {
    login,
    signup,
    logout,
    validateCookie
};
//# sourceMappingURL=auth.controller.js.map