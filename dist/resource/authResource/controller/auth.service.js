"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = require("../../userResource/repository/user.repository");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_error_1 = require("../../../utils/app-error");
const Jwt_handle_1 = require("../../../utils/Jwt-handle");
const session_repository_1 = require("../repository/session.repository");
class AuthService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.sessionRepository = new session_repository_1.SesssionRepository();
    }
    async signUp(userInfo) {
        const { email, password, fullName } = userInfo;
        const userId = (0, uuid_1.v4)();
        const hadPassword = await bcrypt_1.default.hash(password, 10);
        await this.userRepository.createUser({
            id: userId,
            email,
            password: hadPassword,
            fullName: fullName,
        });
        await this.userRepository.defaultRole(userId);
        return;
    }
    async login(authDto, meta) {
        const { email, password } = authDto;
        const userFound = await this.userRepository.findUserByEmail(email);
        if (!userFound)
            throw new app_error_1.UnAuthorisedRequestError('invalid credentials');
        const roles = await this.userRepository.getUserRoles(userFound.id);
        if (!roles)
            throw new app_error_1.UnAuthorisedRequestError('User has no roles assigned');
        const isPasswordMatch = await bcrypt_1.default.compare(password, userFound.password);
        if (!isPasswordMatch)
            throw new app_error_1.UnAuthorisedRequestError('invalid credentials');
        const token = Jwt_handle_1.jwtHandler.generateToken(userFound.id);
        const refreshToken = Jwt_handle_1.jwtHandler.generateRefreshToken();
        const sessionId = await this.sessionRepository.createSession({
            user_id: userFound.id,
            refresh_token_hash: Jwt_handle_1.jwtHandler.hashToken(refreshToken),
            ip_address: meta.ip,
            user_agent: meta.userAgent,
            expires_at: Jwt_handle_1.jwtHandler.refreshExpiry(),
        });
        return {
            token,
            refreshToken,
            sessionId,
            user: { ...roles, ...userFound }
        };
    }
    async getLoogedInUser(userPayload) {
        const { id } = userPayload;
        const user = await this.userRepository.findUserById(id);
        const roles = await this.userRepository.getUserRoles(id);
        if (!user || !roles)
            throw new app_error_1.UnAuthorisedRequestError();
        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            roles: roles.role,
        };
    }
    async refresh(sessionId, refreshToken) {
        const session = await this.sessionRepository.findValidSession(sessionId);
        if (!session)
            throw new app_error_1.UnAuthorisedRequestError('Invalid session');
        if (session.expires_at < new Date()) {
            await this.sessionRepository.revokeSession(session.id);
            throw new app_error_1.UnAuthorisedRequestError('Session expired');
        }
        const incomingHash = Jwt_handle_1.jwtHandler.hashToken(refreshToken);
        if (incomingHash !== session.refresh_token_hash) {
            await this.sessionRepository.revokeSession(session.id);
            throw new app_error_1.UnAuthorisedRequestError('Invalid refresh token');
        }
        const newAccessToken = Jwt_handle_1.jwtHandler.generateToken(session.user_id);
        const newRefreshToken = Jwt_handle_1.jwtHandler.generateRefreshToken();
        session.refresh_token_hash = Jwt_handle_1.jwtHandler.hashToken(newRefreshToken);
        session.expires_at = Jwt_handle_1.jwtHandler.refreshExpiry();
        const newSessionId = await this.sessionRepository.createSession({
            user_id: session.user_id,
            refresh_token_hash: session.refresh_token_hash,
            ip_address: session.ip_address,
            user_agent: session.user_agent,
            expires_at: session.expires_at,
        });
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            sessionId: newSessionId
        };
    }
    async logout(sessionId) {
        await this.sessionRepository.revokeSession(sessionId);
    }
    async logoutAll(userId) {
        await this.sessionRepository.revokeAllUserSessions(userId);
    }
}
exports.AuthService = AuthService;
