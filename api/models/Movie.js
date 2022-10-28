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
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
    },
    banner: {
        type: DataTypes.STRING,
        defaultValue: 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'
    },
    description: {
        type: DataTypes.STRING,
    }
})

module.exports = {
    Movie
}