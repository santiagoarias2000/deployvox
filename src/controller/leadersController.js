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
exports.LeaderController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const leadersRepository_1 = require("../repository/leadersRepository");
const usersEntity_1 = require("../models/usersEntity");
const candidateEntity_1 = require("../models/candidateEntity");
const typeorm_1 = require("typeorm");
const leadersEntity_1 = require("../models/leadersEntity");
const class_validator_1 = require("class-validator");
const pagination_1 = require("./utils/pagination");
const rolesEnum_1 = require("../models/rolesEnum");
class LeaderController {
    constructor() {
        this.leaderRepository = new leadersRepository_1.LeaderRepository();
        this.orderByOptions = ["id", "name", "last_name", "goal"];
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = res.locals.jwtPayload;
            let { page, pagesize, orderBy, asc, sort } = req.query;
            const pageParams = (0, pagination_1.getPage)(this.orderByOptions, page === null || page === void 0 ? void 0 : page.toString(), pagesize === null || pagesize === void 0 ? void 0 : pagesize.toString(), orderBy === null || orderBy === void 0 ? void 0 : orderBy.toString(), asc === null || asc === void 0 ? void 0 : asc.toString(), sort === null || sort === void 0 ? void 0 : sort.toString());
            const candidate = yield candidateEntity_1.CandidateEntity.findOneBy({ user: (0, typeorm_1.Equal)(userId) });
            if (candidate == null) {
                res.status(404).json(boom_1.default.notFound("Candidate not found"));
                return;
            }
            this.leaderRepository
                .findAll(pageParams.skip, pageParams.newPageSize, candidate.id, pageParams.newAsc, pageParams.orderBy, pageParams.newSort).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        });
        //?funtion use for find user by id
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = res.locals.jwtPayload;
            const id = parseInt(req.params.id);
            const candidate = yield candidateEntity_1.CandidateEntity.findOneBy({ user: (0, typeorm_1.Equal)(userId) });
            if (candidate == null) {
                res.status(404).json(boom_1.default.notFound("Candidate not found"));
                return;
            }
            this.leaderRepository
                .findById(id, candidate.id)
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
        //?Funtion to delete user by id
        this.deleteById = (req, res) => {
            const id = parseInt(req.params.id);
            this.leaderRepository
                .delete(id)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(404).json(boom_1.default.notFound("Leader not found"));
            });
        };
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let leader = new leadersEntity_1.LeaderEntity();
            const { name, last_name, goal, user, candidate } = req.body;
            leader.name = name;
            leader.last_name = last_name;
            leader.goal = goal;
            leader.user = user;
            leader.candidate = candidate;
            this.leaderRepository.save(leader).then((response) => {
                return res
                    .status(200)
                    .json({ mesagge: "leader created succesfully" });
            }).catch((err) => {
                return res
                    .status(400)
                    .json(boom_1.default.badData("Your data is bad and not create the leader"));
            });
        });
        this.saveToCandidate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = res.locals.jwtPayload;
            let leaderDto = req.body;
            let user = new usersEntity_1.UserEntity();
            const candidate = yield candidateEntity_1.CandidateEntity.findOneBy({ user: (0, typeorm_1.Equal)(userId) });
            if (candidate == null) {
                return res
                    .status(404)
                    .json(boom_1.default.badData("Candidate doesn't exists"));
            }
            user.email = leaderDto.user.email;
            user.password = leaderDto.user.password;
            user.role = rolesEnum_1.Roles.LEADER;
            leaderDto.leader.candidate = candidate;
            const errors = yield (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                const constraintsErr = errors.map((err) => err.constraints);
                res.status(400).send(constraintsErr);
                return;
            }
            yield this.leaderRepository.saveToCandidate(user, leaderDto.leader)
                .then(() => {
                return res
                    .status(201)
                    .json("user created scessfully");
            }).catch((err) => {
                if (err.code == '23505') {
                    res
                        .status(409)
                        .json(boom_1.default.conflict("User Already Exists"));
                    return;
                }
                return res
                    .status(400)
                    .json(boom_1.default.badRequest("cannot create the user"));
            });
        });
        //?funtion to update the user in the data base
        this.updateById = (req, res) => {
            const id = parseInt(req.params.id);
            const leader = req.body;
            this.leaderRepository
                .update(id, leader)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res.status(400).json({ message: err.message });
            });
        };
        //?funtion tu count the user in the database
        this.count = (req, res) => {
            this.leaderRepository
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
exports.LeaderController = LeaderController;
