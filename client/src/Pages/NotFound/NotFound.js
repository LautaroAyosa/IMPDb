import { Link } from "react-router-dom"

const NotFound = () => {

    return (
        <div className="notFoundContainer">
            <div className="whiteContainer">
                <h1>That page you are looking for does not exist!</h1>
                <p>Try going back to the <Link to="/">Home page</Link>.</p>
            </div>
        </div>
    )
}

export default NotFound