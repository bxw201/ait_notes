import mongoose from 'mongoose';

const SnakeSchema = new mongoose.Schema({
	name: String,
	length: {
		type: Number, 
		min: [1, 'Error: do not give a nonpositve length'], 
		required: true
	}
});

mongoose.model("Snake", SnakeSchema); // registers model
const Snake = mongoose.model('Snake'); // now we can use Snake as a constructor

const s = new Snake({
	name: 'hissy elliott',
	length: 12
});

s.save((err, saved) => {
	// callback after saving
	if (err) {
		console.log(err);
	} else {
		console.log(saved);
	}
});

Snake.find({}, (err, foundSnakes) => {
	console.log(foundSnakes);
})

mongoose.connect('mongodb://localhost/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default {
	SnakeSchema
}
