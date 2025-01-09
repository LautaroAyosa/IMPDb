const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('movies', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Requires PostgreSQL
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 1, // Minimum duration is 1 minute
            },
        },
        // Reviews
        // PG Rating
    });
}