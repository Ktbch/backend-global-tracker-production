"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentService = void 0;
const shipmentRepository_1 = require("../repository/shipmentRepository");
const uuid_1 = require("uuid");
class ShipmentService {
    constructor() {
        this.shipmentRepository = new shipmentRepository_1.ShipRepository();
    }
    async getUserShipment(payload) {
        const { id } = payload;
        return await this.shipmentRepository.getUserShipments(id);
    }
    async getShipmentByTrackingNumber(id) {
        return await this.shipmentRepository.getShipmentByTrackingNumber(id);
    }
    async createUserShipment(payload, data) {
        const status = data.status;
        const { id } = payload;
        const dataToInsert = {
            id: (0, uuid_1.v4)(),
            tracking_number: (0, uuid_1.v4)(),
            customer_id: id,
            sender_name: data.senderName,
            sender_phone: data.senderPhone,
            sender_email: data.senderEmail,
            sender_address: data.senderAddress,
            sender_city: data.senderCity,
            receiver_name: data.receiverName,
            receiver_phone: data.receiverPhone,
            receiver_email: data.receiverEmail,
            receiver_address: data.receiverAddress,
            receiver_city: data.receiverCity,
            total_weight_kg: JSON.stringify(data.totalWeightKg),
            declared_value_ngn: JSON.stringify(data.declaredValueNgn),
            shipping_cost_ngn: JSON.stringify(data.shippingCostNgn),
            insurance_cost: JSON.stringify(data.insuranceCost),
            total_cost_ngn: JSON.stringify(data.totalCostNgn),
            is_fragile: data.isFragile,
            requires_insurance: data.requiresInsurance,
            special_instructions: data.specialInstructions,
            status: status,
        };
        return this.shipmentRepository.createShipments(dataToInsert);
    }
    async createShipmentItems(data) {
        console.log(data);
        data.forEach((data) => {
            const dataToInsert = {
                shipment_id: data.shipmentId,
                description: data.description,
                quantity: data.quantity,
                weight_kg: JSON.stringify(data.weightKg),
                declared_value_ngn: JSON.stringify(data.declaredValueNgn)
            };
            this.shipmentRepository.createShipmentItems(dataToInsert).then((r) => r);
        });
    }
}
exports.ShipmentService = ShipmentService;
