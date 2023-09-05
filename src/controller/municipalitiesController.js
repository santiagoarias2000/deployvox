"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalityController = void 0;
const repository_1 = require("./../repository");
const pagination_1 = require("./utils/pagination");
class MunicipalityController {
    constructor() {
        this.municipalityRepository = new repository_1.MunicipalityRepository();
        this.orderByOptions = ["name"];
        this.findAll = (req, res) => {
            let { page, pagesize, orderBy, asc } = req.query;
            const pageParams = (0, pagination_1.getPage)(this.orderByOptions, page === null || page === void 0 ? void 0 : page.toString(), pagesize === null || pagesize === void 0 ? void 0 : pagesize.toString(), orderBy === null || orderBy === void 0 ? void 0 : orderBy.toString(), asc === null || asc === void 0 ? void 0 : asc.toString());
            this.municipalityRepository
                .findAll(pageParams.skip, pageParams.newPageSize, pageParams.newAsc, pageParams.orderBy)
                .then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        };
        this.findById = (req, res) => {
            const id = parseInt(req.params.id);
            this.municipalityRepository.findById(id).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        };
        this.deleteById = (req, res) => {
            const id = parseInt(req.params.id);
            this.municipalityRepository.delete(id).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        };
        this.updateById = (req, res) => {
            const id = parseInt(req.params.id);
            const municipality = req.body;
            this.municipalityRepository.update(municipality, id).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        };
        this.save = (req, res) => {
            if (!isNaN(req.body.id)) {
                return res.status(405).json({
                    message: "not allowed"
                });
            }
            const municipality = req.body;
            this.municipalityRepository.save(municipality).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        };
        this.count = (req, res) => {
            this.municipalityRepository.countAll().then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        };
    }
}
exports.MunicipalityController = MunicipalityController;
