"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalityEntity = void 0;
const typeorm_1 = require("typeorm");
const departmentsEntity_1 = require("./departmentsEntity");
let MunicipalityEntity = exports.MunicipalityEntity = class MunicipalityEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], MunicipalityEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "code", length: 150 }),
    __metadata("design:type", String)
], MunicipalityEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 150 }),
    __metadata("design:type", String)
], MunicipalityEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departmentsEntity_1.DepartmentEntity, { onDelete: "RESTRICT", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "department_id", referencedColumnName: "id" }),
    __metadata("design:type", departmentsEntity_1.DepartmentEntity)
], MunicipalityEntity.prototype, "department", void 0);
exports.MunicipalityEntity = MunicipalityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "municipalities", schema: "public" })
], MunicipalityEntity);
