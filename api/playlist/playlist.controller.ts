export { }

import { Request, Response } from 'express';

const logger = require('../../services/logger.service')
const playlistService = require('./playlist.service')
const authService = require('../auth/auth.service')
const asyncLocalStorage = require('../../services/als.service')


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


module.exports = {
    addPlaylist,
}