import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { useState } from "react";
import SigninModal from '../pages/signinModal'; 
import SignupModal from '../pages/signupModal'; 
import { useAuth } from "../contexts/autoContext";
import { useSearch } from "../contexts/searchContext";
import { useDarkMode  } from "../contexts/darkModeContext";
import "../css/imageUser.css"


function NavBar() {
const { user, logout } = useAuth();
const { darkMode, toggleDarkMode } = useDarkMode();
const  navigate  = useNavigate();

const handleProfileClick = () => navigate('/profileUser');

const [isNavOpen, setIsNavOpen] = useState(false);
const [showSigninModal, setShowSigninModal] = useState(false);
const [showSignupModal, setShowSignupModal] = useState(false);

const context = useSearch();
const {searchQuery, setSearchQuery} = context;

const handleShowSignin = () => {
    setShowSigninModal(true);
    setIsNavOpen(false); 
};
const handleCloseSignin = () => setShowSigninModal(false);

const handleShowSignup = () => {
    setShowSignupModal(true);
    setIsNavOpen(false); 
};
const handleCloseSignup = () => setShowSignupModal(false);

const handleNavToggle = () => setIsNavOpen(!isNavOpen);


    return (
        <>
        <nav className={`navbar navbar-expand-sm shadow-sm ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
            aria-label="Fifth navbar example">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <Logo />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleNavToggle}
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarsExample05"
                    aria-controls="navbarsExample05"
                    aria-expanded={isNavOpen}
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarsExample05">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" onClick={() => setIsNavOpen(false)}>
                                HOME
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link" onClick={() => setIsNavOpen(false)}>
                                ABOUT
                            </NavLink>
                        </li>
                        {user &&
                            <li className="nav-item">
                            <NavLink to="/favCards" className="nav-link" onClick={() => setIsNavOpen(false)}>
                                FAV CARDS
                            </NavLink>
                        </li>}
                        {user?.isBusiness &&                            
                        <li className="nav-item">
                            <NavLink to="/myCards" className="nav-link" onClick={() => setIsNavOpen(false)}>
                                MY CARDS
                            </NavLink>
                        </li> } 
                        
                    </ul>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <form className="d-flex ms-auto">
                        <input
                        className="form-control me-2"
                        type= "Search"
                        placeholder= "Search"
                        aria-label = "Search"
                        value = {searchQuery}
                        onChange={(e)=> setSearchQuery(e.target.value)}
                        />
                    </form>
                    </li>
                    <li className="nav-item">
                        <NavLink  className="nav-link" onClick={toggleDarkMode}>
                            {darkMode ? 
                            <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}
                            </NavLink> 
                    </li>
                    {user ? (
                        <>
                        { <li className="nav-item">
                            <img 
                            src = {user.image.url}
                            alt = {user.image.alt}
                            className="profile-picture"
                            onClick={handleProfileClick}
                            />
                        </li> }
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" onClick={()=>{logout(),setIsNavOpen(false)}}>
                                LOGOUT
                            </NavLink>
                        </li>
                        </>
                    ):(
                        <>
                        <li className="nav-item">
                            <NavLink  className="nav-link" onClick={handleShowSignin}>
                                SIGN IN
                            </NavLink> 
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link" onClick={handleShowSignup}>
                                SIGN UP
                            </NavLink> 
                        </li>
                        </>
                    )}
                        
                    </ul>
                </div>
            </div>
        </nav>

    <SigninModal show={showSigninModal} handleClose={handleCloseSignin} />
    <SignupModal show={showSignupModal} handleClose={handleCloseSignup} />
    </>
    );
}

export default NavBar;