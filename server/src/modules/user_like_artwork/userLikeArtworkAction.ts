import type { RequestHandler } from "express";
import type { AuthenticationRequest } from "../user/userActions";
import type { User } from "../user/userRepository";
import userLikeArtworkRepository from "./userLikeArtworkRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const like = await userLikeArtworkRepository.selectOne(parseId);

    if (like != null) {
      res.json(like);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req: AuthenticationRequest, res, next) => {
  try {
    const user_id = (req.user as User).id;
    const artwork_id = Number.parseInt(req.body.artwork_id);
    if (Number.isNaN(artwork_id)) {
      res.sendStatus(400);
      return;
    }
    const result = await userLikeArtworkRepository.create({
      user_id,
      artwork_id,
    });

    if (result != null) {
      res.status(201).json(result);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req: AuthenticationRequest, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const userId = (req.user as User).id;
    const result = await userLikeArtworkRepository.deleteById(parseId, userId);

    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const readAllByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const likes = await userLikeArtworkRepository.selectAllByUser(userId);

    res.json(likes);
  } catch (error) {
    next(error);
  }
};

export default { read, add, destroy, readAllByUser };
