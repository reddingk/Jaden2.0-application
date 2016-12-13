var Users = require('./models/users');

function getAllUsers(res) {
	Users.find(function(err, users){
		if(err){ res.send(err); }

		res.json(users);
	})
};

function loginUsers(uname, pwd, res) {
	Users.find({username: uname, password: pwd}, function(err, user){
		if(err){ res.send(err); }
    if(user.length == 1){
      var loginDate = new Date();
      user[0].last_login = loginDate;

      // Found Users now updating last login dateTime
      Users.update({"_id": user[0]._id}, {$set: {"last_login":loginDate}}, function(err, updateRes){
        if(err){ res.send(err); }
        else if(updateRes.nModified == 1){
          res.json(user);
        }
        else {
          res.json("Failed to Update Last Login");
        }
      });
    }
    else {
      res.json("Failed to Find User");
    }
	})
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all users
    app.get('/api/users_all', function (req, res) {
        getAllUsers(res);
    });
    // Check if Users is Valid and Login User
    app.get('/api/users/:name/:pword', function (req, res) {
        loginUsers(req.params.name, req.params.pword, res);
    });
};
