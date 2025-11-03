"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userLikeArtworkRepository_1 = __importDefault(require("./userLikeArtworkRepository"));
const read = async (req, res, next) => {
    try {
        const parseId = Number.parseInt(req.params.id);
        const like = await userLikeArtworkRepository_1.default.selectOne(parseId);
        if (like != null) {
            res.json(like);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        next(error);
    }
};
const add = async (req, res, next) => {
    try {
        const result = await userLikeArtworkRepository_1.default.create(req.body);
        if (result != null) {
            res.status(201).json(result);
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        next(error);
    }
};
const destroy = async (req, res, next) => {
    try {
        const parseId = Number.parseInt(req.params.id);
        const userId = req.body.user_id;
        const result = await userLikeArtworkRepository_1.default.deleteById(parseId, userId);
        if (result.affectedRows > 0) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        next(error);
    }
};
const readAllByUser = async (req, res, next) => {
    try {
        const userId = Number.parseInt(req.params.id);
        const likes = await userLikeArtworkRepository_1.default.selectAllByUser(userId);
        res.json(likes);
    }
    catch (error) {
        next(error);
    }
};
exports.default = { read, add, destroy, readAllByUser };
