"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.ProposalRepository = exports.LeaderRepository = exports.MunicipalityRepository = exports.CandidateRepository = void 0;
var candidatesRepository_1 = require("./candidatesRepository");
Object.defineProperty(exports, "CandidateRepository", { enumerable: true, get: function () { return candidatesRepository_1.CandidateRepository; } });
var municipalities_1 = require("./municipalities");
Object.defineProperty(exports, "MunicipalityRepository", { enumerable: true, get: function () { return municipalities_1.MunicipalityRepository; } });
var leadersRepository_1 = require("./leadersRepository");
Object.defineProperty(exports, "LeaderRepository", { enumerable: true, get: function () { return leadersRepository_1.LeaderRepository; } });
var proposals_1 = require("./proposals");
Object.defineProperty(exports, "ProposalRepository", { enumerable: true, get: function () { return proposals_1.ProposalRepository; } });
var usersRepository_1 = require("./usersRepository");
Object.defineProperty(exports, "UserRepository", { enumerable: true, get: function () { return usersRepository_1.UserRepository; } });