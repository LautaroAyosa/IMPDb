require('dotenv').config()

const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const SECRET = process.env.SECRET

module.exports = {
  PORT,
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  SECRET
}
