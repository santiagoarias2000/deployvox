"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalRoutes = void 0;
const proposalsController_1 = require("../controller/proposalsController");
const express_1 = require("express");
const checkRole_1 = require("../middleware/checkRole");
const rolesEnum_1 = require("../models/rolesEnum");
class ProposalRoutes {
    constructor() {
        this.proposalController = new proposalsController_1.ProposalController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view")
            .get(this.proposalController.findAll);
        this.router.route("/save")
            .post([(0, checkRole_1.checkRole)([rolesEnum_1.Roles.CANDIDATE])], this.proposalController.save);
        this.router.route("/count")
            .get(this.proposalController.count);
        this.router.route("/:id")
            .get(this.proposalController.findById)
            .put(this.proposalController.updateById)
            .delete(this.proposalController.deleteById);
        return this.router;
    }
}
exports.ProposalRoutes = ProposalRoutes;
