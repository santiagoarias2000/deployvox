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
exports.UserController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const usersRepository_1 = require("./../repository/usersRepository");
const class_validator_1 = require("class-validator");
const usersEntity_1 = require("../models/usersEntity");
class UserController {
    constructor() {
        this.userRepository = new usersRepository_1.UserRepository();
        //?funtion to view data on de user
        this.findAll = (req, res) => {
            this.userRepository
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
            this.userRepository
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
            this.userRepository
                .delete(id)
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
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = new usersEntity_1.UserEntity();
            const { email, password, role } = req.body;
            user.email = email;
            user.password = password;
            user.role = role;
            const errors = yield (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                const constraintsErr = errors.map((err) => err.constraints);
                res.status(400).send(constraintsErr);
                return;
            }
            this.userRepository.save(user).then(() => {
                res
                    .status(200)
                    .json({ message: "User created successfully" });
            }).catch((err) => {
                if (err.code == '23505') {
                    res
                        .status(409)
                        .json(boom_1.default.conflict("User Already Exists"));
                    return;
                }
                console.log(err);
                res
                    .status(400)
                    .json(boom_1.default.badData("Your data is bad and not create the user"));
                return;
            });
        });
        //?funtion to update the user in the data base
        this.updateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            let user = new usersEntity_1.UserEntity();
            const { userId, email, password, role } = req.body;
            user.id = userId;
            user.email = email;
            user.password = password;
            user.role = role;
            const errors = yield (0, class_validator_1.validate)(user);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            this.userRepository
                .update(id, user)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res.status(400).json({ message: err.message });
            });
        });
        //?funtion tu count the user in the database
        this.count = (req, res) => {
            this.userRepository
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
exports.UserController = UserController;
