'use strict'
 
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var commentSchema = mongoose.Schema({
    time         		 : { type: Date, default: Date.now },
	post  			 	 : String,
	user_at     	     : String,
	status				 : Number,
	parent_id			 : String,
	count_child			 : Number
});

var Comment = mongoose.model('comment', commentSchema);
//module.exports = Comment;
	module.exports = function () {
	var functions = {};

	functions.getStatusComment = function (req, res, next) {		
		 Comment.find({status: req.params.status})
			.sort({'time': 'desc'})
			.exec(function(err, posts){
	            if(err) return console.error(err);
	            res.json(posts);
	});  
	}	

	functions.findParent = function (req, res, next) {		
		 Comment.find({parent_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
    });
	}

	functions.addComment = function (req, res, next) {		
		 var obj = new Comment(req.body);
    obj.save(function(err, obj) {
        if(err) return console.error(err);            
        res.json(obj);
    });
	}

	functions.editComment = function (req, res, next) {		
		 Comment.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    });
	}

	functions.incrementChildComment = function (req, res, next) {		
		 Comment.update({_id: req.params.id},{$inc : {"count_child" : 1}}, function (err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    });
	}

	functions.decrementChildComment = function (req, res, next) {		
		Comment.update({_id: req.params.id},{$inc : {"count_child" : -1}}, function (err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    }); 
	}

	functions.deleteComment = function (req, res, next) {		
		Comment.findOneAndRemove({_id: req.params.id}, function(err) {
        if(err) return console.error(err);
        res.sendStatus(200);
    }); 
	}

	return functions;
}