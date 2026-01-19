"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repository/user.repository");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async getUserProfile(payload) {
        const { id } = payload;
        return await this.userRepository.findUserById(id);
    }
    async updateUserProfile(payload, profileData) {
        const { id } = payload;
        await this.userRepository.updateUserProfile(id, profileData);
    }
}
exports.UserService = UserService;
