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
const logger = require('../../services/logger.service');
const sqlService = require('../../services/db.service');
function add({ username, password, fullName, email }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO users (username,fullName,email,password) 
        VALUES ("${username}","${fullName}","${email}","${password}")`;
            yield sqlService.runSQL(query);
            return true;
        }
        catch (err) {
            logger.error('cannot add user', err);
        }
    });
}
function getByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM users WHERE username='${username}';`;
            const [user] = yield sqlService.runSQL(query);
            return user;
        }
        catch (err) {
            logger.error(`while finding user by username: ${username}`, err);
            throw err;
        }
    });
}
module.exports = {
    add,
    getByUsername
};
//# sourceMappingURL=user.service.js.map