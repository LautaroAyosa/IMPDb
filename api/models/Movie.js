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

Movie.hasMany(Person, {
    through: 'Actors_Movies',
    as: 'Actor',
    foreignKey: 'ActorId'
})
Movie.hasMany(Person, {
    through: 'Directors_Movies',
    as: 'Director',
    foreignKey: 'directorId'
})
Movie.hasMany(Person, {
    through: 'Producers_Movies',
    as: 'Producer',
    foreignKey: 'producerId'
})

module.exports = {
    Movie
}