import { Express } from "express";

const express = require("express");
const app: Express = express();
const wordsRouter = require("./routes/words.route");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/words", wordsRouter);

module.exports = app;