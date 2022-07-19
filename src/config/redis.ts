import { createClient } from "redis";

function createRedisClient() {
    console.log(process.env.REDIS_URL);
    return createClient({ url: process.env.REDIS_URL });
}

module.exports = {
    createRedisClient
};