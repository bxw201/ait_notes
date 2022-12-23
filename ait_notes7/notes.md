# Making a background request

Working with an api
- find a client/library/module that is prebuilt
- barring that, look for documentation 
	- what kind of requests you can make
	- what kind of data you can get back
	- what strategies do they use?
		- REST
			- use http methods to specify what you want to do
			- paths represent resources you're targetting
		- GraphQL
			- use json to create a query
XHR
- XMLHttpRequest
- callback based

Promise
- an object that represents some async task
	- ie file io, network requests, db access
- promise has a few states
	- pending (task hasn't completed yet
	- fulfilled/resolved (task completed successfully)
	- rejected (task is done, but error)
- constructor
	- takes in one argument, the executor (a function)
	- executor has 2 arguments, resolve and reject functions
- methods
	- then(resolve, [reject])
		- set what resolve and reject function is
		- what do we do when the promise completes successfully
		- always returns a promise, the promise that is set in resolve
	- catch(reject)
		- sets what we do when there's a failure
```javascript
const p = new Promise(function(onFulfill, onReject) { // this function executes an async task
	// do something async
	onFulfill('Hello'); 
	onReject('task failed');
});

p.then(function(val) {
	console.log(val); // Hello
}, console.log.bind(null, 'ERROR! '));
```

Same origin policy
- origin = protocol + domain + port
- different origins if any of the components above differ
- for xhr/fetch GET, can't read response if origin policies differ

CORS
- cross origin resource sharing
- allows server to send back headersserver will send back headers that dictate whether resonse can be read or not
- for other kinds of request (xhr/fetch POST), will send additional request beforehand to server to check if it's ok (pre-flight)
- for the most part, request can be made but response is not readable
- preflight - additional request made before actual request
	- <!-- <input type="hidden" token="<token>"> -->
		- gets sent as a part of the request body
		- server checks against the token
		- if the token isn't present...