import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
        res.status(400).send({
            errors: error.errors
        });
    } else if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            res.status(400).send({
                message: "The Post ID doesn't exist"
            });
        } else {
            res.status(400).send({
                message: error.message,
                code: error.code
            });
        }
    } else if (error instanceof Error) {
        res.status(500).send({
            message: error.message
        });
    }
};
