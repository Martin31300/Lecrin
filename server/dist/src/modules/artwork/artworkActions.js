"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const movementRepository_1 = __importDefault(require("../mouvement/movementRepository"));
const artworkRepository_1 = __importDefault(require("./artworkRepository"));
const ValidateArtwork = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().alphanum().min(1).max(255).required(),
        description: joi_1.default.string().alphanum().required(),
        ville: joi_1.default.string().alphanum(),
        pays: joi_1.default.string().alphanum(),
        musee: joi_1.default.string().alphanum(),
        photo: joi_1.default.string().alphanum(),
        user_id: joi_1.default.number().integer().positive().required(),
        date_artwork: joi_1.default.date().max("now").required(),
        dimensions: joi_1.default.string().alphanum().required(),
    });
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error)
        res.status(400).json(result.error);
    else
        next();
};
const browse = async (req, res, next) => {
    try {
        const artworks = await artworkRepository_1.default.selectAll();
        res.json(artworks);
    }
    catch (error) {
        next(error);
    }
};
const read = async (req, res, next) => {
    try {
        const parseId = Number.parseInt(req.params.id);
        const artwork = await artworkRepository_1.default.selectOne(parseId);
        artwork.movements = await movementRepository_1.default.selectAllByArtwork(parseId);
        if (artwork != null) {
            res.json(artwork);
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
        const result = await artworkRepository_1.default.create(req.body);
        if (result.affectedRows != null) {
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
        const result = await artworkRepository_1.default.deleteById(parseId);
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
const edit = async (req, res, next) => {
    try {
        const parseId = Number.parseInt(req.params.id);
        const artwork = req.body;
        const result = await artworkRepository_1.default.updateById(parseId, artwork);
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
exports.default = { browse, read, add, destroy, edit, ValidateArtwork };
