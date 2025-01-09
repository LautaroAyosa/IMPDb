const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('Person', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        biography: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        personalDetails: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {
                alternativeName: null,
                height: null,
                born: {
                    date: null,
                    place: null,
                },
            },
            validate: {
                isValidJson(value) {
                    if (typeof value !== 'object' || Array.isArray(value)) {
                        throw new Error('Personal details must be a JSON object');
                    }
                    // if (value.born && (typeof value.born.date !== 'string' || typeof value.born.place !== 'string')) {
                    //     throw new Error('Born details must include a valid date and place as strings');
                    // }
                    // if (value.height && (typeof value.height !== 'number' || value.height <= 0)) {
                    //     throw new Error('Height must be a positive number');
                    // }
                },
            },
        },      
        moreInfo: {
            type: DataTypes.ARRAY(DataTypes.TEXT), // Stores an array of text (no titles)
            allowNull: true,
            defaultValue: [],
        },
    });
}