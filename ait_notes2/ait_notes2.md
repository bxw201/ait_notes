Internet - an infrastructure for the web, a global network of networks
- protocol tcp/ip
- application layer services include web, file server (ftp), remote shell access (ssh), realtime web programming (ws), chat (xmpp, oscar), email (smtp), voice over ip (sip)
- also has transport layer -> network layer -> physical layer

Web - resources that you can access through resources (url) linked together through hyperlinks
- protocol http/https
- only one service provided on the internet

Protocol - set of rules/standards for communication
- defines message format, sematics, etc

http - a request and response protocol
- a client (browser, module/library, curl/wget/nc) makes a request and a server (apache, nginx, node apps) responds to that request
- http requests look like
```
method path version
header1name: header1value
// other headers

body
```
	- eg
```
GET /foo.html HTTP/1.1
Host: foo.bar
```
	- methods could be GET, POST, PUT, DELETE...
- http responses look like
```
version status-code description
headers

body
```
	- eg
```
HTTP/1.1
Content-Type: text/css

{font: red}
```
	- possible status codes: 200 (OK), 4xx (client error), 5xx (internal server error), 3xx (redirect), 1xx (informational)

URL structure
- protocol (http/https)
- username:password
- domain
- port (80 web, 443 web(ssl/tls), 22 ssh)
- path
- query string
- fragment (part after the hash)

web applications
- (generated) static files + web server
- dynamic and database driven, server side rendered
	- express, koa, next
- client side rendered
- node allows possibly all of this
	- can create a web server
	- acts as a server side framework
	- can make an api end point
```javascript
// server
import net from 'net';
const server = net.createServer(function(sock) { // sock is the other end of the connection
	// when client connects, do stuff...
	console.log('got client connect');
	sock.write('hello'); // not valid http
	sock.end();
});

server.listen(3000, '127.0.0.1');
```

Review of server.mjs
- we created request, response, and app classes
	- request should have path and method info
	- response should have socket to send back response, status code, headers, send back a body
	- app binds to a port and host, keeps track of paths to function mapping, take a request and send back a response
- app had a way to associate paths to functions, routing

Server-Side web frameworks
- monolithic
	- includes many features
	- dictates how project is laid out
	- eg Django, Rails (Ruby), Symfony, Laravel (PHP)
- minimal
	- flexibility in what libraries and tools to use
	- small set of core features
	- eg Flask, Sinatra (Ruby), Express (Node)
- features that a web framework could have
	- able to request and response into objects
	- routing - mapping paths to functions/actions
	- reading static files and serving them
	- reading templates, injecting data into templates, serving as html
	- databasing
	- authentication and form handling
	- session handling
