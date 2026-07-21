import type { RequestHandler } from "express";
import userFollowRepository from "./userFollowRepository";

const follow: RequestHandler = async (req, res, next) => {
    try {
        const followedId = Number.parseInt(req.params.id);
        const { follower_id } = req.body;
        await userFollowRepository.follow(follower_id, followedId);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
};

const unfollow: RequestHandler = async (req, res, next) => {
    try {
        const followedId = Number.parseInt(req.params.id);
        const { follower_id } = req.body;
        await userFollowRepository.unfollow(follower_id, followedId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const checkFollow: RequestHandler = async (req, res, next) => {
    try {
        const followedId = Number.parseInt(req.params.id);
        const followerId = Number.parseInt(req.query.follower_id as string);
        const isFollowing = await userFollowRepository.isFollowing(followerId, followedId);
        res.json({ isFollowing });
    } catch (error) {
        next(error);
    }
};

export default { follow, unfollow, checkFollow };