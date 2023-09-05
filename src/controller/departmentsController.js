"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const departmentsRepository_1 = require("../repository/departmentsRepository");
const pagination_1 = require("./utils/pagination");
class DepartmentController {
    constructor() {
        this.departmentRepository = new departmentsRepository_1.DepartmentRepository();
        this.orderByOptions = ["id", "code", "name"];
        this.findAll = (req, res) => {
            let { page, pagesize, orderBy, asc } = req.query;
            const pageParams = (0, pagination_1.getPage)(this.orderByOptions, page === null || page === void 0 ? void 0 : page.toString(), pagesize === null || pagesize === void 0 ? void 0 : pagesize.toString(), orderBy === null || orderBy === void 0 ? void 0 : orderBy.toString(), asc === null || asc === void 0 ? void 0 : asc.toString());
            this.departmentRepository
                .findAll(pageParams.skip, pageParams.newPageSize, pageParams.newAsc, pageParams.orderBy).then((response) => {
                res.status(200).json({
                    response
                });
            }).catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });
        };
        //?funtion use for find user by id
        this.findById = (req, res) => {
            const id = parseInt(req.params.id);
            this.departmentRepository
                .findById(id)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        };
        //?Funtion to delete user by id
        this.deleteById = (req, res) => {
            const id = parseInt(req.params.id);
            this.departmentRepository
                .delete(id)
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        };
        this.save = (req, res) => {
            const id = req.params.id;
            if (!isNaN(req.body.id)) {
                return res
                    .json(405)
                    .json(boom_1.default.badData("this ID use in the data base, change id or use the update method"));
            }
            const department = req.body;
            this.departmentRepository.save(department).then((response) => {
                res
                    .status(200)
                    .json(boom_1.default.badData("Your data is bad and not create the department"));
            });
        };
        //?funtion to update the user in the data base
        this.updateById = (req, res) => {
            const id = parseInt(req.params.id);
            const department = req.body;
            this.departmentRepository
                .update(id, department)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res.status(400).json({ message: err.message });
            });
        };
        //?funtion tu count the user in the database
        this.count = (req, res) => {
            this.departmentRepository
                .countAll()
                .then((response) => {
                res.status(200).json({
                    response,
                });
            })
                .catch((err) => {
                res.status(400).json({
                    message: err.message,
                });
            });
        };
    }
}
exports.DepartmentController = DepartmentController;
