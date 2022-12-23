JavaScript
- dynamically typed - don't have to declare type when creating variables
- weakly typed - coerces types so that operations just work
- anything before ECMA6 is weird and will not be used

JS Types
- number (5, 5.0, etc)
	- 5/0 is Infinity
	- typeof Infinity is number
	- 5 + "abc" is "5abc"
	- 5 * "abc" is NaN
	- typeof NaN is number
	- NaN === NaN is false (use isNaN)
- string ("abc")
	- use variables in string literals with template syntax: backticks and "${}"
	- parseInt('5') is 5, parseInt('five') is NaN, parseInt('100', 2) is 4 (100 base 2), +'5' is 5
	- String(5) is '5', 5 + '' is '5'
- object ({})
	- under the hood, arrays are objects
	- something like "new Boolean(0)" returns an object [Boolean: false]
		- Boolean(new Boolean(0)) is true
	- javascript automatically wraps primitive in an object when it's dotted
- null
	- used when there is no value intentionally
	- explicit (let x = null)
- undefined
	- used when there is no value or not initialized yet
	- happens when you create a variable and don't assign a value or the function return of a function with no return
- boolean (true/false)
	- Boolean(0) is false, Boolean(2) is true, !1 is false, !!2 is true
- typeof gives the type of something

Operators
- == will check for equality after conversion, === also checks if type is equal
	- 5 == '5' is true, 5 === '5' is false
- for ||, if the left operant is truthy, it will return the left operant. else it will return the right operant
	- this is why we see things like "const newVar = someVar || 'default value"
	- ?? operator does the same but requires the left operant to be null or undefined and not just anything falsey
- for &&, if the left operant is truthy, it will return the right operant. else it will return the right operant
- ternary operator - condition ? "first value" : "second value" returns the first value if condition is truthy and the second value if it's falsey

Variables
- 'const'
	- when using 'const' declaration, you must initialize to some value and you cannot rebind the variable name but you can mutate the variable
	- can't redeclare const declared variables
	- block level scope
	- temporary deadzone - can't use a variable before it's declared
- 'let' - allows rebinding and no initialization required, block scope
- not using const, let, or var makes things globally scoped
	- avoid this
	- avoid var 
		- var takes the declaration to the top of the current function (hoisting)
		- function level scope and not block scope

Looping
- can define like
```
for(const ele of iter) {
	// stuff
}
```
- each time through has its own block scope

Arrays
- construct with literal (const arr = [1,2,3]), or constructor (Array(4,5,6))
- '...' operator means rest or spread
- array destructuring
	- const [a, b] = [100, 101] means that a is 100 and b is 101
	- const [a, b, everythingElse] = [100, 101, 102, 103] means a is 100, b is 101, and everythingElse is [102, 103]
- let arr1 = [1,2], let arr2 = [3,4], then [...arr1, ...arr2] is [1,2,3,4]
- perform a function on each element with `arr.forEach(function(x) {//stuff})`
- change each element of the array with a function with `arr.map(function(x) {//stuff})`

Functions
- can define functions like
```javascript
const f = function() {
	// stuff
};
```
- or with an arrow function
	- x => x * 2
	- (a,b) => a + b
	- const f = (a, b) => {// stuff and return}
	- don't use for method creation ("this" won't refer to the object) or event handling in client side js
	- use for callbacks when you want to keep "this" as a reference to the original object
- or with function declaration, which is hoisted (otherwise it's not)
```javascript
function f(x) {
	// stuff
}
```
- use rest operator for a function with an arbitrary number of arguments
```javascript
function f(...args) {
	// args is an array of arguments
}
```
- functions are objects and we can put methods and properties on the function
	- call, apply, and bind set this to be the first argument
	- bind sets what 'this' is and sets the first provided arguemnts and returns a new bound function

Node
- server side framework
- handles network, file system related functionality, process management, etc
- does NOT handle browser (ie document, https requests, etc)
- runs javascript outside of the browser
- single process and single threaded
- all io is async (ie not blocking)
	- io includes printing (to the console...), user input, reading/writing file, db access, requesting over network
- good for creating web servers, networked application, other io bound applications
- to import, you can use commonjs (require, export) or es modules (import/export, newer)
	- es modules require either package.json to say 'type: "module"' or be in a file with extension .mjs

NPM
- command line tool for 
	- installing packages
	- create project metadata
	- manages how projects start and stop
	- running tests

package.json
- contains dependencies and metadata
	- ^ - major version must match but minor/patch doesn't have to

package-lock.json
- contains the exact dependency tree to replicate the project 

common packages
- eslint - checks for common static errors in your code as you're writing
- mocha and chai - testing framework
- these are dev dependencices (npm install --save-dev eslint)

npx
- allows the running of an installed module
- attempts to run a tool from node_modules (or installs it if it's not there)

File IO
```javascript
// read.mjs
import { readFile } from 'fs';

readFile('./data.txt', (err, data) => {
	if (!err) {
		console.log(data + ''); // data on its own is a buffer
	} else {
		console.log(err);
	};
});
```

Creating your own module
```javascript
// myModule.mjs

export function foo() {
	console.log('bar');
}
```
```javascript
// myOtherModule.mjs
const a = 1;
function baz() {
	console.log('qux');
}
export {
	a,
	baz
};
```
```javascript
// driver.mjs

import { foo } from './myModule.mjs';
import { a, baz } from './myOtherModule.mjs'

foo(); // bar
```

Objects
```javascript
let point = {
	x: 1,
	y: 2,
};

console.log(point.x); // 1
console.log(point['x']); // 1
// property names are coerced into strings
const { x, y } = point;
console.log(x); // 1
console.log(y); // 2

let mabel = {
	'first name': 'mabel',
	last: 'pines'
};

console.log(mabel.last); // pines
console.log(mabel['first name']); // mabel
// must use [] because the space makes 'first name' not a proper variable name

const k = 'last';
console.log(mabel.k); // undefined
// dot operator uses the literal value to check properties
consloe.log(mabel[k]); // pines

for (const prop in mabel) {
	console.log(prop);
}
// first name\nlast

console.log(mabel.hasOwnProperty('first name')); // true
console.log(mabel.hasOwnProperty('age')); // false

let first = 'wendy';
let last = 'curdoroy';
console.log({first, last}); // { first: 'wendy', last: 'curdoroy' }
console.log({['last + ' name]: 'curdoroy'}); // { 'last name': 'curdoroy' }
```
- if you want a pure map, use the Map object, `let m = new Map()`

JSON
- javascript object notation
- data interchange format
- keys are always double quoted
- values cannot be functions, but can be strings (double quoted), numbers, booleans, objects, arrays, or null
```json
// test.json
{
	"first": "Lazy Susan",
	"last": "Wentworth"
}
```
```javascript
// test.mjs
import { readFile } from 'fs';

readFile('./test.json', (err, data) => {
	const parsedData = JSON.parse(data);
	console.log(parsedData.first); // Lazy Susan
});
```

Method
- a function called on an object
```javascript
function f() {
	console.log('hello');
}

const obj = {
	f // a method
}
```
- this refers to the object instance
```javascript
function meow() {
	if (this.nationality === 'japanese') {
		console.log('nyan');
	} else {
		console.log('meow');
	}
}

const cat = {
	nationality: 'japanese',
	meow
}

cat.meow(); // nyan
f(); // error
f.call(cat); //nyan
```
- during regular function invocation, 'this' will be undefined (only in strict mode, using es modules)
	- if not in strict mode, 'this' is the global object
- when using callbacks, we lose context of the original object and it's invoked as a regular function
	- not the case for arrow functions. the value of "this" in an arrow function is whatever "this" was when the arrow function was created

Higher order functions
- functions that take another function as an argument or returns a function (or both)
- eg bind, foreach, map, reduce, filter, every, some
	- map transforms every element in the array and returns new array with transformed elements
	- filter creates a new array composed of all elements in the original array that pass a given test
	- reduce loops over an array modifying an accumulator value for each value in the array
- decorators are HOFs that take an old function, modify its parameters or return value and give back a new function
```javascript
// allows us to find the results of previous calls of intensive functions
function cachify(oldFn) {
	const cache = {}; // stores previous args and return values
	// involves clousure
	const newFn = (...arg) => {
		// construct key by turning into a JSON string
		const k = JSON.stringify(arg);
		if (cache.hasOwnProperty(k)) {
			console.log('cache hit', cache);
			return cache[k];
		} else {
			console.log('cache miss, adding value', cache)
			const ret = oldFn(...arg);
			cache[k] = ret;
			return ret;
		}
	};
	return newFn;
}
```

Closure
- gives access to an outer function's scope from an inner function
- lexical context is remembered between calls of the inner function
- see the example of the cache object for multiple calls of newFn

OOP and Prototyping
- the new keyword treates the function as a constructor
```javascript
function Werewolf(name) {
	// imagine
	// let this = {};
	this.name = name;
	// return this;
}
const w = new Werewolf('Wally');
console.log(Object.getPrototypeOf(w)); // Werewolf.prototype
console.log(w.name); // Wally
```
- prototype - another object that an object will look to for property lookup
	- if a property can't be found on an obj, it'll look to the object's prototype
	- prototype chaining is possible
	- `Object.create(proto)` creates a new object with `proto` as its prototype
	- `hasOwn` and `hasOwnProperty` only look to the object itself for the property, not the prototype
	- eg. all array have a prototype `Array.prototype` with methods `pop`, `push`, etc. (convenient because not all arrays need a new version of the method)
	- eg. Function.prototype is the prototype of all functions
	- eg. Object.prototype is the prototype of all objects and its prototype is null
	- when using a function as a constructor, every instance created using the constructor has prototype "(FunctionName).prototype"
	- then to define methods on a prototype, do `FunctionName.prototype.methodName = function(arg) {// stuff}`
- easier way to do it
```javascript
class Werewolf {
	constructor(name) {
		this.name = name;
	}

	// methods are placed on the prototype
	howl(thing) {
		console.log(this.name, 'howls at the', thing);
	}
}

const w = new Werewolf('Wally');
w.howl('moon'); // Wally howls at the moon
console.log(typeof Werewolf) // function
console.log(Object.hasOwn(w, 'name')); // true
console.log(Object.hasOwn(w, 'howl')); // false
// howl belongs to Werewolf.prototype
console.log(Object.getPrototypeOf(Wereworlf)); // Function.prototype
console.log(Object.getPrototypeOf(w)); // Werewolf.prototype

// w --> Werewolf.prototype --> Object.prototype
// Werewolf --> Function.prototype

class PartyWerewolf extends Werewolf {

}

const p = new PartyWerewolf('Wendy');
// p --> PartyWerewolf.prototype --> Werewolf.prototype --> Object.prototype
```
