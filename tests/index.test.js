const request = require('supertest');
const app = require("../app");

it("works", () => {
    request(app)
        .get('/')
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
        });
})