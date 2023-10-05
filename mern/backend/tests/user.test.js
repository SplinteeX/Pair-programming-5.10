const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

let token = null;

describe("User API tests", () => {
  test("User can be created with all the fields filled in", async () => {
    const res = await api
      .post("/api/users")
      .send({
        name: "test",
        email: "jeff1134354311@amazon.com",
        password: "Testi1234!",
      })
      .expect(200);
    token = res.body.token;
  });
  test("User can't be created with invalid fields", async () => {
    const res = await api
      .post("/api/users")
      .send({
        name: "test",
        email: "",
        password: "Testi1234!",
      })
      .expect(400);
  });
  test("User can login with valid credentials", async () => {
    const res = await api
      .post("/api/users/login")
      .send({
        email: "jeff1134354311@amazon.com",
        password: "Testi1234!",
      })
      .expect(200);
    token = res.body.token;
  });
  test("User can GET their own information with a valid token", async () => {
    const res = await api
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveProperty("_id");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
