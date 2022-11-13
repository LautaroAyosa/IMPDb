import React, { useState } from 'react'
import SignInButton from './SignInButton/SignInButton'

const SignInForm = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  return (
    <form>
      <input placeholder='Email' onChange={handleInputChange} value={user.email} name='email' />
      <input placeholder='Username' onChange={handleInputChange} value={user.username} name='username' />
      <input placeholder='Password' type='password' onChange={handleInputChange} value={user.password} name='password' />
      <SignInButton user={user} setUser={setUser} />
    </form>
  )
}

export default SignInForm
