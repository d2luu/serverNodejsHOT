const router = global.router;
const Food = require('../model/FoodModel');

router.get('/list_all_food', (req, res, next) => {
  // res.end("GET request => list_all_food");
  Food.find({}).limit(100).sort({
    name: 1
  }).select({
    name: 1,
    foodDescription: 1,
    created_date: 1,
    status: 1
  }).exec((err, foods) => {
    if (err) {
      res.json({
        result: "failed",
        data: [],
        message: `Error is: ${err}`
      })
    } else {
      res.json({
        result: "ok",
        data: foods,
        count: foods.length,
        message: "Query list of foods successfully"
      })
    }
  })
});

router.get('/list_food_with_id', (req, res, next) => {
  Food.findById(require('mongoose').Types.ObjectId(req.query.food_id),
    (err, food) => {
      if (err) {
        res.json({
          result: "failed",
          data: [],
          message: `Error is: ${err}`
        })
      } else {
        res.json({
          result: "ok",
          data: food,
          message: "Query food by Id successfully"
        })
      }
    })
});

router.get('/list_foods_with_criteria', (req, res, next) => {
  if (!req.query.name) {
    res.json({
      result: "failed",
      data: [],
      message: `Input parameters is wrong! 'name' must be not NULL`
    })
  }
  const criteria = {
    name: new RegExp(req.query.name, 'i')
  };
  const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 100;
  Food.find(criteria).limit(limit).sort({
    name: 1
  }).select({
    name: 1,
    foodDescription: 1,
    created_date: 1,
    status: 1,
  }).exec((err, foods) => {
    if (err) {
      res.json({
        result: "failed",
        data: [],
        message: `Error is: ${err}`
      })
    } else {
      res.json({
        result: "ok",
        data: foods,
        message: "Query food by Id successfully"
      })
    }
  })
});

router.post('/insert_new_food', (req, res, next) => {
  // res.end("POST request => insert_new_food");
  const newFood = new Food({
    name: req.body.name,
    foodDescription: req.body.foodDescription
  });
  newFood.save((err) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Error is: ${err}`
      })
    } else {
      res.json({
        result: "ok",
        data: {
          name: req.body.name,
          foodDescription: req.body.foodDescription,
        },
        message: "Insert new food successfully"
      })
    }
  })
});

router.put('/update_a_food', (req, res, next) => {
  // res.end("PUT request => update_a_food");

});

router.delete('/delete_a_food', (req, res, next) => {
  res.end("DELETE request => delete_a_food");
});

module.exports = router;