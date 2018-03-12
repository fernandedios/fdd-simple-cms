const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
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
  role: String,
  profile: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    picture: { type: String, default: '' },
    desc: { type: String, default: '' }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
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

module.exports = mongoose.model('User', UserSchema);
