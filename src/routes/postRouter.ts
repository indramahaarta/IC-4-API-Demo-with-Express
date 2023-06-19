import { Router } from "express";
import { createPost, getPost } from "../controller/post";
import validate from "../middleware/validate";
import { body, param } from "express-validator";

const postRouter = Router();

postRouter.post(
  "/",
  [
    validate([
      body("title").exists().isString(),
      body("content").exists().isString(),
      body("creatorId").exists().isNumeric(),
    ]),
  ],
  createPost
);

postRouter.get("/", [param("creatorId").optional().isNumeric()], getPost);

export default postRouter;
