import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Resource not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
