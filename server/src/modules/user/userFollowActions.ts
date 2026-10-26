import type { RequestHandler } from "express";
import type { AuthenticationRequest } from "./userActions";
import type { User } from "./userRepository";
import userFollowRepository from "./userFollowRepository";

const follow: RequestHandler = async (req: AuthenticationRequest, res, next) => {
    try {
        const followedId = Number.parseInt(req.params.id);
        const followerId = (req.user as User).id;
        await userFollowRepository.follow(followerId, followedId);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
};

const unfollow: RequestHandler = async (req: AuthenticationRequest, res, next) => {
    try {
        const followedId = Number.parseInt(req.params.id);
        const followerId = (req.user as User).id;
        await userFollowRepository.unfollow(followerId, followedId);
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

const getCounts: RequestHandler = async (req, res, next) => {
    try {
        const userId = Number.parseInt(req.params.id);
        const followers = await userFollowRepository.getFollowerCount(userId);
        const following = await userFollowRepository.getFollowingCount(userId);
        res.json({ followers, following });
    } catch (error) {
        next(error);
    }
};

export default { follow, unfollow, checkFollow, getCounts };