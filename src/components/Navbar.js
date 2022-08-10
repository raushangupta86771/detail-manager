import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {

    let history = useHistory();
    const  handleLogout=()=>{
        localStorage.removeItem('token');
        history.push('/login');
    }
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]); //location is using to highlight navbar active component

    return <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Detail Manager</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname}==="/"? "active" : ""`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname}==="/about"? "active" : ""`} to="/about">About</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link disabled">Disabled</Link>
                        </li> */}
                    </ul>

                    {! localStorage.getItem('token') ? <form className="d-flex">
                    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                    </form> : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}

                    {/* iska matlab agar user logged in nahi hai to uswe dono button dikhaao warna logout waala button dikhaao bas */}
                </div>
            </div>
        </nav>
    </div>;
};

export default Navbar;
