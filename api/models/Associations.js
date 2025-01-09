module.exports = (sequelize, models) => {
    const { Person, Movie, Media, User, Spouse, Relative } = models;
  
    // Person - Media
    // Profile Image (One-to-One)
    Person.hasOne(Media, { as: 'ProfileImage', foreignKey: 'referenceId', constraints: false, scope: { referenceType: 'Person', isProfileImage: true } });
    // Gallery (One-to-Many)
    Person.hasMany(Media, { as: 'PersonGallery', foreignKey: 'referenceId', constraints: false, scope: { referenceType: 'Person', isProfileImage: false } });
    Media.belongsTo(Person, { foreignKey: 'referenceId', constraints: false });
    
    // Movie - Media
    // Main Trailer (One-to-One)
    Movie.hasOne(Media, { as: 'MainTrailer', foreignKey: 'referenceId', constraints: false, scope: { referenceType: 'Movie', isMainTrailer: true } });
    // Gallery (One-to-Many)
    Movie.hasMany(Media, { as: 'MovieGallery', foreignKey: 'referenceId', constraints: false, scope: { referenceType: 'Movie', isMainTrailer: false } });
    Media.belongsTo(Movie, { foreignKey: 'referenceId', constraints: false });

    // Person - Movies
    // Actors
    Person.belongsToMany(Movie, { through: 'Actors_Movies', as: 'ActedIn', foreignKey: 'actorId' });
    Movie.belongsToMany(Person, { through: 'Actors_Movies', as: 'Cast', foreignKey: 'movieId' });
    // Directors
    Person.belongsToMany(Movie, { through: 'Directors_Movies', as: 'Directed', foreignKey: 'directorId' });
    Movie.belongsToMany(Person, { through: 'Directors_Movies', as: 'Directors', foreignKey: 'movieId' });
    // Producers
    Person.belongsToMany(Movie, { through: 'Producers_Movies', as: 'Produced', foreignKey: 'producerId' });
    Movie.belongsToMany(Person, { through: 'Producers_Movies', as: 'Producers', foreignKey: 'movieId' });

    // Person - Person
    // Child-Parent
    Person.belongsToMany(Person, {through: 'ParentChild', as: 'Children', foreignKey: 'parentId', otherKey: 'childId',});
    Person.belongsToMany(Person, {through: 'ParentChild', as: 'Parents', foreignKey: 'childId', otherKey: 'parentId',});
    // Spouse
    Person.belongsToMany(Person, {through: Spouse, as: 'Spouses', foreignKey: 'personId', otherKey: 'spouseId',});
    // Relative
    Person.belongsToMany(Person, {through: Relative, as: 'Relatives', foreignKey: 'personId', otherKey: 'relativeId',});

    // User - Person/Movie
    Movie.belongsTo(User, {foreignKey: 'userId'})
    User.hasMany(Movie, {as: 'movies', foreignKey: 'userId'})

    User.hasMany(Person, {foreignKey: 'userId'})
    Person.belongsTo(User, {as: 'persons', foreignKey: 'userId'})
  };
  