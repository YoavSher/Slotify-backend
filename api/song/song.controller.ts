export { }

import { Request, Response } from 'express';

const logger = require('../../services/logger.service')
const songService = require('./song.service')
const asyncLocalStorage = require('../../services/als.service')

async function addSongs(req: Request, res: Response) {
    try {
       
        const songs = req.body
        const addedSongs = await songService.add(songs)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add songs' })
    }
}

async function getUsersLikedSongs(req: Request, res: Response) {
    try {
        const userId = req.params.id
        const likedSongs = await songService.getUserSongs(userId)
        res.json(likedSongs)
    } catch (err) {

        logger.error('Failed to add songs', err)
        res.status(500).send({ err: 'Failed to add songs' })
    }
}

async function likeSongByUser(req: Request, res: Response) {
    console.log(req.body)
    const query = `INSERT INTO usersLikedSongs (userId,songId,addedAt)
    values(2,'_FrOQC-zEog',1111111);`
}



module.exports = {
    addSongs,
    getUsersLikedSongs,
    likeSongByUser
}