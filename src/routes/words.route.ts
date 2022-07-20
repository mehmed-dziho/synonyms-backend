import { Router } from "express";

const express = require("express");
const router: Router = express.Router();
const wordsController = require("../controllers/words.controller");

router.get("/", wordsController.get);
router.post("/", wordsController.post);
router.get("/:word/synonyms", wordsController.getSynonyms);
router.put("/:word", wordsController.put);
router.delete("/:word", wordsController.remove);

module.exports = router;