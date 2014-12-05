var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'EmploymentSE Dashboard' });
});

/* GET home page. */
router.get('/bubble', function(req, res) {
  res.render('base', { title: 'EmploymentSE Dashboard' });
});

module.exports = router;
