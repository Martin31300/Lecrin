import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useArtwork } from "../../contexts/artwork.context";
import { useUser } from "../../contexts/user.context";
import { API_URL } from "../../utils/api";
import AuthModal from "../Modal/AuthModal";
import "../../pages/Register.css";

type ArtistSuggestion = { id: number; name: string; photo: string };

export function PostArtwork() {
    const { user } = useUser();
    const { artwork, setArtwork } = useArtwork();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [date_artwork, setDate_artwork] = useState("");
    const [photo, setPhoto] = useState("");
    const [musee, setMusee] = useState("");
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [description, setDescription] = useState("");

    // Artiste
    const [artist_name, setArtist_name] = useState("");
    const [suggestions, setSuggestions] = useState<ArtistSuggestion[]>([]);
    const [artistSelected, setArtistSelected] = useState(false);
    const [showNewArtistForm, setShowNewArtistForm] = useState(false);
    const [artist_photo, setArtist_photo] = useState("");
    const [artist_description, setArtist_description] = useState("");
    const [artist_birthday, setArtist_birthday] = useState("");
    const [artist_death_date, setArtist_death_date] = useState("");
    const [artist_pays, setArtist_pays] = useState("");
    const [artist_movement_ids, setArtist_movement_ids] = useState<number[]>([]);
    const [artistMovementDropdownOpen, setArtistMovementDropdownOpen] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Mouvements
    const [movements, setMovements] = useState<{ id: number; name: string }[]>([]);
    const [selectedMovements, setSelectedMovements] = useState<number[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/api/movements`)
            .then((res) => res.json())
            .then((data) => setMovements(data));
    }, []);

    const handleArtistInput = (value: string) => {
        setArtist_name(value);
        setArtistSelected(false);
        setShowNewArtistForm(false);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (value.length < 1) {
            setSuggestions([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            const res = await fetch(`${API_URL}/api/artists?search=${encodeURIComponent(value)}`);
            const data = await res.json();
            setSuggestions(data);
        }, 300);
    };

    const selectSuggestion = (s: ArtistSuggestion) => {
        setArtist_name(s.name);
        setSuggestions([]);
        setArtistSelected(true);
        setShowNewArtistForm(false);
    };

    const handleArtistBlur = () => {
        setTimeout(() => {
            if (!artistSelected && artist_name.length > 1 && suggestions.length === 0) {
                setShowNewArtistForm(true);
            }
            setSuggestions([]);
        }, 200);
    };

    const toggleArtistMovement = (id: number) => {
        setArtist_movement_ids((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
        );
    };

    const toggleMovement = (id: number) => {
        setSelectedMovements((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
        );
    };

    const postArtwork = async () => {
        if (!artistSelected && !showNewArtistForm) {
            toast.error("Veuillez sélectionner ou créer un artiste");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/artworks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    user_id: user?.id,
                    name,
                    artist_name,
                    artist_photo,
                    artist_description,
                    artist_birthday,
                    artist_death_date,
                    artist_pays,
                    artist_movement_ids,
                    date_artwork,
                    photo,
                    musee,
                    ville,
                    pays,
                    dimensions,
                    description,
                    movement_ids: selectedMovements,
                }),
            });

            if (!response.ok) throw new Error("Erreur lors du POST");

            const newArtwork = await response.json();
            setArtwork([newArtwork, ...artwork]);
            toast.success("Artwork posté");
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>
            {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
            <button
                onClick={() => {
                    if (user) setIsOpen(true);
                    else setAuthModalOpen(true);
                }}
                type="button"
                className="addBtn"
            >
                Ajouter une œuvre
            </button>

            {isOpen && (
                <div
                    className="auth-modal-overlay"
                    onClick={() => setIsOpen(false)}
                    onKeyDown={() => setIsOpen(false)}
                    role="presentation"
                >
                    <div
                        className="auth-modal-card large"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        role="presentation"
                    >
                        <button type="button" className="auth-modal-close" onClick={() => setIsOpen(false)}>✕</button>
                        <h2>Ajouter une œuvre</h2>

                        <div className="divTruc">
                            <p className="labelRegister">Nom de l'œuvre</p>
                            <input className="inputReg" placeholder="Ici le nom..." value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="divTruc">
                            <p className="labelRegister">Artiste</p>
                            <div style={{ position: "relative" }}>
                                <input
                                    className="inputReg"
                                    placeholder="Nom de l'artiste..."
                                    value={artist_name}
                                    onChange={(e) => handleArtistInput(e.target.value)}
                                    onBlur={handleArtistBlur}
                                    style={{ width: "100%" }}
                                />
                                {suggestions.length > 0 && (
                                    <div className="movements-dropdown" style={{ position: "absolute", width: "100%", zIndex: 10 }}>
                                        {suggestions.map((s) => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                className="movements-option"
                                                onMouseDown={() => selectSuggestion(s)}
                                            >
                                                {s.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {showNewArtistForm && (
                                <div className="divTruc" style={{ marginTop: "12px", borderLeft: "2px solid white", paddingLeft: "12px" }}>
                                    <p className="labelRegister" style={{ fontSize: "14px" }}>
                                        Cet artiste n'existe pas encore. Complétez sa fiche :
                                    </p>
                                    <input className="inputReg" placeholder="URL photo de l'artiste..." value={artist_photo} onChange={(e) => setArtist_photo(e.target.value)} />
                                    <input className="inputReg" placeholder="Date de naissance (ex: 1881)" value={artist_birthday} onChange={(e) => setArtist_birthday(e.target.value)} />
                                    <input className="inputReg" placeholder="Date de décès (ex: 1973, laisser vide si vivant)" value={artist_death_date} onChange={(e) => setArtist_death_date(e.target.value)} />
                                    <input className="inputReg" placeholder="Pays (ex: Pologne)" value={artist_pays} onChange={(e) => setArtist_pays(e.target.value)} />
                                    <textarea className="inputReg" placeholder="Description de l'artiste..." value={artist_description} onChange={(e) => setArtist_description(e.target.value)} />
                                    <div className="movements-dropdown">
                                        <button
                                            type="button"
                                            className="movements-selected"
                                            onClick={() => setArtistMovementDropdownOpen((prev) => !prev)}
                                        >
                                            {artist_movement_ids.length === 0
                                                ? "Mouvements de l'artiste"
                                                : movements
                                                    .filter((m) => artist_movement_ids.includes(m.id))
                                                    .map((m) => m.name)
                                                    .join(", ")}
                                        </button>
                                        {artistMovementDropdownOpen && (
                                            <div className="movements-list">
                                                {movements.map((m) => (
                                                    <button
                                                        key={m.id}
                                                        type="button"
                                                        className={`movements-option ${artist_movement_ids.includes(m.id) ? "selected" : ""}`}
                                                        onClick={() => toggleArtistMovement(m.id)}
                                                    >
                                                        {m.name}
                                                    </button>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="movements-validate"
                                                    onClick={() => setArtistMovementDropdownOpen(false)}
                                                >
                                                    Valider
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="divTruc">
                            <p className="labelRegister">Mouvements</p>
                            <div className="movements-dropdown">
                                <button
                                    type="button"
                                    className="movements-selected"
                                    onClick={() => setDropdownOpen((prev) => !prev)}
                                >
                                    {selectedMovements.length === 0
                                        ? "Sélectionner un mouvement"
                                        : movements
                                            .filter((m) => selectedMovements.includes(m.id))
                                            .map((m) => m.name)
                                            .join(", ")}
                                </button>
                                {dropdownOpen && <div className="movements-list">
                                    {movements.map((m) => (
                                        <button
                                            key={m.id}
                                            type="button"
                                            className={`movements-option ${selectedMovements.includes(m.id) ? "selected" : ""}`}
                                            onClick={() => toggleMovement(m.id)}
                                        >
                                            {m.name}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        className="movements-validate"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Valider
                                    </button>
                                </div>}
                            </div>
                        </div>

                        <div className="divTruc">
                            <p className="labelRegister">Date (ex: 1889)</p>
                            <input className="inputReg" placeholder="Ex: 1889" value={date_artwork} onChange={(e) => setDate_artwork(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">URL de la photo</p>
                            <input className="inputReg" placeholder="Ici l'URL..." value={photo} onChange={(e) => setPhoto(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Musée</p>
                            <input className="inputReg" placeholder="Ici le musée..." value={musee} onChange={(e) => setMusee(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Ville</p>
                            <input className="inputReg" placeholder="Ici la ville..." value={ville} onChange={(e) => setVille(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Pays</p>
                            <input className="inputReg" placeholder="Ici le pays..." value={pays} onChange={(e) => setPays(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Dimensions</p>
                            <input className="inputReg" placeholder="ex: 221 x 332 cm" value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
                        </div>
                        <div className="divTruc">
                            <p className="labelRegister">Description</p>
                            <textarea className="inputReg" placeholder="Ici la description..." value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <button type="button" className="BtnReg" onClick={postArtwork}>Poster</button>
                    </div>
                </div>
            )}
        </>
    );
}