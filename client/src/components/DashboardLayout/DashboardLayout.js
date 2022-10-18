import { NavLink, Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const DashboardLayout = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if ( user !== null ) {
        return (
            <div className='baseContainer'>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px'}}>
                    <h1>Welcome to your Dashboard!</h1>
                    <p>You can manage your blogs, your profile and much more from here</p>
                </div>
                <div className="col-2Container">
                    <Sidebar title='Dashboard'>
                        <NavLink to="/dashboard/new-movie" >New Movie</NavLink>
                        <NavLink to="/dashboard/new-person" >Add New Person</NavLink>
                    </Sidebar>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        )
    }

    return <Navigate to="/login" />
}

export default DashboardLayout