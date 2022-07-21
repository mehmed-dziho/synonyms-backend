import app from "./app";

const port = 4000;

app.listen(process.env.PORT || port, () => {
    console.log(`App server listening on port ${port}`);
});