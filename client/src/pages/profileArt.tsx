import { useParams } from "react-router-dom";
import "./profileArt.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/api";
import PictoComment from "../assets/images/pictos/picto-comment.svg";
import PictoSave from "../assets/images/pictos/picto-save.svg";
import type { Artwork, Movement } from "../types/vite-env";
import { useUser } from "../contexts/user.context";
import CommentList from "../components/Comment/CommentList";
import PopUpCollection from "../components/Collection/PopUpCollection";
import AuthModal from "../components/Modal/AuthModal";
import { useLike } from "../hooks/useLike";
import { Heart } from "lucide-react";
import ListArtistBisArtworkCard from "../components/Artwork/ListBisArtwork";

function ProfileArt() {
  const { id } = useParams();

  const [artwork, setArtwork] = useState<Artwork>();
  const [loading, setLoading] = useState(true);
  const [comIsOpen, setComIsOpen] = useState(false);
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const { user } = useUser();
  const { likeCount, isLiked, toggleLike } = useLike(Number(id));

  useEffect(() => {
    fetch(`${API_URL}/api/artworks/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setArtwork(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/api/artworks/${id}/comments`)
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setCommentCount(data.length); });
  }, [id]);

  useEffect(() => {
    if (!artwork?.movements?.length) return;
    const mvtId = artwork.movements[0].id;
    fetch(`${API_URL}/api/movements/${mvtId}`)
      .then((res) => res.json())
      .then((data) => {
        const others = (data.artworks ?? []).filter((a: Artwork) => a.id !== artwork.id);
        setRelatedArtworks(others);
      });
  }, [artwork]);

  if (loading) return <p className="msgErr">Le tableau arrive !</p>;
  if (!artwork || !artwork.userName) {
    // Protection pour éviter erreur si artwork ou user_id manquant
    return (
      <div className="msgErr">Artwork invalide ou données manquantes.</div>
    );
  }

  return (
    <main className="sectionCard">
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      <CommentList
        artworkId={Number(id)}
        artworkImage={artwork.photo}
        onClose={() => {
          setComIsOpen(false);
          fetch(`${API_URL}/api/artworks/${id}/comments`)
            .then((res) => res.json())
            .then((data) => { if (Array.isArray(data)) setCommentCount(data.length); });
        }}
        comIsOpen={comIsOpen}
      />
      <PopUpCollection
        artworkId={Number(id)}
        artworkImage={artwork.photo}
        artworkName={artwork.artworkName}
        onClose={() => setPopUpIsOpen(false)}
        popUpIsOpen={popUpIsOpen}
      />
      <Link className="LinkToArtistProf" to={`/profiluser/${artwork.userId}`}>
        <div className="divUser">
          <div className="divImgUser">
            <img
              className="imgUser"
              src={artwork.userPhoto}
              alt={`Avatar de l'utilisateur ${artwork.userName}`}
            />
          </div>
          <p className="textPetit">
            <span className="spanUser">{artwork.userName}</span> a publié
          </p>
        </div>
      </Link>

      <section className="divCard">
        <div className="divImg">
          <img className="imgArt" src={artwork.photo} alt={artwork.name} />

          <div className="divInfoCard">
            <p className="datePost">
              {new Date(artwork.date_post).toLocaleDateString()}
            </p>

            <div className="divLike">
              <button type="button" className="btnLike" onClick={() => { if (!user?.id) setAuthModalOpen(true); else toggleLike(); }}>
                <Heart size={20} fill={isLiked ? "white" : "none"} stroke="white" />
              </button>
              <p className="textPicto">{likeCount}</p>
            </div>

            <div className="divLike">
              <button type="button" className="btnLike" onClick={() => setComIsOpen(true)}>
                <img src={PictoComment} alt="" />
              </button>
              <p className="textPicto">{commentCount}</p>
            </div>
          </div>
        </div>

        <article className="infoCard">
          <div className="firstDivCard">
            <h1 className="titreArtwork">{artwork.artworkName}</h1>
            <h2 className="titreArtist">
              <Link className="LinkToArtistProf" to={`/artist/${artwork.artist_id}`}>
                {artwork.artistName}
              </Link>{" "}-{" "}
              {new Date(artwork.date_artwork).getFullYear()}
            </h2>
            {artwork.musee && artwork.ville && artwork.pays ? (
              <p className="infoArtwork">
                {artwork.musee} - {artwork.ville}, {artwork.pays}
              </p>
            ) : null}
            <p className="infoArtwork">{artwork.dimensions}</p>
            <div className="divMvt">
              {artwork.movements.map((movement: Movement) => (
                <Link key={movement.id} to={`/Mouvements/${movement.id}`}>
                  <p key={movement.id} className="mvtArtwork">
                    {movement.name}
                  </p>
                </Link>
              ))}
            </div>

            <button className="saveArtwork" type="button" onClick={() => { if (!user?.id) setAuthModalOpen(true); else setPopUpIsOpen(true); }}>
              <img className="pictoSave" src={PictoSave} alt="" />
              <p className="infoArtwork">enregistrer</p>
            </button>
          </div>

          <div className="divDescArtwork">
            <p className="descArtwork">{artwork.description}</p>
            <p className="textPlus">EN VOIR PLUS</p>
          </div>
        </article>
      </section>

      {relatedArtworks.length > 0 && (
        <section className="ProfilArtistCardList">
          <h1 className="oeuvresAssociées">Oeuvres Associées</h1>
          <ListArtistBisArtworkCard artworks={relatedArtworks} />
        </section>
      )}
    </main>
  );
}

export default ProfileArt;
