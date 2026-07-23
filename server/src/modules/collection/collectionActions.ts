import type { RequestHandler } from "express";
import Joi from "joi";
import collectionRepository from "./collectionRepository";

const Validatecollection: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    photo: Joi.string().required(),
    user_id: Joi.number().required(),
  });

  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) res.status(400).json(result.error);
  else next();
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const collections = await collectionRepository.selectAll();
    res.json(collections);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const collection = await collectionRepository.selectOne(id);

    if (collection) {
      res.json(collection);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const collection = req.body;
    const result = await collectionRepository.updateById(id, collection);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCollection = req.body;
    const result = await collectionRepository.create(newCollection);
    if (result.affectedRows != null) {
      res.status(201).json(result);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const result = await collectionRepository.deleteById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const getByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const collections = await collectionRepository.selectByUser(userId);
    res.json(collections);
  } catch (error) {
    next(error);
  }
};

const getArtworks: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const artworks = await collectionRepository.selectArtworksByCollection(id);
    res.json(artworks);
  } catch (error) {
    next(error);
  }
};

const addArtwork: RequestHandler = async (req, res, next) => {
  try {
    const collectionId = Number.parseInt(req.params.id);
    const { artwork_id } = req.body;
    await collectionRepository.addArtworkToCollection(collectionId, artwork_id);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy, Validatecollection, getByUser, getArtworks, addArtwork };
