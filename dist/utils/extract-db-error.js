"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDbError = extractDbError;
const app_error_1 = require("./app-error");
function extractDbError(error) {
    // MySQL duplicate key
    if (error.cause?.code === "ER_DUP_ENTRY") {
        if (error.sqlMessage?.includes("profiles_email_unique")) {
            return new app_error_1.ConflictError("Email already exists");
        }
        if (error.sqlMessage?.includes("profiles_partner_code_unique")) {
            return new app_error_1.ConflictError("Partner code already exists");
        }
        return new app_error_1.ConflictError("Duplicate record");
    }
    else {
        return new app_error_1.ConflictError(error.cause?.sqlMessage || error.message);
    }
    // Foreign key constraint
    if (error?.code === "ER_NO_REFERENCED_ROW_2") {
        return new app_error_1.BadRequestError("Invalid foreign key reference");
    }
    // Not a DB error → rethrow
    return error;
}
