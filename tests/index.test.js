const request = require('supertest');
const app = require("../app");

it("works", async () => {
    const response = await (request(app).get('/words'));
    expect(response.body).toHaveLength(0);
})