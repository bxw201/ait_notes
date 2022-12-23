React
- a front end framework
- competitors include Angular and Vue
- examples that do both front-end and back-end are Next (react based) and Nuxt (vue based)
- view part of a model-view-controller architecture
- lets you
	- modify the dom
	- work with events
	- have the frontend react to data change
	- reuse components

Running React
- services to run react
	- codepen, jsbin
	- stackblitz, glitch
- locally, react recommends using create-react-app
- use next (which uses react as potentially backend and frontend)

Running react with codepen
- import react and react-dom to give access to React and ReactDOM

Using react
- there's a root element where you mount your react component
	- outside of the root, react does not care

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
const h2 = React.createElement('h2', {className: 'foo'}, 'this is react');
// or using jsx
// const h2 = <h2 className='foo'>this is react</h2>
root.render(h2);
```

useEffect
- `useEffect(fn)` <-- the function to call when effect occurs
- with no second arg, it happens every render
- with second arg [], when component mounts
- with second arg [state1, state2], when component mounts and when that state changes
- function passed in should not be async
- you can define async functions and call them
- return value is function called when cleaning up effect
	- called when component unmounts