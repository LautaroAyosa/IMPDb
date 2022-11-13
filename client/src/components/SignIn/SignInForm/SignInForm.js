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
    <form>
      <input className='full' placeholder='Email' onChange={handleInputChange} value={user.email} name='email' />
      <input className='col1-2' placeholder='Username' onChange={handleInputChange} value={user.username} name='username' />
      <input className='col1-2' placeholder='Full Name' onChange={handleInputChange} value={user.name} name='name' />
      <input className='full' placeholder='Password' type='password' onChange={handleInputChange} value={user.password} name='password' />
      <input className='full' placeholder='Confirm Password' type='password' onChange={handleInputChange} value={user.confirmPassword} name='confirmPassword' />
      <SignInButton user={user} setUser={setUser} />
    </form>
  )
}

export default SignInForm
