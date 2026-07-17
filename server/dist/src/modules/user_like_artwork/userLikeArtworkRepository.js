"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function create(like) {
    const [result] = await client_1.default.query("INSERT INTO user_liked_artwork (user_id, artwork_id) VALUES (?, ?)", [like.user_id, like.artwork_id]);
    return result;
}
async function selectOne(id) {
    const [result] = await client_1.default.query("SELECT user_id FROM user_liked_artwork where artwork_id = ?", [id]);
    return result;
}
async function deleteById(artworkId, userId) {
    const [result] = await client_1.default.query("DELETE FROM user_liked_artwork WHERE (user_id, artwork_id) = (?, ?)", [userId, artworkId]);
    return result;
}
async function selectAllByUser(userId) {
    const [rows] = await client_1.default.query(`SELECT a.* FROM user_liked_artwork ula
     JOIN artwork a ON a.id = ula.artwork_id
     WHERE ula.user_id = ?`, [userId]);
    return rows;
}
exports.default = { create, selectOne, deleteById, selectAllByUser };
