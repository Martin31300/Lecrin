// artworkCard.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PictoComment from "../../assets/images/pictos/picto-comment.svg";
import PictoLike from "../../assets/images/pictos/picto-like.svg";
import PictoSave from "../../assets/images/pictos/picto-save.svg";
import { useUser } from "../../contexts/user.context";
import type { Artwork, Movement } from "../../types/vite-env";
import { API_URL } from "../../utils/api";
import PopUpCollection from "../Collection/PopUpCollection";
import CommentList from "../Comment/CommentList";
import "./artworkCard.css";
import AuthModal from "../Modal/AuthModal";
import { useLike } from "../../hooks/useLike";
import { Heart } from "lucide-react";


type ArtworkCardProps = {
  artwork: Artwork;
};

function ArtworkCard({ artwork }: ArtworkCardProps) {

  const [comIsOpen, setComIsOpen] = useState(false);
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useUser();
  const { likeCount, isLiked, toggleLike } = useLike(artwork.id)

  function openCom() {
    setComIsOpen(true);
  }

  function closeCom() {
    setComIsOpen(false);
  }

  function openPopUpSave() {
    setPopUpIsOpen(true);
  }

  function closePopUpSave() {
    setPopUpIsOpen(false);
  }

  return (
    <>
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      <CommentList
        artworkId={artwork.id}
        artworkImage={artwork.photo}
        onClose={closeCom}
        comIsOpen={comIsOpen}
      />
      <PopUpCollection
        artworkId={artwork.id}
        artworkImage={artwork.photo}
        onClose={closePopUpSave}
        popUpIsOpen={popUpIsOpen}
      />
      <main key={artwork.id} className="sectionCard">
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
                <button
                  type="button"
                  className="btnLike"
                  onClick={() => {
                    if (!user || !user.id) setAuthModalOpen(true);
                    else toggleLike();
                  }}
                >
                  <Heart size={20} fill={isLiked ? "white" : "none"} stroke="white" />
                </button>
                <p className="textPicto">{likeCount}</p>
              </div>
              <div className="divLike">
                <button
                  type="button"
                  onClick={openCom}
                  className="btnLike"
                  aria-label="Voir les commentaires"
                >
                  <img src={PictoComment} alt="" />
                </button>
              </div>
            </div>
          </div>
          <article className="infoCard">
            <div className="firstDivCard">
              <h1 className="titreArtwork">{artwork.artworkName}</h1>
              <h2 className="titreArtist">
                <Link
                  className="LinkToArtistProf"
                  to={`/artist/${artwork.artist_id}`}
                >
                  {artwork.artistName}
                </Link>{" "}
                - {new Date(artwork.date_artwork).getFullYear()}
              </h2>
              {artwork.musee && artwork.ville && artwork.pays ? (
                <p className="infoArtwork">
                  {artwork.musee} - {artwork.ville}, {artwork.pays}
                </p>
              ) : null}
              <p className="infoArtwork">{artwork.dimensions}</p>
              <div className="divMvt">
                {artwork.movements.filter((movement: Movement) => movement.id !== null).map((movement: Movement) => (
                  <Link key={movement.id} to={`/Mouvements/${movement.id}`}>
                    <p className="mvtArtwork">{movement.name}</p>
                  </Link>
                ))}
              </div>
              <button
                className="saveArtwork"
                onClick={() => {
                  if (!user || !user.id) {
                    setAuthModalOpen(true);
                  } else {
                    openPopUpSave();
                  }
                }}
                type="button"
              >
                <img className="pictoSave" src={PictoSave} alt="" />
                <p className="infoArtwork">enregistrer</p>
              </button>
            </div>
            <div className="divDescArtwork">
              <p className="descArtwork">{artwork.description}</p>
              <Link to={`/ProfilArtwork/${artwork.id}`} className="textPlus">
                EN VOIR PLUS
              </Link>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default ArtworkCard;
