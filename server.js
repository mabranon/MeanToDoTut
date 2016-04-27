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
var database = require('./config/database.js'); //Database (localhost, DB = toDoTut)
//===================
// Configuration
//===================
mongoose.connect(database.url);

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

//==============
// Load Routes
//==============
require('./app/routes')(app);
		
//==========================
// Listen to start of app
//==========================
app.listen(8080); 
console.log("App listening on port 8080");
