var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../../build/index.html'));
});

router.post('/', function(req, res, next) {
    var query = {
        name: req.body.name,
    };
    console.log("project query +"+query.name);
    var cursor = req.app.db.collection('projects').find(query);
    cursor.each(function(err,files){
        if(err){
            console.log(err);
        }
        else{
            return res.json(files);  // doc 은 1개씩 읽어들이는 json
        }
    });
});

module.exports = router;