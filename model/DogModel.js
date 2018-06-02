const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dogDescription: {
    type: String,
    default: "Dog description"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Akita_Inu_dog.jpg/1200px-Akita_Inu_dog.jpg"
  },
  isLike: {
    type: [{
      type: Boolean,
      enum: [true, false]
    }],
    default: [false]

  }
});

DogSchema.path('name').set((input) => {
  return input[0].toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('Dog', DogSchema);