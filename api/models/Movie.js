const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')
const { Person } = require('./Person')

const Movie = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    year: { 
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = {
    Movie
}