const router = global.router;

const Dog = require('../model/DogModel');
const mongoose = require('mongoose');

router.get('/list_all_dog', (request, response, next) => {
  Dog.find({}).limit(100).sort({name: 1}).select({
    name: 1,
    dogDescription: 1,
    created_at: 1,
    url: 1,
    isLike: 1,
  }).exec((err, dogs) => {
    if (err) {
      response.json({
        result: "failed",
        data: {},
        message: `Error is: ${err}`
      })
    } else {
      response.json({
        result: "ok",
        data: dogs,
        message: "List all dog successfully"
      })
    }
  })
});

router.get('/get_dog_with_name', (request, response, next) => {
  if (!request.query.name) {
    response.json({
      result: "failed",
      data: [],
      message: `Input parameters is wrong! 'name' must be not NULL`
    })
  }
  let criteria = {
    name: new RegExp(request.query.name, 'i')
  };
  const limit = parseInt(request.query.limit) > 0 ? parseInt(request.query.limit) : 100;
  Dog.find(criteria).limit(limit).sort({name: 1}).select({
    name: 1,
    dogDescription: 1,
    created_at: 1,
  }).exec((err, dogs) => {
    if (err) {
      response.json({
        result: "failed",
        data: [],
        message: `Error is: ${err}`
      })
    } else {
      response.json({
        result: "ok",
        data: dogs,
        message: "Query food by Id successfully"
      })
    }
  })
});

router.put('/update_a_dog', (req, res, next) => {
  let conditions = {};
  if (mongoose.Types.ObjectId.isValid(req.body.dog_id) === true) {
    conditions._id = mongoose.Types.ObjectId(req.body.dog_id);
  } else {
    res.json({
      result: "failed",
      data: {},
      message: "You must enter food_id to update"
    });
  }

  let newValues = {};
  let newName = req.body.name;
  let newDogDescription = req.body.dogDescription;

  if (newName && newName .length > 2) {
    newValues.name = newName;
    newValues.dogDescription = newDogDescription;
  }
  const options = {
    new: true,
    multi: true
  };
  Dog.findOneAndUpdate(conditions, {$set: newValues}, options, (err, updatedDog) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: "Update failed"
      })
    } else {
      res.json({
        result: "ok",
        data: updatedDog,
        message: "Update a dog successfully"
      })
    }
  })
});

router.post('/insert_new_dog', (request, response, next) => {
  const newDog = new Dog({
    name: request.body.name,
    dogDescription: request.body.dogDescription,
  });

  newDog.save((err) => {
    if (err) {
      response.json({
        result: "failed",
        data: {},
        message: `Error is: ${err}`
      })
    } else {
      response.json({
        result: "ok",
        data: {
          name: request.body.name,
          dogDescription: request.body.dogDescription
        },
        message: "Insert new dog successfully"
      })
    }
  })
});

router.delete('/delete_a_dog', (req, res, next) => {
  Dog.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.dog_id)}, (err) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Error is: ${err}`
      });
    } else {
      res.json({
        result: "ok",
        message: "Delete successfully!"
      })
    }
  })
});

module.exports = router;