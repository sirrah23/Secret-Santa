var emailjs = require('emailjs');
var credentials = require('../credentials.js');
var _= require('underscore');

/*
 * Mailer Object: Takes input JSON with name email pairs
 * and uses a function to remove pairs where either the name
 * or email field is '' (blank) and shuffles it to randomize it
 *
 * */
function Mailer(nameEmailJSON){
  this.nameEmailInfo = _.shuffle(this.cleanJSON(nameEmailJSON));
  this.len = this.nameEmailInfo.length;
}

/*
 * Given a JSON of name, email pairs, will remove objects
 * where either of the fields is blank
*/
Mailer.prototype.cleanJSON = function (nameEmailJSON){
  var result = [];
  nameEmailJSON.map(function(pair){
    if (pair.name != '' && pair.email != ''){
      result.push(pair);
    }
  });
  return result;
}

/*
 * Will send emails to every person telling them
 * who they are secret santa for...
*/
Mailer.prototype.sendmail = function(cb){
  var self = this;
  var server = emailjs.server.connect({
    user: credentials.user,
    password: credentials.password,
    host: 'smtp.gmail.com',
    ssl: true
  });

  this.nameEmailInfo.map(function(nameEmail,i){
    server.send({
      text: `Hi ${nameEmail.name}! You are the SECRET SANTA for...${self.nameEmailInfo[ (i+1) % self.len].name}`,
      from: credentials.user,
      to: nameEmail.email,
      subject: 'YOUR SECRET SANTA!!!'
    },function(err, message){ 
      cb(err, message);
      console.log(err || message);}); 
  });
  return;
}

module.exports = Mailer;
