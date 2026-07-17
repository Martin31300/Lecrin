"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function selectAll() {
    const [artists] = await client_1.default.query(`SELECT 
        artist.id, 
        artist.name AS artistName, 
        artist.photo, 
        artist.birthday, 
        artist.death_date, 
        (SELECT COUNT(*) FROM artwork WHERE artwork.artist_id = artist.id) AS artworkCount,
        (
          SELECT JSON_ARRAYAGG(JSON_OBJECT('id', m.id, 'name', m.name))
          FROM link_artist_movement lam
          JOIN movement m ON lam.movement_id = m.id
          WHERE lam.artist_id = artist.id
        ) AS movements
     FROM artist`);
    return artists;
}
async function selectOne(id) {
    const [[artist]] = await client_1.default.query("SELECT * FROM artist WHERE id = ?", [id]);
    return artist;
}
async function create(newArtist) {
    const [result] = await client_1.default.query("INSERT INTO artist ? VALUES (?, ?, ?, ?) ", [
        newArtist.name,
        newArtist.description,
        newArtist.death_date,
        newArtist.birthday,
    ]);
    return result;
}
async function deleteById(id) {
    const [result] = await client_1.default.query("DELETE FROM artist WHERE id = ?", [id]);
    return result;
}
async function updateById(artist, id) {
    const [result] = await client_1.default.query("UPDATE artist SET ? WHERE id = ?", [artist, id]);
    return result;
}
exports.default = { selectAll, selectOne, create, deleteById, updateById };
