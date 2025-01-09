import { Link } from 'react-router-dom'

const Card = ({ data }) => {
  let year;
  const baseMediaUrl = 'https://res.cloudinary.com/dpsviovus/image/upload/ar_0.5944,c_fill,g_face,h_500/q_auto:eco/'
  if (data.releaseDate) {
    const dateStr = data.releaseDate;
    year = new Date(dateStr).getFullYear();
  }

  const shortenSynopsis = (synopsis, maxLines = 3) => {
    const lines = synopsis.split('\n');
    if (lines.length <= maxLines) return synopsis;
    return lines.slice(0, maxLines).join('\n') + '...';
  }
  return (
      <Link to={`/movies/${data.id}`} className='list-item'>
        <div className='movie-card'>
          <div className='movie-card__poster'>
            <img src={ data.MovieGallery[0] ? `${baseMediaUrl}${data.MovieGallery[0].publicId}`: `https://res.cloudinary.com/dpsviovus/image/upload/f_auto,q_auto/v1/multimedia/PLACEHOLDER_hdh7si`} alt={data.title} />
          </div>
          <div className='movie-card__info'>
            <h4 className='title'>{data.title}</h4>
            <span className='year'>{year}</span>
            <button className="trailer">▶ Trailer</button>
          </div>

        </div>
        
        {/* <div className='list-item__header'>
          <div className="list-item__header-image">
              <img src={ data.MovieGallery[0] ? `${baseMediaUrl}${data.MovieGallery[0].publicId}`: `https://res.cloudinary.com/dpsviovus/image/upload/f_auto,q_auto/v1/multimedia/PLACEHOLDER_hdh7si`} alt={data.name} />
          </div>
          <div className='list-item__header-info'>
            <div className='list-item__header-info-main'>
              <span className='name'>{data.title}</span>
              <span className='roles'>{"actor"}</span>
              <span className='year'>{year}</span>
            </div>
            <div className='list-item__header-info-credits'>
              
            </div>
          </div>
        </div>
        <div className="list-item__bio">
          <p className=''>{ data.synopsis && shortenBiography(data.synopsis, 2)}</p>
        </div> */}
      </Link>
    )
}

export default Card
