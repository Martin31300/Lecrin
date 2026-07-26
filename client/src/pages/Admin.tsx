import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/user.context";
import { API_URL } from "../utils/api";
import { toast } from "react-toastify";
import "./Admin.css";

type UserType = {
    id: number;
    name: string;
    mail: string;
    role: string;
    photo: string;
};

type Artwork = {
    id: number;
    artworkName: string;
    photo: string;
    userName: string;
};

type Artist = {
    id: number;
    artistName: string;
    photo: string;
    pays: string;
};

type Movement = {
    id: number;
    name: string;
    photo: string;
};

function Admin() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [tab, setTab] = useState<"users" | "artworks" | "artists" | "movements">("users");
    const [users, setUsers] = useState<UserType[]>([]);
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [movements, setMovements] = useState<Movement[]>([]);
    const [editingItem, setEditingItem] = useState<{ type: string; item: any } | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [editMovementDropdownOpen, setEditMovementDropdownOpen] = useState(false);
    const [editSelectedMovements, setEditSelectedMovements] = useState<number[]>([]);

    useEffect(() => {
        if (!user || user.role !== "admin") navigate("/");
    }, [user, navigate]);

    useEffect(() => {
        fetch(`${API_URL}/api/users`).then(r => r.json()).then(setUsers);
        fetch(`${API_URL}/api/artworks`).then(r => r.json()).then(setArtworks);
        fetch(`${API_URL}/api/artists`).then(r => r.json()).then(setArtists);
        fetch(`${API_URL}/api/movements`).then(r => r.json()).then(setMovements);
    }, []);

    const deleteUser = async (id: number) => {
        await fetch(`${API_URL}/api/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        setUsers(prev => prev.filter(u => u.id !== id));
        toast.success("Utilisateur supprimé.");
    };

    const deleteArtwork = async (id: number) => {
        await fetch(`${API_URL}/api/artworks/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        setArtworks(prev => prev.filter(a => a.id !== id));
        toast.success("Publication supprimée.");
    };

    const deleteArtist = async (id: number) => {
        await fetch(`${API_URL}/api/artists/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        setArtists(prev => prev.filter(a => a.id !== id));
        toast.success("Artiste supprimé.");
    };

    const deleteMovement = async (id: number) => {
        await fetch(`${API_URL}/api/movements/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user?.token}` },
        });
        setMovements(prev => prev.filter(m => m.id !== id));
        toast.success("Mouvement supprimé.");
    };

    if (!user || user.role !== "admin") return null;

    const allowedFields: Record<string, string[]> = {
        users: ["name", "mail", "photo"],
        artworks: ["artworkName", "photo", "description", "musee", "ville", "pays", "dimensions", "date_artwork"],
        artists: ["artistName", "photo", "pays", "birthday", "death_date"],
        movements: ["name", "photo"],
    };

    const openEdit = (type: string, item: any) => {
        setEditingItem({ type, item });
        setEditForm({ ...item });
        setEditSelectedMovements(item.movements?.map((m: any) => m.id) ?? []);
    };

    const toggleEditMovement = (id: number) => {
        setEditSelectedMovements(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const saveEdit = async () => {
        if (!editingItem) return;
        const { type, item } = editingItem;
        const routes: Record<string, string> = {
            users: "users",
            artworks: "artworks",
            artists: "artists",
            movements: "movements",
        };
        const filtered = Object.fromEntries(
            Object.entries(editForm).filter(([k]) => allowedFields[type]?.includes(k))
        );
        const payload: any = { ...filtered };
        if (type === "artworks" || type === "artists") {
            payload.movement_ids = editSelectedMovements;
        }
        await fetch(`${API_URL}/api/${routes[type]}/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify(payload),
        });
        if (type === "users") setUsers(prev => prev.map(u => u.id === item.id ? { ...u, ...editForm } : u));
        if (type === "artworks") setArtworks(prev => prev.map(a => a.id === item.id ? { ...a, ...editForm } : a));
        if (type === "artists") setArtists(prev => prev.map(a => a.id === item.id ? { ...a, ...editForm } : a));
        if (type === "movements") setMovements(prev => prev.map(m => m.id === item.id ? { ...m, ...editForm } : m));
        setEditingItem(null);
        toast.success("Modifié avec succès.");
    };

    return (
        <main className="admin-page">
            <h1 className="admin-title">Back Office</h1>

            <nav className="admin-tabs">
                <button type="button" className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}>
                    Utilisateurs ({users.length})
                </button>
                <button type="button" className={tab === "artworks" ? "active" : ""} onClick={() => setTab("artworks")}>
                    Publications ({artworks.length})
                </button>
                <button type="button" className={tab === "artists" ? "active" : ""} onClick={() => setTab("artists")}>
                    Artistes ({artists.length})
                </button>
                <button type="button" className={tab === "movements" ? "active" : ""} onClick={() => setTab("movements")}>
                    Mouvements ({movements.length})
                </button>
            </nav>

            <section className="admin-section">
                {tab === "users" && (
                    <table className="admin-table">
                        <thead><tr><th>Photo</th><th>Nom</th><th>Email</th><th>Rôle</th><th>Action</th></tr></thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td><img src={u.photo} alt="" className="admin-avatar" /></td>
                                    <td>{u.name}</td>
                                    <td>{u.mail}</td>
                                    <td>{u.role}</td>
                                    <td>
                                        <button type="button" className="admin-edit-btn" onClick={() => openEdit("users", u)}>Modifier</button>
                                        {u.id !== user.id && (
                                            <button type="button" className="admin-delete-btn" onClick={() => deleteUser(u.id)}>Supprimer</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {tab === "artworks" && (
                    <table className="admin-table">
                        <thead><tr><th>Image</th><th>Nom</th><th>Publié par</th><th>Action</th></tr></thead>
                        <tbody>
                            {artworks.map(a => (
                                <tr key={a.id}>
                                    <td><img src={a.photo} alt="" className="admin-avatar" /></td>
                                    <td>{a.artworkName}</td>
                                    <td>{a.userName}</td>
                                    <td>
                                        <button type="button" className="admin-edit-btn" onClick={() => openEdit("artworks", a)}>Modifier</button>
                                        <button type="button" className="admin-delete-btn" onClick={() => deleteArtwork(a.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {tab === "artists" && (
                    <table className="admin-table">
                        <thead><tr><th>Photo</th><th>Nom</th><th>Pays</th><th>Action</th></tr></thead>
                        <tbody>
                            {artists.map(a => (
                                <tr key={a.id}>
                                    <td><img src={a.photo} alt="" className="admin-avatar" /></td>
                                    <td>{a.artistName}</td>
                                    <td>{a.pays}</td>
                                    <td>
                                        <button type="button" className="admin-edit-btn" onClick={() => openEdit("artists", a)}>Modifier</button>
                                        <button type="button" className="admin-delete-btn" onClick={() => deleteArtist(a.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {tab === "movements" && (
                    <table className="admin-table">
                        <thead><tr><th>Photo</th><th>Nom</th><th>Action</th></tr></thead>
                        <tbody>
                            {movements.map(m => (
                                <tr key={m.id}>
                                    <td><img src={m.photo} alt="" className="admin-avatar" /></td>
                                    <td>{m.name}</td>
                                    <td>
                                        <button type="button" className="admin-edit-btn" onClick={() => openEdit("movements", m)}>Modifier</button>
                                        <button type="button" className="admin-delete-btn" onClick={() => deleteMovement(m.id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
            {editingItem && (
                <div className="admin-modal-overlay" onClick={() => setEditingItem(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <h2>Modifier</h2>
                        {Object.keys(editForm).filter(k => k !== "id").map(key => (
                            <div key={key} className="admin-modal-field">
                                <label>{key}</label>
                                {key === "movements" ? (
                                    <div className="movements-dropdown">
                                        <div className="movements-selected" onClick={() => setEditMovementDropdownOpen(prev => !prev)}>
                                            {editSelectedMovements.length === 0
                                                ? "Sélectionner des mouvements"
                                                : movements.filter(m => editSelectedMovements.includes(m.id)).map(m => m.name).join(", ")}
                                        </div>
                                        {editMovementDropdownOpen && (
                                            <div className="movements-list">
                                                {movements.map(m => (
                                                    <div
                                                        key={m.id}
                                                        className={`movements-option ${editSelectedMovements.includes(m.id) ? "selected" : ""}`}
                                                        onClick={() => toggleEditMovement(m.id)}
                                                    >
                                                        {m.name}
                                                    </div>
                                                ))}
                                                <button type="button" className="movements-validate" onClick={() => setEditMovementDropdownOpen(false)}>Valider</button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <input
                                        value={editForm[key] ?? ""}
                                        onChange={e => setEditForm((prev: any) => ({ ...prev, [key]: e.target.value }))}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="admin-modal-actions">
                            <button type="button" onClick={saveEdit}>Sauvegarder</button>
                            <button type="button" onClick={() => setEditingItem(null)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Admin;