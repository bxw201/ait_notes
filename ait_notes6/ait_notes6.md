Frontend web dev
- involves templates, css, images, frontend js
- runs on the client (ie on the browser)
- as opposed to backend js that runs on the server
- for a SPA (single page web app), the client side code has more logic
	- an API that supports your application, and a framework that serves up the frontend
- takes care of structure/semantics/content, visual style, and interactivity (html, css, and js)

HTML
- has elements and each element has a start tag and an end tag
- the start tag can contain attributes, name/value pairs
- provides structure to your document
- don't use html styles for style, rather for semantic meaning

JS
- client side js handles interactivity
- handles document, windows, etc
- syntax is the same
- brought in through script tags
	- when the html parser comes across a script tag, it pauses and runs that js
- can be done with embedding (js written in script tags explicitly), external (script refers to another file), and inline (written as a tag attribute)
- <script async> - run js as browser renders page
- <script defer> - run js after DOM loads

DOM
- document object model
- can be represented as a tree where a tag/element has children
- language agnostic API for manipulating an html document
- objects that represent the doc itself
- methods and attributes to traverse the element tree, create elements, retrieve elements
- nodes in the tree are elements/tags and text
	- text nodes have nodeValues
- html elements may have attributes id and class
	- only one element with this id value should appear in the page
	- multiple elements may have same value for class
- some element selectors include
	- document.getElementById
	- document.getElementByTagName
	- document.getElementByClassName
	- document.querySelectorAll
- element text can be gotten and set through element.textValue and the element can be removed with element.remove()
- new nodes can be added by creating the node
	- const ele = document.createElement('tag')
	- document.body.appendChild(ele)

CSS
- allows us to create selectors with rules
- display
	- block 
		- takes up as much width as possible and has a width/height 
		- adjacent block level elements in code render in a new line
		- h1, div, p
	- inline
		- adjacent elements in code will appear adjacent to each other in rendered html
		- dont have width/height
		- a, em, img, span
	- none
		- not show, outside the flow
		- script
- visibility - can remove the element visually but leaves it in the dom
- position
	- static - default value
	- relative - can manipulate position relative to where it would be normally
	- absolute - can reposition but relative to nearest positioned (not static) ancestor/parent
	- fixed - positioned relative to the viewport
- box sizing
	- specifies are width and height are calculated
	- default: content-box, the width and height are the content only
	- border-box, the width and height take the padding and border into account
- sizing units
	- rem - represents the font size of the root
	- em - represents the font size of the element
- selectors
	- 