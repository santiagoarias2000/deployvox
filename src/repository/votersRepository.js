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
exports.VotersRepository = void 0;
const typeorm_1 = require("typeorm");
const db_1 = require("./../config/api/db");
const votersEntity_1 = require("../models/votersEntity");
class VotersRepository {
    constructor() {
        this.votersRepository = db_1.AppDataSource.getRepository(votersEntity_1.VotersEntity);
    }
    findAll(page, pageLength, leaderId, asc, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.votersRepository.count({
                where: { leader: (0, typeorm_1.Equal)(leaderId)
                }
            });
            if (page > count) {
                if (pageLength <= count) {
                    page = count - pageLength;
                }
                else {
                    page = 0;
                }
            }
            const voters = yield this.votersRepository.createQueryBuilder()
                .skip(page)
                .take(pageLength)
                .orderBy(orderBy, asc ? "ASC" : "DESC")
                .where({ leader: (0, typeorm_1.Equal)(leaderId) })
                .andWhere({})
                .getMany();
            return voters;
        });
    }
    findVoterByCandidate(page, pageLength, candidateId, asc, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const voters = yield this.votersRepository.createQueryBuilder('voter')
                .skip(page)
                .take(pageLength)
                .orderBy(`voter.${orderBy}`, asc ? "ASC" : "DESC")
                .leftJoin('voter.leader', 'leader')
                .where({ leader: { candidate: (0, typeorm_1.Equal)(candidateId) } })
                .loadRelationIdAndMap('voter.leaderId', 'voter.leader')
                .getMany();
            return voters;
        });
    }
    save(voters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.votersRepository.save(voters);
            return voters;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.votersRepository.findOneOrFail({ where: { id: id } });
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.votersRepository.countBy({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.votersRepository.delete({ id: id });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.votersRepository.findOneOrFail({ where: { id: id } });
            yield this.votersRepository.update(id, user);
            return user;
        });
    }
}
exports.VotersRepository = VotersRepository;
