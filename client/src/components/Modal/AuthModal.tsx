import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

interface AuthModalProps {
    onClose: () => void;
}

function AuthModal({ onClose }: AuthModalProps) {
    const navigate = useNavigate();

    return (

        <div
            className="auth-modal-overlay"
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
        >
            <div
                className="auth-modal-card"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="presentation"
            >
                <h2>Tu dois être connecté</h2>
                <p>Connecte-toi ou crée un compte pour continuer.</p>
                <div className="auth-modal-buttons">
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/login");
                            onClose();
                        }}
                    >
                        Se connecter
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/register");
                            onClose();
                        }}
                    >
                        Créer un compte
                    </button>
                </div>
                <button type="button" className="auth-modal-close" onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>
    );
}

export default AuthModal;