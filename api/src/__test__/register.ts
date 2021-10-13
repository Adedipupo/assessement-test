import supertest from "supertest";
import app from "../app";
import { dbDisconnect } from "../database/mongoMemoryConnect";

// const id = "";
const userData: Record<string, any> = {};
const url = "/api/v1/";

afterAll(async () => {
  await dbDisconnect();
});

describe("User Register", () => {
  it("should create an account for a new user", async () => {
    const logUser = {
      username: "joseph",
      password: "mypass",
    };
    const res = await supertest(app).post(`${url}users/register`).send(logUser);
    userData.id = res.body.data.data._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("status");
  });
});
