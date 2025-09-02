"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                    code: issue.code,
                }));
                res.status(400).json({
                    success: false,
                    error: 'Erro de validação',
                    details: errors
                });
            }
            else {
                next(error);
            }
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map