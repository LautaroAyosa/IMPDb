const personsRouter = require('express').Router()
const personsController = require('../controllers/persons') 

personsRouter.get('/', personsController.getPersons)
personsRouter.get('/personsSimple', personsController.getPersonsSimple)
personsRouter.get('/:id', personsController.getOnePerson)
personsRouter.get('/profileImage/:id', personsController.getProfileImage)
personsRouter.post('/', personsController.createPerson)
personsRouter.delete('/:id', personsController.deletePerson)
personsRouter.put('/:id', personsController.updatePerson)

module.exports = personsRouter