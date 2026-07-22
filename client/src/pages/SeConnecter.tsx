import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user.context";
import { API_URL } from "../utils/api";
import "./SeConnecter.css";
import { Link } from "react-router";

function SeConnecter() {
  const navigate = useNavigate();
  const mail = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const context = useContext(UserContext);

  const loginBtn = async () => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: mail.current?.value,
          password: password.current?.value,
        }),
      };
      const response = await fetch(
        `${API_URL}/api/users/login`,
        fetchOptions,
      );
      if (!response.ok) {
        toast.warning("Identifiants incorrects.");
      } else {
        const { userWithoutPassword, token } = await response.json();
        toast.success("Vous êtes bien connectés.");
        const user = userWithoutPassword;
        user.token = token;
        context?.setUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div className="connexion-page">
      <article className="login">
        <h1 className="titrePopUp">Se Connecter</h1>
        <div className="loginInput">
          <label className="labelRegister" htmlFor="mail">
            E-mail :
          </label>
          <input
            ref={mail}
            type="email"
            id="mail"
            name="user_mail"
            className="inputReg"
          />
          <label className="labelRegister" htmlFor="password">
            Mot de passe
          </label>
          <input
            ref={password}
            type="password"
            id="password"
            name="password"
            className="inputReg"
          />

          <button className="BtnReg" onClick={loginBtn} type="button">
            Se connecter
          </button>
          <p className="labelRegister" style={{ textAlign: "center", marginTop: "12px" }}>
            Pas encore de compte ?{" "}
            <Link to="/register" style={{ color: "var(--white-color)" }}>
              Créer un compte
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}

export default SeConnecter;
