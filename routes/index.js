global.router = require('express').Router();
let router = global.router;


router = require('./food');
router = require('./dog');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express',
    name: "Luu manh"
  });
});


module.exports = router;