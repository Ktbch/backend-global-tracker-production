"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppConfig = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL || '',
    dbName: process.env.DATABASE_NAME || '',
    dbPassword: process.env.DATABASE_PASSWORD || '',
    dbHost: process.env.DATABASE_HOST || '',
    dbUser: process.env.DATABASE_USER || '',
    dbPort: process.env.DATABASE_PORT || '',
    ACCESS_SECRET: process.env.ACCESS_SECRET || '',
    REFRESH_SECRET: process.env.REFRESH_SECRET || ''
};
exports.default = AppConfig;
