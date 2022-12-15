"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { addUser } = require('./user.controller');
router.post('/', addUser); //requireAuth
module.exports = router;
//# sourceMappingURL=user.routes.js.map