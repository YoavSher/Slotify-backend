"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService = require('../api/auth/auth.service');
function requireAuth(req, res, next) {
    if (!req?.cookies?.loginToken)
        return res.status(401).send('Not Authenticated');
    const loggedinUser = authService.validateToken(req.cookies.loginToken);
    if (!loggedinUser)
        return res.status(401).send('Not Authenticated');
    next();
}
// module.exports = requireAuth
module.exports = {
    requireAuth,
};
//# sourceMappingURL=requireAuth.middleware.js.map