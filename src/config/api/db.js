"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const models_1 = require("../../models");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: config_1.host,
    port: config_1.port,
    username: config_1.username,
    password: config_1.password,
    database: config_1.database,
    entities: [
        models_1.ProposalEntity, models_1.MunicipalityEntity,
        models_1.VehicleEntity, models_1.UserEntity,
        models_1.CandidateEntity, models_1.VotersEntity,
        models_1.LeaderEntity, models_1.DepartmentEntity
    ],
    dropSchema: false,
    synchronize: true,
});
const connectDB = () => {
    return exports.AppDataSource.initialize();
};
exports.connectDB = connectDB;
