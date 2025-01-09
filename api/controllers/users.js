const bcrypt = require('bcrypt')
const { User } = require('../models')

const getUsers = async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
}

const getOneUser = async (req, res) => {
  const {id} = req.body

  const user = await User.findOne({where: {id}})
  res.status(200).json(user)
}

const getOneUserByUserName = async (req, res) => {
  try {
    const {username} = req.params;
    if (!username) { res.status(404).json("A username hasn't been provided.") }
    const user = await User.findOne({where: {username: username}});
    res.status(200).json(user)
  } catch (err) {
    console.log(err);
    res.status(500).json('There has been an issue getting the User', err);
  }
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
    getOneUserByUserName,
    createUser
}
