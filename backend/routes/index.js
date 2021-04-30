var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  let obj = {
    id: 1,
    name: "Victor"
  };

  res.send(obj);
});

router.get('/two', function(req, res, next) {
  res.send("Hello Two!")
});

router.get('/test', function(req, res, next) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'victor',
    password : 'goodboy',
    database : 'victor_database'
  });

  // connect
  connection.connect();

  // get data(structural query language)
  connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) {
      res.send("error occurred");
      return;
    };

    res.send(results);
  });

});

module.exports = router;
