"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config.ts/config"));
const crypto_1 = __importDefault(require("crypto"));
exports.jwtHandler = {
    generateToken: (id) => {
        return jsonwebtoken_1.default.sign({ id }, config_1.default.ACCESS_SECRET, { expiresIn: '15m' });
    },
    verify: (token) => {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.ACCESS_SECRET);
        return decoded;
    },
    generateRefreshToken: () => {
        return crypto_1.default.randomBytes(64).toString('hex');
    },
    hashToken(token) {
        return crypto_1.default.createHash('sha256').update(token).digest('hex');
    },
    refreshExpiry() {
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
};
