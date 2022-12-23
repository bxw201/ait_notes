import express from 'express';
import mongoose from 'mongoose';
import _ from './mongo.mjs';

const app = express();
app.use(express.urlencoded({extended: false}));

const Snake = mongoose.model('Snake');

app.post('/snakes', (req, res) => {
	const s = new Snake({
		name: req.body.snakeName,
		length: req.body.snakeLength
	});
	s.save((err, savedSnake) => {
		// if error, rerender with err object
		res.redirect('/snakes');	
	});
})

app.get('/snakes', (req, res) => {
	Snake.find({}, (err, foundSnakes) => {
		res.send(`snakes ${foundSnakes}`);
	});
});

app.listen(3000);
