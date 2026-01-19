"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../../db");
const schema_1 = require("../../../db/schema");
class AdminRepository {
    constructor() {
        this.db = db_1.db;
    }
    async getAllUsersByRole(usersRole) {
        const usersByRole = await this.db
            .select().from(schema_1.user_roles).where((0, drizzle_orm_1.eq)(schema_1.user_roles, usersRole));
        return usersByRole ?? null;
    }
    async getAllUserProfile() {
        const users = await this.db.select().from(schema_1.profiles);
        return users[0] ?? null;
    }
    async getAllShipments() {
        const allShipments = await this.db.select().from(schema_1.shipments);
        return allShipments ?? null;
    }
    async getAllPayment() {
        const getAllPayment = await this.db.select({ amount: schema_1.payments.amount, staus: schema_1.payments.status }).from(schema_1.payments);
        return getAllPayment ?? null;
    }
    async getProfilesForSpecificUser(id) {
        const specificProfiles = await this.db.select().from(schema_1.profiles).where((0, drizzle_orm_1.inArray)(schema_1.profiles.id, id));
        return specificProfiles ?? null;
    }
    async getPartnersCommision(id) {
        const commisions = await this.db.select().from(schema_1.partner_commissions).where((0, drizzle_orm_1.inArray)(schema_1.partner_commissions.partner_id, id));
        return commisions || null;
    }
}
exports.AdminRepository = AdminRepository;
