"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const response_handler_1 = require("../../../utils/response-handler");
const constants_1 = require("../../../constants");
const app_error_1 = require("../../../utils/app-error");
const extract_db_error_1 = require("../../../utils/extract-db-error");
const extract_session_meta_1 = require("../../../utils/extract-session-meta");
// handling sql and transforming erros her
class AuthController {
    constructor() {
        // using arrow function o preserve the this key word so it can be safely passed in callbacks
        this.handleSignUp = async (req, res, next) => {
            try {
                await this.authService.signUp(req.body);
                response_handler_1.ResponseHandler.success(res, 'Your Sign-up was succesfull', 200);
            }
            catch (error) {
                const nomalizedError = (0, extract_db_error_1.extractDbError)(error);
                next(nomalizedError);
            }
        };
        this.handleLogin = async (req, res, next) => {
            try {
                const meta = (0, extract_session_meta_1.extractSessionMeta)(req);
                const data = await this.authService.login(req.body, meta);
                res.cookie('accessToken', data.token, constants_1.cookieOption)
                    .cookie('sessionData', data.refreshToken, constants_1.cookieOption)
                    .cookie('sessionId', data.sessionId, constants_1.cookieOption)
                    .status(201)
                    .json(data.user);
            }
            catch (error) {
                next(error);
            }
        };
        this.handgetLoggedInUser = async (req, res, next) => {
            try {
                const loggedinUser = await this.authService.getLoogedInUser(req.user);
                console.log(loggedinUser);
                res.status(200).json(loggedinUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.handleRefresh = async (req, res, next) => {
            try {
                const { accessToken, refreshToken, sessionId } = await this.authService.refresh(req.cookies.sessionId, req.cookies.refreshToken);
                res.cookie('accessToken', accessToken, constants_1.cookieOption)
                    .cookie('refreshToken', refreshToken, constants_1.cookieOption)
                    .cookie('sessionId', sessionId, constants_1.cookieOption)
                    .status(200)
                    .json({ message: 'refresh successful' });
            }
            catch (error) {
                next(new app_error_1.UnAuthorisedRequestError(error));
            }
        };
        this.handleLogout = async (req, res, next) => {
            try {
                res.clearCookie('accessToken', constants_1.cookieOption)
                    .clearCookie('refreshToken', constants_1.cookieOption)
                    .clearCookie('sessionId', constants_1.cookieOption)
                    .status(200)
                    .json({ message: 'Log out successful' });
            }
            catch (error) {
                next(error);
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
