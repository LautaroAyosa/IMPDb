import userService from '../../../../services/users'
// import loginService from '../../../services/login'
import {createNotification} from '../../../../redux/reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const SignInButton = (props) => {
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await userService.create({
                email: props.user.email,
                username: props.user.username,
                password: props.user.password,
            })
            // const user = await loginService.login({
            //     username: props.user.username,
            //     password: props.user.password
            // })
            // window.localStorage.setItem('loggedUser', JSON.stringify(user))
            window.location.reload()
            dispatch(createNotification(`Successfuly created a new user`, 'success'))
            props.setUser({email: '', username: '', name: '', lastName: '', password: ''})
        
        } catch (error) {
        dispatch(createNotification(error.response.data.error, 'error'))
        }
    }

    return (
        <button
            type="submit"
            className='primaryButton'
            onClick={handleSubmit}>
            Submit
        </button>
    )
}

export default SignInButton