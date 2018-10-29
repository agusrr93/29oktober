require('dotenv').config()
let hashPass = require("../helpers/hashPass")

const User = require("../models/users"),
  jwt = require('jsonwebtoken')

module.exports = {
  register: (req, res) => {
    console.log(req.body.name," ",req.body.email," ",req.body.password)
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        
        User.findOne({
          email: req.body.email,
          password: hashPass(req.body.password)
        })
          .then(user => {
            jwt.sign({
              id: user._id
            }, process.env.ACCESS_KEY,
              function (err, token) {
                res.status(200).json({
                  name: user.name,
                  token: token
                })
              }
            )
          })
          .catch(function () {
            res.status(500).json({
              message: `email and password didn't match`
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  login: function (req, res) {
    User.findOne({
      email: req.body.email,
      password: hashPass(req.body.password)
    })
      .then(user => {
        jwt.sign({
          id: user._id
        }, process.env.ACCESS_KEY,
          function (err, token) {
            res.status(200).json({
              name: user.name,
              token: token
            })
          }
        )
      })
      .catch(function () {
        res.status(500).json({
          message: `email and password didn't match`
        })
      })
  }
}




