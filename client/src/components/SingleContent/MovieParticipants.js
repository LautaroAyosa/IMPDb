import { useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
    { title: 'Cast', key: 'Cast' },
    { title: 'Producers', key: 'Producers' },
    { title: 'Directors', key: 'Directors' },
    { title: 'Acted In', key: 'ActedIn' },
    { title: 'Produced', key: 'Produced' },
    { title: 'Directed', key: 'Directed' }
];

const MovieParticipants = ({ entity, isMoviePage }) => {
    const [expanded, setExpanded] = useState();

    const toggleExpand = (section) => {
        setExpanded(expanded === section ? null : section);
    };

    const totalParticipants = () => {
        return sections.reduce((total, { key }) => total + (entity?.[key]?.length || 0), 0);
    };

    return (
        <div className="single-movie__content-participants">
            <div className='header'>
                <h2>{isMoviePage ? "Participants" : "Participations"} <span>{totalParticipants()}</span></h2>
                <a href='#' className='add-photo'>+ Edit Information</a>
            </div>
            {sections.map(({ title, key }) => (
                entity?.[key]?.length > 0 && (
                    <div className="participants" key={key} id={`${key}`}>
                        <h3 onClick={() => toggleExpand(key)} style={{ cursor: 'pointer' }}>
                            {title} {expanded === key ? '▲' : '▼'}
                        </h3>
                        {expanded === key && (
                            <ul>
                                {entity[key].map((item, i) => (
                                    <Link to={isMoviePage ? `/people/${item.id}` : `/movies/${item.id}`} key={i}>
                                        <li>
                                            {isMoviePage ? (
                                                // If it's a Movie Page → Show person name and birth year
                                                <p>
                                                    {item.name} - {item.personalDetails?.born?.date 
                                                        ? new Date(item.personalDetails.born.date).getFullYear() 
                                                        : "Unknown"}
                                                </p>
                                            ) : (
                                                // If it's a Person Page → Show movie title and release date
                                                <p>
                                                    {item.title} - {item.releaseDate 
                                                        ? new Date(item.releaseDate).getFullYear() 
                                                        : "Unknown"}
                                                </p>
                                            )}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </div>
                )
            ))}
        </div>
    );
};

export default MovieParticipants;
