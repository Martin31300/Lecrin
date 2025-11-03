"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const artworkRepository_1 = __importDefault(require("../artwork/artworkRepository"));
const movementRepository_1 = __importDefault(require("../mouvement/movementRepository"));
const artistRepository_1 = __importDefault(require("./artistRepository"));
const ValidateArtist = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().alphanum().min(1).max(255).required(),
        description: joi_1.default.string().alphanum().required(),
        death_date: joi_1.default.date().max("now"),
        birthday: joi_1.default.date().required(),
    });
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error)
        res.status(400).json(result.error);
    else
        next();
};
const browse = async (req, res, next) => {
    try {
        const artists = await artistRepository_1.default.selectAll();
        res.json(artists);
    }
    catch (error) {
        next(error);
    }
};
const read = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id);
        const artist = await artistRepository_1.default.selectOne(id);
        artist.movements = await movementRepository_1.default.selectAllByArtist(id);
        artist.artworks = await artworkRepository_1.default.selectAllByArtist(id);
        if (artist != null) {
            res.json(artist);
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
        const id = Number.parseInt(req.params.id);
        const artist = req.body;
        const result = await artistRepository_1.default.updateById(artist, id);
        if (result) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(400);
        }
    }
    catch (error) {
        next(error);
    }
};
const add = async (req, res, next) => {
    try {
        const newArtist = req.body;
        const result = await artistRepository_1.default.create(newArtist);
        if (result) {
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
        const id = Number.parseInt(req.params.id);
        const result = await artistRepository_1.default.deleteById(id);
        if (result.affectedRows) {
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
exports.default = { browse, read, edit, add, destroy, ValidateArtist };
