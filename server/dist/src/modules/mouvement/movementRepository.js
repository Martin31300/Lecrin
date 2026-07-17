"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function selectAll() {
    const [movements] = await client_1.default.query("SELECT * FROM movement");
    return movements;
}
async function selectAllByArtwork(id) {
    const [movements] = await client_1.default.query("SELECT * FROM movement JOIN movement_has_artwork ON movement_has_artwork.movement_id = movement.id WHERE movement_has_artwork.artwork_id = ?", [id]);
    return movements;
}
async function selectAllByArtist(id) {
    const [movements] = await client_1.default.query("SELECT * FROM movement JOIN link_artist_movement ON link_artist_movement.movement_id = movement.id WHERE link_artist_movement.artist_id = ?", [id]);
    return movements;
}
async function selectOne(id) {
    const [[movement]] = await client_1.default.query("SELECT * FROM movement WHERE id = ?", [id]);
    return movement;
}
async function create(newMovement) {
    const [result] = await client_1.default.query("INSERT INTO movement (name, photo, description) VALUES (?, ?, ?)", [newMovement.name, newMovement.photo, newMovement.description]);
    return result;
}
async function deleteById(id) {
    const [result] = await client_1.default.query("DELETE FROM movement WHERE id = ?", [id]);
    return result;
}
async function updateById(id, movement) {
    const [result] = await client_1.default.query("UPDATE movement SET ? WHERE id = ?", [movement, id]);
    return result;
}
exports.default = {
    selectAll,
    selectOne,
    create,
    deleteById,
    updateById,
    selectAllByArtwork,
    selectAllByArtist,
};
