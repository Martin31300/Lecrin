"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentActions_1 = __importDefault(require("./modules/comment/commentActions"));
const userActions_1 = __importDefault(require("./modules/user/userActions"));
const artworkActions_1 = __importDefault(require("./modules/artwork/artworkActions"));
const artistActions_1 = __importDefault(require("./modules/artist/artistActions"));
const movementActions_1 = __importDefault(require("./modules/mouvement/movementActions"));
const collectionActions_1 = __importDefault(require("./modules/collection/collectionActions"));
const userLikeArtworkAction_1 = __importDefault(require("./modules/user_like_artwork/userLikeArtworkAction"));
const router = express_1.default.Router();
/* ************************************************************************* */
// USER
/* ************************************************************************* */
router.get("/api/users", userActions_1.default.browse);
router.get("/api/users/:id", userActions_1.default.read);
router.post("/api/users", userActions_1.default.ValidateUser, userActions_1.default.create);
router.post("/api/users/login", userActions_1.default.login);
router.delete("/api/users/:id", userActions_1.default.isAuth, userActions_1.default.destroy);
router.put("/api/users/:id", userActions_1.default.isAuth, userActions_1.default.edit);
/* ************************************************************************* */
// ARTWORK
/* ************************************************************************* */
router.get("/api/artworks", artworkActions_1.default.browse);
router.get("/api/artworks/:id", artworkActions_1.default.read);
router.get("/api/artworks/:id/comments", commentActions_1.default.ReadCommentByArtworkId);
router.post("/api/artworks", userActions_1.default.isAuth, artworkActions_1.default.ValidateArtwork, artworkActions_1.default.add);
router.delete("/api/artworks/:id", userActions_1.default.isAuth, artworkActions_1.default.destroy);
router.put("/api/artworks/:id", userActions_1.default.isAuth, artworkActions_1.default.edit);
/* ************************************************************************* */
// ARTIST
/* ************************************************************************* */
router.get("/api/artists", artistActions_1.default.browse);
router.get("/api/artists/:id", artistActions_1.default.read);
router.put("/api/artists/:id", userActions_1.default.isAuth, userActions_1.default.isAdmin, artistActions_1.default.edit);
router.post("/api/artists", userActions_1.default.isAuth, userActions_1.default.isAdmin, artistActions_1.default.ValidateArtist, artistActions_1.default.add);
router.delete("/api/artists/:id", userActions_1.default.isAuth, userActions_1.default.isAdmin, artistActions_1.default.destroy);
/* ************************************************************************* */
// MOVEMENTS
/* ************************************************************************* */
router.get("/api/movements", movementActions_1.default.browse);
router.get("/api/movements/:id", movementActions_1.default.read);
router.post("/api/movements", userActions_1.default.isAuth, userActions_1.default.isAdmin, movementActions_1.default.ValidateMovement, movementActions_1.default.add);
router.delete("/api/movements/:id", userActions_1.default.isAuth, userActions_1.default.isAdmin, movementActions_1.default.destroy);
router.put("/api/movements/:id", userActions_1.default.isAuth, userActions_1.default.isAdmin, movementActions_1.default.edit);
/* ************************************************************************* */
// COLLECTIONS
/* ************************************************************************* */
router.get("/api/collections", collectionActions_1.default.browse);
router.get("/api/collections/:id", collectionActions_1.default.read);
router.put("/api/collections/:id", userActions_1.default.isAuth, collectionActions_1.default.edit);
router.post("/api/collections", userActions_1.default.isAuth, collectionActions_1.default.Validatecollection, collectionActions_1.default.add);
router.delete("/api/collections/:id", userActions_1.default.isAuth, collectionActions_1.default.destroy);
/* ************************************************************************* */
// COMMENTS
/* ************************************************************************* */
router.get("/api/comments", commentActions_1.default.browse);
router.get("/api/comments/:id", commentActions_1.default.read);
router.put("/api/comments/:id", userActions_1.default.isAuth, commentActions_1.default.edit);
router.post("/api/comments", userActions_1.default.isAuth, commentActions_1.default.ValidateComment, commentActions_1.default.add);
router.delete("/api/comments/:id", userActions_1.default.isAuth, commentActions_1.default.destroy);
/* ************************************************************************* */
// USER LIKES
/* ************************************************************************* */
router.get("/api/artworks/:id/like", userLikeArtworkAction_1.default.read);
router.get("/api/user/:id/likes", userLikeArtworkAction_1.default.readAllByUser);
router.post("/api/artworks/like", userActions_1.default.isAuth, userLikeArtworkAction_1.default.add);
router.delete("/api/artworks/:id/like", userActions_1.default.isAuth, userLikeArtworkAction_1.default.destroy);
exports.default = router;
