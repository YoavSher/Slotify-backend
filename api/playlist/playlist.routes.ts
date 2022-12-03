export { }

const express = require('express')
const router = express.Router()

const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { addPlaylist,getPlaylists } = require('./playlist.controller')


router.get('/',  getPlaylists)  //requireAuth
router.post('/', requireAuth, addPlaylist)  //requireAuth
// router.get('/:id', log, findBoard)



module.exports = router