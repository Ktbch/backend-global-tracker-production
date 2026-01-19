"use strict";
// App-error.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.UnAuthorisedRequestError = exports.BadRequestError = exports.ConflictError = exports.NotFoundError = exports.AppErr = void 0;
class AppErr extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppErr = AppErr;
const notFoundDefaultMessage = 'Not found';
class NotFoundError extends AppErr {
    constructor(message = notFoundDefaultMessage) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppErr {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
const badRequestDefaultMessage = 'Bad Request';
class BadRequestError extends AppErr {
    constructor(message = badRequestDefaultMessage) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
const unAuthorizedDefaultMessage = 'UnAuthorized request';
class UnAuthorisedRequestError extends AppErr {
    constructor(message = unAuthorizedDefaultMessage) {
        super(message, 401);
    }
}
exports.UnAuthorisedRequestError = UnAuthorisedRequestError;
const internalServerErrorDefaultMessage = 'An internal Server error occured';
class InternalServerError extends AppErr {
    constructor(message = internalServerErrorDefaultMessage) {
        super(message, 500);
    }
}
exports.InternalServerError = InternalServerError;
