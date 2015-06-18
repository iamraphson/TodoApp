var mongoose = require('mongoose');
var schema = mongoose.Schema;

var todoSchema = new schema({
	text: String
});

var todo = mongoose.model('Todo', todoSchema);

module.exports = todo;