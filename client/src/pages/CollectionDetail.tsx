import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/api";
import ListArtistBisArtworkCard from "../components/Artwork/ListBisArtwork";
import type { Artwork } from "../types/vite-env";
import "./Profile.css";

type CollectionInfo = {
    id: number;
    name: string;
    photo: string;
};

function CollectionDetail() {
    const { id } = useParams();
    const [collection, setCollection] = useState<CollectionInfo | null>(null);
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/api/collections/${id}`)
            .then((res) => res.json())
            .then((data) => setCollection(data));

        fetch(`${API_URL}/api/collections/${id}/artworks`)
            .then((res) => res.json())
            .then((data) => setArtworks(data));
    }, [id]);

    if (!collection) return <p className="msgErr">Chargement...</p>;

    return (
        <main>
            <header className="headerProfil">
                <h1 className="nomProfil">{collection.name}</h1>
            </header>
            <section>
                {artworks.length === 0 ? (
                    <p className="greyProfil">Aucune œuvre dans cette collection.</p>
                ) : (
                    <ListArtistBisArtworkCard artworks={artworks} />
                )}
            </section>
        </main>
    );
}

export default CollectionDetail;