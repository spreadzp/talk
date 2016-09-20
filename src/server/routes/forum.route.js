var express         = require('express');
var router          = express.Router();
var postController  = require('../controllers/postController')();
var Comment       = require('../models/comment.model');
 
router.get('/posts/:status',postController.getStatusComment);
router.get('/child/:id',postController.findParent);
router.post('/addcomment/',postController.addComment);
router.put('/edit/:id',postController.editComment);
router.put('/increment-child/:id',postController.incrementChildComment);
router.put('/decrement-child/:id',postController.decrementChildComment);
router.delete('/delete-comment/:id',postController.deleteComment);
module.exports = router;