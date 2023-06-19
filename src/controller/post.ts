import { Request, Response } from "express";
import db from "../config/db";
import { PostInputDto } from "../dto/dto";
import { jsonArrayFrom } from "kysely/helpers/postgres";

export const createPost = async (req: Request, res: Response) => {
  const { title, content, creatorId }: PostInputDto = req.body;

  const post = await db
    .insertInto("Post")
    .values({ title: title, content: content, creatorId: creatorId })
    .returningAll()
    .executeTakeFirst();

  return res.status(200).send(post);
};

export const getPost = async (req: Request, res: Response) => {
  const { creatorId } = req.query;

  let query = db
    .selectFrom("User")
    .leftJoin("Post", "Post.creatorId", "User.id")
    .select((eb) => [
      "User.username",
      jsonArrayFrom(
        eb
          .selectFrom("Post")
          .select([
            "Post.id",
            "Post.title",
            "Post.content",
            "Post.updatedAt",
            "Post.createdAt",
          ])
          .whereRef("User.id", "=", "Post.creatorId")
      ).as("post"),
      eb.fn.count("Post.id").as("post count"),
    ])
    .groupBy(["User.username", "User.id"]);

  if (creatorId) {
    const user = await db
      .selectFrom("User")
      .select("id")
      .where("User.id", "=", Number(creatorId))
      .executeTakeFirst();

    if (user?.id) {
      query = query.having("User.id", "=", Number(creatorId));
      return res.status(200).send(await query.executeTakeFirst());
    } else {
      return res.status(500).send({ message: "User not found!" });
    }
  } else {
    return res
      .status(200)
      .send(await query.orderBy("post count", "desc").execute());
  }
};
