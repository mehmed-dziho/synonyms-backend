import { Express } from "express";
import dotenv from "dotenv";

const app: Express = require("./app");

const port = 4000;

// env
dotenv.config({
    path: `.env`
});


app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`);
});