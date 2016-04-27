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
			done : false
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

	// Delete a todo
	app.delete('/api/todos:todo_id', function(req, res){
		ToDo.remove({
			_id : req.params.todo_id
		}, function(err, todo){
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
		res.sendFile('./public/index.html'); 
	});

};
