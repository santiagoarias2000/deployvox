"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsRoutes = void 0;
const express_1 = require("express");
const departmentsController_1 = require("../controller/departmentsController");
class DepartmentsRoutes {
    constructor() {
        this.departmentsController = new departmentsController_1.DepartmentController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view").get(this.departmentsController.findAll);
        this.router
            .route("/:id")
            .get(this.departmentsController.findById)
            .put(this.departmentsController.updateById)
            .delete(this.departmentsController.deleteById);
        this.router.route("/save").post(this.departmentsController.save);
        this.router.route("/count").get(this.departmentsController.count);
        return this.router;
    }
}
exports.DepartmentsRoutes = DepartmentsRoutes;
