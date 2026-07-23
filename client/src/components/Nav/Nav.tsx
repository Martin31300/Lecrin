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
          <Link to="/Artist">Artistes</Link>
          <Link to="/Mouvements">Mouvements</Link>
          {user ? (
            <>
              <Link to="/Profil">Profil</Link>
              <button type="button" className="menuBtn" onClick={() => setIsOpen(true)}>
                <span /><span /><span />
              </button>
            </>
          ) : (
            <Link to="/login">Se connecter</Link>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <button type="button" className="sidebarClose" onClick={() => setIsOpen(false)}>✕</button>
        <Link to="/settings" onClick={() => setIsOpen(false)}>Paramètres</Link>
        <button type="button" className="logoutBtn" onClick={logout}>Déconnexion</button>
      </div>
    </>
  );
}

export default Nav;