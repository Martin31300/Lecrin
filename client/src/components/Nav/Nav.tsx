import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useUser } from "../../contexts/user.context";

function Nav() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
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
            <button type="button" onClick={logout} className="logoutBtn">
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;