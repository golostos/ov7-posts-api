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
                message: "This ID doesn't exist"
            });
        } else if (error.code === 'P2002') {
            const field = (error.meta && Array.isArray(error.meta.target))
                ? error.meta.target[0] as string
                : 'unknown field'
            res.status(400).send({
                message: `This ${field} is already exist`,
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
