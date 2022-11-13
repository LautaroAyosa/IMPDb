import React from "react"
import { Link, Navigate } from "react-router-dom"
import LoginForm from "./LoginForm/LoginForm"

const LogIn = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (user === null) {
        return (
        <div className="loginContainer">
            <aside>
                <h1>Log In</h1>
                <p>You don't have an account yet? <Link to='/signin'>Create an account</Link></p>
                <LoginForm />
            </aside>
        </div>
        )
    }

    return <Navigate to="/dashboard" />
}

export default LogIn