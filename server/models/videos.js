const mongoose = require('mongoose'),
     Schema = mongoose.Schema

const vidScheme = new Schema(
  {
    videoId:{
      type:String,
      unique: [true, `videoId is already exists`]
    },
    title: {
      type: String
    },
    image: {
      type: String,
    },
    desc: {
      type: String,
    },
    url:{
      type:String
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

const Video = mongoose.model('Video', vidScheme)
module.exports = Video