const request = require('supertest');
const app = require("../app");

const { createRedisClient } = require("../src/config/redis")

const client = createRedisClient()

beforeAll(() => client.connect());

it("words flow", async () => {

    // reads words, should be empty
    let response = await (request(app).get('/words'));
    expect(response.body).toHaveLength(0);

    // create word, bad req (empty body)
    response = await (request(app).post('/words'));
    expect(response.status).toBe(400);

    // create word, success
    response = await (request(app).post('/words').send({
        word: "Clean"
    }));
    expect(response.status).toBe(201);
    expect(response.body).toBe({});
})

afterAll(() => client.disconnect());