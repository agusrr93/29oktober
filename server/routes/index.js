const express = require('express'),
      router = express.Router()

/* GET home page. */
router.get('/try', function(req, res, next) {
  res.send('You are connected to Livue')
})

module.exports = router
