const Sequelize = require('sequelize');
const config = require('../utils/config');

let sequelize;

if (process.env.RAILWAY_ENVIRONMENT === 'production') {
  sequelize = new Sequelize(config.DB_CONNECTION_URL);
} else {
  sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
      host: config.DB_HOST,
      dialect: 'postgres',
    }
  );
}

// Import models
const Person = require('./Person')(sequelize);
const Spouse = require('./Spouse')(sequelize);
const Relative = require('./Relative')(sequelize);
const Movie = require('./Movie')(sequelize);
const Media = require('./Media')(sequelize);
const User = require('./User')(sequelize);

// Import and apply associations
require('./Associations')(sequelize, { Person, Spouse, Relative, Movie, Media, User });

module.exports = {
  sequelize,
  Person,
  Spouse,
  Relative,
  Movie,
  Media,
  User,
};