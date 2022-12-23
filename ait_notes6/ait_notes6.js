// // javascript timers
// // options for calling a function after some delay
// // 		or repeatedly based on an interval

// // window.requestAnimationFrame(f)
// // 		calls function f after some time
// // 		based on what the js engine thinks is an adequate animation
// // 		only calls f once
// const bar = document.getElementById('bar');
// let pos = 0;
// function f() {
// 	bar.style.top = pos + 'px';
// 	pos += 2;
// 	window.requestAnimationFrame(f);
// }
// f();

// // setInterval
// function g() {
// 	const div = document.createElement('div');
// 	div.className = 'foo';
// 	div.textContent = "HII!";
// 	document.body.appendChild(div);
// }
// // create a new div (as above) every 500 ms
// // setInterval(g, 500);

// const btn = document.querySelector('button');
// btn.addEventListener('click', onClick);

// function onClick(event) {
// 	// event is an optional parameter
// 	// props depend on the specific event
// 	// event.target is always the element that was clicked
// 	// or 'this' represents the clicked argument

// 	// if the element already had something happen
// 	// on this event by default, event.preventDefault
// 	// prevents that	
// 	event.preventDefault();

// 	// if both a parent and a child element have event handlers
// 	// then all handlers will run.
// 	// to only call the child, call event.stopPropagation
// 	event.stopPropagation();
	
// 	const h1 = document.createElement('h1');
// 	h1.textContent = "mouse position" + event.x + event.y;
// 	document.body.appendChild(h1);
// 	event.target.remove();
// }

function iterateThroughDOMRec(node, selector, cb) {
  // recursive helper for iterateThroughDOMRec
  cb(node, selector.join('>'));

  // iterate through element children
  // TODO: there are probably certain tags I want to filter out
  // 	   ie script, style, noscript, etc
  const children = Array.prototype.filter.call(node.childNodes, (n) => n.nodeType === Node.ELEMENT_NODE);
  for (let i = 0, len = children.length; i < len; i++) {
    // get the tag, id (if it exists), and classes (if they exist)
    const child = children[i];
    const childId = child.id; // either the unique id or the empty string
    const childClasses = child.getAttribute('class'); // either null or space delimited classes
    const childTag = child.tagName;
    const childSelector = `${childTag}${(childId ? `#${childId}` : '')}${childClasses ? `.${childClasses.replace(' ', '.')}` : ''}`;

    newSelectors = selector.slice();
    newSelectors.push(childSelector);
    iterateThroughDOMRec(child, newSelectors, cb);
  }
}

function iterateThroughDOM(cb) {
  // this function iterates through DOM body using inorder traversal
  // and passes the node and selector to a callback function at each node
  iterateThroughDOMRec(document.body, ['body'], cb);
}

iterateThroughDOM((node, selector) => {
	console.log(`node: ${node}, selector: ${selector}`);
	console.log(document.querySelector(selector));
});


