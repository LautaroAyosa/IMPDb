require('dotenv').config()

const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

module.exports = {
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
}
