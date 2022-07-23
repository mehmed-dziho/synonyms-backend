import app, { data } from "./app";

const port = 4000;

const MAXIMUM_ALLOWED_MEMORY_USAGE = 400;       // in MB
const CHECK_MEMORY_EVERY_N_SECONDS = 30;

app.listen(process.env.PORT || port, () => {
    console.log(`App server listening on port ${port}`);

    setInterval(() => {
        const used = Math.round(process.memoryUsage().heapTotal / 1024 / 1024);
        console.log(`The app is using approximately ${used} MB`);

        if (used > MAXIMUM_ALLOWED_MEMORY_USAGE) {
            // we can do something here if memory usage is too high
            // for example we can save current data in a file
            // or we can reset app state ( or both )
            for (const synonymGroupId of Object.getOwnPropertyNames(data)) {
                delete data[synonymGroupId];
            }
        }
    }, 1000 * CHECK_MEMORY_EVERY_N_SECONDS);
});