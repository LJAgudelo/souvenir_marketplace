import request from "supertest";
import { app, server } from "../../server.js";

describe("GET /product", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post("/login").send({
      email: "leidy@hotmail.com",
      password: "123456789",
    });

    token = res.body.token;
  });

  it("debería responder con un código 200 y un array", async () => {
    const res = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(() => {
    server && server.close(); // solo si existe el servidor (en tests a veces no)
  });
});
