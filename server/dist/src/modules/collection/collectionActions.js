"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const collectionRepository_1 = __importDefault(require("./collectionRepository"));
const Validatecollection = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().alphanum().required,
    });
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error)
        res.status(400).json(result.error);
    else
        next();
};
const browse = async (req, res, next) => {
    try {
        const collections = await collectionRepository_1.default.selectAll();
        res.json(collections);
    }
    catch (error) {
        next(error);
    }
};
const read = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id);
        const collection = await collectionRepository_1.default.selectOne(id);
        if (collection) {
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
const edit = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id);
        const collection = req.body;
        const result = await collectionRepository_1.default.updateById(id, collection);
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
const add = async (req, res, next) => {
    try {
        const newCollection = req.body;
        const result = await collectionRepository_1.default.create(newCollection);
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
        const id = Number.parseInt(req.params.id);
        const result = await collectionRepository_1.default.deleteById(id);
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
exports.default = { browse, read, edit, add, destroy, Validatecollection };
