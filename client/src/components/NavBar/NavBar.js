import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink } from "react-router-dom";
import loginService from '../../services/login'

// Theme Context
import { ThemeContext } from "../../contexts/ThemeContexts"
import ToggleThemeButton from "./ToggleThemeButton/ToggleThemeButton";

const NavBar = () => {
    const [user, setUser] = useState(null)
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
        }
    }, [])


    return (
        <nav className={`navbar ${theme}`}>
            <NavLink to='/'><img className="logo" src='/images/New-imdb-logo.png' alt='imdb logo'/></NavLink>
            <ul className="">
                <NavLink to='/movies'><li>Movies</li></NavLink>
                <NavLink to='/people'><li>People</li></NavLink>
                {user ? 
                    <NavLink to='/dashboard'><li className="">Dashboard</li></NavLink>
                    : 
                    <>
                       <NavLink to='/login'><li>Login</li></NavLink>
                       <NavLink to='/signin'><li>Join The OMDb</li></NavLink>
                    </>
                }
                

            </ul>
        </nav>
    )
}

export default NavBar