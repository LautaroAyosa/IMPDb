const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')

const Movie = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
})

module.exports = {
    Movie
}