import React, { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom";
import loginService from '../../services/login'

const NavBar = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
        }
    }, [])


    return (
        <nav>
            <NavLink to='/'><img className="logo" src='/images/New-imdb-logo.png' alt='imdb logo'/></NavLink>
            <ul>
                <li><NavLink to='/movies'>Movies</NavLink></li>
                <li><NavLink to='/people'>People</NavLink></li>
                {user ? 
                    <li className="dropdown dropdownMenu">
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                        <ul>
                            <li><Link to='/dashboard/new-movie'>New Movie</Link></li>
                            <li><Link to='/dashboard/new-person'>New Person</Link></li>
                            <li><p className="clickable" onClick={async() => await loginService.logout()}>Log out</p></li>
                        </ul>
                    </li>
                    : 
                    <div style={{display: 'flex'}}>
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/signin'>Join The OMDb</NavLink></li>
                    </div>
                }
                

            </ul>
        </nav>
    )
}

export default NavBar