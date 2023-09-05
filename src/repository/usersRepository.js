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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../config/api/db");
const usersEntity_1 = require("../models/usersEntity");
const bcrypt = __importStar(require("bcryptjs"));
class UserRepository {
    constructor() {
        this.userRepository = db_1.AppDataSource.getRepository(usersEntity_1.UserEntity);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            return users;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedUser = yield this.userRepository.save(user);
            savedUser.password = "";
            return savedUser;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneOrFail({ where: { id: id } });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneOrFail({ where: { email: email } });
        });
    }
    findByResentToken(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneOrFail({ where: { resetToken: resetToken } });
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.countBy({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.delete({ id: id });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.findOneOrFail({ where: { id: id } });
            yield this.userRepository.update(id, user);
            return user;
        });
    }
    updateRecoryPass(email, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.findOneOrFail({ where: { email: email } });
            yield this.userRepository.createQueryBuilder()
                .update("users")
                .set({ resetToken: resetToken }).where('users.email= :email', { email })
                .execute();
            return resetToken;
        });
    }
    updatePassword(email, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.findOneOrFail({ where: { email: email } });
            const hashPassword = yield bcrypt.hash(newPassword, 10);
            yield this.userRepository.createQueryBuilder()
                .update("users")
                .set({ password: hashPassword })
                .where('users.email= :email', { email })
                .execute();
            return hashPassword;
        });
    }
}
exports.UserRepository = UserRepository;
