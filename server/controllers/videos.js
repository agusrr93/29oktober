const Video = require('../models/videos')
const mongoose = require('mongoose')

module.exports = {
  sortedLikedVideo:(req,res)=>{
    voterId=req.user.id
    Video.find({}).sort({likes: 1})
      .populate('likes')
      .then(videos => {
        res.status(200).json({
          videos
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  getAllVid: (req, res) => {
    voterId=req.user.id
    Video.find({
      likes: {
        $in: voterId
      }
    })
      .populate('likes')
      .then(videos => {
        res.status(200).json({
          videos
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  likeVid: (req, res) => {
    Video.findOne(
      {videoId: req.body.videoId},
    )
    .then(data=>{
        if(data==null)
        {
            Video.create({
              videoId:req.body.videoId,
              title:req.body.title,
              image:req.body.image,
              desc:req.body.desc,
              url:req.body.url
            })
            .then(data=>{
              Video.findOneAndUpdate(
                { _id: data._id }, 
                { $push: { likes: req.user._id }},{new:true} 
              )
              .then(data=>{
                console.log(data)
              })
              .catch(err=>{
                console.log(err)
              })
            })
            .catch(err=>{
              console.log(err)
            })
        }
        else{
            const userId = new mongoose.Types.ObjectId(req.user.id)
            console.log('ini status vote',data.likes.indexOf(userId))
            if(data.likes.indexOf(userId)==-1)
            {
                Video.findOneAndUpdate(
                  { _id: data._id }, 
                  { $push: { likes: userId }},{new:true} 
                )
                .then(data=>{
                  console.log("ini pembaruan",data)
                })
                .catch(err=>{
                  console.log(err)
                })
            }
            else{
              console.log('already upvoted')
            }
        }
    })
  },

  likeStatus: (req,res) =>{
    Video.findOne(
      {videoId: req.params.status},
    )
    .then(data=>{
        
        if(data==null)
        {
            res.status(200).json({
              status:false
            })
        }
        else{
           if(data.likes.indexOf(req.user.id)==-1)
           {
              res.status(200).json({
                status:false
              })
           }
           else{
              res.status(200).json({
                status:true
              })
           }
        }
     })
     .catch(err=>{
       res.status(500).json({
         status:err
       })
     })
  },
  unlikeVid: (req, res) => {
    
    let voterId = req.user.id
    Video.findOne({
      title: req.params.title
    })
      .then(data => {
        Video.findOne({
          title: req.params.title,
          likes: {
            $in: voterId
          }
        })
          .then(vote => {
            Video.findOneAndUpdate({
              title: req.params.title
            }, {
                $pull: { likes: voterId },
              })
              .then(unlike => {
                res.status(200).json({
                  message: 'unlike success',
                  unlike
                })
              })
              .catch(err => {
                console.log('error unlike here', err)
                res.status(500).json({
                  message: err.message
                })
              })
          })
          .catch(err => {
            res.status(500).json({
              message: 'you already unlike this video'
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}