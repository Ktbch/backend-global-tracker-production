"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIncomingData = void 0;
const app_error_1 = require("../../utils/app-error");
const validateIncomingData = (schema) => (req, res, next) => {
    const validatedData = schema.safeParse(req.body);
    console.log(validatedData.error);
    if (validatedData.error)
        throw new app_error_1.BadRequestError(validatedData.error.message);
    req.body = validatedData.data;
    next();
};
exports.validateIncomingData = validateIncomingData;
