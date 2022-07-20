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

const getSynonyms: RequestHandler = async (req, res, next) => {
    try {
        const word = req.params.word;

        if (!word) {
            throw new Error("No group id sent.");
        }

        const synonyms = wordsService.getSynonyms(word);

        return res.json(synonyms);
    } catch (err) {
        // console.error(err);
        return res.status(400).json({ message: err });
    }
};

const post: RequestHandler = async (req, res, next) => {
    try {
        const word = req.body?.word?.trim()?.toLowerCase();
        const groupId = req.body.groupId;

        if (!word) {
            return res.status(400).json({ message: "Word is required" });
        }

        // TODO persist into db
        try {
            const newWord = wordsService.addWord(word, groupId);

            return res.status(201).json(newWord);
        } catch (err: unknown) {
            return res.status(400).json({ message: err });
        }
    } catch (err) {
        // console.error(err);
        return res.status(400).json({ message: err });
    }
};

const put: RequestHandler = async (req, res, next) => {
    try {
        const word = req.params?.word?.trim()?.toLowerCase();

        const newText = req.body?.text?.trim()?.toLowerCase();

        if (!word) {
            return res.status(400).json({ message: "Word is required." });
        }

        if (!Boolean(newText)) {
            return res.status(400).json({ message: "Text cant be empty." });
        }

        try {
            const updatedWord = wordsService.updateWord(word, newText);
            return res.status(200).json(updatedWord);
        } catch (err: unknown) {
            return res.status(400).json({ message: err });
        }
    } catch (err) {
        // console.error(err);
        return res.status(400).json({ message: err });
    }
};

const remove: RequestHandler = async (req, res, next) => {
    try {
        const wordText = req.params.word;
        wordsService.deleteWord(wordText);
        return res.status(204).json(null);
    } catch (err) {
        // console.error(err);
        next(err);
        return res.status(400).json({ message: err });
    }
};

module.exports = {
    get,
    getSynonyms,
    post,
    put,
    remove
};