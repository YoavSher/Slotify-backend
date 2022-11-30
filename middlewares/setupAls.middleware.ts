export { }

const authService = require('../api/auth/auth.service')
const asyncLocalStorage = require('../services/als.service')

async function setupAsyncLocalStorage(req: { cookies: { loginToken: string } }, res: any, next: () => void) {
    const storage = {}
    asyncLocalStorage.run(storage, () => {
        if (!req.cookies) return next()
        const loggedinUser = authService.validateToken(req.cookies.loginToken)

        if (loggedinUser) {
            const alsStore = asyncLocalStorage.getStore()
            alsStore.loggedinUser = loggedinUser
        }
        next()
    })
}

module.exports = setupAsyncLocalStorage

