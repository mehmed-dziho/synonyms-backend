const request = require('supertest');
import app from "../app";
// const app = require("../app");

// REDIS SETUP

// const { createRedisClient } = require("../src/config/redis")
// const client = createRedisClient()
// beforeAll(() => client.connect());

it("words flow", async () => {

    // reads words, should be empty
    let response = await (request(app).get('/words'));
    expect(response.body).toHaveLength(0);

    // create word, bad req (empty body)
    response = await (request(app).post('/words'));
    expect(response.status).toBe(400);

    // create word, bad req (empty word)
    response = await (request(app).post('/words').send({ word: "  " }));
    expect(response.status).toBe(400);

    // create word, success
    response = await (request(app).post('/words').send({
        word: "  Clean "
    }));
    expect(response.status).toBe(201);

    const newWord = response.body;

    expect(newWord.text).toBe("clean");
    expect(newWord).toHaveProperty("groupId")

    // fetch all words
    response = await (request(app).get('/words'));
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([newWord]);

    // search words, should be empty result
    response = await (request(app).get('/words?search=bad'));
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);

    // search words, should be 1 result
    response = await (request(app).get('/words?search= cle '));
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([newWord]);
})

// CLEANUP

// afterAll(() => client.disconnect());