"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app_error_1 = require("./utils/app-error");
const response_handler_1 = require("./utils/response-handler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./resource/authResource/routes/auth.routes");
const constants_1 = require("./constants");
const db_1 = require("./db");
const schema_1 = require("./db/schema");
const user_routes_1 = require("./resource/userResource/routes/user.routes");
const shipments_routes_1 = require("./resource/shipmentResource/route/shipments.routes");
const admin_routes_1 = require("./resource/adminResource/routes/admin.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/hello", (req, res) => {
    res.send("API is running...");
});
app.get('/test', async (req, res) => {
    const users = await db_1.db.select().from(schema_1.profiles);
    res.json(users);
});
app.use(constants_1.BASE_URL, auth_routes_1.authRoute);
app.use(constants_1.BASE_URL, user_routes_1.userRoutes);
app.use(constants_1.BASE_URL, shipments_routes_1.shipmentRoute);
app.use(constants_1.BASE_URL, admin_routes_1.adminRoutes);
app.use((err, req, res, next) => {
    if (err instanceof app_error_1.AppErr) {
        return response_handler_1.ResponseHandler.error(res, err.message, err.statusCode);
    }
    return response_handler_1.ResponseHandler.error(res, `Internal server error and hello ${err}`, 500);
});
exports.default = app;
