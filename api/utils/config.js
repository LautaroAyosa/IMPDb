require('dotenv').config()

const PORT = process.env.PORT
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const SECRET = process.env.SECRET

module.exports = {
  PORT,
  DB_CONNECTION_URL,
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  SECRET
}
