"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderRoutes = void 0;
const express_1 = require("express");
const leadersController_1 = require("../controller/leadersController");
const checkRole_1 = require("../middleware/checkRole");
const rolesEnum_1 = require("../models/rolesEnum");
class LeaderRoutes {
    constructor() {
        this.leaderController = new leadersController_1.LeaderController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view").get(this.leaderController.findAll);
        this.router
            .route("/:id")
            .get(this.leaderController.findById)
            .put(this.leaderController.updateById)
            .delete(this.leaderController.deleteById);
        this.router.route("/save").post(this.leaderController.save);
        this.router.route("/savetocandidate").post([(0, checkRole_1.checkRole)([rolesEnum_1.Roles.CANDIDATE])], this.leaderController.saveToCandidate);
        this.router.route("/count").get(this.leaderController.count);
        return this.router;
    }
}
exports.LeaderRoutes = LeaderRoutes;
