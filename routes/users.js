const express = require('express');
const router = global.router;
const User = require('../model/UserModel');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  // res.send('respond with a resource');
  User.find({}).limit(100).sort({name: 1}).select({
    name: 1,
    email: 1,
    password: 1,
    gender: 1,
    created_at: 1
  }).exec((err, users) => {
    if (err) {
      res.json({
        result: 'failed',
        data: [],
        message: `Error is ${err}`
      })
    } else {
      res.json({
        result: 'ok',
        data: users,
        message: 'List all user successfully'
      })
    }
  })
});

router.post('/users', (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender
  });
  newUser.save(err => {
    if (err) {
      res.json({
        result: 'failed',
        data: {},
        message: `Error is ${err}`
      })
    } else {
      res.json({
        result: 'ok',
        data: {
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender
        },
        message: 'insert new user successfully'
      })
    }
  })
});

module.exports = router;
