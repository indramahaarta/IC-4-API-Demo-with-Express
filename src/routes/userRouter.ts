import { Router } from "express";
import { createUser, getUser } from "../controller/user";
import validate from "../middleware/validate";
import { body } from "express-validator";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post(
  "/",
  validate([
    body("email").exists().isString(),
    body("username").exists().isString(),
    body("password").exists().isString(),
    body("firstName").exists().isString(),
    body("lastName").exists().isString(),
  ]),
  createUser
);

export default userRouter;
