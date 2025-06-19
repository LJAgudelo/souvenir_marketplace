import request from "supertest";
import app from "../server.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

describe("GET /product", () => {
  let token;

  // Ejecutar antes de los tests: hacer login para obtener el token
  beforeAll(async () => {
    const loginResponse = await request(app).post("/login").send({
      email: "leidy175030105506@test.com",
      password: "123456",
    });

    token = loginResponse.body.token;

    // Validar que el login fue exitoso y el token está presente
    expect(loginResponse.statusCode).toBe(200);
    expect(token).toBeDefined();
  });

  it("debería responder con un código 200 y un array", async () => {
    const res = await request(app)
      .get("/product")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
