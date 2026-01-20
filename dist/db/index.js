"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// db.index.ts
require("dotenv/config");
const mysql2_1 = require("drizzle-orm/mysql2");
const config_1 = __importDefault(require("../config.ts/config"));
const promise_1 = __importDefault(require("mysql2/promise"));
const connection = promise_1.default.createPool({
    host: config_1.default.dbHost,
    database: config_1.default.dbName,
    password: config_1.default.dbPassword,
    user: config_1.default.dbUser,
    port: Number(config_1.default.port)
});
exports.db = (0, mysql2_1.drizzle)({ client: connection });
