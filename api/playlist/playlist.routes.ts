export { }

const express = require('express')
const router = express.Router()

const { addPlaylist } = require('./playlist.controller')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')


router.post('/', requireAuth, addPlaylist)  //requireAuth
// router.get('/:id', log, findBoard)



module.exports = router