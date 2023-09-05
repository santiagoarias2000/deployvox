"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errHandler_1 = require("../../middleware/errHandler");
const middleware_1 = require("../../middleware");
const URL_1 = require("../../constants/URL");
const rolesEnum_1 = require("../../models/rolesEnum");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("../../routes");
class App {
    constructor() {
        this.vehicleRoutes = new routes_1.VehicleRoutes();
        this.proposalsRoutes = new routes_1.ProposalRoutes();
        this.userRoutes = new routes_1.UserRoutes();
        this.authRoutes = new routes_1.AuthRoutes();
        this.candidateRoutes = new routes_1.CandidatesRoutes();
        this.votersRoutes = new routes_1.VotersRoutes();
        this.leaderRoutes = new routes_1.LeaderRoutes();
        this.cookieParser = require("cookie-parser");
        this.app = (0, express_1.default)();
        this.initConf();
        this.activateRoutes();
        this.errHandler();
    }
    initConf() {
        this.app.set("PORT", 8082);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "100mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(this.cookieParser());
    }
    activateRoutes() {
        const allRoles = [rolesEnum_1.Roles.ADMIN, rolesEnum_1.Roles.CANDIDATE, rolesEnum_1.Roles.LEADER];
        //public routes don't use the token bearer
        this.app.use(URL_1.EndPoints.PUBLIC_API, this.authRoutes.routes());
        //private routes using the token bearer
        this.app.use(URL_1.EndPoints.VEHICLES_API, [middleware_1.checkJwt, (0, middleware_1.checkRole)(allRoles)], this.vehicleRoutes.routes());
        this.app.use(URL_1.EndPoints.PROPOSALS_API, [middleware_1.checkJwt, (0, middleware_1.checkRole)(allRoles)], this.proposalsRoutes.routes());
        this.app.use(URL_1.EndPoints.USERS_API, this.userRoutes.routes());
        this.app.use(URL_1.EndPoints.CANDIDATES_API, [middleware_1.checkJwt, (0, middleware_1.checkRole)([rolesEnum_1.Roles.ADMIN])], this.candidateRoutes.routes());
        this.app.use(URL_1.EndPoints.VOTERS_API, [middleware_1.checkJwt, (0, middleware_1.checkRole)(allRoles)], this.votersRoutes.routes());
        this.app.use(URL_1.EndPoints.LEADERS_API, [middleware_1.checkJwt, (0, middleware_1.checkRole)([rolesEnum_1.Roles.ADMIN, rolesEnum_1.Roles.CANDIDATE])], this.leaderRoutes.routes());
    }
    errHandler() {
        this.app.use(errHandler_1.syntaxErrHandler);
        this.app.use(errHandler_1.notFoundHandler);
    }
    initializer() {
        const port = this.app.get("PORT");
        this.app.listen(port, () => {
            console.log("funcionando en:", port);
        });
    }
}
exports.default = App;
