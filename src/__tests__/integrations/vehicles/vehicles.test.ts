import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedAdmin, mockedAdminLogin } from "../../mocks";
import { companyMock } from "../../mocks/company";
import { mockedVehicle } from "../../mocks/vehicles";

describe("/vehicles", () => {
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
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    await request(app)
      .post("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(companyMock);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST vehicles/company/:id - Should be able to create a vehicle register", async () => {
    await request(app).post("/users").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const getCompany = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const companyId = getCompany.body[0].id;

    const response = await request(app)
      .post(`/vehicles/company/${companyId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedVehicle);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("sign");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("companyWorkPlace");
    expect(response.body.companyWorkPlace).toHaveProperty("id");
    expect(response.body.companyWorkPlace).toHaveProperty("name");
    expect(response.body.companyWorkPlace).toHaveProperty("isActive");
    expect(response.body.companyWorkPlace).toHaveProperty("openingTime");
    expect(response.body.companyWorkPlace).toHaveProperty("cnpj");
    expect(response.body.companyWorkPlace).toHaveProperty("createdAt");
    expect(response.body.companyWorkPlace).toHaveProperty("updatedAt");
    expect(response.status).toBe(201);
  });

  test("GET vehicles/company/:id - Should be able to list all companies", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const getCompany = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const companyId = getCompany.body[0].id;

    const response = await request(app)
      .get(`/vehicles/company/${companyId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body.vehicles).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("DELETE vehicles/:id - Should be able to deleted a vehicle register", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const getCompany = await request(app)
      .get("/company")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const companyId = getCompany.body[0].id;

    const getVehicles = await request(app)
      .get(`/vehicles/company/${companyId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const vehicleId = getVehicles.body.vehicles[0].id;

    const response = await request(app)
      .delete(`/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const isDeleted = await request(app)
      .get(`/vehicles/company/${companyId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(isDeleted.body).toBe(null);
    expect(response.status).toBe(204);
  });
});
