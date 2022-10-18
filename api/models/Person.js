const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')
const { Movie } = require('../models/Movie')

const Person = sequelize.define('persons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
})


module.exports = {
    Person
}