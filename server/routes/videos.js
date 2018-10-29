const express = require('express'),
     router = express.Router(),
     { isLogin } = require('../middlewares/auth'),
     { likeVid, unlikeVid, getAllVid,likeStatus,sortedLikedVideo} = require('../controllers/videos')


router
  .get('/sorted',isLogin,sortedLikedVideo)
  .get('/list',isLogin,getAllVid)
  .get('/stat/:status', isLogin,likeStatus)
  .post('/like/:title', isLogin, likeVid)

  .post('/unlike/:title', isLogin, unlikeVid)

module.exports = router
