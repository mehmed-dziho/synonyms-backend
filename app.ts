require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

import { Word } from "./src/types/types";
import { Express } from "express";

// Structure of data will be { groupId: Array<Word> }
export const data: Record<string, Array<Word>> = {};

// Initialize app
const express = require("express");
const app: Express = express();
app.use(express.json());

// Routers
const wordsRouter = require("./src/routes/words.route");
app.use("/words", wordsRouter);

// Exports
export default app;
