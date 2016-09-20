
 module.exports = function (db) {
   var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var config   = require('./app/config');

var app = express();
app.set('port', (process.env.PORT || config.get('port')));
/*var Comment = require('./app/models/comment.models.js') ;
var Mongo = require('./app/db/index');*/

app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));
app.use('/bundle', express.static(__dirname + '/bundle'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); 
/*var db = Mongo;
Mongo.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));*/
var forum = require('./app/routes/forum.route.js');
var default = require('./app/routes/default.route.js');


app.use('/forum', forum);
app.get('/*',default);
/*function print(req, res) {
      console.log('req.params.id'+ req.params.id); 
            
}*/
  db.once('open',  function() {
 /* app.get('/comments', function(req, res) {
         Comment.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        }); 
    }); 
*/
// create
   /* app.post('/comment', function(req, res) {
            //console.log('req.body='+ JSON.stringify(req.body));
        var obj = new Comment(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
           // console.log('obj'+obj);
            res.status(200).json(obj);
        });
    });*/

     app.post('/addcomment', function(req, res) {
            //console.log('req.body='+ JSON.stringify(req.body));
        var obj = new Comment(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);            
            res.json(obj);
        });
    });

     
    app.get('/comment/count', function(req, res) {
        Comment.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });
 
 app.get('/child/:id', function(req, res) {
        Comment.find(  {parent_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
           // console.log('child='+obj);
            res.json(obj);
        })
    });
    // find by id
    app.get('/comments/:id', function(req, res) {
        Comment.find({status: req.params.id}).sort({'time': 'desc'})
     .exec( function(err, posts){
             if(err) return console.error(err);
            //console.log('posts'+ posts);
            res.json(posts);
            });
    }); 

 
             
    

    app.get('/comment/:post', function(req, res) {
        Comment.findOne({post: req.params.post}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/edit/:id', function(req, res) {
        Comment.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

     // update by id
   /* app.put('/update-comment/:id', function(req, res) {
        Comment.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });*/

     app.put('/increment-child/:id', function(req, res) {
       // console.log("req.params.id="+req.params.id);
        Comment.update({_id: req.params.id},{$inc : {"count_child" : 1}}, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

     app.put('/decrement-child/:id', function(req, res) {
        //console.log("req.params.id="+req.params.id);
        Comment.update({_id: req.params.id},{$inc : {"count_child" : -1}}, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/comment/:id', function(req, res) {
        Comment.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });
 
    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

   /* app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port '+app.get('port'));
    });*/
});   
 return app; 
}
 
 
 

  functions.getStatusComment = function (args, res, next) {

        /*Comment.find({status: args.params.id})
            .sort({'time': 'desc'})
            .exec(function(err, posts){
                if(err) return console.error(err);
                res.json(posts);
        });*/
    }

    functions.findParent = function (args, res, next) {

        /*Comment.find({parent_id: args.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })*/
    }

    functions.addComment = function (args, res, next) {

        /*var obj = new Comment(args.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);            
            res.json(obj);
        });*/
    }

    functions.editComment = function (args, res, next) {

        Comment.findOneAndUpdate({_id: args.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    }

    functions.incrementChildComment = function (args, res, next) {

        /*Comment.update({_id: args.params.id},{$inc : {"count_child" : 1}}, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });*/
    }

    functions.decrementChildComment = function (args, res, next) {

        /*Comment.update({_id: args.params.id},{$inc : {"count_child" : -1}}, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });*/
    }

    functions.deleteComment = function (args, res, next) {

        /*Comment.findOneAndRemove({_id: args.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });*/
    }
    return functions;
} 