import ArtworkList from "../components/Artwork/artworkList";
import "./Home.css";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <section className="hautHome">
          <article className="divH1-btn">
            <h1 className="titreHome">À l'honneur (fil d'actualité)</h1>
            <button
              onClick={() => {
                navigate("/postArtwork");
              }}
              type="button"
              className="addBtn"
            >
              Ajouter une oeuvre
            </button>
          </article>
        </section>

        <section className="sectionCardHome">
          <ArtworkList />
        </section>
      </main>
    </>
  );
}

export default Home;
