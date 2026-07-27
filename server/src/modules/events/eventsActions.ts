import type { RequestHandler } from "express";

const getEvents: RequestHandler = async (req, res, next) => {
    try {
        const { lat, lon } = req.query;
        const lat1 = Number(lat) - 0.1;
        const lat2 = Number(lat) + 0.1;
        const lon1 = Number(lon) - 0.1;
        const lon2 = Number(lon) + 0.1;

        const response = await fetch(
            `https://api.openagenda.com/v2/events?key=${process.env.OPENAGENDA_KEY}&bbox=${lon1},${lat1},${lon2},${lat2}&size=50&keyword=art`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export default { getEvents };