"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const commentRepository_1 = __importDefault(require("./commentRepository"));
const ValidateComment = (req, res, next) => {
    const schema = joi_1.default.object({
        text: joi_1.default.string().min(2).max(500).required(),
        //user_id: Joi.number().integer().required(),
        artwork_id: joi_1.default.number().integer().required(),
    });
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error) {
        res.status(400).json(result.error.details);
        return;
    }
    next();
};
const browse = async (req, res, next) => {
    try {
        const comments = await commentRepository_1.default.selectAll();
        res.json(comments);
    }
    catch (error) {
        next(error);
    }
};
const read = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id);
        const comment = await commentRepository_1.default.selectOne(id);
        if (comment) {
            res.json(comment);
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
        const result = await commentRepository_1.default.updateById(artist, id);
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
        const user_id = req.user.id;
        const { text, artwork_id } = req.body;
        const result = await commentRepository_1.default.create({
            text: text,
            artwork_id: artwork_id,
            user_id: user_id,
        });
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
        const result = await commentRepository_1.default.deleteById(id);
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
const ReadCommentByArtworkId = async (req, res, next) => {
    try {
        const artworkId = Number.parseInt(req.params.id);
        const comments = await commentRepository_1.default.selectCommentByArtworkId(artworkId);
        if (comments.length > 0) {
            res.status(200).json(comments);
        }
        else {
            res.status(200).json([]);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    browse,
    read,
    edit,
    add,
    destroy,
    ValidateComment,
    ReadCommentByArtworkId,
};
