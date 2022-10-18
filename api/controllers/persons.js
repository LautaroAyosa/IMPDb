const { Person } = require('../models/Person')


const getPersons = async (req, res) => {
    const persons = await Person.findAll()
    res.status(200).json(persons)
}

const getOnePerson = async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({where: {id: id}})
    res.status(200).json(person)
}

const createPerson = async (req, res) => {
    const {name, lastName, age} = req.body
    
    const newPerson = await Person.create({
        name,
        lastName,
        age
    })

    console.log(newPerson)
    res.end()
}

const deletePerson = async (req, res) => {
    const id = req.params.id
    const personToDelete = await Person.findOne({where: {id: id}})

    if (personToDelete) {
        await personToDelete.destroy()
        res.status(204).end()
    }
}

const updatePerson = async (req, res) => {
    const { name, lastName, age } = req.body
    const id = req.params.id
    const personToUpdate = await Person.findOne({where: {id: id}})

    if (personToUpdate) {
        const updatedPerson = await personToUpdate.update({
            name: name,
            lastName: lastName,
            age: age
        })
        res.status(200).json(updatedPerson)
    }
}

module.exports = {
    getPersons,
    getOnePerson,
    createPerson,
    deletePerson,
    updatePerson
}