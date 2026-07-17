"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function selectAll() {
    const [artworks] = await client_1.default.query(`SELECT artwork.id, user.id as userId, 
    JSON_ARRAYAGG(JSON_OBJECT('id', m.id,'name', m.name)) AS movements, 
    user.name AS userName, user.photo AS userPhoto, artwork.name as artworkName, artwork.photo, 
    artwork.date_artwork, artwork.musee, artwork.ville, artwork.pays, artwork.date_post, artwork.dimensions, 
    artwork.description, artist.name AS artistName, artist.id AS artist_id FROM artwork 
    LEFT JOIN artist ON artwork.artist_id = artist.id 
    LEFT JOIN user ON artwork.user_id = user.id 
    LEFT JOIN movement_has_artwork ON artwork.id = movement_has_artwork.artwork_id 
    LEFT JOIN movement m ON movement_has_artwork.movement_id = m.id GROUP BY artwork.id`);
    return artworks;
}
async function selectOne(id) {
    const [[artwork]] = await client_1.default.query("SELECT artwork.id, user.id as userId, user.name AS userName, artwork.name as artworkName, artwork.photo, artwork.date_artwork, artwork.musee, artwork.ville, artwork.pays, artwork.date_post, artwork.description, artist.name AS artistName FROM artwork JOIN artist ON artwork.artist_id = artist.id JOIN user ON artwork.user_id = user.id WHERE artwork.id = ?", [id]);
    return artwork;
}
async function create(newArtwork) {
    const [result] = await client_1.default.query(`INSERT INTO artwork (name, user_id, date_artwork, photo, musee, ville, pays, description, dimensions, artist_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        newArtwork.name,
        newArtwork.user_id,
        newArtwork.date_artwork,
        newArtwork.photo,
        newArtwork.musee,
        newArtwork.ville,
        newArtwork.pays,
        newArtwork.description,
        newArtwork.dimensions,
        newArtwork.artist_id,
    ]);
    return result;
}
// async function createArtistName(name: type) {
//   const [result] = await db_client.query<Rows>("INSERT INTO artist (name) values (?)",
//     [name])
//   return result;
// }
// async function createMovementName(name: type) {
//   const [result] = await db_client.query<Rows>("INSERT INTO movement (name) values (?)",
//     [name])
//   return result;
// }
async function deleteById(id) {
    const [result] = await client_1.default.query("DELETE FROM artwork WHERE id = ?", [id]);
    return result;
}
async function updateById(id, artwork) {
    const [result] = await client_1.default.query("UPDATE artwork SET ? WHERE id = ?", [artwork, id]);
    return result;
}
async function selectAllByArtist(id) {
    const [artworks] = await client_1.default.query("SELECT artwork.*, user.photo AS userPhoto, user.name AS userName FROM artwork LEFT JOIN user ON user.id = artwork.user_id WHERE artwork.artist_id = ?", [id]);
    return artworks;
}
async function selectAllByMovement(id) {
    const [artworks] = await client_1.default.query("SELECT artwork.*, artist.name AS artistName, user.photo AS userPhoto, user.name AS userName FROM artwork LEFT JOIN user ON user.id = artwork.user_id JOIN movement_has_artwork ON movement_has_artwork.artwork_id = artwork.id JOIN artist ON artist.id = artwork.artist_id WHERE movement_has_artwork.movement_id = ?", [id]);
    return artworks;
}
exports.default = {
    selectAll,
    selectOne,
    create,
    deleteById,
    updateById,
    selectAllByArtist,
    selectAllByMovement,
};
