const { Person, Movie, Media } = require('../models')
const { getPersonIncludes } = require('./helper');


const getPersons = async (req, res) => {
    try {
        const persons = await Person.findAll({
            include: getPersonIncludes(),
        })
        res.status(200).json(persons)
    } catch (err) {
        console.log(err)
    }
}

const getPersonsSimple = async (req, res) => {
    try {
        const persons = await Person.findAll({
            include: getPersonIncludes()
        })
    
        res.status(200).json(persons)
    } catch (err) {
        console.log(err)
    }
}

const getOnePerson = async (req, res) => {
    try {
        const id = req.params.id
        const person = await Person.findOne({ 
            where: {id},
            include: getPersonIncludes()
        })
    
        res.status(200).json(person)
    } catch (err) {
        console.log(err)
    }
}

const getProfileImage = async (req, res) => {
    try {

        const personId = req.params.id;
        const profileImage = await Media.findOne({
            where: {
                referenceId: personId,
                referenceType: 'Person',
                isProfileImage: true
            }
        });
        res.status(200).json(profileImage);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load image' });
    }
};


const createPerson = async (req, res) => {
    try {
        const {
            name,
            biography,
            alternativeName,
            height,
            bornDate,
            bornPlace,
            moreInfo,
            spouses,
            relatives,
            children,
            parents,
            acted,
            directed,
            produced
        } = req.body;

        // Create the new person
        const newPerson = await Person.create({
            name,
            biography,
            personalDetails: {
                alternativeName,
                height,
                born: {
                    date: bornDate,
                    place: bornPlace
                }
            },
            moreInfo
        });

        // Add associations
        if (spouses) {
            await Promise.all(
                spouses.map(async (spouse) => {
                    const person = await Person.findByPk(spouse.id);
                    if (person) {
                        await newPerson.addSpouse(person, {
                            through: {
                                maritalStatus: spouse.maritalStatus || null,
                                marriageYear: spouse.marriedYear || null,
                                divorceYear: spouse.divorceYear || null,
                            },
                        });
                    }
                })
            );
        }
        if (relatives?.length) {
            const validRelatives = await Promise.all(
                relatives.map(async ({ id, relationshipType }) => {
                    const person = await Person.findByPk(id);
                    return person && relationshipType ? { id, relationshipType: relationshipType.toLowerCase() } : null;
                })
            );
        
            await Promise.all(
                validRelatives.filter(Boolean).map(({ id, relationshipType }) =>
                    newPerson.addRelative(id, { through: { relationshipType } })
                )
            );
        }        
        if (parents) await newPerson.addParents(parents.map((parent) => parent.id));
        if (children) await newPerson.addChildren(children.map((child) => child.id));
        if (acted) await newPerson.addActedIn(acted.map((movie) => movie.id));
        if (directed) await newPerson.addDirected(directed.map((movie) => movie.id));
        if (produced) await newPerson.addProduced(produced.map((movie)=> movie.id));
    
        // Retrieve the newly created person with associations
        const addedPerson = await Person.findOne({
            where: { id: newPerson.id },
            include: getPersonIncludes(),
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(201).json(addedPerson)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while creating the person.' });
    }
}

const deletePerson = async (req, res) => {
    try {
        const id = req.params.id
        const personToDelete = await Person.findOne({where: {id: id}})
    
        if (personToDelete) {
            await personToDelete.destroy()
            res.status(204).end()
        } else {
            res.status(404).json({error: 'Person not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

const updatePerson = async (req, res) => {
    try {
        const {
            name,
            biography,
            alternativeName,
            height,
            bornDate,
            bornPlace,
            moreInfo,
            spouses,
            relatives,
            children,
            parents,
            acted,
            directed,
            produced
        } = req.body;
        const id = req.params.id;

        // Find the person to update
        const personToUpdate = await Person.findOne({ where: { id } });
    
        if (personToUpdate) {
            // Update the person's details
            await personToUpdate.update({
                name,
                biography,
                personalDetails: {
                    alternativeName,
                    height,
                    born: {
                        date: bornDate,
                        place: bornPlace
                    }
                },
                moreInfo
            });

            // Update associations
            if (spouses?.length) {
                const validSpouses = await Promise.all(
                    spouses.map(async ({ id, maritalStatus, marriedYear, divorceYear }) => {
                        const person = await Person.findByPk(id);
                        return person ? { id, maritalStatus, marriedYear, divorceYear } : null;
                    })
                );
            
                await Promise.all(
                    validSpouses.filter(Boolean).map(({ id, maritalStatus, marriedYear, divorceYear }) =>
                        personToUpdate.addSpouse(id, {
                            through: {
                                maritalStatus: maritalStatus || null,
                                marriageYear: marriedYear || null,
                                divorceYear: divorceYear || null,
                            },
                        })
                    )
                );
            }            
            if (relatives?.length) {
                const validRelatives = await Promise.all(
                    relatives.map(async ({ id, relationshipType }) => {
                        const person = await Person.findByPk(id);
                        return person && relationshipType ? { id, relationshipType: relationshipType.toLowerCase() } : null;
                    })
                );
            
                await Promise.all(
                    validRelatives.filter(Boolean).map(({ id, relationshipType }) =>
                        personToUpdate.addRelative(id, { through: { relationshipType } })
                    )
                );
            }        
            if (children) await personToUpdate.setChildren(children.map((child) => child.id));
            if (parents) await personToUpdate.setParents(parents.map((parent) => parent.id));
            if (acted) await personToUpdate.setActedIn(acted.map((movie) => movie.id));
            if (directed) await personToUpdate.setDirected(directed.map((movie) => movie.id));
            if (produced) await personToUpdate.setProduced(produced.map((movie) => movie.id));

            // Retrieve the updated person with associations
            const updatedPerson = await Person.findOne({
                where: { id },
                include: getPersonIncludes(),
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            res.status(200).json(updatedPerson);
            
        } else {
            res.status(404).json({error: 'Person not found'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while updating the person.' });
    }
}

module.exports = {
    getPersons,
    getPersonsSimple,
    getOnePerson,
    getProfileImage,
    createPerson,
    deletePerson,
    updatePerson,
}