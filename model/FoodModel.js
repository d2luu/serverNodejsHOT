const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodDescription: {
    type: String,
    default: ""
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ["available", "unavailable"]
    }],
    default: ["available"]
  }
});

FoodSchema.path('name').set((inputString) => {
  return inputString[0].toUpperCase() + inputString.slice(1);
});

module.exports = mongoose.model('Food', FoodSchema);