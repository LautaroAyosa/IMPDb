const { Movie, Person, Media } = require('../models');

const personRelationMap = {
    ActedIn: {
      model: Movie,
      as: 'ActedIn',
      attributes: { exclude: ['createdAt', 'updatedAt', 'Actors_Movies'] },
    },
    Produced: {
      model: Movie,
      as: 'Produced',
      attributes: { exclude: ['createdAt', 'updatedAt', 'Producers_Movies'] },
    },
    Directed: {
      model: Movie,
      as: 'Directed',
      attributes: { exclude: ['createdAt', 'updatedAt', 'Directors_Movies'] },
    },
    Spouses: {
      model: Person,
      as: 'Spouses',
      through: { attributes: ['marriageYear', 'divorceYear', 'status'] }, // Include Spouse details
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    Relatives: {
      model: Person,
      as: 'Relatives',
      through: { attributes: ['relationshipType'] }, // Include relative type
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    Parents: {
      model: Person,
      as: 'Parents',
      attributes: ['id', 'name'],
    },
    Children: {
      model: Person,
      as: 'Children',
      attributes: ['id', 'name'],
    },
    ProfileImage: {
      model: Media,
      as: 'ProfileImage',
      attributes: ['id', 'type', 'publicId'],
    },
    PersonGallery: {
      model: Media,
      as: 'PersonGallery',
      attributes: ['id', 'type', 'publicId'],
    },
};

const movieRelationMap = {
    Cast: {
        model: Person, 
        as: 'Cast',
        attributes: { exclude: ['createdAt', 'updatedAt']}
    },
    Directors:{
        model: Person, 
        as: 'Directors',
        attributes: { exclude: ['createdAt', 'updatedAt']}
    },
    Producers: {
        model: Person, 
        as: 'Producers',
        attributes: { exclude: ['createdAt', 'updatedAt']}
    },
    MainTrailer: {
      model: Media,
      as: 'MainTrailer',
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    MovieGallery: {
      model: Media,
      as: 'MovieGallery',
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
}
  
const getPersonIncludes = (relations = Object.keys(personRelationMap)) => {
  return relations.map((relation) => personRelationMap[relation]);
};

const getMovieIncludes = (relations = Object.keys(movieRelationMap)) => {
  return relations.map((relation) => movieRelationMap[relation]);
};

module.exports = {
    getPersonIncludes,
    getMovieIncludes
};

