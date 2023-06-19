import { Request, Response } from "express";
import { UserInputDto } from "../dto/dto";
import db from "../config/db";

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email, firstName, lastName }: UserInputDto =
    req.body;

  try {
    await db.transaction().execute(async (trx) => {
      const user = await trx
        .insertInto("User")
        .values({ username: username, password: password, email: email })
        .returning(["id", "username", "email"])
        .executeTakeFirstOrThrow();

      const profile = await trx
        .insertInto("Profile")
        .values({ firstName: firstName, lastName: lastName, userId: user.id })
        .returning(["firstName", "lastName"])
        .executeTakeFirstOrThrow();

      return res.status(200).send({ user, profile });
    });
  } catch (err: any) {
    return res.status(500).send(err);
  }
};

export const getUser = async (_req: Request, res: Response) => {
  const users = await db
    .selectFrom("User")
    .select(["id", "username", "email"])
    .execute();

  return res.status(200).send(users);
};
