var express = require('express');
var router = express.Router();

/* Send emails to people */
router.post('/', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
