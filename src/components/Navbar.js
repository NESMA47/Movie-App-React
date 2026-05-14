import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from "react";
import { LangContext } from '../Context/LangContext';

function Navbar() {
    const favorite=useSelector(state => state.fav);
    const { lang, setLang } = useContext(LangContext);

    const toggleLanguage = () => {
        setLang(lang === "EN" ? "AR" : "EN");
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-danger" to="/">MOVIES </Link>
                    <button 
                    className="btn btn-outline-danger btn-sm mx-2 fw-bold" 
                     onClick={toggleLanguage}
                     style={{ borderRadius: '20px', border: '2px solid' }}>
                     <i className="bi bi-globe2 me-1"></i> 
                     {lang === "EN" ? "English" : "العربية"}
                    </button>
           
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Movies">Movies</Link>
                        </li>
                         <li className="nav-item">
                          <Link className="nav-link" to="/favorites">Favorites  <span className="badge bg-secondary">
                          <i className="bi bi-heart-fill text-danger"></i>
                          {favorite.length}</span></Link>
                        </li>
                        

                      
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                            <Link className="nav-link" to="/todo">TODO</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-info" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;