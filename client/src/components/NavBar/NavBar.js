import React from "react"
import { NavLink } from "react-router-dom";

const NavBar = () => {


    return (
        <nav>
            <div>Logo</div>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
            </ul>
        </nav>
    )
}

export default NavBar