import "./Profile.css";
import { useEffect, useState, useRef } from "react";
import pictoProfil from "../assets/images/pictos/picto-profil.svg";
import { useUser } from "../contexts/user.context";
import { API_URL } from "../utils/api";
import type { Artwork } from "../types/vite-env";
import ListArtistBisArtworkCard from "../components/Artwork/ListBisArtwork";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

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
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [createCollectionOpen, setCreateCollectionOpen] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const createCollection = async () => {
    if (!user) return;
    const response = await fetch(`${API_URL}/api/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        photo: photoRef.current?.value,
        user_id: user.id,
      }),
    });
    if (response.ok) {
      const newCol = await response.json();
      setCollections((prev) => [...prev, { id: newCol.insertId, name: nameRef.current?.value ?? "", cover_photo: photoRef.current?.value ?? "" }]);
      setCreateCollectionOpen(false);
      toast.success("Collection créée !");
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/api/users/${user.id}/artworks`)
      .then((res) => res.json())
      .then((data) => setArtworks(data));
    fetch(`${API_URL}/api/users/${user.id}/follow/counts`)
      .then((res) => res.json())
      .then((data) => {
        setFollowerCount(data.followers);
        setFollowingCount(data.following);
      });
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
    <>
      {createCollectionOpen && (
        <div className="overlay" onClick={() => setCreateCollectionOpen(false)}>
          <div className="createCollectionModal" onClick={(e) => e.stopPropagation()}>
            <h2 className="titrePopUp">Créer une collection</h2>
            <input ref={nameRef} placeholder="Nom..." className="inputReg" type="text" />
            <input ref={photoRef} placeholder="Photo (URL)..." className="inputReg" type="text" />
            <button type="button" className="BtnReg" onClick={createCollection}>Créer</button>
          </div>
        </div>
      )}
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
              <p>{followerCount}</p>
              <p className="greyProfil">abonnés</p>
            </div>
            <div>
              <p>{followingCount}</p>
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
            <div className="collectionsGrid">
              <div className="collectionItem" onClick={() => setCreateCollectionOpen(true)}>
                <div className="collectionCover collectionCreate">
                  <span>+</span>
                </div>
                <p className="collectionName">Créer une collection</p>
              </div>
              <div className="collectionItem">
                <div className="collectionCover">
                  <img src={artworks[0]?.photo} alt="" />
                </div>
                <p className="collectionName">Tous les enregistrements</p>
              </div>
              {collections.map((col) => (
                <div key={col.id} className="collectionItem" onClick={() => navigate(`/collection/${col.id}`)}>
                  <div className="collectionCover">
                    <img src={col.cover_photo} alt={col.name} />
                  </div>
                  <p className="collectionName">{col.name}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "favoris" && (
            <ListArtistBisArtworkCard artworks={likes} />
          )}
        </section>
      </main>
    </>
  );
}

export default Profil;