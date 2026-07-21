import db_client from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

async function follow(followerId: number, followedId: number) {
    const [result] = await db_client.query<Result>(
        "INSERT IGNORE INTO user_following_user (follower_id, followed_id) VALUES (?, ?)",
        [followerId, followedId],
    );
    return result;
}

async function unfollow(followerId: number, followedId: number) {
    const [result] = await db_client.query<Result>(
        "DELETE FROM user_following_user WHERE follower_id = ? AND followed_id = ?",
        [followerId, followedId],
    );
    return result;
}

async function isFollowing(followerId: number, followedId: number) {
    const [[row]] = await db_client.query<Rows>(
        "SELECT 1 FROM user_following_user WHERE follower_id = ? AND followed_id = ?",
        [followerId, followedId],
    );
    return !!row;
}

async function getFollowerCount(userId: number) {
    const [[row]] = await db_client.query<Rows>(
        "SELECT COUNT(*) as count FROM user_following_user WHERE followed_id = ?",
        [userId],
    );
    return row.count;
}

async function getFollowingCount(userId: number) {
    const [[row]] = await db_client.query<Rows>(
        "SELECT COUNT(*) as count FROM user_following_user WHERE follower_id = ?",
        [userId],
    );
    return row.count;
}

export default { follow, unfollow, isFollowing, getFollowerCount, getFollowingCount };