import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedAdmin, mockedAdminLogin } from "../../mocks";
import { companyMock } from "../../mocks/company";

describe("/company", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /company - Should be able to create a company/unit", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .post("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(companyMock);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("openingTime");
    expect(response.body).toHaveProperty("cnpj");
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("zipCode");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body).toHaveProperty("contacts");
    expect(response.body.contacts).toHaveProperty("id");
    expect(response.body.contacts).toHaveProperty("phoneNumber");
    expect(response.body.contacts).toHaveProperty("email");
    expect(response.status).toBe(201);
  });

  test("GET /company - Should be able to list all companies", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /company/:id - Should be able to list a specific company", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const getCompany = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const companyId = getCompany.body[0].id;

    const response = await request(app)
      .get(`/company/${companyId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
  });

  test("PATCH /company/:id - Should be able to update a opening hours in company route.", async () => {
    const updatedMock = "10:00 às 15:00";
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const getCompany = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const companyId = getCompany.body[0].id;

    const response = await request(app)
      .patch(`/company/${companyId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({ openingTime: updatedMock });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("openingTime");
    expect(response.body.openingTime).toEqual("10:00 às 15:00");
    expect(response.status).toBe(200);
  });

  test("DELETE /company/:id - Should be able to deactivate a company", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const getCompany = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const companyId = getCompany.body[0].id;

    const response = await request(app)
      .delete(`/company/${companyId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const isDeactivate = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(isDeactivate.body[0].isActive).toBe(false);
  });
});
