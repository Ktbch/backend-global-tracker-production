"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../../db");
const schema_1 = require("../../../db/schema");
const uuid_1 = require("uuid");
class UserRepository {
    constructor() {
        this.db = db_1.db;
    }
    async createUser(userDto) {
        return await this.db.insert(schema_1.profiles)
            .values({ id: userDto.id, email: userDto.email, password: userDto.password, full_name: userDto.fullName });
    }
    async findUserByEmail(email) {
        const users = await this.db.select().from(schema_1.profiles).where((0, drizzle_orm_1.eq)(schema_1.profiles.email, email));
        return users[0] ?? null;
    }
    async findUserById(id) {
        const users = await this.db
            .select({
            id: schema_1.profiles.id,
            email: schema_1.profiles.email, fullName: schema_1.profiles.full_name,
            phone: schema_1.profiles.phone, city: schema_1.profiles.city,
            country: schema_1.profiles.country, address: schema_1.profiles.address,
            avatarUrl: schema_1.profiles.avatar_url, companyName: schema_1.profiles.company_name
        }).from(schema_1.profiles).where((0, drizzle_orm_1.eq)(schema_1.profiles.id, id));
        return users[0] ?? null;
    }
    async getUserRoles(id) {
        const userRole = await this.db.select({ role: schema_1.user_roles.role }).from(schema_1.user_roles).where((0, drizzle_orm_1.eq)(schema_1.user_roles.user_id, id));
        return userRole[0] ?? null;
    }
    async defaultRole(userId) {
        await this.db.insert(schema_1.user_roles).values({ user_id: userId, role: 'customer', id: (0, uuid_1.v4)() });
    }
    async updateUserProfile(userId, profileData) {
        await this.db.update(schema_1.profiles).set(profileData).where((0, drizzle_orm_1.eq)(schema_1.profiles.id, userId));
    }
}
exports.UserRepository = UserRepository;
