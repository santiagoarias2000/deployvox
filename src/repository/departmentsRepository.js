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
exports.DepartmentRepository = void 0;
const departmentsEntity_1 = require("../models/departmentsEntity");
const db_1 = require("../config/api/db");
class DepartmentRepository {
    constructor() {
        this.departmentRepository = db_1.AppDataSource.getRepository(departmentsEntity_1.DepartmentEntity);
    }
    findAll(page, pageLength, asc, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.departmentRepository.count({});
            if (page > count) {
                if (pageLength <= count) {
                    page = count - pageLength;
                }
                else {
                    page = 0;
                }
            }
            const departments = yield this.departmentRepository.createQueryBuilder()
                .skip(page)
                .take(pageLength)
                .orderBy(orderBy, asc ? "ASC" : "DESC")
                .getMany();
            return departments;
        });
    }
    save(departments) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.departmentRepository.save(departments);
            return departments;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentRepository.findOneOrFail({ where: { id: id } });
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentRepository.countBy({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentRepository.delete({ id: id });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.departmentRepository.findOneOrFail({ where: { id: id } });
            yield this.departmentRepository.update(id, user);
            return user;
        });
    }
}
exports.DepartmentRepository = DepartmentRepository;
