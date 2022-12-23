const btn = document.querySelector('input[type="submit"]');
const nameField = document.querySelector('#name');
const echo = document.querySelector('#echo');

btn.addEventListener('click', handleClick);
nameField.addEventListener('input', handleInput);

function handleClick(event) {
	event.preventDefault();
	const name = nameField.value;
	const div = document.createElement('div');
	div.textContent = name;
	document.body.appendChild(div);
}

function handleInput(event) {
	echo.textContent = event.target.value; // or this.value
}

pos = 0;
document.body.addEventListener('keypress', function(event) {
	if (event.code === 'KeyA') {
		console.log('keypress A');
		pos += 3;
	} else if (event.code === 'KeyD') {
		console.log('keypress D');
		pos -= 3;
	}
	echo.style.paddingLeft = pos+'px';
});
