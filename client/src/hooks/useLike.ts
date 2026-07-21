import { useEffect, useState } from "react";
import { useUser } from "../contexts/user.context";
import { API_URL } from "../utils/api";

export function useLike(artworkId: number) {
    const { user } = useUser();
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/api/artworks/${artworkId}/like`)
            .then((res) => res.json())
            .then((data) => {
                setLikeCount(data.length);
                setIsLiked(data.some((l: { user_id: number }) => l.user_id === user?.id));
            });
    }, [artworkId, user?.id]);

    const toggleLike = async () => {
        if (!user) return;
        if (isLiked) {
            await fetch(`${API_URL}/api/artworks/${artworkId}/like`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({ user_id: user.id }),
            });
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
        } else {
            await fetch(`${API_URL}/api/artworks/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
                body: JSON.stringify({ user_id: user.id, artwork_id: artworkId }),
            });
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
        }
    };

    return { likeCount, isLiked, toggleLike };
}