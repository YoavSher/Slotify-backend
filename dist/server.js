"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http').createServer(app);
// Express App Config
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const playlistRoutes = require('./api/playlist/playlist.routes');
const songRoutes = require('./api/song/song.routes');
const userRoutes = require('./api/user/user.routes');
const userSongsRoutes = require('./api/userSongs/userSongs.routes');
const playlistSongsRoutes = require('./api/playlistSongs/playlistSongs.routes');
const userPlaylistRoutes = require('./api/userPlaylists/userPlaylists.routes');
const authRoutes = require('./api/auth/auth.routes');
const { setupSocketAPI } = require('./services/socket.service');
// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);
app.use('/api/song/playlist', playlistSongsRoutes);
app.use('/api/playlist/user', userPlaylistRoutes);
app.use('/api/song/user', userSongsRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/song', songRoutes);
setupSocketAPI(http);
// app.get('/**', (req: any, res: { sendFile: (arg0: any) => void }) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port);
});
//# sourceMappingURL=server.js.map