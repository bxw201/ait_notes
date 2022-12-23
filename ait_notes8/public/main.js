const socket = io()



function handleClick(event) {
	const message = document.querySelector('#message').value;
	const messageFrom = document.querySelector('#messageFrom').value;
	socket.emit('chat', {message, from: messageFrom});
}

const main = () => {
	// mouse movement tracking demo
	document.addEventListener('mousemove', (event) => {
		socket.emit('mouse', { x: event.x, y: event.y })
	});

	const btn = document.querySelector('#btn');
	btn.addEventListener('click', handleClick);

	socket.on('chat', data => {
		const div = document.body.appendChild(document.createElement('div'));
		div.textContent = data.message + ' from ' + data.from;
	});

	socket.on('mouse', data => {
		const mouseId = data.id.replace('-', '');
		let div = document.querySelector('#' + mouseId);
		if (!div) {
			div = document.createElement('div');
			div.textContent = mouseId;
			div.id = mouseId;
			div.style.position = 'relative'
		}
		div.style.top = data.y + 'px';
		div.style.left = data.x + 'px';
		document.body.appendChild(div);
	})
}

main();
