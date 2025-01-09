require('dotenv').config()

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

// Database Connection
const PORT = process.env.PORT
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const SECRET = process.env.SECRET

module.exports = {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  PORT,
  DB_CONNECTION_URL,
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  SECRET
}