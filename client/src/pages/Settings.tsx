import { useState } from "react";
import { useUser } from "../contexts/user.context";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

function Settings() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name ?? "");
    const [photo, setPhoto] = useState(user?.photo ?? "");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!user) return;

        const body: Record<string, string> = {};
        if (name !== user.name) body.name = name;
        if (photo !== user.photo) body.photo = photo;
        if (password) body.password = password;

        if (Object.keys(body).length === 0) {
            toast.info("Aucune modification détectée");
            return;
        }

        const res = await fetch(`${API_URL}/api/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            setUser({ ...user, name, photo });
            toast.success("Profil mis à jour !");
            navigate("/profil");
        } else {
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <main>
            <div className="auth-modal-card large" style={{ margin: "60px auto" }}>
                <h2>Éditer le profil</h2>

                <div className="divTruc">
                    <p className="labelRegister">Nom</p>
                    <input
                        className="inputReg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ton nom..."
                    />
                </div>

                <div className="divTruc">
                    <p className="labelRegister">URL de la photo</p>
                    <input
                        className="inputReg"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="URL de ta photo..."
                    />
                </div>

                <div className="divTruc">
                    <p className="labelRegister">Nouveau mot de passe</p>
                    <input
                        className="inputReg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Laisser vide pour ne pas changer..."
                    />
                </div>

                <button type="button" className="BtnReg" onClick={handleSubmit}>
                    Enregistrer
                </button>
            </div>
        </main>
    );
}

export default Settings;