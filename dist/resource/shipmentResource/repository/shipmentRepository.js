"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../../db");
const schema_1 = require("../../../db/schema");
class ShipRepository {
    constructor() {
        this.db = db_1.db;
    }
    async getUserShipments(userId) {
        return await this.db.select({ id: schema_1.shipments.id, trackingNumber: schema_1.shipments.tracking_number, status: schema_1.shipments.status, receiverName: schema_1.shipments.receiver_name, receiverCountry: schema_1.shipments.receiver_country, estimatedDeliver: schema_1.shipments.estimated_delivery }).from(schema_1.shipments).where((0, drizzle_orm_1.eq)(schema_1.shipments.customer_id, userId));
    }
    async getShipmentByTrackingNumber(trackingNumber) {
        const shipmentDetails = await this.db.select()
            .from(schema_1.shipments)
            .where((0, drizzle_orm_1.eq)(schema_1.shipments.tracking_number, trackingNumber))
            .leftJoin(schema_1.tracking_events, (0, drizzle_orm_1.eq)(schema_1.tracking_events.shipment_id, schema_1.shipments.id));
        return shipmentDetails[0] ?? null;
    }
    async createShipments(shipmentData) {
        await this.db.insert(schema_1.shipments).values(shipmentData);
        const createdShipment = await this.db.select().from(schema_1.shipments).where((0, drizzle_orm_1.eq)(schema_1.shipments.tracking_number, shipmentData.tracking_number));
        return createdShipment[0] ?? null;
    }
    async createShipmentItems(shipmentItemData) {
        return await this.db.insert(schema_1.shipment_items).values(shipmentItemData);
    }
}
exports.ShipRepository = ShipRepository;
