import express from "express";

import commentActions from "./modules/comment/commentActions";
import userActions from "./modules/user/userActions";
import artworkActions from "./modules/artwork/artworkActions";
import artistActions from "./modules/artist/artistActions";
import movementActions from "./modules/mouvement/movementActions";
import collectionActions from "./modules/collection/collectionActions";
import userLikeArtworkAction from "./modules/user_like_artwork/userLikeArtworkAction";
import userFollowActions from "./modules/user/userFollowActions";

const router = express.Router();

/* ************************************************************************* */
// USER
/* ************************************************************************* */
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.ValidateUser, userActions.create);
router.post("/api/users/login", userActions.login);
router.delete("/api/users/:id", userActions.isAuth, userActions.destroy);
router.put("/api/users/:id", userActions.isAuth, userActions.edit);
router.post("/api/users/:id/follow", userActions.isAuth, userFollowActions.follow);
router.delete("/api/users/:id/follow", userActions.isAuth, userFollowActions.unfollow);
router.get("/api/users/:id/follow", userFollowActions.checkFollow);
router.get("/api/users/:id/artworks", userActions.getUserArtworks);
router.get("/api/users/:id/likes", userActions.getUserLikes);
router.get("/api/users/:id/follow/counts", userFollowActions.getCounts);

/* ************************************************************************* */
// ARTWORK
/* ************************************************************************* */
router.get("/api/artworks", artworkActions.browse);
router.get("/api/artworks/:id", artworkActions.read);
router.get("/api/artworks/:id/comments", commentActions.ReadCommentByArtworkId);
router.post(
  "/api/artworks",
  userActions.isAuth,
  artworkActions.ValidateArtwork,
  artworkActions.add,
);
router.delete("/api/artworks/:id", userActions.isAuth, artworkActions.destroy);
router.put("/api/artworks/:id", userActions.isAuth, artworkActions.edit);

/* ************************************************************************* */
// ARTIST
/* ************************************************************************* */
router.get("/api/artists", artistActions.browse);
router.get("/api/artists/:id", artistActions.read);
router.put(
  "/api/artists/:id",
  userActions.isAuth,
  userActions.isAdmin,
  artistActions.edit,
);
router.post(
  "/api/artists",
  userActions.isAuth,
  userActions.isAdmin,
  artistActions.ValidateArtist,
  artistActions.add,
);
router.delete(
  "/api/artists/:id",
  userActions.isAuth,
  userActions.isAdmin,
  artistActions.destroy,
);

/* ************************************************************************* */
// MOVEMENTS
/* ************************************************************************* */
router.get("/api/movements", movementActions.browse);
router.get("/api/movements/:id", movementActions.read);
router.post(
  "/api/movements",
  userActions.isAuth,
  userActions.isAdmin,
  movementActions.ValidateMovement,
  movementActions.add,
);
router.delete(
  "/api/movements/:id",
  userActions.isAuth,
  userActions.isAdmin,
  movementActions.destroy,
);
router.put(
  "/api/movements/:id",
  userActions.isAuth,
  userActions.isAdmin,
  movementActions.edit,
);

/* ************************************************************************* */
// COLLECTIONS
/* ************************************************************************* */
router.get("/api/collections", collectionActions.browse);
router.get("/api/collections/:id", collectionActions.read);
router.put("/api/collections/:id", userActions.isAuth, collectionActions.edit);
router.post(
  "/api/collections",
  userActions.isAuth,
  collectionActions.Validatecollection,
  collectionActions.add,
);
router.delete(
  "/api/collections/:id",
  userActions.isAuth,
  collectionActions.destroy,
);
router.get("/api/users/:id/collections", collectionActions.getByUser);
router.get("/api/collections/:id/artworks", collectionActions.getArtworks);
router.post("/api/collections/:id/artworks", userActions.isAuth, collectionActions.addArtwork);

/* ************************************************************************* */
// COMMENTS
/* ************************************************************************* */
router.get("/api/comments", commentActions.browse);
router.get("/api/comments/:id", commentActions.read);
router.put("/api/comments/:id", userActions.isAuth, commentActions.edit);
router.post(
  "/api/comments",
  userActions.isAuth,
  commentActions.ValidateComment,
  commentActions.add,
);
router.delete("/api/comments/:id", userActions.isAuth, commentActions.destroy);

/* ************************************************************************* */
// USER LIKES
/* ************************************************************************* */
router.get("/api/artworks/:id/like", userLikeArtworkAction.read);
router.get("/api/user/:id/likes", userLikeArtworkAction.readAllByUser);
router.post(
  "/api/artworks/like",
  userActions.isAuth,
  userLikeArtworkAction.add,
);
router.delete(
  "/api/artworks/:id/like",
  userActions.isAuth,
  userLikeArtworkAction.destroy,
);

export default router;
