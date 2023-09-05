"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRoutes = void 0;
const express_1 = require("express");
const vehiclesController_1 = require("../controller/vehiclesController");
class VehicleRoutes {
    constructor() {
        this.VController = new vehiclesController_1.VehiclesController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view").get(this.VController.findAll);
        this.router
            .route("/:id")
            .get(this.VController.findById)
            .put(this.VController.updateById)
            .delete(this.VController.deleteById);
        this.router.route("/save").post(this.VController.save);
        this.router.route("/count").get(this.VController.count);
        return this.router;
    }
}
exports.VehicleRoutes = VehicleRoutes;
