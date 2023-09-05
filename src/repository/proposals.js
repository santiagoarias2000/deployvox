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
exports.ProposalRepository = void 0;
const typeorm_1 = require("typeorm");
const db_1 = require("../config/api/db");
const proposalsEntity_1 = require("../models/proposalsEntity");
class ProposalRepository {
    constructor() {
        this.proposalRepository = db_1.AppDataSource.getRepository(proposalsEntity_1.ProposalEntity);
    }
    findAll(page, pageLength, candidateId, asc, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.proposalRepository.count({
                where: { candidate: (0, typeorm_1.Equal)(candidateId)
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
            const proposals = yield this.proposalRepository.createQueryBuilder()
                .skip(page)
                .take(pageLength)
                .orderBy(orderBy, asc ? "ASC" : "DESC")
                .where({ candidate: (0, typeorm_1.Equal)(candidateId) })
                .andWhere({})
                .getMany();
            return proposals;
        });
    }
    save(proposal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.proposalRepository.save(proposal);
            return proposal;
        });
    }
    findById(id, candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.proposalRepository.findOneOrFail({
                where: { id: id, candidate: (0, typeorm_1.Equal)(candidateId) }
            });
        });
    }
    update(proposal, id, candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.proposalRepository
                .createQueryBuilder()
                .update(proposalsEntity_1.ProposalEntity)
                .set({ description: proposal.description })
                .where({ id: id, candidate: (0, typeorm_1.Equal)(candidateId) })
                .execute();
            return query.affected;
        });
    }
    countAll(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.proposalRepository.countBy({
                candidate: { id: candidateId }
            });
        });
    }
    delete(id, candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.proposalRepository
                .delete({ id: id, candidate: { id: candidateId } });
        });
    }
}
exports.ProposalRepository = ProposalRepository;
