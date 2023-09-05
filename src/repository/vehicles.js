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
exports.VehicleRepository = void 0;
const vehiclesEntity_1 = require("./../models/vehiclesEntity");
const db_1 = require("./../config/api/db");
class VehicleRepository {
    constructor() {
        this.vehicleRepository = db_1.AppDataSource.getRepository(vehiclesEntity_1.VehicleEntity);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicles = yield this.vehicleRepository.find();
            return vehicles;
        });
    }
    save(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.vehicleRepository.save(vehicle);
            return vehicle;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vehicleRepository.findOneOrFail({ where: { id: id } });
        });
    }
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vehicleRepository.countBy({});
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vehicleRepository.delete({ id: id });
        });
    }
    update(id, vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.vehicleRepository.findOneOrFail({ where: { id: id } });
            yield this.vehicleRepository.update(id, vehicle);
            return vehicle;
        });
    }
}
exports.VehicleRepository = VehicleRepository;
