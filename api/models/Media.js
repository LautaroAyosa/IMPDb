const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('Media', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('image', 'video'), // Type of media
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING, // Cloudinary URL
      allowNull: false,
    },
    publicId: {
      type: DataTypes.STRING, // ID público de Cloudinary
      allowNull: false,
    },  
    isProfileImage: {
      type: DataTypes.BOOLEAN, // Whether it’s a profile image
      defaultValue: false,
    },
    isMainTrailer: {
      type: DataTypes.BOOLEAN, // Whether it’s a profile image
      defaultValue: false,
    },
    referenceType: {
      type: DataTypes.ENUM('Person', 'Movie'), // Associated entity type
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.INTEGER, // Associated entity ID
      allowNull: false,
    },
  });
}
  