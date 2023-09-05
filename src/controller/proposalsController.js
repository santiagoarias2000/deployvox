"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalController = void 0;
const models_1 = require("../models");
const repository_1 = require("../repository");
const getUserFromToken_1 = require("./utils/getUserFromToken");
const pagination_1 = require("./utils/pagination");
const boom_1 = __importDefault(require("@hapi/boom"));
class ProposalController {
    constructor() {
        this.proposalRepository = new repository_1.ProposalRepository();
        this.orderByOptions = ["id", "description"];
        this.getCandidateEntity = (res) => __awaiter(this, void 0, void 0, function* () {
            let candidateId = 0;
            const entity = yield (0, getUserFromToken_1.getEntityFromUser)(res.locals.jwtPayload);
            if (!(entity instanceof models_1.CandidateEntity) && entity == null) {
                return 0;
            }
            if (entity instanceof models_1.LeaderEntity) {
                candidateId = entity.candidate.id;
            }
            else {
                candidateId = entity.id;
            }
            return candidateId;
        });
        // --- Enpoints Controller ---
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { page, pagesize, orderBy, asc } = req.query;
            const pageParams = (0, pagination_1.getPage)(this.orderByOptions, page === null || page === void 0 ? void 0 : page.toString(), pagesize === null || pagesize === void 0 ? void 0 : pagesize.toString(), orderBy === null || orderBy === void 0 ? void 0 : orderBy.toString(), asc === null || asc === void 0 ? void 0 : asc.toString());
            const candidateId = yield this.getCandidateEntity(res);
            if (candidateId == 0) {
                return res
                    .status(404)
                    .json(boom_1.default.notFound("Candidate Not Found"));
            }
            this.proposalRepository
                .findAll(pageParams.skip, pageParams.newPageSize, candidateId, pageParams.newAsc, pageParams.orderBy).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const candidateId = yield this.getCandidateEntity(res);
            if (candidateId == 0) {
                return res
                    .status(404)
                    .json(boom_1.default.notFound("Candidate Not Found"));
            }
            this.proposalRepository.findById(id, candidateId).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(() => {
                res.status(400).json(boom_1.default.notFound("Proposal not found"));
            });
        });
        this.deleteById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const candidateId = yield this.getCandidateEntity(res);
            if (candidateId == 0) {
                return res
                    .status(404)
                    .json(boom_1.default.notFound("Candidate Not Found"));
            }
            this.proposalRepository.delete(id, candidateId).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(404).json(boom_1.default.notFound("Not found the entity to delete"));
            });
        });
        this.updateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const proposal = req.body;
            const candidateId = yield this.getCandidateEntity(res);
            if (candidateId == 0) {
                return res
                    .status(404)
                    .json(boom_1.default.notFound("Candidate Not Found"));
            }
            this.proposalRepository.update(proposal, id, candidateId)
                .then((response) => {
                if (response == 0) {
                    res.status(404)
                        .json(boom_1.default.notFound("Not Found the entity to update"));
                }
                else {
                    res.status(200).json({
                        response
                    });
                }
            }).catch(err => {
                res.status(404).json(boom_1.default.badData("Not found the entity to update"));
            });
        });
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!isNaN(req.body.id)) {
                return res.status(400).json(boom_1.default.badRequest("Your data is bad and not create the proposal"));
            }
            const candidate = yield (0, getUserFromToken_1.getEntityFromUser)(res.locals.jwtPayload);
            if (!(candidate instanceof models_1.CandidateEntity) || candidate == null) {
                return res
                    .status(404)
                    .json(boom_1.default.notFound("Candidate Not Found"));
            }
            const proposal = req.body;
            proposal.candidate = candidate;
            this.proposalRepository.save(proposal).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        });
        this.count = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const candidateId = yield this.getCandidateEntity(res);
            if (candidateId == 0) {
                return res
                    .status(404)
                    .json(boom_1.default.notFound("Candidate Not Found"));
            }
            this.proposalRepository.countAll(candidateId).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        });
    }
}
exports.ProposalController = ProposalController;
