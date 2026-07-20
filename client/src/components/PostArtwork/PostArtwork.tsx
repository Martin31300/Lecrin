import { useState } from "react";
import { toast } from "react-toastify";
import { useArtwork } from "../../contexts/artwork.context";
import { useUser } from "../../contexts/user.context";
import { API_URL } from "../../utils/api";
import AuthModal from "../Modal/AuthModal";
import "../../pages/Register.css";

export function PostArtwork() {
    const { user } = useUser();
    const { artwork, setArtwork } = useArtwork();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [date_artwork, setDate_artwork] = useState("");
    const [photo, setPhoto] = useState("");
    const [musee, setMusee] = useState("");
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [description, setDescription] = useState("");
    const [artist_name, setArtist_name] = useState("");

    const postArtwork = async () => {
        try {
            const response = await fetch(`${API_URL}/api/artworks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    user_id: user?.id,
                    name,
                    artist_name,
                    date_artwork,
                    photo,
                    musee,
                    ville,
                    pays,
                    dimensions,
                    description,
                }),
            });

            if (!response.ok) throw new Error("Erreur lors du POST");

            const newArtwork = await response.json();
            setArtwork([newArtwork, ...artwork]);
            toast.success("Artwork posté");
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>
            {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
            <button
                onClick={() => {
                    if (user) setIsOpen(true);
                    else setAuthModalOpen(true);
                }}
                type="button"
                className="addBtn"
            >
                Ajouter une œuvre
            </button>

            {isOpen && (
                <div
                    className="auth-modal-overlay"
                    onClick={() => setIsOpen(false)}
                    onKeyDown={() => setIsOpen(false)}
                    role="presentation"
                >
                    <div
                        className="auth-modal-card large"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        role="presentation"
                    >
                        <button type="button" className="auth-modal-close" onClick={() => setIsOpen(false)}>✕</button>
                        <h2>Ajouter une œuvre</h2>

                        <div className="divTruc">
                            <p className="labelRegister">Nom de l'œuvre</p>
                            <input className="inputReg" placeholder="Ici le nom..." value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Artiste</p>
                            <input className="inputReg" placeholder="Nom de l'artiste..." value={artist_name} onChange={(e) => setArtist_name(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Date (ex: 1889)</p>
                            <input className="inputReg" placeholder="Ici la date..." value={date_artwork} onChange={(e) => setDate_artwork(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">URL de la photo</p>
                            <input className="inputReg" placeholder="Ici l'URL..." value={photo} onChange={(e) => setPhoto(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Musée</p>
                            <input className="inputReg" placeholder="Ici le musée..." value={musee} onChange={(e) => setMusee(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Ville</p>
                            <input className="inputReg" placeholder="Ici la ville..." value={ville} onChange={(e) => setVille(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Pays</p>
                            <input className="inputReg" placeholder="Ici le pays..." value={pays} onChange={(e) => setPays(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Dimensions</p>
                            <input className="inputReg" placeholder="ex: 221 x 332 cm" value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Description</p>
                            <textarea className="inputReg" placeholder="Ici la description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <button type="button" className="BtnReg" onClick={postArtwork}>Poster</button>
                    </div>
                </div>
            )}
        </>
    );
}