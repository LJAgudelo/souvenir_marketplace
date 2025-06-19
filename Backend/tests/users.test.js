import request from "supertest";
import app from "../server.js";

describe("Pruebas de usuario - Registro y Login", () => {
  const testEmail = `leidy${Date.now()}@test.com`;
  const testPassword = "123456";

  const userData = {
    email: testEmail,
    password: testPassword,
    name: "Leidy",
    last_name: "Agudelo",
    phone: "1234567890",
    country: "Colombia",
    address: "Cra. 1 #1-1",
    role_id: 1,
  };

  //  Prueba de registro exitoso
  it("POST /register - debería registrar un usuario nuevo", async () => {
    const res = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(userData);

    console.log("➡️ Respuesta registro:", res.statusCode, res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("ok", true);
    expect(res.body).toHaveProperty("message");
  });

  //  Intento de registro duplicado
  it("POST /register - debería rechazar un email ya registrado", async () => {
    const res = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send(userData);

    console.log("➡️ Respuesta duplicado:", res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("ok", false);
    expect(res.body).toHaveProperty("message");
  });

  //  Login exitoso
  it("POST /login - debería autenticar al usuario registrado", async () => {
    const res = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({
        email: testEmail,
        password: testPassword,
      });

    console.log("➡️ Respuesta login:", res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ok", true);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("usuario");
  });

  //  Login fallido (contraseña incorrecta)
  it("POST /login - debería fallar si el password es incorrecto", async () => {
    const res = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({
        email: testEmail,
        password: "contraseña_incorrecta",
      });

    console.log("➡️ Respuesta login inválido:", res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("ok", false);
    expect(res.body).toHaveProperty("message");
  });
});
