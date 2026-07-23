import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import "./Collection.css";
import { useUser } from "../../contexts/user.context";
import { API_URL } from "../../utils/api";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

type PopUpCollectionProps = {
  artworkId: number;
  artworkImage: string;
  artworkName: string;
  onClose: () => void;
  popUpIsOpen: boolean;
};

type Collection = {
  id: number;
  name: string;
};

function PopUpCollection({ artworkId, artworkImage, artworkName, onClose, popUpIsOpen }: PopUpCollectionProps) {
  const [view, setView] = useState("menu");
  const handleBack = () => setView("menu");
  const { user } = useUser();
  const nameRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (user?.id && view === "add") {
      fetch(`${API_URL}/api/users/${user.id}/collections`)
        .then((res) => res.json())
        .then((data) => setCollections(data));
    }
  }, [view, user?.id]);

  const addToCollection = async (collection: Collection) => {
    if (!user) return;
    const response = await fetch(`${API_URL}/api/collections/${collection.id}/artworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ artwork_id: artworkId }),
    });
    if (response.ok) {
      toast.success(`"${artworkName}" ajouté à "${collection.name}"`);
      onClose();
    }
  };

  const createCollection = async () => {
    if (!user) return;
    const response = await fetch(`${API_URL}/api/collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        photo: photoRef.current?.value,
        user_id: user.id,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      await fetch(`${API_URL}/api/collections/${result.insertId}/artworks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ artwork_id: artworkId }),
      });
      toast.success(`Collection "${nameRef.current?.value}" créée avec l'œuvre !`);
      setView("menu");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={popUpIsOpen}
      onRequestClose={() => { setView("menu"); onClose(); }}
      contentLabel="Collections"
      className="react-modal-content-popup"
      overlayClassName="react-modal-overlay"
    >
      <img className="popup-image" src={artworkImage} alt="" />

      {view === "menu" && (
        <article className="divBtnPP">
          <button type="button" className="BtnPP" onClick={() => setView("add")}>Ajouter à une collection</button>
          <button type="button" className="BtnPP" onClick={() => setView("create")}>Créer une nouvelle collection</button>
          <button type="button" className="BtnPP" onClick={onClose}>Retour</button>
        </article>
      )}

      {view === "add" && (
        <article className="divBtnPP">
          <h2 className="titrePopUp">Ajouter à une collection</h2>
          {collections.length === 0 ? (
            <p>Aucune collection disponible.</p>
          ) : (
            collections.map((col) => (
              <button type="button" key={col.id} className="BtnPP" onClick={() => addToCollection(col)}>
                {col.name}
              </button>
            ))
          )}
          <button type="button" className="BtnPP" onClick={handleBack}>Retour</button>
        </article>
      )}

      {view === "create" && (
        <article className="divBtnPP">
          <h2 className="titrePopUp">Créer une nouvelle collection</h2>
          <form className="formPopUp" onSubmit={(e) => { e.preventDefault(); createCollection(); }}>
            Nom de la collection :
            <input ref={nameRef} placeholder="Nom..." className="inputReg" type="text" />
            Photo (URL) :
            <input ref={photoRef} placeholder="https://..." className="inputReg" type="text" />
            <button type="submit" className="BtnPP">Créer</button>
          </form>
          <button type="button" className="BtnPP" onClick={handleBack}>Retour</button>
        </article>
      )}
    </Modal>
  );
}

export default PopUpCollection;