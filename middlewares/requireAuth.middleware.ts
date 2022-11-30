export { }
import { Request, Response } from 'express';
const authService = require('../api/auth/auth.service')

function requireAuth(req: Request, res: Response, next: () => void) {
    if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    next()
}


// module.exports = requireAuth

module.exports = {
    requireAuth,
}
