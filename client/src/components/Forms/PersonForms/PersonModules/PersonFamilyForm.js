import React from 'react';
import MultiSelect from '../../../MultiSelect/MultiSelect';

const PersonFamilyForm = ({ formData, setFormData, persons, currentPersonId }) => {
    // Filter out the person being edited
    const filteredPersons = persons
        .filter(person => person.id !== currentPersonId)
        .map(person => ({ id: person.id, text: person.name })); // Convert to expected format

    return (
        <div>
            <h5>Family</h5>
                <div className='full flexRowCenter'>
                    <MultiSelect
                        label="Spouses"
                        preSelected={formData.spouses} // Now in correct format
                        data={filteredPersons} // Ensure we exclude the current person
                        additionalFields={["maritalStatus", "year"]}
                        onChange={(event) => setFormData({ ...formData, spouses: event })}
                    />
                    <MultiSelect
                        label="Relatives"
                        preSelected={formData.relatives} // Now in correct format
                        data={filteredPersons} // Ensure we exclude the current person
                        additionalFields={["relation"]}
                        onChange={(event) => setFormData({ ...formData, relatives: event })}
                    />
                </div>
                <div className='full flexRowCenter'>
                    <MultiSelect
                        label="Children"
                        preSelected={formData.children} // Now in correct format
                        data={filteredPersons} // Ensure we exclude the current person
                        onChange={(event) => setFormData({ ...formData, children: event })}
                    />
                    <MultiSelect
                        label='Parents'
                        preSelected={formData.parents} // Now in correct format
                        data={filteredPersons} // Ensure we exclude the current person
                        onChange={(event) => setFormData({ ...formData, parents: event })}
                    />
                </div>

        </div>
    );
};

export default PersonFamilyForm;
