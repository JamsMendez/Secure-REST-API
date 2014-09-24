var Users = require('.././models/users')();

var users = {

  all: function (req, res) {
    res.json({ status: 200, users: Users });
  },

  get: function (req, res) {
    var user, userId = req.params.id;
    for(var i = 0; i < Users.length; i++){
      if(Users[i].id == userId){
        user = Users[i];
        break;
      }
    }

    res.json({ status: 200, user: user })
    return;
  },

  add: function (req, res) {
    res.json({});
  },

  update: function (req, res) {
    res.json({});
  },

  delete: function (req, res) {
    res.json({});
  }
}

module.exports = users;
