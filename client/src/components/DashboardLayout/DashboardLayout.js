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
                        <h4 className="sidebar-subtitle">Movies</h4>
                        <li><NavLink to="/dashboard/new-movie" >New Movie</NavLink></li>
                        <h4 className="sidebar-subtitle">People</h4>
                        <li><NavLink to="/dashboard/new-person" >New Person</NavLink></li>
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