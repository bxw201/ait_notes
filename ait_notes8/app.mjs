import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import url from 'url';
import path from 'path';

const app = express();
const server = createServer(app); // creates http server from express app
const io = new Server(server); // mounts socket.io server onto http
// socket io server starts on http before bringing itself up to websocket

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// on client connection
io.on('connection', (socket) => {
	// socket represents the connect client
	console.log('connected', socket.id);
	// socket.id is unique id for that socket

	// if we had a db, we can call
	// socket.emit('chat', messages);
	// to prepopulate on client connection

	// chat demo
	socket.on('chat', (data) => {
		io.emit('chat', data); // forwards message to every connected client
		console.log(data);
	});

	// mouse move demo
	socket.on('mouse', (data) => {
		data.id = socket.id;
		// sends to everybody but the client sending data
		socket.broadcast.emit('mouse', data);
	})
});


// listen with http server instead of app
server.listen(3000);
