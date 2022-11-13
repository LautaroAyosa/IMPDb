import {useState} from 'react'
import LoginButton from "./LoginButton/LoginButton"

const LoginForm = (props) => {
    const [user, setUser] = useState({ email: "", password: ""});
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <form>
            <input placeholder='Email' onChange={handleInputChange} value={user.email} name='email' />
            <input placeholder='Password' type='password' onChange={handleInputChange} value={user.password} name='password' />
            <LoginButton user={user} setUser={setUser} setMessage={props.setMessage} />
        </form>
    )
}

export default LoginForm