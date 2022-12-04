const express = require('express')
const router = express.Router()


const { addSongs } = require('./song.controller')



router.post('/', addSongs)  //requireAuth


module.exports = router