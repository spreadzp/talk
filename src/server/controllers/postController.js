'use strict';

module.exports = function () {
	var comment       = require('../models/comment.model')();
	var functions = {};

	functions.getStatusComment = function (req, res, next) {		
		comment.getStatusComment(req, res, next);
	}	

	functions.findParent = function (req, res, next) {		
		comment.findParent(req, res, next);
	}

	functions.addComment = function (req, res, next) {		
		comment.addComment(req, res, next);
	}

	functions.editComment = function (req, res, next) {		
		comment.editComment(req, res, next);
	}

	functions.incrementChildComment = function (req, res, next) {		
		comment.incrementChildComment(req, res, next);
	}

	functions.decrementChildComment = function (req, res, next) {		
		comment.decrementChildComment(req, res, next);
	}

	functions.deleteComment = function (req, res, next) {		
		comment.deleteComment(req, res, next);
	}

	return functions;
}