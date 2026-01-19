"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountSchema = exports.authSchema = exports.ListOFShipmentSchema = exports.createShipmentSchema = exports.UpdateProfileSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const schema_1 = require("../db/schema");
exports.UpdateProfileSchema = zod_1.default.object({
    email: zod_1.default.email().optional(),
    password: zod_1.default.string().optional(),
    id: zod_1.default.string().optional(),
    full_name: zod_1.default.string().optional(),
    phone: zod_1.default.string().optional(),
    company_name: zod_1.default.string().optional(),
    address: zod_1.default.string().optional(),
    city: zod_1.default.string().optional(),
    country: zod_1.default.string().optional(),
    avatar_url: zod_1.default.string().optional(),
    partner_code: zod_1.default.string().optional(),
    is_active: zod_1.default.boolean().optional(),
    updated_at: zod_1.default.boolean().optional()
});
exports.createShipmentSchema = zod_1.default.object({
    senderName: zod_1.default.string(),
    senderPhone: zod_1.default.string(),
    senderEmail: zod_1.default.email(),
    senderAddress: zod_1.default.string(),
    senderCity: zod_1.default.string(),
    receiverName: zod_1.default.string(),
    receiverPhone: zod_1.default.string(),
    receiverEmail: zod_1.default.email(),
    receiverAddress: zod_1.default.string(),
    receiverCity: zod_1.default.string(),
    totalWeightKg: zod_1.default.number(),
    declaredValueNgn: zod_1.default.number(),
    shippingCostNgn: zod_1.default.number(),
    insuranceCost: zod_1.default.number(),
    totalCostNgn: zod_1.default.number(),
    specialInstructions: zod_1.default.string().nullable(),
    isFragile: zod_1.default.boolean(),
    requiresInsurance: zod_1.default.boolean(),
    status: zod_1.default.enum(schema_1.shipmentStatus)
});
const ShipmentItemSchema = zod_1.default.object({
    shipmentId: zod_1.default.string(),
    description: zod_1.default.string(),
    quantity: zod_1.default.number(),
    weightKg: zod_1.default.number(),
    declaredValueNgn: zod_1.default.number(),
});
exports.ListOFShipmentSchema = zod_1.default.array(ShipmentItemSchema);
exports.authSchema = zod_1.default.object({
    email: zod_1.default.email({ error: "Invalid email" }),
    password: zod_1.default.string().min(3).max(10),
});
exports.createAccountSchema = exports.authSchema.extend({
    fullName: zod_1.default.string()
});
