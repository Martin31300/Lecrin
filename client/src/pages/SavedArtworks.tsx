import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";
import { useUser } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";
import ListArtistBisArtworkCard from "../components/Artwork/ListBisArtwork";
import type { Artwork } from "../types/vite-env";
import "./Profile.css";

function SavedArtworks() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;
        fetch(`${API_URL}/api/users/${user.id}/saved`)
            .then((res) => res.json())
            .then((data) => { setArtworks(data); setLoading(false); });
    }, [user?.id]);

    if (loading) return <p className="msgErr">Chargement...</p>;

    return (
        <main>
            <header className="headerProfil">
                <button type="button" onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "var(--white-color)", fontFamily: "var(--text-font)", fontSize: "16px", cursor: "pointer", width: "80px" }}>Retour</button>
            <h1 className="nomProfil">Tous les enregistrements</h1>
            <div style={{ width: "80px" }} />
            </header>
            <section>
                {artworks.length === 0 ? (
                    <p className="greyProfil">Aucune œuvre enregistrée.</p>
                ) : (
                    <ListArtistBisArtworkCard artworks={artworks} />
                )}
            </section>
        </main>
    );
}

export default SavedArtworks;
