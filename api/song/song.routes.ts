const express = require('express')
const router = express.Router()


const { addSongs, getSearchedSongs } = require('./song.controller')



router.post('/', addSongs)  //requireAuth
router.get('/:searchTerm', getSearchedSongs)  


module.exports = router