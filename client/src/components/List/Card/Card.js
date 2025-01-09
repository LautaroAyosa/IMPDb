import { Link } from 'react-router-dom'

const Card = ({ data }) => {
  let year;
  const baseMediaUrl = 'https://res.cloudinary.com/dpsviovus/image/upload/t_MoviePoster-Optimized/'
  if (data.personalDetails.born.date) {
    const dateStr = data.personalDetails.born.date;
    year = new Date(dateStr).getFullYear();
  }

  const shortenBiography = (biography, maxLines = 3) => {
    const lines = biography.split('\n');
    if (lines.length <= maxLines) return biography;
    return lines.slice(0, maxLines).join('\n') + '...';
  }
  console.log(data)
  return (
      <Link to={`/people/${data.id}`} className='list-item'>
        <div className='people-card'>
          <div className='people-card__poster'>
            <img src={ data?.ProfileImage ? `${baseMediaUrl}${data?.ProfileImage?.publicId}`: `https://res.cloudinary.com/dpsviovus/image/upload/f_auto,q_auto/v1/multimedia/PLACEHOLDER_hdh7si`} alt={data.title} />
          </div>
          <div className='people-card__info'>
            <div className='people-card__info-content'>
              <ul className='roles'>
                  { data.ActedIn?.length !== 0 ? <li>Actor</li> : null}
                  { data.Produced?.length !== 0 ? <li>Producer</li> : null}
                  { data.Directed?.length !== 0 ? <li>Director</li> : null}
              </ul>
              <h4 className='title'>{data?.name}</h4>
              <span className='year'>{year}</span>
            </div>
            <div className='people-card__info-cta'>
              <a className='button trailer'>See More</a>
            </div>
          </div>

        </div>
        
        
        {/* <div className='list-item__header'>
          <div className="list-item__header-image">
              <img src={ data.ProfileImage ? `${baseMediaUrl}${data.ProfileImage.publicId}`: `https://res.cloudinary.com/dpsviovus/image/upload/f_auto,q_auto/v1/multimedia/PLACEHOLDER_hdh7si`} alt={data.name} />
          </div>
          <div className='list-item__header-info'>
            <div className='list-item__header-info-main'>
              <span className='name'>{data.name}</span>
              <span className='roles'>{"actor"}</span>
              <span className='year'>{year}</span>
            </div>
            <div className='list-item__header-info-credits'>
              {
                data.lastMovie ? 
                  <Link>
                    {data.lastmovie.title} {data.lastmovie.year}
                  </Link>
                  : ""
              }
            </div>
          </div>
        </div>
        <div className="list-item__bio">
          <p className=''>{ data.biography && shortenBiography(data.biography, 2)}</p>
        </div> */}
      </Link>
    )
}

export default Card
