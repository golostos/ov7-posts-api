"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const library_1 = require("@prisma/client/runtime/library");
const zod_1 = require("zod");
const errorHandler = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).send({
            errors: error.errors
        });
    }
    else if (error instanceof library_1.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            res.status(400).send({
                message: "This ID doesn't exist"
            });
        }
        else if (error.code === 'P2002') {
            const field = (error.meta && Array.isArray(error.meta.target))
                ? error.meta.target[0]
                : 'unknown field';
            res.status(400).send({
                message: `This ${field} is already exist`,
            });
        }
        else {
            res.status(400).send({
                message: error.message,
                code: error.code
            });
        }
    }
    else if (error instanceof Error) {
        res.status(500).send({
            message: error.message
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map