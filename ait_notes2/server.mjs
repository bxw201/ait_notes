import net from 'net';
import { read, readFile } from 'fs';

export class App {
	constructor() {
		this.server = net.createServer(this.handleConnect.bind(this));
		this.routes = {}; // paths -> functions that will be called
	}

	get(path, fn) {
		this.routes[path] = fn;
	}

	handleConnect(sock) {
		// when the server receives data (a request), handle it
		sock.on('data', data => this.handleData(sock, data));
	}

	handleData(sock, data) {
		const req = new Request(data + '');
		const res = new Response(sock);
		if (Object.hasOwn(this.routes, req.path)) {
			this.routes[req.path](req, res);
		} else {
			sock.write('HTTP/1.1 404 Not Found');
		}
	}

	listen(port, host) {
		this.server.listen(port, host);
	}
}

class Request {
	constructor(s) {
		const [method, path, ..._] = s.split(' ');
		this.method = method;
		this.path = path;
	}
}

class Response {
	constructor(sock) {
		this.statusCode = '200';
		this.statusCodeDescription = 'OK';
		this.contentType = 'text/html';
		this.sock = sock;
	}

	send(body) {
		const res = `HTTP/1.1 ${this.statusCode} ${this.statusCodeDescription}\r\nContent-Type: ${this.contentType}\r\n\r\n${body}`;
		this.sock.write(res);
		this.sock.end();
	}

	readCSSFile(fileName) {
		const filePath = './public/css' + fileName;
		readFile(filePath, (err, data) => {
			if (err) {
				// TODO: send 500
			} else {
				this.contentType = 'text/css';
				this.send(data + '');
			}
		});
	}
}
