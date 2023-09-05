"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatesController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const candidatesRepository_1 = require("../repository/candidatesRepository");
class CandidatesController {
    constructor() {
        this.candidateRespository = new candidatesRepository_1.CandidateRepository();
        this.findAll = (req, res) => {
            this.candidateRespository
                .findAll()
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
        //?funtion use for find user by id
        this.findById = (req, res) => {
            const id = parseInt(req.params.id);
            this.candidateRespository
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
            this.candidateRespository
                .delete(id)
                .then((response) => {
                if (response.affected == 0) {
                    res.status(404).json(boom_1.default.notFound("User not found"));
                    return;
                }
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
        this.save = (req, res) => {
            const id = req.params.id;
            if (!isNaN(req.body.id)) {
                return res
                    .json(405)
                    .json(boom_1.default.badData("this ID use in the data base, change id or use the update method"));
            }
            const candidates = req.body;
            this.candidateRespository.save(candidates).then((response) => {
                res
                    .status(200)
                    .json({ mesagge: "candidate created succesfully" });
            }).catch((err) => {
                res
                    .status(400)
                    .json(boom_1.default.badData("Your data is bad and not create the candidate"));
                return;
            });
        };
        //?funtion to update the user in the data base
        this.updateById = (req, res) => {
            const id = parseInt(req.params.id);
            const candidates = req.body;
            this.candidateRespository
                .update(id, candidates)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res.status(400).json({ message: err.message });
            });
        };
        //?funtion tu count the user in the database
        this.count = (req, res) => {
            this.candidateRespository
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
exports.CandidatesController = CandidatesController;
