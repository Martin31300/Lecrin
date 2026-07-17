"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = __importDefault(require("./userRepository"));
const ValidateUser = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().alphanum().min(1).max(255).required(),
        birthday: joi_1.default.date().iso().less("now").required(),
        mail: joi_1.default.string().email().required(),
        password: joi_1.default.string().alphanum().min(1).max(255).required(),
    });
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error)
        res.status(400).json(result.error);
    else
        next();
};
const browse = async (req, res, next) => {
    try {
        const users = await userRepository_1.default.selectAll();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
const read = async (req, res, next) => {
    try {
        const parseId = Number.parseInt(req.params.id);
        const user = await userRepository_1.default.selectOne(parseId);
        if (user) {
            res.json(user);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        next(error);
    }
};
const create = async (req, res, next) => {
    try {
        const user = req.body;
        user.password = await argon2_1.default.hash(user.password);
        const affectedRows = await userRepository_1.default.add(user);
        // Respond with HTTP 201 (Created) and the ID of the newly inserted user
        if (affectedRows)
            res.sendStatus(201);
        else
            res.sendStatus(422);
    }
    catch (err) {
        next(err);
    }
};
const login = async (req, res, next) => {
    try {
        const { mail, password } = req.body;
        const user = await userRepository_1.default.readByEmail(mail);
        if (!user)
            res.status(422).json("Utilisateur introuvable.");
        else {
            const confirmPassword = await argon2_1.default.verify(user.password, password);
            if (!confirmPassword)
                res.status(422).json("L'identifiant ou le mot de passe est incorrect.");
            else {
                const token = jsonwebtoken_1.default.sign({ id: user.id, admin: user.admin }, process.env.APP_SECRET);
                const { password, ...userWithoutPassword } = user;
                res.json({ userWithoutPassword, token });
            }
        }
    }
    catch (error) {
        next(error);
    }
};
const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json("Authorisation manquant.");
        }
        else {
            const token = authorization.split(" ")[1];
            if (!token)
                res.status(401).json("Token manquant.");
            else {
                const payload = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
                const user = (await userRepository_1.default.selectOne(payload?.id));
                req.user = user;
                next();
            }
        }
    }
    catch (error) {
        next(error);
    }
};
const isAdmin = async (req, res, next) => {
    const { admin } = req.body.user;
    if (!admin)
        res.status(403).json("Vous n'avez pas les droits.");
    else
        next();
};
const destroy = async (req, res, next) => {
    try {
        const deleteId = Number.parseInt(req.params.id);
        const deleteUser = await userRepository_1.default.deleteById(deleteId);
        if (deleteUser.affectedRows) {
            res.sendStatus(204);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        next(err);
    }
};
//faire une verif sur le le user qui supprime et le compte sur lequel il est co
const edit = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id);
        const user = req.body;
        const result = await userRepository_1.default.updateById(user, id);
        if (result) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        next(err);
    }
};
//faire une verif sur le le user qui modifie et le compte sur lequel il est co
exports.default = {
    browse,
    create,
    login,
    destroy,
    edit,
    ValidateUser,
    isAuth,
    isAdmin,
    read
};
