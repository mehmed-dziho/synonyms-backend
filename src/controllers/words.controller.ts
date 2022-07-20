import { RequestHandler } from "express";

const wordsService = require("../services/words.services");

const get: RequestHandler = async (req, res, next) => {
    try {
        const search = req.query?.search;

        const words = wordsService.getWords(search as string);

        return res.json(words);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const post: RequestHandler = async (req, res, next) => {
    try {
        const word = req.body?.word?.trim()?.toLowerCase();

        if (!word) {
            return res.status(400).json({ message: "Word is required" });
        }

        // TODO persist into db
        try {
            const newWord = wordsService.addWord(word);

            return res.status(201).json(newWord);
        } catch (err: unknown) {
            return res.status(400).json({ message: err });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    get,
    post
};