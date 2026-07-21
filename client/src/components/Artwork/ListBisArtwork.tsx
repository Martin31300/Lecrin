import type { Artwork } from "../../types/vite-env";
import BisArtworkCard from "./bisArtworkCard";

function ListArtistBisArtworkCard({ artworks }: { artworks: Artwork[] }) {
  const col1: Artwork[] = [];
  const col2: Artwork[] = [];
  const col3: Artwork[] = [];

  artworks.forEach((artwork, index) => {
    if (index % 3 === 0) col1.push(artwork);
    else if (index % 3 === 1) col2.push(artwork);
    else col3.push(artwork);
  });

  return (
    <div className="divListBisArt">
      <div className="colBisArt">
        {col1.map((artwork) => (
          <BisArtworkCard key={artwork.id} artwork={artwork} artist={artwork.artistName} />
        ))}
      </div>
      <div className="colBisArt">
        {col2.map((artwork) => (
          <BisArtworkCard key={artwork.id} artwork={artwork} artist={artwork.artistName} />
        ))}
      </div>
      <div className="colBisArt">
        {col3.map((artwork) => (
          <BisArtworkCard key={artwork.id} artwork={artwork} artist={artwork.artistName} />
        ))}
      </div>
    </div>
  );
}

export default ListArtistBisArtworkCard;
