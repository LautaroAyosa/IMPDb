const bcrypt = require('bcrypt')
const User = require('../models/User')

const getUsers = async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
}

const getOneUser = async (req, res) => {
  const {id} = req.body

  const user = await User
    .findOne({
        where: {id}
    })

  res.status(200).json(user)
}

const createUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body
    
    const saltRounds = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await User.create({
      username,
      email,
      hashPassword,
      name
    })

    res.status(201).json(newUser)

  } catch (err) {
    console.log(err)
  }
}


module.exports = { 
    getUsers,
    getOneUser,
    createUser
}
