export {}
const express = require('express')
const router = express.Router()


const {  getUsersLikedSongs, likeSongByUser, removeLikedSong} = require('./userSongs.controller')


router.get('/:id', getUsersLikedSongs)  //requireAuth
router.post('/', likeSongByUser)  //requireAuth
router.delete('/:id', removeLikedSong)  //requireAuth



module.exports = router