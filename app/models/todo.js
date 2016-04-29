var mongoose = require('mongoose');

module.exports = mongoose.model('ToDo', {
		text : String,
		done : Boolean,
		urgent: Boolean
	});

	
		
