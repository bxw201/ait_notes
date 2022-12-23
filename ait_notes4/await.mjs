import fs from 'fs';

// console.log("START");
// const p = fs.promises.readFile('data.json', 'utf-8')
// // does not block
// p.then(console.log)
// console.log("END");

// // Async/Await

// async function f() {
// 	console.log("INNER START");
// 	const p = await fs.promises.readFile('data.json', 'utf-8');
// 	// blocks within the function
// 	console.log(p);
// 	console.log("INNER END");
// }

// console.log("OUTER START");
// f(); // does not block outside the function
// console.log("OUTER END");
// using await at the top level causes it to block

// Promise

console.log('START');
const p = fs.promises.readFile('data.json', 'utf-8');
p.then(console.log); // not blocking!
console.log('END');