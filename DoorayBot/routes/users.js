var express = require('express');
var router = express.Router();

const users = [
  { id: 1, name: 'Node.js' },
  { id: 2, name: 'npm' },
  { id: 3, name: 'Pengsu' },
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

router.get('/:id', function (req, res, next) {
  var user = users.find(u => u.id === parseInt(req.params.id))
  res.send(user);
});

router.get('/:time', function (req, res, next) {
  let user = users.find(u => u.id === parseInt(req.params.id))
  res.send(user);
});

module.exports = router;
