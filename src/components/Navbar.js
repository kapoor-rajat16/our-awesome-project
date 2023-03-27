import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {

    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    let navigate = useNavigate();

    let handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src="../images/icon2.png" alt="" className='mx-2' style={{ width: '40px' }} />
                <Link className="navbar-brand" to="/">Coders Assemble</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {localStorage.getItem('token') ? <div>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/ask" ? "active" : ""}`} to="/ask">Ask</Link>
                            </li>
                        </div> : <div></div>}
                        {localStorage.getItem('token') ? <div>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/user" ? "active" : ""}`} to="/user">Users</Link>
                            </li>
                        </div> : <div></div>}
                    </ul>
                    <div className='mx-2'>
                        {!localStorage.getItem('token') ? <div> <Link className='btn btn-primary mx-2' to='/login' type='button'>Login</Link>
                            <Link className='btn btn-primary' to='/signup' type='button'>Signup</Link></div> :
                            <div>
                                <Link className="btn btn-primary mx-2" type='button' to="/profile">Profile</Link>
                                <button onClick={handleLogout} className="btn btn-outline-primary">Logout</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}
