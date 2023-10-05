const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Goal = require("../models/goalModel");
const goals = require("./data/goals.js");

let token = null;

beforeAll(async () => {
    await User.deleteMany({});
    const result = await api
      .post("/api/user/signup")
      .send({name: "ssf", email: "mattiv@matti.fi", password: "R3g5T7#gh" });
    token = result.body.token;
  });

describe("Goal API tests", () => {
    beforeEach(async () => {
        await Goal.deleteMany({});
        await api
          .post("/api/goals")
          .set("Authorization", "bearer " + token)
          .send(goals[0])
          .send(goals[1]);
    });

    describe("GET /api/goals", () => {
        test("Goals are returned", async () => {
            await api
              .get("/api/goals")
              .set("Authorization", "bearer " + token)
              .expect(200)
        });
        test("Goals are returned as json", async () => {
            await api
              .get("/api/goals")
              .set("Authorization", "bearer " + token)
              .expect(200)
              .expect("Content-Type", /application\/json/);
        });
    });
});