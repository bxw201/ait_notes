import { App } from "./server.mjs";

const app = new App();

app.get('/', (req, res) => {
    res.send('<link rel="stylesheet" href="style.css"><h1>Hello, world!</h1>');
});

app.get('/style.css', (req, res) => {
    res.readCSSFile(req.path);
})

app.listen(3000, '127.0.0.1');