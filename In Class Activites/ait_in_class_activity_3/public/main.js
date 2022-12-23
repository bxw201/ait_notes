const select = document.querySelector('#select');
const textDisplay = document.querySelector('#response');
select.addEventListener('input', async (event) => {
    const data = await fetch(`http://linserv1.cims.nyu.edu:10001/api/frameworks?language=${event.target.value}`);
    const parsedData = await data.json();
    textDisplay.textContent = parsedData.framework;
});
