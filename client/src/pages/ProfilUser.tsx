import { useParams } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/user.context";
import { API_URL } from "../utils/api";
import ListArtistBisArtworkCard from "../components/Artwork/ListBisArtwork";
import type { Artwork } from "../types/vite-env";

type ProfileUser = {
  id: number;
  name: string;
  photo: string;
  role: string;
};

function ProfilUser() {
  const { id } = useParams();
  const { user: currentUser } = useUser();
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setProfileUser(data));

    fetch(`${API_URL}/api/users/${id}/artworks`)
      .then((res) => res.json())
      .then((data) => setArtworks(data));

    fetch(`${API_URL}/api/users/${id}/follow/counts`)
      .then((res) => res.json())
      .then((data) => setFollowerCount(Number(data.followers)));
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      fetch(`${API_URL}/api/users/${id}/follow?follower_id=${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => setIsFollowing(data.isFollowing));
    }
  }, [id, currentUser]);

  const toggleFollow = async () => {
    if (!currentUser) return;
    if (isFollowing) {
      await fetch(`${API_URL}/api/users/${id}/follow`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ follower_id: currentUser.id }),
      });
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      await fetch(`${API_URL}/api/users/${id}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ follower_id: currentUser.id }),
      });
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  if (!profileUser) return <p className="msgErr">Chargement...</p>;

  return (
    <main>
      <header className="headerProfil">
        <article className="firstDivProf">
          <div className="divImgProfil">
            <img className="imgProfil" src={profileUser.photo} alt="" />
          </div>
          <div>
            <div className="divNomBadge">
              <h1 className="nomProfil">{profileUser.name}</h1>
              {profileUser.role === "admin" ? <p className="badge">Administrateur</p> : null}
            </div>
            <button type="button" className="editBtn" onClick={toggleFollow}>
              {isFollowing ? "Se désabonner" : "S'abonner"}
            </button>
          </div>
        </article>

        <article className="divAbonne">
          <div>
            <p>{followerCount}</p>
            <p className="greyProfil">abonnés</p>
          </div>
        </article>
      </header>

      <section className="sectionProfil">
        <nav className="navProfil">
          <button type="button" className="btnNavProf active">
            Publications
          </button>
        </nav>
        <ListArtistBisArtworkCard artworks={artworks} />
      </section>
    </main>
  );
}

export default ProfilUser;
