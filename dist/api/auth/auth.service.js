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
const Cryptr = require('cryptr');
const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234');
const saltRounds = 10;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug(`auth.service - login with username: ${username}`);
        try {
            const user = yield userService.getByUsername(username);
            const match = yield bcrypt.compare(password, user.password);
            if (!match)
                throw new Error('Invalid password');
            const { _id, fullName } = user;
            return { _id, fullName };
        }
        catch (err) {
            logger.info('Failed login attempt', err);
            throw new Error('Invalid username or password');
        }
    });
}
function signup({ username, password, fullName, email }) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug(`auth.service - signup with username: ${username}, fullName: ${fullName}`);
        if (!username || !password || !fullName || !email)
            return Promise.reject('Missing required signup information');
        try {
            const hash = yield bcrypt.hash(password, saltRounds);
            return userService.add({ username, password: hash, fullName, email });
        }
        catch (err) {
            throw new Error('Username already taken');
        }
    });
}
function getLoginToken({ _id, fullName }) {
    return cryptr.encrypt(JSON.stringify({ _id, fullName }));
}
function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken);
        const loggedinUser = JSON.parse(json);
        return loggedinUser;
    }
    catch (err) {
        console.log('Invalid login token');
    }
    return null;
}
module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
};
//# sourceMappingURL=auth.service.js.map