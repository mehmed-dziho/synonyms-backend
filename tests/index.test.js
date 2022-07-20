const request = require("supertest");
import app from "../app";
// const app = require("../app");

// REDIS SETUP

// const { createRedisClient } = require("../src/config/redis")
// const client = createRedisClient()
// beforeAll(() => client.connect());

const superRequest = request(app);

it("words flow", async () => {

    // reads words, should be empty
    let response = await (superRequest.get("/words"));
    expect(response.body).toHaveLength(0);

    // create word, bad req (empty body)
    response = await (superRequest.post("/words"));
    expect(response.status).toBe(400);

    // create word, bad req (empty word)
    response = await (superRequest.post("/words").send({ word: "  " }));
    expect(response.status).toBe(400);

    // create word, success
    response = await (superRequest.post("/words").send({
        word: "  Clean "
    }));
    expect(response.status).toBe(201);

    const newWord = response.body;

    expect(newWord.text).toBe("clean");
    expect(newWord).toHaveProperty("groupId");

    // fetch all words
    response = await (superRequest.get("/words"));
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([ newWord ]);

    // search words, should be empty result
    response = await (superRequest.get("/words?search=bad"));
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);

    // search words, should be 1 result
    response = await (superRequest.get("/words?search= cle "));
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([ newWord ]);


    // create synonym, bad group
    response = await (superRequest.post("/words").send({
        word: "Wash",
        groupId: "FAIL"
    }));
    expect(response.status).toBe(400);

    // create synonym, should be success
    response = await (superRequest.post("/words").send({
        word: "Wash",
        groupId: newWord.groupId
    }));
    expect(response.status).toBe(201);
    expect(response.body.text).toBe("wash");
    expect(response.body.groupId).toBe(newWord.groupId);

    // fetch synonyms, bad word
    response = await (superRequest.get(`/words/BAD_WORD/synonyms`));
    expect(response.status).toBe(400);

    // fetch synonyms for word "clean"
    response = await (superRequest.get(`/words/clean/synonyms`));
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([
        {
            text: "wash",
            groupId: newWord.groupId
        }
    ]);

    // edit word, case word does not exist
    response = await (superRequest.put("/words/BAD_WORD").send({
        text: "  Cleanse  ",
    }));
    expect(response.status).toBe(400);

    // edit word, success
    response = await (superRequest.put("/words/clean").send({
        text: "  Cleanse  ",
    }));
    expect(response.status).toBe(200);
    expect(response.body.text).toBe("cleanse");

    // delete word, doesnt exist
    response = await (superRequest.delete("/words/BAD_WORD"));
    expect(response.status).toBe(400);

    // delete word, success
    response = await (superRequest.delete("/words/cleanse"));
    expect(response.status).toBe(204);

    // now there should be no synonyms for word "wash"
    response = await (superRequest.get(`/words/wash/synonyms`));
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
});


// CLEANUP

// afterAll(() => client.disconnect());