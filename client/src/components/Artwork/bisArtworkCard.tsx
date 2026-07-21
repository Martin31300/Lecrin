import "./bisArtworkCard.css";
import { useUser } from "../../contexts/user.context";
import { useLike } from "../../hooks/useLike";
import { useNavigate } from "react-router";
import type { Artwork } from "../../types/vite-env";
import AuthModal from "../Modal/AuthModal";
import { useState } from "react";
import { Heart } from "lucide-react";

function timeAgo(dateStr: string | number): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `Il y a ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `Il y a ${days}j`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Il y a ${months} mois`;
  return `Il y a ${Math.floor(months / 12)} an(s)`;
}

type ArtworkCardProps = {
  artwork: Artwork;
  artist: string;
};

function BisArtworkCard({ artwork, artist }: ArtworkCardProps) {
  const { user } = useUser();
  const { isLiked, toggleLike } = useLike(artwork.id);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      <main
        key={artwork.id}
        className="cardArt"
        onClick={() => navigate(`/ProfilArtwork/${artwork.id}`)}
        onKeyDown={() => navigate(`/ProfilArtwork/${artwork.id}`)}
        role="presentation"
      >
        <div className="divUserCard">
          <div className="divImgUserCard">
            <img
              className="imgUserCard"
              src={artwork.userPhoto}
              alt={`Avatar de l'utilisateur ${artwork.userName}`}
            />
          </div>
          <p className="textPetitCard">
            <span className="spanUserCard">{artwork.userName}</span> a publié{" "}
            <span className="heurePost">{timeAgo(artwork.date_post)}</span>
          </p>
        </div>
        <img
          className="imgCardBis"
          src={artwork.photo}
          alt={artwork.artworkName}
        />
        <article className="infoCardBis">
          <div>
            <p className="nameArtworkBis">{artwork.name}</p>
            <p className="nameArtistCard">
              {artist}
              <span className="dateArtCard"> • {artwork.date_artwork?.split("-")[0]}</span>
            </p>
          </div>
          <button
            type="button"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              if (!user || !user.id) setAuthModalOpen(true);
              else toggleLike();
            }}
          >
            <Heart size={20} fill={isLiked ? "white" : "none"} stroke="white" />
          </button>
        </article>
      </main>
    </>
  );
}

export default BisArtworkCard;
