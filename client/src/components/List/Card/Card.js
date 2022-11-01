import { Link } from 'react-router-dom'

const Card = (props) => {

  if (props.show === 'people') {
    return (
      <Link to={`/people/${props.content.id}`}>
        <div className="card">
          <img src={props.content.image} alt={`${props.content.name} ${props.content.lastName}`} />
          <div className='card-content'>
            <div>
              <h4 className="title">{props.content.name} {props.content.lastName}</h4>
              <p className="subtitle">Age: {props.content.age}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  } else {
    return (
      <Link to={`/movies/${props.content.id}`}>
        <div className="card">
          <img src={props.content.image} alt={`${props.content.title} movie`} />
          <div className='card-content'>
            <div>
              <h4 className="title">{props.content.title}</h4>
              <p className="subtitle">Published in: {props.content.year}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default Card
