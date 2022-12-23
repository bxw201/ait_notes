import express from 'express';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();

// middleware - before/after a request is processed, it'll execute some function


// body parsing middleware for url encoded bodies
// automatically parses urlencoded bodies and drops into req.body
// note: NOT the query string
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => { // custom middleware
    console.log(req.method, req.path);
    console.log(req.query);
    console.log(req.body);
    next(); // either call next or send a response
});

// searches for req.path in the file system rooted at 'public'
app.use(express.static(path.join(__dirname, 'public')));

// sets configuration settings for express
app.set('view engine', 'hbs'); // looks for files matching ./views/*.hbs

// maps a request method and path to a function
// will only respond to GET /
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/foo', (req, res) => {
    res.render('foo', {data: "[This is context data sent from app.get]"});
});

const cats = [
    {
        name: 'kitty purry',
        lives: 3
    }, 
    {
        name: 'another cat',
        lives: 5
    }
];

app.get('/cats', (req, res) => {
    const minLives = parseInt(req.query.minLives || 0);
    res.render('cats', {cats: cats.filter(cat => cat.lives >= minLives)});
    // double curly braces escapes (takes special characters in html and converts them)
    // triple curly braces does not
});

app.post('/cats', (req, res) => {

    if (parseInt(req.body.catLives) > 0) {
        cats.push({ name: req.body.catName, lives: req.body.catLives });
        res.redirect('/cats'); // send a get request to /cats again
        // redirect instead of rerender because refreshing would cause another post
        // pattern: POST > REDIRECT > GET
    } else {
        res.send('bad post');
    }

});

app.listen(3000);