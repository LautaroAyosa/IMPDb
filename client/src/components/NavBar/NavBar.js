import React from "react"
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {


    return (
        <nav>
            <NavLink to='/'><img className="logo" src='/images/New-imdb-logo.png' alt='imdb logo'/></NavLink>
            <ul>
                <li><NavLink to='/movies'>Movies</NavLink></li>
                <li><NavLink to='/people'>People</NavLink></li>
                <li className="dropdown dropdownMenu">
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                    <ul>
                        <li><Link to='/dashboard/new-movie'>New Movie</Link></li>
                        <li><Link to='/dashboard/new-person'>New Person</Link></li>
                    </ul>
                </li>

            </ul>
        </nav>
    )
}

export default NavBar