import { useState, useEffect } from "react";
import type { Artwork } from "../../types/vite-env";
import BisArtworkCard from "./bisArtworkCard";

function ListArtistBisArtworkCard({ artworks }: { artworks: Artwork[] }) {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    function update() {
      if (window.innerWidth <= 768) setCols(1);
      else if (window.innerWidth <= 1280) setCols(2);
      else setCols(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns: Artwork[][] = Array.from({ length: cols }, () => []);
  artworks.forEach((artwork, index) => {
    columns[index % cols].push(artwork);
  });

  return (
    <div className="divListBisArt">
      {columns.map((col, i) => (
        <div key={i} className="colBisArt">
          {col.map((artwork) => (
            <BisArtworkCard key={artwork.id} artwork={artwork} artist={artwork.artistName} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ListArtistBisArtworkCard;
