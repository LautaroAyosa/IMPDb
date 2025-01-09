import MultiSelect from '../../../MultiSelect/MultiSelect';
import { useSelector } from 'react-redux';

const MoviePeople = ({ newMovie, setNewMovie, preSelected }) => {
  const {data} = useSelector((state) => state.persons);
  const peopleData = data.map((person) => ({
    value: person.id,
    text: `${person.name}`,
  }));

  return (
    <div className="form-wrap">
      {['cast', 'producers', 'directors'].map((role) => (
        <MultiSelect
          key={role}
          data={peopleData}
          label={role.charAt(0).toUpperCase() + role.slice(1)}
          onChange={(event) =>
            setNewMovie({ 
              ...newMovie, 
              [role]: event })
          }
          containerClass="col1-3"
          
        />
      ))}
    </div>
  );
};

export default MoviePeople;
