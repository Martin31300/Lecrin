import { useRef, useState } from "react";
import { API_URL } from "../utils/api";
import "./SeConnecter.css";

function ForgotPassword() {
    const mailRef = useRef<HTMLInputElement>(null);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        const mail = mailRef.current?.value.trim();
        if (!mail) { setError("Veuillez entrer votre adresse email."); return; }
        setError("");
        const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mail }),
        });
        if (res.ok) setSent(true);
        else setError("Une erreur est survenue, réessayez.");
    };

    return (
        <div className="connexion-page">
            <article className="login">
                <h1 className="titrePopUp">Mot de passe oublié</h1>
                {sent ? (
                    <p className="labelRegister" style={{ textAlign: "center" }}>
                        Si cet email existe, un lien de réinitialisation a été envoyé.
                    </p>
                ) : (
                    <div className="loginInput">
                        <label className="labelRegister" htmlFor="mail">Adresse email</label>
                        <input ref={mailRef} type="email" id="mail" className="inputReg" />
                        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
                        <button className="BtnReg" type="button" onClick={handleSubmit}>
                            Envoyer le lien
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
}

export default ForgotPassword;