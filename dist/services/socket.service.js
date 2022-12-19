"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require('./logger.service');
var gIo;
function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    });
}
// function emitTo({ type, data, label }) {
//     if (label) gIo.to('watching:' + label.toString()).emit(type, data)
//     else gIo.emit(type, data)
// }
async function emitToUser(type, data, userId) {
    userId = userId.toString();
    const socket = await _getUserSocket(userId);
    if (socket) {
        logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`);
        socket.emit(type, data);
    }
    else {
        logger.info(`No active socket for user: ${userId}`);
        // _printSockets()
    }
}
// If possible, send to all sockets BUT not the current socket 
// Optionally, broadcast to a room / to all
async function broadcast(type, data, room = null, userId) {
    // console.log(data)
    // userId = userId.toString()
    console.log(userId);
    logger.info(`Broadcasting event: ${type}`);
    const excludedSocket = await _getUserSocket(userId);
    if (room && excludedSocket) {
        logger.info(`Broadcast to room ${room} excluding user: ${userId}`);
        excludedSocket.broadcast.to(room).emit(type, data);
    }
    else if (excludedSocket) {
        logger.info(`Broadcast to all excluding user: ${userId}`);
        excludedSocket.broadcast.emit(type, data);
    }
    else if (room) {
        logger.info(`Emit to room: ${room}`);
        gIo.to(room).emit(type, data);
    }
    else {
        logger.info(`Emit to all`);
        gIo.emit(type, data);
    }
}
async function _getUserSocket(userId) {
    const sockets = await _getAllSockets();
    const socket = sockets.find((s) => s.userId === userId);
    return socket;
}
async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets();
    return sockets;
}
async function _printSockets() {
    const sockets = await _getAllSockets();
    console.log(`Sockets: (count: ${sockets.length}):`);
    sockets.forEach(_printSocket);
}
function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`);
}
module.exports = {
    // set up the sockets service and define the API
    setupSocketAPI,
    // emit to everyone / everyone in a specific room (label)
    // emitTo,
    // emit to a specific user (if currently active in system)
    emitToUser,
    // Send to all sockets BUT not the current socket - if found
    // (otherwise broadcast to a room / to all)
    broadcast,
};
//# sourceMappingURL=socket.service.js.map