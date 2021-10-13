import supertest from "supertest";
import app from "../app";
import { dbConnect, dbDisconnect } from "../database/mongoMemoryConnect";

// const id = "";
const userData: Record<string, any> = {};
const url = "/api/v1/";

beforeAll(async () => {
  await dbConnect();
});

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
    userData.id = res.body.data.user._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("status");
  });
});

describe("User  Login", () => {
  it("should create login a registered user", async () => {
    const logUser = {
      username: "joseph",
      password: "mypass",
    };
    const res = await supertest(app).post(`${url}users/login`).send(logUser);
    userData.id = res.body.data._id;
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("status");
  });
});
