import { useAuth } from "../contexts/autoContext";
import { useDarkMode } from "../contexts/darkModeContext";
import Logo from "./logo";
import { Link, useLocation } from "react-router-dom";

function Footer() {
    const { user } = useAuth();
    const location = useLocation();
    const { darkMode } = useDarkMode(); 


return (
    <footer className="border-top py-2">
        <div className="container">
            <div className="row mb-2">
                <div className="col text-center">
                    <Link to="/about" className={`me-3 ${location.pathname === '/about' ? (darkMode ? 'text-light' : 'text-dark') : (darkMode ? 'text-secondary' : "text-muted")} text-decoration-none`}>ABOUT</Link>
                    {user && <Link to="/favCards" className={`me-3 ${location.pathname=== '/favCards' ? (darkMode ? 'text-light' : 'text-dark') : (darkMode ? 'text-secondary' : "text-muted")} text-decoration-none`}>FAV CARDS</Link>}
                    {user?.isBusiness && <Link to="/myCards" className={`me-3 ${location.pathname=== '/myCards' ? (darkMode ? 'text-light' : 'text-dark') : (darkMode ? 'text-secondary' : "text-muted")} text-decoration-none`}>MY CARDS</Link>}
                </div>
            </div>
            <div className="row">
                    <div className="col text-start d-flex align-item-center">
                        <span className="">&copy;</span>
                        <span className="mx-2">agam rahmani</span>
                    </div>
                    <div className="col text-center">
                        <Logo />
                    </div>
                    <div className="col text-end">
                        <span>{new Date().getFullYear()}</span>
                    </div>
            </div>
        </div>
    </footer>
);


}

export default Footer;




