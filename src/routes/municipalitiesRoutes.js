"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalityRoutes = void 0;
const express_1 = require("express");
const municipalitiesController_1 = require("../controller/municipalitiesController");
class MunicipalityRoutes {
    constructor() {
        this.municipalityController = new municipalitiesController_1.MunicipalityController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view")
            .get(this.municipalityController.findAll);
        this.router.route("/save")
            .post(this.municipalityController.save);
        this.router.route("/:id")
            .get(this.municipalityController.findById)
            .put(this.municipalityController.updateById)
            .delete(this.municipalityController.deleteById);
        this.router.route("/count")
            .get(this.municipalityController.count);
        return this.router;
    }
}
exports.MunicipalityRoutes = MunicipalityRoutes;
