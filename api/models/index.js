const Sequelize = require('sequelize')
const config = require('../utils/config')

// Sequelize connection
const sequelize = new Sequelize (
    config.DB_NAME, 
    config.DB_USER, 
    config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: 'postgres'
})

module.exports = {
    sequelize,
}