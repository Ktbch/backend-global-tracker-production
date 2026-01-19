"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const user_repository_1 = require("../../resource/userResource/repository/user.repository");
const app_error_1 = require("../../utils/app-error");
const userRepository = new user_repository_1.UserRepository();
const checkRole = async (req, res, next) => {
    const { role } = req.query;
    const { id } = req.user;
    try {
        const userFound = await userRepository.getUserRoles(id);
        if (!userFound)
            throw new app_error_1.UnAuthorisedRequestError();
        if (userFound.role !== role)
            throw new app_error_1.UnAuthorisedRequestError(`You must be a ${role} to continue this request`);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkRole = checkRole;
