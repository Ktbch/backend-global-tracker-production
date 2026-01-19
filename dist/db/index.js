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
exports.db = (0, mysql2_1.drizzle)(config_1.default.dbUrl);
