import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import logger from "./utils/logger";

dotenv.config();
const app: Express = express();
const port: number = Number(process.env.PORT);

app.use(morgan("tiny"));
app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send("Hello world");
});
app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  logger.info(`Application started on port ${port}`);
});
