"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotersRoutes = void 0;
const express_1 = require("express");
const votersController_1 = require("../controller/votersController");
const checkRole_1 = require("../middleware/checkRole");
const rolesEnum_1 = require("../models/rolesEnum");
class VotersRoutes {
    constructor() {
        this.votersController = new votersController_1.VotersController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view").get(this.votersController.findAll);
        this.router.route("/viewByLeaderId/:id").get(this.votersController.findAllByLeaderId);
        this.router.route("/viewByCandidateId").get(this.votersController.findAllByCandidateId);
        this.router
            .route("/:id")
            .get(this.votersController.findById)
            .put(this.votersController.updateById)
            .delete(this.votersController.deleteById);
        this.router.route("/save").post(this.votersController.save);
        this.router.route("/savetoleader").post([(0, checkRole_1.checkRole)([rolesEnum_1.Roles.LEADER])], this.votersController.saveToLeader);
        this.router.route("/count").get(this.votersController.count);
        return this.router;
    }
}
exports.VotersRoutes = VotersRoutes;
