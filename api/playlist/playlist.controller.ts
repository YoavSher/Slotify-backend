export { }

import { Request, Response } from 'express';

const logger = require('../../services/logger.service')
const playlistService = require('./playlist.service')

async function addPlaylist(req: Request, res: Response) {
    try {
        // const playlist = req.body
        const addedPlaylist = await playlistService.add()
        res.json(addedPlaylist)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}



module.exports = {
    addPlaylist,
}