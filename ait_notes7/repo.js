const btn = document.querySelector('#btn');
btn.addEventListener('click', handleClick);

function handleClick(event) { // with xml
	const username = document.querySelector('#username').value;
	const url = `https://api.github.com/users/${username}/repos`;
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url); // does not actually send the request
	xhr.addEventListener('load', function() { // listen for when response loads
		// check for the status
		if (xhr.statusCode > 200) {
			console.log('ERROR');
			return;
		}

		const repos = JSON.parse(xhr.responseText);
		const ul = document.querySelector('ul');
		repos.forEach(repo => {
			const li = ul.appendChild(document.createElement('li'));
			li.textContent = repo.name;
		});
	});
	xhr.send();
}

const getXHR = (url) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		x.open('GET', url);

		xhr.addEventListener('load', function() {
			if (xhr.status >= 200 && xhr.status < 400) {
				resolve(xhr.response);
			} else {
				reject('error ' + xhr.status);
			}
		});

		xhr.addEventListener('error', function() {
			reject('error');
		});

		xhr.send();
	});
} // xhr promises

async function main() {
	// const res = await fetch('/api/text'); // will resolve promise with response object

	// const url = "https://cs.nyu.edu"; // this will fail
	const url = "https://api.github.com" // this will work
	const res = await fetch(url);

	const data = await res.json();
	return data;
} // fetch promises
