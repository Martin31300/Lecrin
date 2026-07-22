import "./Profile.css";
import { useEffect, useState } from "react";
import pictoProfil from "../assets/images/pictos/picto-profil.svg";
import { useUser } from "../contexts/user.context";
import { API_URL } from "../utils/api";
import type { Artwork } from "../types/vite-env";
import ListArtistBisArtworkCard from "../components/Artwork/ListBisArtwork";
import { useNavigate } from "react-router-dom";

type Collection = {
  id: number;
  name: string;
  cover_photo: string;
};

function Profil() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"publications" | "collections" | "favoris">("publications");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [likes, setLikes] = useState<Artwork[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/api/users/${user.id}/artworks`)
      .then((res) => res.json())
      .then((data) => setArtworks(data));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    if (activeTab === "favoris") {
      fetch(`${API_URL}/api/users/${user.id}/likes`)
        .then((res) => res.json())
        .then((data) => setLikes(data));
    }
    if (activeTab === "collections" && collections.length === 0) {
      fetch(`${API_URL}/api/users/${user.id}/collections`)
        .then((res) => res.json())
        .then((data) => setCollections(data));
    }
  }, [activeTab, user?.id]);

  return (
    <main>
      <header className="headerProfil">
        <article className="firstDivProf">
          <div className="divImgProfil">
            <img className="imgProfil" src={user?.photo ?? pictoProfil} alt="" />
          </div>
          <div className="div">
            <div className="divNomBadge">
              <h1 className="nomProfil">{user?.name}</h1>
              {user?.role === 'admin' ? <p className="badge">Administrateur</p> : null}
            </div>
            <button type="button" className="editBtn" onClick={() => navigate("/settings")}>Éditer le Profil</button>
          </div>
        </article>

        <article className="divAbonne">
          <div>
            <p>{collections.length}</p>
            <p className="greyProfil">collections</p>
          </div>
          <div>
            <p>-</p>
            <p className="greyProfil">abonnés</p>
          </div>
          <div>
            <p>-</p>
            <p className="greyProfil">abonnements</p>
          </div>
        </article>
      </header>

      <section className="sectionProfil">
        <nav className="navProfil">
          <button
            type="button"
            className={`btnNavProf ${activeTab === "publications" ? "active" : ""}`}
            onClick={() => setActiveTab("publications")}
          >
            Publications
          </button>
          <button
            type="button"
            className={`btnNavProf ${activeTab === "collections" ? "active" : ""}`}
            onClick={() => setActiveTab("collections")}
          >
            Collections
          </button>
          <button
            type="button"
            className={`btnNavProf ${activeTab === "favoris" ? "active" : ""}`}
            onClick={() => setActiveTab("favoris")}
          >
            Favoris
          </button>
        </nav>

        {activeTab === "publications" && (
          <ListArtistBisArtworkCard artworks={artworks} />
        )}
        {activeTab === "collections" && (
          <div className="divCollections">
            {collections.map((col) => (
              <div key={col.id} className="collectionCard">
                <img src={col.cover_photo} alt={col.name} />
                <p>{col.name}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "favoris" && (
          <ListArtistBisArtworkCard artworks={likes} />
        )}
      </section>
    </main>
  );
}

export default Profil;