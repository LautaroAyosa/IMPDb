const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
    return sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: { 
        type: DataTypes.STRING,
    },
    hashPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    })
}