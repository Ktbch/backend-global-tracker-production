"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipController = void 0;
const shipment_service_1 = require("./shipment.service");
class ShipController {
    constructor() {
        this.handleGetUserShipment = async (req, res, next) => {
            try {
                const shipmentDetails = await this.shipmentService.getUserShipment(req.user);
                res.status(200).json(shipmentDetails);
            }
            catch (error) {
                next(error);
            }
        };
        this.handleGetUserShipmentByTrackingNumber = async (req, res, next) => {
            try {
                const { id } = req.params;
                console.log(id);
                const shipmentDetails = await this.shipmentService.getShipmentByTrackingNumber(id);
                res.status(200).json(shipmentDetails);
            }
            catch (error) {
                next(error);
            }
        };
        this.handleCreateShipment = async (req, res, next) => {
            try {
                const shipment = await this.shipmentService.createUserShipment(req.user, req.body);
                res.status(201).json(shipment);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.handleCreateShipmentItem = async (req, res, next) => {
            try {
                console.log(req.body);
                await this.shipmentService.createShipmentItems(req.body);
                res.status(201).json({ message: 'shipement created successfully' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        this.shipmentService = new shipment_service_1.ShipmentService();
    }
}
exports.ShipController = ShipController;
