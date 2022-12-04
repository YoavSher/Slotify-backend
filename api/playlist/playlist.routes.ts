export { }

const express = require('express')
const router = express.Router()

const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { addPlaylist, getPlaylists, updatePlaylist, removePlaylist } = require('./playlist.controller')


router.get('/', getPlaylists)  //requireAuth
router.post('/', requireAuth, addPlaylist)  //requireAuth
router.put('/:id', requireAuth, updatePlaylist)  //requireAuth
router.delete('/:id', requireAuth, removePlaylist)
// router.get('/:id', log, findBoard)



module.exports = router