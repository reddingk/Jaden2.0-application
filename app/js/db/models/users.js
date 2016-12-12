var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
  username: {type: String, default: ''},
  password: {type: String, default: ''},
  last_login: {type: Date, default: null},
  name: {
    first: {type: String, default: ''},
    last: {type: String, default: ''}
  }
});
