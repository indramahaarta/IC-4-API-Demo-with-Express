"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, firstName, lastName } = req.body;
    const user = yield db_1.default
        .insertInto("User")
        //   .values({ username: username, email: email, password: password })
        .returning(["username", "email"])
        .executeTakeFirst();
    console.log(user);
    //   const catto = await db.transaction().execute(async (trx) => {
    //     const user = await trx
    //       .insertInto("User")
    //       .values({ email: email, password: password, username: username })
    //       .returning(["id", "email", "username"])
    //       .executeTakeFirst();
    //     const profile = await trx
    //       .insertInto("Profile")
    //       .values({ fullname: fullname, userId: user?.id })
    //       .returningAll()
    //       .executeTakeFirst();
    //     return { user: user, profile: profile };
    //   });
    return res.status(200).send(user);
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.default
        .selectFrom("User")
        .select(["id", "username", "email"])
        .execute();
    return res.status(200).send(users);
});
exports.getUser = getUser;
