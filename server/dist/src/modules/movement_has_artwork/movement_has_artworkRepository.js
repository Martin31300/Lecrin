"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../database/client"));
async function selectAll() {
    const [rows] = await client_1.default.query("SELECT * FROM movement_has_artwork ");
    return rows;
}
async function selectOne(id) {
    const [[rows]] = await client_1.default.query("SELECT * FROM movement_has_artwork WHERE id = ?", [id]);
    return rows;
}
exports.default = {
    selectAll,
    selectOne,
};
