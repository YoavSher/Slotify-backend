export { }

const express = require('express')
const router = express.Router()

const { addUser } = require('./user.controller')

router.post('/', addUser)  //requireAuth


module.exports = router