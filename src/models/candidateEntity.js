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
exports.CandidateEntity = void 0;
const typeorm_1 = require("typeorm");
const municipalitiesEntity_1 = require("./municipalitiesEntity");
const usersEntity_1 = require("./usersEntity");
let CandidateEntity = exports.CandidateEntity = class CandidateEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], CandidateEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 150 }),
    __metadata("design:type", String)
], CandidateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name", length: 150 }),
    __metadata("design:type", String)
], CandidateEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "picture" }),
    __metadata("design:type", String)
], CandidateEntity.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "picture_base64" }),
    __metadata("design:type", String)
], CandidateEntity.prototype, "pictureBase64", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "organization", length: 150 }),
    __metadata("design:type", String)
], CandidateEntity.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "aspiration" }),
    __metadata("design:type", Number)
], CandidateEntity.prototype, "aspiration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => municipalitiesEntity_1.MunicipalityEntity, { onDelete: "RESTRICT", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "municipality_id", referencedColumnName: "id" }),
    __metadata("design:type", municipalitiesEntity_1.MunicipalityEntity)
], CandidateEntity.prototype, "municipality", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usersEntity_1.UserEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
    __metadata("design:type", usersEntity_1.UserEntity)
], CandidateEntity.prototype, "user", void 0);
exports.CandidateEntity = CandidateEntity = __decorate([
    (0, typeorm_1.Entity)("candidates")
], CandidateEntity);
