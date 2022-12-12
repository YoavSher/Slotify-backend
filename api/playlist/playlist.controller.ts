export { }

import { Request, Response } from 'express';

const logger = require('../../services/logger.service')
const playlistService = require('./playlist.service')
const authService = require('../auth/auth.service')
const asyncLocalStorage = require('../../services/als.service')



async function getPlaylists(req: Request, res: Response) {
    try {
        const playlists = await playlistService.query()
        res.send(playlists)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}



async function addPlaylist(req: Request, res: Response) {
    try {
        // const playlist = req.body

        const { loggedinUser } = asyncLocalStorage.getStore()
        const addedPlaylist = await playlistService.add(loggedinUser._id)
        res.json(addedPlaylist)
    } catch (err) {
        logger.error('Failed to add playlist', err)
        res.status(500).send({ err: 'Failed to add playlist' })
    }
}

async function updatePlaylist(req: Request, res: Response) {
    try {
        const playlist = req.body
        // console.log('playlist:', playlist)
        await playlistService.update(playlist)
        // res.json(addedPlaylist)
    } catch (err) {
        logger.error('Failed to update playlist', err)
        res.status(500).send({ err: 'Failed to update playlist' })
    }
}

async function removePlaylist(req: Request, res: Response) {
    try {
        const playlistId = req.params.id
        const removedId = await playlistService.remove(playlistId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove playlist', err)
        res.status(500).send({ err: 'Failed to remove playlist' })
    }
}

async function getSearchedPlaylist(req: Request, res: Response) {
    try {
        console.log('req.params:', req.params)
        const { searchTerm } = req.params
        const playlist = await playlistService.searchPlaylists(searchTerm)
        // console.log('playlist:', playlist)
        res.send(playlist)
    } catch (err) {
        logger.error('Failed to get playlists', err)
        res.status(500).send({ err: 'Failed to get playlists' })
    }
}

module.exports = {
    getPlaylists,
    addPlaylist,
    updatePlaylist,
    removePlaylist,
    getSearchedPlaylist
}