import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/errorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello from Moto Shine API",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
