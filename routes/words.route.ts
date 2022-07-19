import { Router } from "express";

const express = require('express');
const router: Router = express.Router();
const wordsController = require('../controllers/words.controller');

router.get('/', wordsController.get);

module.exports = router;