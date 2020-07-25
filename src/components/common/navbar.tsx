import React from 'react';
import {Link, NavLink} from "react-router-dom";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <Link to="/" className="navbar-brand">App Redux - TypeScript</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav mr-auto">
                    <NavLink to="/movies" className="nav-item nav-link">Movies</NavLink>
                    <NavLink to="/movies/new" className="nav-item nav-link">New Movie</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;