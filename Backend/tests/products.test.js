import request from "supertest";
import app from "../server.js";

describe("GET/product", () => {
  it("deberia responder con un código 200 y un array", async () => {
    const res = await request(app).get("/product");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
