import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { API_URL } from "../utils/api";
import "./SeConnecter.css";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const password = passwordRef.current?.value;
        const confirm = confirmRef.current?.value;

        if (!password || password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        if (password !== confirm) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setError("");
        const res = await fetch(`${API_URL}/api/auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        if (res.ok) {
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000);
        } else {
            const data = await res.json();
            setError(data.message || "Une erreur est survenue.");
        }
    };

    return (
        <div className="connexion-page">
            <article className="login">
                <h1 className="titrePopUp">Nouveau mot de passe</h1>
                {success ? (
                    <p className="labelRegister" style={{ textAlign: "center" }}>
                        Mot de passe mis à jour ! Redirection vers la connexion...
                    </p>
                ) : (
                    <div className="loginInput">
                        <label className="labelRegister" htmlFor="password">Nouveau mot de passe</label>
                        <input ref={passwordRef} type="password" id="password" className="inputReg" />
                        <label className="labelRegister" htmlFor="confirm">Confirmer le mot de passe</label>
                        <input ref={confirmRef} type="password" id="confirm" className="inputReg" />
                        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
                        <button className="BtnReg" type="button" onClick={handleSubmit}>
                            Mettre à jour
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
}

export default ResetPassword;