import express from 'express';
import session from 'express-session';
import url from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();
app.set('view engine', 'hbs');

const sessionOptions = { 
    secret: 'secret for signing session id', 
    saveUninitialized: false, 
    resave: false 
};
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`
    Request Method : ${req.method}
    Request Path : ${req.path}
    `);
    res.send('<h1> I am Logger<h1>');
    return;
});

app.get('/cool', (req, res)=>{ res.send('<h1>Express is Cool</h1>')})
app.post('/cool', (req, res)=>{ res.send('<h1>Cool is Express?</h1>')})



app.listen(3000);
