"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
class AdminController {
    constructor() {
        this.handleGetAllShipment = async (req, res, next) => {
            try {
                const shipmentDetails = await this.adminService.getAllShipments();
                res.status(200).json(shipmentDetails);
            }
            catch (error) {
                next(error);
            }
        };
        this.handleGetAllPartnerDetails = async (req, res, next) => {
            try {
                const { id } = req.params;
                const partnerDetails = await this.adminService.getPaternersDetails(id);
                res.status(200).json(partnerDetails);
            }
            catch (error) {
                next(error);
            }
        };
        this.handleGetPayment = async (req, res, next) => {
            try {
                const paymentDetails = await this.adminService.getAllPayments();
                res.status(200).json(paymentDetails);
            }
            catch (error) {
                next(error);
            }
        };
        this.adminService = new admin_service_1.AdminService();
    }
}
exports.AdminController = AdminController;
