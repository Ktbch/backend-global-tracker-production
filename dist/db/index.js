"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// db.index.ts
require("dotenv/config");
const mysql2_1 = require("drizzle-orm/mysql2");
exports.db = (0, mysql2_1.drizzle)("mysql://letherte_letherte:AMAsQ(]ZF^BsqgF@192.168.168.2/letherte_global-tracking");
