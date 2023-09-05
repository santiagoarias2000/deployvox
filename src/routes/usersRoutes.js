"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const usersController_1 = require("../controller/usersController");
class UserRoutes {
    constructor() {
        this.UController = new usersController_1.UserController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view").get(this.UController.findAll);
        this.router
            .route("/:id")
            .get(this.UController.findById)
            .put(this.UController.updateById)
            .delete(this.UController.deleteById);
        this.router.route("/save").post(this.UController.save);
        this.router.route("/count").get(this.UController.count);
        return this.router;
    }
}
exports.UserRoutes = UserRoutes;
