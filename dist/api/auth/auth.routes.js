"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { login, signup, logout, validateCookie } = require('./auth.controller');
const router = express.Router();
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/', validateCookie);
module.exports = router;
//# sourceMappingURL=auth.routes.js.map