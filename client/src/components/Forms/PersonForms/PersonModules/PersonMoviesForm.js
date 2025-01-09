import React from 'react';
import MultiSelect from '../../../MultiSelect/MultiSelect';

const PersonMoviesForm = ({ formData, setFormData, movies }) => {
    const myMovies = movies.data?.map(m => ({ id: m.id, text: `${m.title} - ${new Date(m.releaseDate).getFullYear()}` })) || [];

    return (
        <div>
            <h5>Participation in Movies</h5>
            <div className='full flexRowCenter'>

            {['acted', 'produced', 'directed'].map((role) => (
                <MultiSelect
                key={role}
                data={myMovies}
                label={role.charAt(0).toUpperCase() + role.slice(1)}
                preSelected={formData[role]} // Now correctly formatted
                onChange={(event) => setFormData({ ...formData, [role]: event })}
                />
            ))}
            </div>
        </div>
    );
};



export default PersonMoviesForm;