const p = new Promise(function(onFulfill, onReject) { // this function executes an async task
	// do something async
	console.log('start');
	onFulfill('Hello'); // only calls after the body of the executor function 
	onReject('task failed');
	console.log('end');
});

const p2 = p.then(function(val) {
	console.log(val);

	return new Promise((resolve, reject) => {
		resolve("2");
	});
}, console.log.bind(null, 'ERROR! '));

// p2 is the promise from the resolve function
const p3 = p2.then((val) => {
	console.log(val); // 2
	return 3;
}); // the return is 3, wrapped in an immediately resolved promise

p3.then((val) => {
	console.log(val); // 3
	return 4;
});


// wait for the promise to be resolved or rejected
// 'await p' is evaluated so that its value is the value that the promise is resolved with
// if it's rejected
// this is top-level await which is allowed in esm

console.log(await p3); // 4 

async function main() {
	const p = new Promise((resolve, reject) => {
		// resolve('Hello');
		reject('Oh no!');
	});

	try {
		const val = await p;
		console.log(val);
	} catch (e) {
		console.log(e); // Oh no!
	}
}

main();
