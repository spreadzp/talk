var express         = require('express');
var router          = express.Router();

 router.get('/*', function(req, res) {
        //res.sendFile(__dirname + './../public/index.html');
        res.send('Wrong address!');
}); 
module.exports = router; 