import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handler } from "./error/handler";

const app = express();
app.use(express.json());

app.use(handler);

export default app;
