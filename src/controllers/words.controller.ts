import { RequestHandler } from "express";

const wordsService = require("../services/words.services");

const get: RequestHandler = async (req, res, next) => {
    try {
        res.json([]);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const post: RequestHandler = async (req, res, next) => {
    try {
        const { word } = req.body;

        if (!word) {
            return res.status(400).json({ message: "Word is required" });
        }

        // TODO persist into db
        wordsService.addWord(word);

        res.status(201).json([]);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    get,
    post
};