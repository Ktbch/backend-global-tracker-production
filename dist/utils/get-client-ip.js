"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientIp = getClientIp;
function getClientIp(req) {
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (typeof xForwardedFor === "string") {
        return xForwardedFor.split(",")[0].trim();
    }
    return req.socket.remoteAddress || null;
}
