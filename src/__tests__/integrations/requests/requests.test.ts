import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedAdmin, mockedAdminLogin, mockedRequest } from "../../mocks";

describe("/requests", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /requests -  Must be able to create a request", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .post("/requests")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedRequest);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("cubicMeters");
    expect(response.body).toHaveProperty("weight");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("zipCode");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
    expect(response.status).toBe(201);
  });

  test("GET /requests -  Must be able to list all requests", async () => {
    const response = await request(app).get("/requests");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("PATCH /requests/:id - should be able to update request status", async () => {
    const newValues = { status: "completo" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const requestTobeUpdateRequest = await request(app)
      .get("/requests")
      .set("Authorization", token);
    const requestTobeUpdateId = requestTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/requests/${requestTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });
});
