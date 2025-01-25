import React, { useState } from 'react'
import SignInButton from './SignInButton/SignInButton'

const SignInForm = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  return (
    <form className='form' id='sign-in-form'>
      <div className='form-item'>
        <label>Email Address</label>
        <input className='full' placeholder='name@domain.com' onChange={handleInputChange} value={user.email} name='email' />
      </div>
      <div className='form-item'>
        <label>Username</label>
        <input className='' placeholder='Choose a username' onChange={handleInputChange} value={user.username} name='username' />
      </div>
      <div className='form-item'>
        <label>Full Name</label>
        <input className='' placeholder='John Doe' onChange={handleInputChange} value={user.name} name='name' />
      </div>
      <div className='form-wrap form-row'>
        <div className='form-item'>
          <label>Password</label>
          <input className='col1-2' placeholder='Choose a Password' type='password' onChange={handleInputChange} value={user.password} name='password' />
        </div>
        <div className='form-item'>
          <label>Confirm Password</label>
          <input className='' placeholder='Repeat your Password' type='password' onChange={handleInputChange} value={user.confirmPassword} name='confirmPassword' />
        </div>
      </div>
      <SignInButton user={user} setUser={setUser} />
    </form>
  )
}

export default SignInForm
