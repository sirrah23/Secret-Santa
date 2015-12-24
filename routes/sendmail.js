var express = require('express');
var router = express.Router();
var Mailer = require('../lib/mailer.js');
var _ = require('underscore');

/* Send emails to people */
router.post('/', function(req, res, next) {
  var mailer = new Mailer(req.body); //initialize the mailer object with input JSON table
  var numPeople = mailer.len; //number of emails that will be sent
  var noError = true; //keeps track of error occurence in email sending
  var finished = _.after(numPeople, clientMessage); //send client OK after emails sent
  
  mailer.sendmail(function(err,message){
    if (err){
      noError = false; //if we have an error with any emails, remember that
    }
    finished(); //done sending this email
  });

  function clientMessage(){
    if (noError){
      res.send('The emails were sent successfully!');
    } else {
      res.send('Something went wrong...');
    }
  }
});

module.exports = router;
