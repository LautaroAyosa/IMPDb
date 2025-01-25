import {useState} from 'react'
import LoginButton from "./LoginButton/LoginButton"

const LoginForm = (props) => {
    const [user, setUser] = useState({ email: "", password: ""});
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <form className='form'>
            <div className='form-item'>
                <label>Email Address</label>
                <input className='full' placeholder='name@domain.com' onChange={handleInputChange} value={user.email} name='email' />
            </div>
            <div className='form-item'>
                <label>Password</label>
                <input className='full' placeholder='Password' type='password' onChange={handleInputChange} value={user.password} name='password' />
            </div>
            <LoginButton user={user} setUser={setUser} setMessage={props.setMessage} />
        </form>
    )
}

export default LoginForm