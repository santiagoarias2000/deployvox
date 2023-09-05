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
exports.LeaderEntity = void 0;
const typeorm_1 = require("typeorm");
const usersEntity_1 = require("./usersEntity");
const candidateEntity_1 = require("./candidateEntity");
let LeaderEntity = exports.LeaderEntity = class LeaderEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id" }),
    __metadata("design:type", Number)
], LeaderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", length: 250 }),
    __metadata("design:type", String)
], LeaderEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name", length: 250 }),
    __metadata("design:type", String)
], LeaderEntity.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "goal", length: 250 }),
    __metadata("design:type", String)
], LeaderEntity.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usersEntity_1.UserEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
    __metadata("design:type", usersEntity_1.UserEntity)
], LeaderEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => candidateEntity_1.CandidateEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "candidate_id", referencedColumnName: "id" }),
    __metadata("design:type", candidateEntity_1.CandidateEntity)
], LeaderEntity.prototype, "candidate", void 0);
exports.LeaderEntity = LeaderEntity = __decorate([
    (0, typeorm_1.Entity)("leaders")
], LeaderEntity);
