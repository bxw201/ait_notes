import net from 'net';
// create both servers and clients
// creates tcp/ip servers that don't understand http

const handleData = data => {
	console.log(data);
}

const handleConnect = sock => {
	console.log("connected");
	// sock represents connected client
	sock.on("data", handleData);
}

const s = net.createServer(handleConnect);

s.listen(3000, '127.0.0.1');

// TODO: REVIEW COOKIES
