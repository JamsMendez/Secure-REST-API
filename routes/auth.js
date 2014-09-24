var jwt = require('jwt-simple');

var users = require('.././models/users')();

var auth = {

  login: function (req, res) {

    // console.log(req.get('Content-Type'));
    // console.log(req.is('application/json'));

    var username = req.body.username || false,
        password = req.body.password || false;

    if(username && password) {
      var userObj = auth.validateAuth(username, password);
      if(userObj){
        res.json(genToken(userObj));
      }else{
        res.status(401);
        res.json({ status: 401, message: 'Invalid credentials' });
        return;
      }

    }else{
      res.status(401);
      res.json({ status: 401, message: 'Invalid credentials' });
      return;
    }
  },

  validateAuth: function (username, password) {
    var user = false;
    for(var i = 0; i < users.length; i++){
      if(users[i].username == username && users[i].password == password){
        user = users[i];
        break;
      }
    }
    return user;
  },

  validateUser: function (userId) {
    var user;
    for(var i = 0; i < users.length; i++){
      if(users[i].id == userId){
        user = users[i];
        break;
      }
    }
    return user;
  }

}


function genToken (user) {
  var secretHash = require('.././config/secret');
  var expires = expiresIn(1);
  var token = jwt.encode({ exp: expires }, secretHash(), 'HS512');

  return {
    token:   token,
    user:    user,
    expires: expires,
  };
}

function expiresIn(days) {
  var date = new Date();
  var ds = date.getDate() + days;
  return date.setDate(ds);
}

module.exports = auth;
