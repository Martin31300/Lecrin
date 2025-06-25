import Searchbar from "../components/Searchbar";
import "./Artist.css";
import ArtistCards from "../components/ArtistList";

function Artist() {
  return (
    <>
      <article>
        <Searchbar />
      </article>
      <article>
        <ArtistCards />
      </article>
    </>
  );
}

export default Artist;
