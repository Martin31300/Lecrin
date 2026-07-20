import ArtworkList from "../components/Artwork/artworkList";
import "./Home.css";
import { useState } from "react";
import AuthModal from "../components/Modal/AuthModal";
import { PostArtwork } from "../components/PostArtwork/PostArtwork";

function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      <main>
        <section className="hautHome">
          <article className="divH1-btn">
            <h1 className="titreHome">Fil d'actualité</h1>
            <PostArtwork />
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
