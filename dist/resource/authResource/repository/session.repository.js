"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesssionRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../../db");
const schema_1 = require("../../../db/schema");
const uuid_1 = require("uuid");
class SesssionRepository {
    constructor() {
        this.db = db_1.db;
    }
    async createSession(newSession) {
        const id = (0, uuid_1.v4)();
        await this.db.insert(schema_1.sessions).values({ id, ...newSession });
        return id;
    }
    async findValidSession(id) {
        const validSession = await this.db.select().from(schema_1.sessions).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.sessions.id, id), (0, drizzle_orm_1.isNull)(schema_1.sessions.revoked_at))).limit(1);
        return validSession[0] || null;
    }
    async revokeSession(id) {
        await this.db
            .update(schema_1.sessions)
            .set({ revoked_at: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.sessions.id, id));
    }
    async revokeAllUserSessions(userId) {
        await this.db
            .update(schema_1.sessions)
            .set({ revoked_at: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.sessions.user_id, userId));
    }
}
exports.SesssionRepository = SesssionRepository;
