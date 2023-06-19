"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT);
app.use(body_parser_1.default.json());
app.get("/", (_req, res) => {
    return res.status(200).send("Hello world");
});
app.use("/user", userRouter_1.default);
app.listen(port, () => {
    console.log(`Application started on port ${port}`);
});
