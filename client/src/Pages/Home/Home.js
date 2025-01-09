import { Link } from "react-router-dom"


const Home = () => {

    return (
        <div className="baseContainer">
            <div className="banner-center">
                <h1>Welcome to IMPDb</h1>
                <p>The Internet Movie-People Database</p>
            </div>
            <div>
                <h2>What can I do in this app?</h2>
                <div className="col-2">
                    <div>
                        <h3>Movies</h3>
                        <div>
                            <h4>Add a Movie</h4>
                            <ul>
                                <li>Go to the <Link to='/dashboard/new-movie'>New Movie</Link> page in the dashboard</li>
                                <li>Fill in the fields (There is no validator at the moment)</li>
                                <li>Click the "Create New Movie" button</li>
                                <p>Tip: You can add people later</p>
                            </ul>
                        </div>
                        <div>
                            <h4>Watch all movies</h4>
                            <p>Go to the <Link to='/movies'>Movies</Link> page</p>
                        </div>
                        <div>
                            <h4>Watch a single movie</h4>
                            <p>Go to the <Link to="/movies">Movies</Link> page and click on one Movie, or click <Link to='/movies/1'>Here</Link></p>
                        </div>
                        <div>
                            <h4>Edit a movie</h4>
                            <ul>
                                <li>Go to the movie you want to edit</li>
                                <li>Click the "Edit Movie" button</li>
                                <li>Change whatever you want. (If you leave empty fields, that means that you want to delete the info)</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Delete a movie</h4>
                            <ul>
                                <li>Go to the movie you want to edit</li>
                                <li>Click the "Delete Movie" button</li>
                                <li>That will prompt a window on your browser, click yes to confirm deletion</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3>People</h3>
                        <div>
                            <h4>Add a Person</h4>
                            <ul>
                                <li>Go to the <Link to='/dashboard/new-person'>New Person</Link> page in the dashboard</li>
                                <li>Fill in the fields (There is no validator at the moment)</li>
                                <li>Click the "Create New Movie" button</li>
                                <p>Tip: You can add movies later</p>
                            </ul>
                        </div>
                        <div>
                            <h4>Watch all people</h4>
                            <p>Go to the <Link to='/people'>People</Link> page</p>
                        </div>
                        <div>
                            <h4>Watch a single person</h4>
                            <p>Go to the <Link to="/people">People</Link> page and click on one Person, or click <Link to='/people/1'>Here</Link></p>
                        </div>
                        <div>
                            <h4>Edit a person</h4>
                            <ul>
                                <li>Go to the person you want to edit</li>
                                <li>Click the "Edit Person" button</li>
                                <li>Change whatever you want. (If you leave empty fields, that means that you want to delete the info)</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Delete a person</h4>
                            <ul>
                                <li>Go to the person you want to edit</li>
                                <li>Click the "Delete Person" button</li>
                                <li>That will prompt a window on your browser, click yes to confirm deletion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home