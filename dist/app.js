"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-check
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const posts_1 = require("./routes/posts");
const errorHandler_1 = require("./errorHandler");
const users_1 = require("./routes/users");
const authRouter_1 = require("./routes/authRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// app.use(cors({
//     origin: ['http://127.0.0.1:5173', 'http://localhost:5173']
// }))
// body parser (json)
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// HTTP API - application programming interface
app.use('/api/posts', posts_1.postsRouter);
app.use('/api/users', users_1.usersRouter);
app.use(authRouter_1.authRouter);
app.use(errorHandler_1.errorHandler);
app.listen(3333);
//# sourceMappingURL=app.js.map