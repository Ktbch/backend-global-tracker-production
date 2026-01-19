"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const admin_repository_1 = require("../repository/admin.repository");
class AdminService {
    constructor() {
        this.adminRepository = new admin_repository_1.AdminRepository();
    }
    async getAllShipments() {
        return await this.adminRepository.getAllShipments();
    }
    async getAllUsersByRole(role) {
        return await this.adminRepository.getAllUsersByRole(role);
    }
    async getPaternersDetails(role) {
        const allRoleWithPartners = await this.getAllUsersByRole(role);
        const partnersId = allRoleWithPartners.map(roleWithPartners => roleWithPartners.id);
        const partnerProfile = await this.adminRepository.getProfilesForSpecificUser(partnersId);
        const partnerCommision = await this.adminRepository.getPartnersCommision(partnersId);
        return { allRoleWithPartners, partnerProfile, partnerCommision };
    }
    async getAllPayments() {
        return await this.adminRepository.getAllPayment();
    }
}
exports.AdminService = AdminService;
