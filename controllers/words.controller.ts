import { RequestHandler } from "express";

const get: RequestHandler = async (req, res, next) => {
    try {
        res.json([]);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    get
};