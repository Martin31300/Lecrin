"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function selectAll() {
    const [users] = await client_1.default.query("SELECT * FROM user");
    return users;
}
async function selectOne(id) {
    const [[user]] = await client_1.default.query("SELECT * FROM user WHERE id = ? ", [id]);
    return user;
}
async function add(newUser) {
    const [result] = await client_1.default.query("INSERT INTO user (name, birthday, mail, password, artist_id, photo) values (?, ?, ?, ?, ?, ?)", [
        newUser.name,
        newUser.birthday,
        newUser.mail,
        newUser.password,
        newUser.artist_id,
        newUser.photo ?? "default.jpg",
    ]);
    return result.affectedRows;
}
async function readByEmail(mail) {
    const [rows] = await client_1.default.query("Select * from user where mail = ?", [mail]);
    return rows[0];
}
async function deleteById(id) {
    const [result] = await client_1.default.query("DELETE FROM user WHERE id = ?", [id]);
    return result;
}
async function updateById(user, id) {
    const [result] = await client_1.default.query("UPDATE user SET ? WHERE id = ?", [user, id]);
    return result;
}
exports.default = {
    selectAll,
    selectOne,
    add,
    readByEmail,
    deleteById,
    updateById,
};
