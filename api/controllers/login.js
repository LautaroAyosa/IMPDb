const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const User = require('../models/user')

const login = async (req, res) => {
  const body = req.body

  const user = await User.findOne({ where: {email: body.email} })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.hashPassword)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid Username or Password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
}

module.exports = { login }
