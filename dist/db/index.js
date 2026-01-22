"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// db.index.ts
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = __importDefault(require("mysql2/promise"));
const connection = promise_1.default.createPool({
    host: "localhost",
    database: "letherte_global-tracking",
    password: "]467)yTAtGcL?r*)",
    user: "letherte_kay",
    port: 3306
});
exports.db = (0, mysql2_1.drizzle)({ client: connection });
