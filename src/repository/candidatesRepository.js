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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRepository = void 0;
const candidateEntity_1 = require("./../models/candidateEntity");
const db_1 = require("./../config/api/db");
class CandidateRepository {
    constructor() {
        this.candidateRepository = db_1.AppDataSource.getRepository(candidateEntity_1.CandidateEntity);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const candidates = yield this.candidateRepository.find();
            return candidates;
        });
    }
    save(candidates) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.candidateRepository.save(candidates);
            return candidates;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.candidateRepository.findOneOrFail({ where: { id: id } });
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.candidateRepository.countBy({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.candidateRepository.delete({ id: id });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.candidateRepository.findOneOrFail({ where: { id: id } });
            yield this.candidateRepository.update(id, user);
            return user;
        });
    }
}
exports.CandidateRepository = CandidateRepository;
