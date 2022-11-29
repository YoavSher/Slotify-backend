const express = require('express')
const router = express.Router()

const { addPlaylist } = require('./playlist.controller')

router.post('/', addPlaylist)  //requireAuth



module.exports = router