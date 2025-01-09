import { NavLink, Outlet, Navigate } from "react-router-dom";
import loginService from "../../services/login";
import Sidebar from "../../components/Sidebar/Sidebar";

const DashboardLayout = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))


    if ( user !== null ) {
        return (
            <div className='base-container dashboard'>
                <div className="full-width-container">
                    <div className="dashboard__header"> 
                        <div className="dashboard__header-info">
                            <h1>Welcome to your Dashboard!</h1>
                            <p>You can manage the Movies and people you've created, as well as your profile and much more from here.</p>
                            <p>Currently signed in as <span className="highlight-text cap">{user.name}</span>, click <a className="highlight-link" onClick={async() => await loginService.logout()}>here to log out</a>.</p>
                        </div>
                        <div className="dashboard__header-nav">
                            <ul>
                                <NavLink className="nav-link" to="/dashboard/new-movie" ><li>Movies</li></NavLink>
                                <NavLink className="nav-link" to="/dashboard/new-person" ><li>People</li></NavLink>
                                <NavLink className="nav-link" to="/dashboard/my-account" ><li>My Account</li></NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="dashboard__content">
                    <div className="dashboard__content-side">
                        <h4>Manage</h4>
                        <div>

                        </div>
                    </div>
                    <div className="dashboard__content-main">
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }

    return <Navigate to="/login" />
}

export default DashboardLayout