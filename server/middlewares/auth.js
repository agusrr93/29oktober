require('dotenv').config()

const User = require('../models/users'),
     jwt = require('jsonwebtoken')

module.exports = {
  isLogin: (req, res, next) => {
    let token = req.headers.token
    if (token) {
      jwt.verify(token, process.env.ACCESS_KEY, (err, decoded) => {
        if (decoded) {
          User.findOne({
            _id: decoded.id
          })
          .then(user => {
            req.user = user
            next()
          })
        } else {
          res.status(403).json({
            message: 'login first to access this feature'
          })
        }
      })
    } else {
      res.status(403).json({
        message: 'login first to access this feature'
      })
    }
  }
}