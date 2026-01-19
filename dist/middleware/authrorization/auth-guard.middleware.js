"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const app_error_1 = require("../../utils/app-error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config.ts/config"));
function authGuard(req, res, next) {
    const token = req.cookies.accessToken;
    if (!token)
        next(new app_error_1.UnAuthorisedRequestError());
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.ACCESS_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    }
    catch (error) {
        next(error);
    }
}
