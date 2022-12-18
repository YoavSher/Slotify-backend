"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService = require('../api/auth/auth.service');
const asyncLocalStorage = require('../services/als.service');
async function setupAsyncLocalStorage(req, res, next) {
    const storage = {};
    // console.log('req.cookies from middlewere:', req)
    asyncLocalStorage.run(storage, () => {
        if (!req.cookies)
            return next();
        const loggedinUser = authService.validateToken(req.cookies.loginToken);
        if (loggedinUser) {
            const alsStore = asyncLocalStorage.getStore();
            alsStore.loggedinUser = loggedinUser;
        }
        next();
    });
}
module.exports = setupAsyncLocalStorage;
//# sourceMappingURL=setupAls.middleware.js.map