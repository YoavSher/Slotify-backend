"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('../../services/logger.service');
const userService = require('./user.service');
async function addUser(req, res) {
    try {
        const user = req.body;
        const addedUser = await userService.add(user);
        res.json(addedUser);
    }
    catch (err) {
        logger.error('Failed to add board', err);
        res.status(500).send({ err: 'Failed to add board' });
    }
}
module.exports = {
    addUser,
};
//# sourceMappingURL=user.controller.js.map