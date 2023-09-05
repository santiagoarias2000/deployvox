"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const usersRepository_1 = require("./../repository/usersRepository");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const boom_1 = __importDefault(require("@hapi/boom"));
const typeorm_1 = require("typeorm");
const config_1 = require("../config/api/config");
const config_2 = require("../config/api/config");
const class_validator_1 = require("class-validator");
const nodemailer = __importStar(require("nodemailer"));
const rolesEnum_1 = require("../models/rolesEnum");
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                const userRepository = new usersRepository_1.UserRepository();
                let user;
                user = yield userRepository.findByEmail(email);
                const passwd = bcrypt.compareSync(password, user.password);
                if (!passwd) {
                    res.status(401).json(boom_1.default.unauthorized("User invalid"));
                    return;
                }
                const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, config_1.JWTSECRET, { expiresIn: "1h" });
                const refreshToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, config_2.JWTSECRETREFRESH, { expiresIn: "1h" });
                user.refreshToken = refreshToken;
                return res
                    .status(200)
                    .cookie('token', token, {
                    expires: new Date(Date.now() + (1 * 3600000)),
                    secure: false,
                    sameSite: 'strict',
                    httpOnly: true
                })
                    .json({
                    user: { id: user.id, email: user.email },
                    role: rolesEnum_1.Roles[user.role]
                });
            }
            catch (error) {
                if (error instanceof typeorm_1.EntityNotFoundError) {
                    res.status(401).json(boom_1.default.unauthorized("User not found"));
                }
                else {
                    res
                        .status(400)
                        .json(boom_1.default.unauthorized("An error occurred while trying to log in"));
                }
            }
        });
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            console.log(email);
            if (!email) {
                return res
                    .status(400)
                    .json(boom_1.default.badData("User not found or email is required"));
            }
            const message = "Check your email for a link to reset your password.";
            let verificationLink;
            let emailStatus;
            let linkTofront;
            const userRepository = new usersRepository_1.UserRepository();
            let user;
            try {
                user = yield userRepository.findByEmail(email);
                const token = jwt.sign({ email: user.email }, config_1.JWTSECRET, {
                    expiresIn: "10m",
                });
                verificationLink = `http://localhost:8082/public/new-password/${token}`;
                user.resetToken = token;
                console.log(req.body);
            }
            catch (error) {
                console.log(error);
                return res.json(message);
            }
            //Todo: send email notification
            try {
                //that code is send to message from the gmail server
                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    port: 465,
                    secure: true,
                    //is the user and password to gmail
                    auth: {
                        user: "lisethsolercandillo@gmail.com",
                        pass: "plgqnjkdohpfqkls",
                    },
                });
                //funtion to send a email
                yield transporter.sendMail({
                    from: "lisethsolercandillo@gmail.com",
                    to: user.email,
                    subject: "Recuperar su contraseña",
                    html: `
        <b>Dale click al siguiente link para entrar a recuperar tu contraseña.</b>
        <a href="${verificationLink}">Recupera tu contraseña acá</a>`,
                });
            }
            catch (error) {
                console.log(error);
                emailStatus = error;
                return res.status(400).json(boom_1.default.badData("Something goes wrong"));
            }
            try {
                yield userRepository.updateRecoryPass(email, user.resetToken);
                console.log(email);
            }
            catch (error) {
                console.log(error);
                emailStatus = error;
                return res.status(400).json(boom_1.default.badData("Something goes wrong"));
            }
            res.json({ message, info: emailStatus });
        });
        this.createNewPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { newPassword, email } = req.body;
            const resetToken = req.headers.reset;
            console.log(req.headers);
            if (!(resetToken && newPassword)) {
                res.status(400).json({ message: "All the fields are required" });
            }
            const userRepository = new usersRepository_1.UserRepository();
            let jwtPayload;
            let user;
            try {
                jwtPayload = jwt.verify(resetToken, config_1.JWTSECRET);
                user = yield userRepository.findByResentToken(resetToken);
            }
            catch (error) {
                console.log(error);
                return res.status(401).json({ message: "Something goes wrong" });
            }
            user.password = newPassword;
            const validtionsOps = { validationError: { target: false, value: false } };
            const errors = yield (0, class_validator_1.validate)(user, validtionsOps);
            if (errors.length > 0) {
                return res.status(500).json(errors);
            }
            try {
                user.setPassword();
                yield userRepository.updatePassword(email, newPassword);
            }
            catch (error) {
                console.log(error);
                return res.status(401).json(boom_1.default.badData("Something goes wrong"));
            }
            res.json({ message: "Password changed successfully!" });
        });
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.params.refresh;
            if (!refreshToken) {
                res.status(400).json(boom_1.default.badData("Something goes wrong"));
            }
            const userRepository = new usersRepository_1.UserRepository();
            let user;
            try {
                const verifyResult = jwt.verify(refreshToken, config_2.JWTSECRETREFRESH);
                const { email } = verifyResult;
                user = yield userRepository.findByEmail(email);
            }
            catch (error) {
                return res.status(400).json(boom_1.default.badData("Something goes wrong"));
            }
            const token = jwt.sign({ Id: user.id, email: user.email }, config_2.JWTSECRETREFRESH, { expiresIn: 120 });
            res.json({ message: "OK", token });
        });
    }
}
exports.default = AuthController;
