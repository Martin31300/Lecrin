import { type RequestHandler, json } from "express";
import Joi from "joi";
import movementRepository from "../mouvement/movementRepository";
import artworkRepository from "./artworkRepository";
import artistRepository from "../artist/artistRepository";

const ValidateArtwork: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(55).required(),
    description: Joi.string().required(),
    ville: Joi.string().allow(""),
    pays: Joi.string().allow(""),
    musee: Joi.string().allow(""),
    photo: Joi.string().allow(""),
    user_id: Joi.number().integer().positive().required(),
    date_artwork: Joi.string().allow(""),
    dimensions: Joi.string().allow(""),
    artist_name: Joi.string().min(1).required(),
  });

  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) res.status(400).json(result.error);
  else next();
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const artworks = await artworkRepository.selectAll();
    res.json(artworks);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const artwork = await artworkRepository.selectOne(parseId);
    artwork.movements = await movementRepository.selectAllByArtwork(parseId);

    if (artwork != null) {
      res.json(artwork);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { artist_name, ...artworkData } = req.body;

    const artist_id = await artistRepository.findOrCreate(artist_name);

    const result = await artworkRepository.create({ ...artworkData, artist_id });

    if (result.affectedRows != null) {
      const newArtwork = await artworkRepository.selectOne(result.insertId);
      res.status(201).json(newArtwork);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const result = await artworkRepository.deleteById(parseId);

    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const artwork = req.body;
    const result = await artworkRepository.updateById(parseId, artwork);

    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add, destroy, edit, ValidateArtwork };
