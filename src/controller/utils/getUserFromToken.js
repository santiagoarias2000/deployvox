"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntityFromUser = void 0;
const models_1 = require("../../models");
const rolesEnum_1 = require("../../models/rolesEnum");
const getEntityFromUser = (jwtPayload) => {
    const { userId, role } = jwtPayload;
    switch (role) {
        case rolesEnum_1.Roles.CANDIDATE:
            return models_1.CandidateEntity.findOne({ where: { user: { id: userId } } });
        case rolesEnum_1.Roles.LEADER:
            return models_1.LeaderEntity.findOne({ where: { user: { id: userId } }, relations: ['candidate'] });
        default:
            return null;
    }
};
exports.getEntityFromUser = getEntityFromUser;
