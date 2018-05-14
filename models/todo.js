var mongoose = require('mongoose');
var TodoSchema = mongoose.Schema({
    name: String,
    description: String,
	date: {
		type: Date,
		default: Date.now
	},
    status: String

})

module.exports = mongoose.model('Todo', TodoSchema);