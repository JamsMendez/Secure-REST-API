var jwt = require('jwt-simple');

var auth = {};

auth.login = function (req, res) {
  var username = req.body.username || false,
      password = req.body.password || false;

  if(username && password) {
    var userObj = auth.validate(username, password);
    if(userObj){
      res.json(genToken(userObj));
    else{
      res.status(401);
      res.json({ status: 401, message: 'Invalid credentials' });
      return;
    }
  
  }else{
    res.status(401);
    res.json({ status: 401, message: 'Invalid credentials' });
    return;
  },

  validateUser: function (username) {
    var user = {
      name: 'José Angel',
      rol:  'Administrador',
      username: 'JamsMendez'
    }
    
    return user;
  }
  
}


function getToken () {
  var secret = require('./config/secret');
  var expires = expiresIn(1);
  var token = jwt.encode({
    exp: expires
  }, secret());
}

function expiresIn(days) {
  var date = new Date();
  var ds = date.getDate() + days;
  return date.setDate(ds);
}

module.exports = auth;
