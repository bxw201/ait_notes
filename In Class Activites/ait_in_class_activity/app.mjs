import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
// server code goes here!
// first listen for connection using io.on

let cryingPosition = 0;
let screamingPosition = 0;
// on client connection
io.on('connection', (socket) => {
    console.log('new connection');
    io.emit('emojiPositions', {
        cryingPosition,
        screamingPosition,
    });

	socket.on('moveCrying', () => {
        cryingPosition += 10;
        io.emit("moveCrying", {cryingPosition});
    })

    socket.on('moveScreaming', () => {
        screamingPosition += 10;
        io.emit('moveScreaming', {screamingPosition});
    })
});

// then... within callback, use socket.on, socket.emit, socket.broadcast, etc.
// NOTE THAT WE ARE LISTENING WITH server, NOT app!
server.listen(3000);