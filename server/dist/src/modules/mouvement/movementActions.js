"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const artworkRepository_1 = __importDefault(require("../artwork/artworkRepository"));
const movementRepository_1 = __importDefault(require("./movementRepository"));
const ValidateMovement = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().alphanum().min(1).max(255).required(),
        description: joi_1.default.string().alphanum(),
        //photo:
    });
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error)
        res.status(400).json(result.error);
    else
        next();
};
const browse = async (req, res, next) => {
    try {
        const collections = await movementRepository_1.default.selectAll();
        res.json(collections);
    }
    catch (error) {
        next(error);
    }
};
const read = async (req, res, next) => {
    try {
        const parseId = Number.parseInt(req.params.id);
        const collection = await movementRepository_1.default.selectOne(parseId);
        collection.artworks = await artworkRepository_1.default.selectAllByMovement(parseId);
        if (collection != null) {
            res.json(collection);
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
        const result = await movementRepository_1.default.create(req.body);
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
        const result = await movementRepository_1.default.deleteById(parseId);
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
        const movement = req.body;
        const result = await movementRepository_1.default.updateById(parseId, movement);
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
exports.default = { browse, read, add, destroy, edit, ValidateMovement };
