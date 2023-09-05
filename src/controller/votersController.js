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
exports.VotersController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const votersRepository_1 = require("../repository/votersRepository");
const leadersEntity_1 = require("../models/leadersEntity");
const typeorm_1 = require("typeorm");
const pagination_1 = require("./utils/pagination");
const candidateEntity_1 = require("../models/candidateEntity");
class VotersController {
    constructor() {
        this.votersRepository = new votersRepository_1.VotersRepository();
        this.orderByOptions = ["id", "name", "lastName", "location", "createdAt"];
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = res.locals.jwtPayload;
            let { page, pagesize, orderBy, asc } = req.query;
            const pageParams = (0, pagination_1.getPage)(this.orderByOptions, page === null || page === void 0 ? void 0 : page.toString(), pagesize === null || pagesize === void 0 ? void 0 : pagesize.toString(), orderBy === null || orderBy === void 0 ? void 0 : orderBy.toString(), asc === null || asc === void 0 ? void 0 : asc.toString());
            const leader = yield leadersEntity_1.LeaderEntity.findOneBy({ user: (0, typeorm_1.Equal)(userId) });
            if (leader == null) {
                res.status(404).json(boom_1.default.notFound("Leader not found"));
                return;
            }
            this.votersRepository
                .findAll(pageParams.skip, pageParams.newPageSize, leader.id, pageParams.newAsc, pageParams.orderBy)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        });
        this.findAllByLeaderId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = res.locals.jwtPayload;
            const leaderId = parseInt(req.params.id); // Obtenemos el id del líder desde el parámetro de la ruta
            let { page, pagesize, orderBy, asc } = req.query;
            const pageParams = (0, pagination_1.getPage)(this.orderByOptions, page === null || page === void 0 ? void 0 : page.toString(), pagesize === null || pagesize === void 0 ? void 0 : pagesize.toString(), orderBy === null || orderBy === void 0 ? void 0 : orderBy.toString(), asc === null || asc === void 0 ? void 0 : asc.toString());
            // Buscamos al candidato por el id del usuario
            const candidate = yield candidateEntity_1.CandidateEntity.findOneBy({ user: (0, typeorm_1.Equal)(userId) });
            if (candidate == null) {
                res.status(404).json(boom_1.default.notFound("Candidate not found"));
                return;
            }
            // Buscamos al líder por el id del parámetro y el id del candidato
            const leader = yield leadersEntity_1.LeaderEntity.findOneBy({
                id: (0, typeorm_1.Equal)(leaderId),
                candidate: (0, typeorm_1.Equal)(candidate.id),
            });
            if (leader == null) {
                res.status(404).json(boom_1.default.notFound("Leader not found"));
                return;
            }
            // Usamos el repositorio de votantes para traer todos los votantes del líder
            this.votersRepository
                .findAll(pageParams.skip, pageParams.newPageSize, leader.id, pageParams.newAsc, pageParams.orderBy)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        });
        this.findAllByCandidateId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = res.locals.jwtPayload;
            let { page, pagesize, orderBy, asc } = req.query;
            const pageParams = (0, pagination_1.getPage)(this.orderByOptions, page === null || page === void 0 ? void 0 : page.toString(), pagesize === null || pagesize === void 0 ? void 0 : pagesize.toString(), orderBy === null || orderBy === void 0 ? void 0 : orderBy.toString(), asc === null || asc === void 0 ? void 0 : asc.toString());
            // Buscamos al candidato por el id del usuario
            const candidate = yield candidateEntity_1.CandidateEntity.findOneBy({ user: (0, typeorm_1.Equal)(userId) });
            if (candidate == null) {
                res.status(404).json(boom_1.default.notFound("Candidate not found"));
                return;
            }
            // Usamos el query builder para traer todos los votantes de todos los líderes del candidato
            this.votersRepository.findVoterByCandidate(pageParams.skip, pageParams.newPageSize, candidate.id, pageParams.newAsc, pageParams.orderBy)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        });
        //?funtion use for find user by id
        this.findById = (req, res) => {
            const id = parseInt(req.params.id);
            this.votersRepository
                .findById(id)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        };
        //?Funtion to delete user by id
        this.deleteById = (req, res) => {
            const id = parseInt(req.params.id);
            this.votersRepository
                .delete(id)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(404).json(boom_1.default.notFound("Not found the entity to delete"));
            });
        };
        this.save = (req, res) => {
            if (!isNaN(req.body.id)) {
                return res
                    .json(405)
                    .json(boom_1.default.badData("this ID use in the data base, change id or use the update method"));
            }
            const voters = req.body;
            this.votersRepository.save(voters).then((response) => {
                res
                    .status(200)
                    .json(boom_1.default.badData("Your data is bad and not create the department"));
            });
        };
        this.saveToLeader = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!isNaN(req.body.id)) {
                return res
                    .json(405)
                    .json(boom_1.default.badData("this ID use in the data base, change id or use the update method"));
            }
            const { userId } = res.locals.jwtPayload;
            const voter = req.body;
            const leader = yield leadersEntity_1.LeaderEntity.findOneBy({ user: (0, typeorm_1.Equal)(userId) });
            if (leader == null) {
                return res
                    .status(404)
                    .json(boom_1.default.badData("leader doesn't exists"));
            }
            voter.leader = leader;
            yield this.votersRepository.save(voter)
                .then(() => {
                return res
                    .status(201)
                    .json("voter created scessfully");
            }).catch((err) => {
                return res
                    .status(400)
                    .json(boom_1.default.badRequest("cannot create the voter"));
            });
        });
        //?funtion to update the user in the data base
        this.updateById = (req, res) => {
            const id = parseInt(req.params.id);
            const voters = req.body;
            this.votersRepository
                .update(id, voters)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res.status(400).json({ message: err.message });
            });
        };
        //?funtion tu count the user in the database
        this.count = (req, res) => {
            this.votersRepository
                .countAll()
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        };
    }
}
exports.VotersController = VotersController;
