require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

import { Express } from "express";

const express = require("express");
const app: Express = express();

app.use(express.json());

const wordsRouter = require("./src/routes/words.route");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/words", wordsRouter);

module.exports = app;