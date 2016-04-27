// server.js

//=================
// Set-up 
//=================
var express = require('express');
var app = express();
var mongoose = require('mongoose');	//connects with DB
var morgan = require('morgan');	//logs requests to console
var bodyParser = require('body-parser');	//pulls info from HTML POST
var methodOverride = require('method-override');	//Sim DELETE and PUT

//===================
// Configuration
//===================
mongoose.connect('mongodb://localhost:27017/test');

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));                 
// log every request to the console
app.use(morgan('dev'));                                         
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));            
// parse application/json
app.use(bodyParser.json());                                     
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

//========================
// Define Model of ToDO
//========================
var ToDo = mongoose.model('ToDo', {
	text : String
});

//=========
// Routes
//=========
//---api----
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

app.delete('/api/todo:todo_id', function(req, res){
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

//----Application----
app.get('*', function(req, res){
	res.sendFile('./public/index.html'); // loads main page of app
});
		
//=============
// Listen
//=============
app.listen(8080); 
console.log("App listening on port 8080");
