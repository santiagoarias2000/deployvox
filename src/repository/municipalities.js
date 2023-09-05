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
exports.MunicipalityRepository = void 0;
const db_1 = require("../config/api/db");
const municipalitiesEntity_1 = require("../models/municipalitiesEntity");
class MunicipalityRepository {
    constructor() {
        this.municipalityRepository = db_1.AppDataSource.getRepository(municipalitiesEntity_1.MunicipalityEntity);
    }
    findAll(page, pageLength, asc, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.municipalityRepository.count({});
            if (page > count) {
                if (pageLength <= count) {
                    page = count - pageLength;
                }
                else {
                    page = 0;
                }
            }
            const municipalities = yield this.municipalityRepository.createQueryBuilder()
                .skip(page)
                .take(pageLength)
                .orderBy(orderBy, asc ? "ASC" : "DESC")
                .getMany();
            return municipalities;
        });
    }
    save(municipality) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.municipalityRepository.save(municipality);
            return municipality;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.municipalityRepository.findOneOrFail({ where: { id: id } });
        });
    }
    update(municipality, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.municipalityRepository.findOneOrFail({ where: { id: id } });
            yield this.municipalityRepository.update(id, municipality);
            return municipality;
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.municipalityRepository.countBy({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.municipalityRepository.delete({ id: id });
        });
    }
}
exports.MunicipalityRepository = MunicipalityRepository;
