const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Relative', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      relativeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      relationshipType: {
        type: DataTypes.ENUM('sibling', 'uncle', 'aunt', 'cousin', 'grandparent', 'grandchild'),
        allowNull: false,
      },
    });
  };
  