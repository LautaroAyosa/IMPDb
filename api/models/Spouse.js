const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Spouse', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marriageYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    divorceYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('married', 'divorced', 'widowed', 'separated'),
      allowNull: false,
      defaultValue: 'married',
    },
  });
};
