const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')
const { Movie } = require('../models/Movie')

const Person = sequelize.define('persons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: DataTypes.INTEGER,
})

Person.belongsToMany(Movie, {
    through: 'Actors_Movies',
    as: 'Actor',
    foreignKey: 'ActorId'
})
Person.belongsToMany(Movie, {
    through: 'Directors_Movies',
    as: 'Director',
    foreignKey: 'directorId'
})
Person.belongsToMany(Movie, {
    through: 'Producers_Movies',
    as: 'Producer',
    foreignKey: 'producerId'
})


module.exports = {
    Person
}