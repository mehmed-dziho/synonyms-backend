require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

import { Word } from "./src/types/types";
import { Express } from "express";

// Structure of data will be { groupId: Array<Word> }
// Each Word is an object { text, groupId } where groupId is the id of a synonym group

// We expect text to be unique, so we can use it as unique ID
// If two words can have the same text, we would need to introduce a unique identifier field (ex. uuid)

// Redis can also be used instead of this global variable
export const data: Record<string, Array<Word>> = {};

// Initialize app
const express = require("express");
const cors = require("cors");
const app: Express = express();

app.use(express.json());
app.use(cors());

// Routers
const wordsRouter = require("./src/routes/words.route");
app.use("/words", wordsRouter);

// Exports
export default app;
