"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.handleLoadProfile = async (req, res, next) => {
            try {
                const profileDetails = await this.userService.getUserProfile(req.user);
                res.status(200).json(profileDetails);
            }
            catch (error) {
                next(error);
            }
        };
        this.handleUpdateProfile = async (req, res, next) => {
            try {
                console.log(req.body);
                await this.userService.updateUserProfile(req.user, req.body);
                res.status(200).json({ message: 'Profile updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
