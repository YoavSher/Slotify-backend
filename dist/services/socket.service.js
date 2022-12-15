"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function emitToUser(type, data, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        userId = userId.toString();
        const socket = yield _getUserSocket(userId);
        if (socket) {
            logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`);
            socket.emit(type, data);
        }
        else {
            logger.info(`No active socket for user: ${userId}`);
            // _printSockets()
        }
    });
}
// If possible, send to all sockets BUT not the current socket 
// Optionally, broadcast to a room / to all
function broadcast(type, data, room = null, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(data)
        // userId = userId.toString()
        console.log(userId);
        logger.info(`Broadcasting event: ${type}`);
        const excludedSocket = yield _getUserSocket(userId);
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
    });
}
function _getUserSocket(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield _getAllSockets();
        const socket = sockets.find((s) => s.userId === userId);
        return socket;
    });
}
function _getAllSockets() {
    return __awaiter(this, void 0, void 0, function* () {
        // return all Socket instances
        const sockets = yield gIo.fetchSockets();
        return sockets;
    });
}
function _printSockets() {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield _getAllSockets();
        console.log(`Sockets: (count: ${sockets.length}):`);
        sockets.forEach(_printSocket);
    });
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