import express from 'express';
import session from 'express-session';
const app = express();

// express session
// gives req a session property that stores data for some client session
const sessionOptions = {
    secret: 'secret for signing session id',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'hbs');

app.get('/makecookies', (req, res) => {
    res.append('Set-Cookie', 'theme=dark');
    res.append('Set-Cookie', 'sess_id=123432132');
    res.send('made u a cookie');
});

app.post('/', (req, res) => {
    req.session.name = req.body.name;
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('home', {name: req.session.name});
});

app.listen(3000);
