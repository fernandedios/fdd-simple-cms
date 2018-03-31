const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/secret');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase:true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  role: { type: String, default: 'user' },
  profile: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    picture: { type: String, default: '' },
    desc: { type: String, default: '' }
  },
  password: { type: String, require: true, minlength: 6 },
  tokens: [{
    access: { type: String, required: true },
    token: { type: String, required: true }
  }]
});

/* -- instance methods -- */
// Override method toJSON
// DO NOT USE fat arrow function, we need access to this binding
UserSchema.methods.toJSON = function() {
  let user = this; // lowercase user since this is an instance method

  // convert mongoose variable to regular object
  let userObject = user.toObject();

  // do not return secured items like password and tokens
  return _.pick(userObject, ['_id', 'email', 'role', 'profile']);
};

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt/sign({ _id:user._id.toHexString(), access }, jwt_secret).toString();

  user.tokens.push({ access, token });

  return user.save()
    .then(() => {
      return token;
    });
};

UserSchema.methods.removeToken = function(token) {
  let user = this;

  return user.update({
    // use $pull mongodb operator
    $pull: {
      tokens: { token }
    }
  });
};

/* -- model methods -- */
UserSchema.statics.findByToken = function(token) {
  let User = this; // uppercase User since this is a model method
  let decoded;

  // use try / catch here
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  }
  catch(err) {
    return Promise.reject();
  }

  // return as promise so we can tap another .then
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

module.exports = mongoose.model('User', UserSchema);
