import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/auth.hook";

const Navbar = () => {
    const auth = useAuth()
    const navigate = useNavigate();

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate("/auth");
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-2" style={{padding: '0 2rem'}}>
                <a href="/" className="brand-logo">Link App</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a className="waves-effect blue btn" onClick={logoutHandler}>Exit</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;