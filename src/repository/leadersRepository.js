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
exports.LeaderRepository = void 0;
const typeorm_1 = require("typeorm");
const leadersEntity_1 = require("../models/leadersEntity");
const db_1 = require("../config/api/db");
const usersEntity_1 = require("../models/usersEntity");
class LeaderRepository {
    constructor() {
        this.leaderRepository = db_1.AppDataSource.getRepository(leadersEntity_1.LeaderEntity);
        this.userRepository = db_1.AppDataSource.getRepository(usersEntity_1.UserEntity);
    }
    findAll(page, pageLength, candidateId, asc, orderBy, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.leaderRepository.count({
                where: { candidate: (0, typeorm_1.Equal)(candidateId), name: (0, typeorm_1.Like)(`%${sort}%`) }
            });
            if (page > count) {
                if (pageLength <= count) {
                    page = count - pageLength;
                }
                else {
                    page = 0;
                }
            }
            const leaders = yield this.leaderRepository.createQueryBuilder("leader")
                .skip(page)
                .take(pageLength)
                .orderBy(orderBy, asc ? "ASC" : "DESC")
                .where({ candidate: (0, typeorm_1.Equal)(candidateId) })
                .andWhere({ name: (0, typeorm_1.Like)(`%${sort}%`) })
                .getMany();
            return leaders;
        });
    }
    save(leader) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leaderRepository.save(leader);
            return leader;
        });
    }
    saveToCandidate(user, leader) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.insert(user);
            const userDB = yield db_1.AppDataSource.createQueryBuilder()
                .select("user").from(usersEntity_1.UserEntity, "user")
                .where("user.email = :email", { email: user.email })
                .getOne();
            if (!userDB) {
                throw new Error("Cannot find the user");
            }
            try {
                db_1.AppDataSource.createQueryBuilder()
                    .insert()
                    .into(leadersEntity_1.LeaderEntity)
                    .values({
                    name: leader.name,
                    last_name: leader.last_name,
                    goal: leader.goal,
                    user: { id: userDB.id },
                    candidate: { id: leader.candidate.id }
                }).execute();
            }
            catch (error) {
                db_1.AppDataSource.createQueryBuilder()
                    .delete()
                    .from(usersEntity_1.UserEntity)
                    .where("id = :id", { id: userDB.id });
                throw ("cannot create the leader");
            }
            return leader;
        });
    }
    findById(id, candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.leaderRepository.findOneOrFail({
                where: { id: id, candidate: (0, typeorm_1.Equal)(candidateId) }
            });
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.leaderRepository.countBy({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const leader = yield this.leaderRepository.findOneOrFail({ where: { id: id }, relations: ['user'] });
            return yield this.userRepository.delete({ id: leader.user.id });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leaderRepository.findOneOrFail({ where: { id: id } });
            yield this.leaderRepository.update(id, user);
            return user;
        });
    }
}
exports.LeaderRepository = LeaderRepository;
