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
exports.VotersEntity = void 0;
const typeorm_1 = require("typeorm");
const leadersEntity_1 = require("./leadersEntity");
const municipalitiesEntity_1 = require("./municipalitiesEntity");
let VotersEntity = exports.VotersEntity = class VotersEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], VotersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 150 }),
    __metadata("design:type", String)
], VotersEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name", length: 150 }),
    __metadata("design:type", String)
], VotersEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "number" }),
    __metadata("design:type", Number)
], VotersEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "location", length: 250 }),
    __metadata("design:type", String)
], VotersEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "signing" }),
    __metadata("design:type", String)
], VotersEntity.prototype, "signing", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "signing_base64" }),
    __metadata("design:type", String)
], VotersEntity.prototype, "signingBase64", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "age" }),
    __metadata("design:type", Number)
], VotersEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "gender", length: 50 }),
    __metadata("design:type", String)
], VotersEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "neighborhood", length: 150 }),
    __metadata("design:type", String)
], VotersEntity.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], VotersEntity.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => leadersEntity_1.LeaderEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "leader_id", referencedColumnName: "id" }),
    __metadata("design:type", leadersEntity_1.LeaderEntity)
], VotersEntity.prototype, "leader", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => municipalitiesEntity_1.MunicipalityEntity, { onDelete: "RESTRICT", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "municipality_id", referencedColumnName: "id" }),
    __metadata("design:type", municipalitiesEntity_1.MunicipalityEntity)
], VotersEntity.prototype, "municipality", void 0);
exports.VotersEntity = VotersEntity = __decorate([
    (0, typeorm_1.Entity)("voters")
], VotersEntity);
