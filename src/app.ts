import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handler } from "./error/handler";
import usersRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import requestsRoutes from "./routes/requests.routes";
import companyRoutes from "./routes/company.routes";
import vehiclesRoutes from "./routes/vehicles.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/requests", requestsRoutes);
app.use("/company", companyRoutes);
app.use("/vehicles", vehiclesRoutes);

app.use(handler);

export default app;
