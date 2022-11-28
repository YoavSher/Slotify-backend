export {}
const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')

function requireAuth(req: { cookies: { loginToken: any } }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any } } }, next: () => void) {
    if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    next()
}

function requireAdmin(req: { cookies: { loginToken: any } }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any }; end: { (arg0: string): void; new(): any } } }, next: () => void) {
    if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    if (!loggedinUser.isAdmin) {
        logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
        res.status(403).end('Not Authorized')
        return
    }
    next()
}


// module.exports = requireAuth

module.exports = {
    requireAuth,
    requireAdmin
}
