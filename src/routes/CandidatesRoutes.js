"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatesRoutes = void 0;
const express_1 = require("express");
const candidateController_1 = require("../controller/candidateController");
class CandidatesRoutes {
    constructor() {
        this.candidatesController = new candidateController_1.CandidatesController();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.route("/view").get(this.candidatesController.findAll);
        this.router
            .route("/:id")
            .get(this.candidatesController.findById)
            .put(this.candidatesController.updateById)
            .delete(this.candidatesController.deleteById);
        this.router.route("/save").post(this.candidatesController.save);
        this.router.route("/count").get(this.candidatesController.count);
        return this.router;
    }
}
exports.CandidatesRoutes = CandidatesRoutes;
