var express = require('express');
var todoModel = require("../model/todomodel");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//api
//get all todos
router.get('/api/todos', function(req, res){
	todoModel.find(function(err, todos){
		if(err)
			res.send(err);

		console.log(todos);
		res.json(todos);
	});
});

//create todo and send back all todos after creation
router.post('/api/todos', function(req, res){
	todoModel.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err){
			res.send(err);
		}

		todoModel.find(function(err, todos){
			if(err){
				res.send(err);
			}

			res.json(todos);
		});
	});
});

//edit todo and send back all todos after creation
router.post('/api/todos/edit', function(req, res){
	todoModel.findByIdAndUpdate(req.body.id, { text: req.body.text }, function(err, todos) {
	  	if (err) 
	  		res.send(err);

	  	// we have the updated todo returned to us
	  	console.log(todos);

	  	todoModel.find(function(err, todos){
			if(err){
				res.send(err);
			}

			res.json(todos);
		});
	});
});

//delete a todo
router.delete('/api/todos/:todo_id', function(req, res){
	todoModel.remove({
		_id: req.params.todo_id
	}, function(err, todo){
		if(err){
			res.send(err);
		}

		todoModel.find(function(err, todos){
			if(err){
				res.send(err);
			}

			res.json(todos);
		});
	});
});

router.get('*', function(req,res){
	res.sendfile('./public/index.html');
})


module.exports = router;
