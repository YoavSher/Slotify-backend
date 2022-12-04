const express = require('express')
const router = express.Router()


const { addSongs, getUsersLikedSongs, likeSongByUser, removeLikedSong, getPlaylistSongs ,addPlaylistSong} = require('./song.controller')


router.post('/playlist', addPlaylistSong)  //requireAuth?
router.get('/playlist/:id', getPlaylistSongs)  //requireAuth?
router.post('/', addSongs)  //requireAuth
router.get('/user/:id', getUsersLikedSongs)  //requireAuth
router.post('/user', likeSongByUser)  //requireAuth
router.delete('/user/:id', removeLikedSong)  //requireAuth

module.exports = router