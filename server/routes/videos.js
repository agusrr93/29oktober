const express = require('express'),
     router = express.Router(),
     { isLogin } = require('../middlewares/auth'),
     { likeVid, unlikeVid, getAllVid,likeStatus } = require('../controllers/videos')


router
  .get('/list',isLogin,getAllVid)
  .get('/stat/:status', isLogin,likeStatus)
  .post('/like/:title', isLogin, likeVid)

  .post('/unlike/:title', isLogin, unlikeVid)

module.exports = router
