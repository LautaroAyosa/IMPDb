import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector( state => state.notification)
    
    if (notification) {
        if (notification.type === 'error') {
            return ( <header className='error'>{notification.message}</header> )
        } else {
            return ( <header className='success'>{notification.message}</header> )
        }
    }
}

export default Notification