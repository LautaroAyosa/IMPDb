import movieService from '../../services/movies'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const SingleContent = () => {
    const [content, setContent] = useState(null)
    const params = useParams()

    useEffect(() => {
        movieService
            .getOne(parseInt(params.id))
            .then(response => setContent(response))
    }, [params.id])

    console.log(content)
    return (
        <div>
            <h1>{content.title}</h1>
            <div>
                <h2>Cast:</h2>
                <ul>
                    {content.Cast !== undefined ? 
                        content.Cast.map((actor, i) => {
                            return <li key={i}><Link to={`/people/${actor.id}`}>{actor.name} {actor.lastName}</Link></li>
                        })
                    : 'No one has been added to this movies cast'
                    }
                </ul>
            </div>
        </div>
    )
}

export default SingleContent