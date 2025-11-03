"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function selectAll() {
    const [comments] = await client_1.default.query("SELECT * FROM comment");
    return comments;
}
async function selectOne(id) {
    const [[comment]] = await client_1.default.query("SELECT * FROM comment WHERE id = ?", [id]);
    return comment;
}
async function create(newComment) {
    const [result] = await client_1.default.query("INSERT INTO comment (text, user_id, artwork_id) VALUES (?, ?, ?)", [newComment.text, newComment.user_id, newComment.artwork_id]);
    return result;
}
async function deleteById(id) {
    const [result] = await client_1.default.query("DELETE FROM comment WHERE id = ?", [id]);
    return result;
}
async function updateById(comment, id) {
    const [result] = await client_1.default.query("UPDATE artist SET ? WHERE id = ?", [comment, id]);
    return result;
}
async function selectCommentByArtworkId(artworkId) {
    const [comment] = await client_1.default.query(`SELECT 
      comment.id, 
      comment.text, 
      comment.date, 
      user.name AS userName, 
      user.photo AS userPic 
    FROM comment 
    JOIN user ON comment.user_id = user.id 
    WHERE comment.artwork_id = ?`, [artworkId]);
    return comment;
}
exports.default = {
    selectAll,
    selectOne,
    create,
    deleteById,
    updateById,
    selectCommentByArtworkId,
};
