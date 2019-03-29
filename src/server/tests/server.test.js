import app from "../server";

import request from "supertest";

const testUserData = {
    email: "anyEmail",
    password: "anyPassword"
}

describe("server", () => {
    test("GET /health  - returns health check", async (done) => {
        expect.assertions(2);
        const response = await request(app).get("/health");
        expect(response.statusCode).toEqual(200);
        expect(response.body.uptime).toEqual(expect.any(Number));
        done();
    });

    test("GET /info - returns basic package info", async (done) => {
        expect.assertions(3);
        const response = await request(app).get("/info");
        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual(expect.any(String));
        expect(response.body.version).toEqual(expect.any(String));
        done();
    })

    test("POST /register - sign up a new user", async (done) => {
        expect.assertions(1);
        const response = await request(app).post("/register")
            .send(testUserData);
        expect(response.body.token).toEqual(expect.any(String));
        done();
    });
})