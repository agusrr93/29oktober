let hashPass = require('../helpers/hashPass')

const mongoose = require('mongoose'),
     Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required']
    },
    email: {
      type: String,
      unique: [true, `email is already exists`],
      required: [true, 'email is required'],
    },
    password:{
      type: String,
      required: [true, 'password is required']
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function(next) {
  this.password = hashPass(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User