import { Express } from "express";

const app: Express = require("./app");

const port = 4000;

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`);
});