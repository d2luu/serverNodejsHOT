const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: [{
      type: String,
      enum: ['Male', 'Female']
    }],
    default: ['Male']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

UserSchema.path('name').set((input) => {
  return input[0].toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('User', UserSchema);