/*
 * Define API and app routes
 */

//======================
// Load mongoose model
//======================
var ToDo = require('./models/todo.js');

module.exports = function(app) {
	//==============
	// API Routes
	//==============
	// Get all todos
	app.get('/api/todos/', function(req, res){
		//mongoose finds all todos
		ToDo.find({}, function(err, todos){
			// if there is an error, it is returned
			if(err){
				res.send(err);
			}else{
				res.json(todos); // else returns todos in json format	
			}
		});
	});

	// Create new todo and get all todos afterwards
	app.post('/api/todos', function(req, res){
		//create a todo with info from AJAX
		ToDo.create({
			text : req.body.text,
			done : false,
			urgent : false
		}, function(err, todo) {
			if (err){
				res.send(err);
			}else{
				ToDo.find(function(err,todos){
					if(err){
						res.send(err);
					}else{
						res.json(todos);
					}
				});
			}
		});
	});

	// Check off a todo as completed
	app.post('/api/checkTodo:todo_id', function(req, res){
		ToDo.findById({_id : req.params.todo_id}, function(err, todo){
			if(err){
				res.send(err);
			}else{
				todo.done = !todo.done;
				todo.save(function(err){
					if(err){
						res.send(err);
					}else{
						ToDo.find(function(err,todos){
							if(err){
								res.send(err);
							}else{
								res.json(todos);
							}
						});
					}
				});
			}
		});
	});

	// Mark todo as urgent
	app.post('/api/markUrgentTodo:todo_id', function(req, res){
		ToDo.findById({_id : req.params.todo_id}, function(err, todo){
			if(err){
				res.send(err);
			}else{
				todo.urgent = !todo.urgent;
				todo.save(function(err){
					if(err){
						res.send(err);
					}else{
						ToDo.find(function(err,todos){
							if(err){
								res.sed(err);
							}else{
								res.json(todos);
							}
						});
					}
				});
			}
		});
	});
	
	// Delete completed todos
	app.delete('/api/todos', function(req, res){
		ToDo.remove({
			done : true
		}, function(err){
			if(err){
				res.send(err);
			}else{
				ToDo.find(function(err,todos){
					if(err){
						res.send(err);
					}else{
						res.json(todos);
					}
				});
			}
		});
	});

	//==============
	// Application
	//==============
	// Loads main page of app
	app.get('*', function(req, res){
		res.sendFile('/public/index.html'); 
	});

};
