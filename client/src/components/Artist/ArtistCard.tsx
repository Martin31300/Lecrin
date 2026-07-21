import { Link } from "react-router-dom";
import type { Artist, Movement } from "../../types/vite-env";
import "./ArtistCard.css";

type ArtistCardProps = {
  artist: Artist;
};

function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <>
      <Link className="LinkToArtistProf" to={`/artist/${artist.id}`}>
        <article className="artistCard">
          <div className="imagecard">
            <img className="portrait" src={artist.photo} alt={artist.name} />
          </div>

          <div className="infoArtist">
            <h2 className="nameArtistCard">
              {artist.artistName}
              <span className="dateArtistCard">
                {" "}
                {artist.birthday?.split("-")[0]} -{" "}
                {artist.death_date?.split("-")[0]}
              </span>
            </h2>

            <div className="divMvt">
              {(artist.movements ?? []).filter((movement: Movement) => movement.id !== null).map((movement: Movement) => (
                <Link key={movement.id} to={`/Mouvements/${movement.id}`}>
                  <p className="mvtArtwork">{movement.name}</p>
                </Link>
              ))}
            </div>

            <p className="nbreOeuvre">{artist.artworkCount} oeuvres</p>
          </div>
        </article>
      </Link>
    </>
  );
}

export default ArtistCard;
