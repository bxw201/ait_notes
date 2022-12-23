class Request {
	constructor(s) {
		[this.method, this.path] = s.split(' ');
		this.headers = {};
	}

	set(headerName, headerValue) {
		this.headers[headerName] = headerValue;
	}

}

const req = new Request('GET foo HTTP/1.1');
console.log(req.method, req.path);

// if you can't find a property on the type, check the prototype

// an instance of a function has prototype ClassName.prototype
console.log(Object.getPrototypeOf(req) === Request.prototype); // true

// ClassName acts as a constructer, ie a function. then it's prototype is Function.prototype
console.log(Object.getPrototypeOf(Request) === Function.prototype); // true

// in keyword goes up the prototype chain while hasOwn does not
const obj = {};
console.log(Object.hasOwn(obj, "toString")); // false
console.log("toString" in obj); // true

// *.hasOwnProperty is on Object.prototype. not guaranteed if prototype chain doesn't go through Object.prototype
const foo = Object.create(null)
console.log(foo.hasOwnProperty("prop")); // ERROR

// checks the "this" of the class which has method and path
console.log(Object.hasOwn(req, "path")); // true

// methods are not stored on the instance, rather it's stored on ClassName.prototype
console.log(Object.hasOwn(req, "set")); // false
console.log(Object.hasOwn(Request.prototype, 'set')); // true

// Example prototype chains
// console.log --> Function.prototype --> Object.prototype --> null
// 				   *.call				  *.toString
// 				   *.apply
// 				   *.bind
//
// [1,2,3]     --> Array.prototype    --> Object.prototype --> null
// 				   *.push
// 				   *.map