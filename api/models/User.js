const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')
const { Person } = require('./Person')
const { Movie } = require('./Movie')

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    hashPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


module.exports = User