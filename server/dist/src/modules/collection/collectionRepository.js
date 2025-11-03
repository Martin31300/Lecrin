"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function selectAll() {
    const [result] = await client_1.default.query("SELECT * FROM collection");
    return result;
}
async function selectOne(id) {
    const [[collection]] = await client_1.default.query("SELECT * FROM collection WHERE id = ?", [id]);
    return collection;
}
async function create(newCollection) {
    const [result] = await client_1.default.query("INSERT INTO collection (name, photo, user_id) VALUES (?, ?)", [newCollection.name, newCollection.photo, newCollection.user_id]);
    return result;
}
async function deleteById(id) {
    const [result] = await client_1.default.query("DELETE FROM collection WHERE id = ?", [id]);
    return result;
}
async function updateById(id, collection) {
    const [result] = await client_1.default.query("UPDATE collection SET ? WHERE id = ?", [collection, id]);
    return result;
}
exports.default = { selectAll, selectOne, create, deleteById, updateById };
