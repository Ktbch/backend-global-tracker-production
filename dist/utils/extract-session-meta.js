"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSessionMeta = void 0;
const get_client_ip_1 = require("./get-client-ip");
const extractSessionMeta = (req) => {
    return {
        ip: (0, get_client_ip_1.getClientIp)(req),
        userAgent: req.headers["user-agent"] || null,
    };
};
exports.extractSessionMeta = extractSessionMeta;
