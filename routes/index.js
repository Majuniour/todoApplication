var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function(req, res, next) {
  res.render('todo', { title: 'Todo' });
});

module.exports = router;
