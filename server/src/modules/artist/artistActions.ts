import type { RequestHandler } from "express";
import Joi from "joi";
import artworkRepository from "../artwork/artworkRepository";
import movementRepository from "../mouvement/movementRepository";
import artistRepository from "./artistRepository";
import client from "../../../database/client";

const ValidateArtist: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(255).required(),
    description: Joi.string().alphanum().required(),
    death_date: Joi.date().max("now"),
    birthday: Joi.date().required(),
  });

  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) res.status(400).json(result.error);
  else next();
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    if (req.query.search) {
      const artists = await artistRepository.search(req.query.search as string);
      res.json(artists);
    } else {
      const artists = await artistRepository.selectAll();
      res.json(artists);
    }
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const artist = await artistRepository.selectOne(id);
    artist.movements = await movementRepository.selectAllByArtist(id);
    artist.artworks = await artworkRepository.selectAllByArtist(id);

    if (artist != null) {
      res.json(artist);
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
    const { movement_ids, artistName, ...rest } = req.body;
    const artist = artistName !== undefined ? { ...rest, name: artistName } : rest;
    const result = await artistRepository.updateById(artist, id);

    if (movement_ids !== undefined) {
      await client.query("DELETE FROM link_artist_movement WHERE artist_id = ?", [id]);
      if (movement_ids.length > 0) {
        await artistRepository.insertArtistMovements(id, movement_ids);
      }
    }

    if (result) {
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const newArtist = req.body;
    const result = await artistRepository.create(newArtist);
    if (result) {
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
    const result = await artistRepository.deleteById(id);
    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy, ValidateArtist };
