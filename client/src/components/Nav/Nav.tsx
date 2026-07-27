import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useUser } from "../../contexts/user.context";

function Nav() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="nav">
        <Link to="/" className="logo">
          <h1>L'Écrin</h1>
          <h2>GALERIE D'ART</h2>
        </Link>
        <div className="navigation">
          <Link to="/map" className="navMapBtn">Carte</Link>
          <Link to="/Artist" className="navHideMobile">Artistes</Link>
          <Link to="/Mouvements" className="navHideMobile">Mouvements</Link>
          {user ? (
            <>
              <Link to="/Profil" className="navHideMobile">Profil</Link>
              <button type="button" className="menuBtn" onClick={() => setIsOpen(true)}>
                <span /><span /><span />
              </button>
            </>
          ) : (
            <Link to="/login" className="navHideMobile">Se connecter</Link>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <button type="button" className="sidebarClose" onClick={() => setIsOpen(false)}>✕</button>
        <Link to="/Artist" className="sidebarMobileOnly" onClick={() => setIsOpen(false)}>Artistes</Link>
        <Link to="/Mouvements" className="sidebarMobileOnly" onClick={() => setIsOpen(false)}>Mouvements</Link>
        {user ? (
          <Link to="/Profil" className="sidebarMobileOnly" onClick={() => setIsOpen(false)}>Profil</Link>
        ) : (
          <Link to="/login" className="sidebarMobileOnly" onClick={() => setIsOpen(false)}>Se connecter</Link>
        )}
        {user?.role === "admin" && (
          <Link to="/admin" onClick={() => setIsOpen(false)}>Back Office</Link>
        )}
        <Link to="/settings" onClick={() => setIsOpen(false)}>Paramètres</Link>
        <button type="button" className="logoutBtn" onClick={logout}>Déconnexion</button>
      </div>
    </>
  );
}

export default Nav;