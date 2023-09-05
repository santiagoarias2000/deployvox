"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
class AuthRoutes {
    constructor() {
        this.authController = new authController_1.default();
        this.router = (0, express_1.Router)();
    }
    routes() {
        //login 
        this.router.route("/login").post(this.authController.login);
        //forgot password
        this.router.route("/forgotPassword").put(this.authController.forgotPassword);
        //create password
        this.router.route("/new-password").post(this.authController.createNewPassword);
        this.router.route("/refresh-token").post(this.authController.refreshToken);
        return this.router;
    }
}
exports.AuthRoutes = AuthRoutes;
