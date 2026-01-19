"use strict";
// first create the interface
// then the class with static methods
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    static success(res, message, data, status = 200) {
        if (res.headersSent)
            return;
        const response = {
            success: true,
            message: message,
            data: data || null
        };
        return res.status(status).json(response);
    }
    static error(res, message, status = 400, code, error) {
        if (res.headersSent)
            return;
        const response = {
            success: false,
            message: message,
            error: error || null,
            code
        };
        return res.status(status).json(response);
    }
}
exports.ResponseHandler = ResponseHandler;
