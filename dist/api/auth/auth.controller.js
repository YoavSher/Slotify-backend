"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService = require('./auth.service');
const logger = require('../../services/logger.service');
const asyncLocalStorage = require('../../services/als.service');
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const miniUser = yield authService.login(username, password);
            const loginToken = authService.getLoginToken(miniUser);
            logger.info('User login: ', miniUser);
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
            res.json(miniUser);
        }
        catch (err) {
            logger.error('Failed to Login ' + err);
            res.status(401).send({ err: 'Failed to Login' });
        }
    });
}
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const credentials = req.body;
            console.log('req.body:', req.body);
            const account = yield authService.signup(credentials);
            logger.debug(`auth.route - new account created: ` + JSON.stringify(credentials));
            if (account) {
                const miniUser = yield authService.login(credentials.username, credentials.password);
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
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('loginToken');
            res.send({ msg: 'Logged out successfully' });
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to logout' });
        }
    });
}
function validateCookie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('getting to the backend');
        try {
            const { loggedinUser } = asyncLocalStorage.getStore();
            if (loggedinUser)
                res.json(loggedinUser);
        }
        catch (err) {
            res.status(500).send({ err: 'no cookie' });
        }
    });
}
module.exports = {
    login,
    signup,
    logout,
    validateCookie
};
//# sourceMappingURL=auth.controller.js.map