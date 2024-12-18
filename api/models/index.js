const Sequelize = require('sequelize')
const config = require('../utils/config')

let sequelize

if (process.env.RAILWAY_ENVIRONMENT === 'production') {
    sequelize = new Sequelize(config.DB_CONNECTION_URL)
} else {
    // Local Sequelize connection
    sequelize = new Sequelize (
        config.DB_NAME, 
        config.DB_USER, 
        config.DB_PASSWORD, {
        host: config.DB_HOST,
        dialect: 'postgres'
    })
}


module.exports = {
    sequelize,
}