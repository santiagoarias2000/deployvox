"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const vehicles_1 = require("../repository/vehicles");
class VehiclesController {
    constructor() {
        this.vehiclesRepository = new vehicles_1.VehicleRepository();
        //?funtion to view car in the dashboard
        this.findAll = (req, res) => {
            this.vehiclesRepository
                .findAll()
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res.status(400).json(boom_1.default.badRequest("Your request failed"));
            });
        };
        //?Funtion to delete car on the data base
        this.findById = (req, res) => {
            const id = parseInt(req.params.id);
            this.vehiclesRepository
                .findById(id)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res
                    .status(400)
                    .json(boom_1.default.badData("Your data is bad and not create the vehicle"));
            });
        };
        this.deleteById = (res, req) => {
            const id = parseInt(req.params.id);
            this.vehiclesRepository
                .delete(id)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res
                    .status(err)
                    .json(boom_1.default.badData("Your data is bad and not delte the vehicle"));
            });
        };
        //?Funtion tu save car o the data base
        this.save = (req, res) => {
            const id = req.params.id;
            if (!isNaN(req.body.id)) {
                return res
                    .json(405)
                    .json(boom_1.default.badData("this ID use in the data base, chage id or use the update method"));
            }
            const vehicle = req.body;
            this.vehiclesRepository.save(vehicle).then((response) => {
                res
                    .status(200)
                    .json(boom_1.default.badData("Your data is bad and not create the vehicle"));
            });
        };
        //?funtion to update the vehicle in the data base
        this.updateById = (req, res) => {
            const id = parseInt(req.params.id);
            const vehicle = req.body;
            this.vehiclesRepository
                .update(id, vehicle)
                .then((response) => {
                res.status(200).json({ response });
            })
                .catch((err) => {
                res.status(400).json({ message: err.message });
            });
        };
        //?count data for the car in the database
        this.count = (req, res) => {
            this.vehiclesRepository.countAll().then((response) => {
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
exports.VehiclesController = VehiclesController;
