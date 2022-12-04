export { }

import { Request, Response } from 'express';

const logger = require('../../services/logger.service')
const songService = require('./playlistSongs.service')


async function getPlaylistSongs(req: Request, res: Response) {
    try {
        const playlistId = req.params.id
        const playlistSongs = await songService.getSongs(playlistId)
        res.json(playlistSongs)
    } catch (err) {

        logger.error('Failed to add songs', err)
        res.status(500).send({ err: 'Failed to add songs' })
    }

}

async function addPlaylistSong(req: Request, res: Response) {
    try {
        const playlistSong = req.body
        console.log('req.body:', req.body)
        const isSong = await songService.addPlaylistSong(playlistSong)
        if (isSong) res.json('success')
    } catch (err) {
        logger.error('Failed to add songs', err)
        res.status(500).send({ err: 'Failed to add songs' })
        // maybe should do something more extreme if it fails
    }
}

async function removeFromPlaylist(req: Request, res: Response) {
    try {
        console.log('req.params: ', req.params)
        const { playlistId, songId } = req.params
        const isDeleted = await songService.deleteFromPlaylist(playlistId, songId)
        if (isDeleted) res.json('success')
    } catch (err) {

        logger.error('Failed to remove song', err)
        res.status(500).send({ err: 'Failed to remove song' })
    }
}

module.exports = {
    getPlaylistSongs,
    addPlaylistSong,
    removeFromPlaylist
}