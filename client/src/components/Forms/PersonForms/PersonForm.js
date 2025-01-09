import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createPerson, updatePerson } from '../../../redux/actions/personsActions';
import Loading from '../../Loading/Loading';
import PersonDetailsForm from './PersonModules/PersonDetailsForm';
import PersonFamilyForm from './PersonModules/PersonFamilyForm';
import PersonMoviesForm from './PersonModules/PersonMoviesForm';
import GalleryUploader from '../../GalleryUploader/GalleryUploader';

const PersonForm = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const { isLoading, data: persons } = useSelector(state => state.persons);
    const movies = useSelector(state => state.movies);
    const person = params.id ? persons?.find(p => p.id === parseInt(params.id)) : null;

    const defaultState = {
        name: '',
        biography: '',
        alternativeName: '',
        height: '',
        bornDate: '',
        bornPlace: '',
        moreInfo: [],
        spouses: [],
        relatives: [],
        children: [],
        parents: [],
        acted: [],
        produced: [],
        directed: [],
        gallery: []
    };

    const [formData, setFormData] = useState(defaultState);
    const [disableFields, setDisableFields] = useState({});
    const isEditing = !!params.id;

    useEffect(() => {
        if (person) {
            setFormData({
                name: person.name || '',
                biography: person.biography || '',
                alternativeName: person.personalDetails?.alternativeName || '',
                height: person.personalDetails?.height || '',
                bornDate: person.personalDetails?.born?.date || '',
                bornPlace: person.personalDetails?.born?.place || '',
                spouses: person.Spouse?.map(sp => ({ id: sp.id, text: sp.name, maritalStatus: sp.Spouse.status, divorceYear: sp.Spouse.divorceYear, marriageYear: sp.Spouse.marriageYear })) || [],
                relatives: person.Relatives?.map(rel => ({ id: rel.id, text: rel.name, relationshipType: rel.Relative.relationshipType })) || [],
                children: person.Children?.map(child => ({ id: child.id, text: child.name })) || [],
                parents: person.Parents?.map(parent => ({ id: parent.id, text: parent.name })) || [],
                acted: person.ActedIn?.map(a => ({ id: a.id, text: a.title })) || [],
                produced: person.Produced?.map(p => ({ id: p.id, text: p.title })) || [],
                directed: person.Directed?.map(d => ({ id: d.id, text: d.title })) || [],
                gallery: person.gallery || [],
                moreInfo: person.moreInfo || []
            });

            // Initially disable all fields when editing
            setDisableFields(Object.keys(defaultState).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
        } else {
            setFormData(defaultState);
            setDisableFields({});
        }
    }, [params.id, person]);

    if (isLoading || (params.id && !person)) {
        return <Loading />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await dispatch(updatePerson(person.id, formData));
            navigate(`/people/${person.id}`);
        } else {
            await dispatch(createPerson(formData));
            setFormData(defaultState);
            navigate('/people');
        }
    };

    const handleDisableToggle = (field) => {
        setDisableFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div>
            <h4>{isEditing ? `Edit ${person.name}` : 'Add a New Person'}</h4>
            <form className='form' id='new-person-form' onSubmit={handleSubmit}>
                <PersonDetailsForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    disableFields={disableFields} 
                    handleDisableToggle={handleDisableToggle} 
                    isEditing={isEditing} 
                />

                { isEditing? <></> :
                    <GalleryUploader
                        handleFileChange={(e) => setFormData((prev) => ({ ...prev, gallery: Array.from(e.target.files) }))}
                    />
                }
                <PersonFamilyForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    persons={persons} 
                    currentPersonId={person?.id} 
                />
                <PersonMoviesForm formData={formData} setFormData={setFormData} movies={movies} />
                <button className='primary-button submitButton' type="submit">
                    {isEditing ? 'Update Person' : 'Create New Person'}
                </button>
            </form>
        </div>
    );
};

export default PersonForm;