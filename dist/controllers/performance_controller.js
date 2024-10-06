"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const performance_model_1 = __importDefault(require("../models/performance_model"));
class PerformanceController {
}
_a = PerformanceController;
PerformanceController.create_performance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessId, financialMetrics, performanceIndicators, status } = req.body;
    if (!businessId || !financialMetrics || !performanceIndicators || !status) {
        return res.status(200).json({ message: 'All fields are required.' });
    }
    try {
        const result = yield performance_model_1.default.create({
            "businessId": businessId,
            "financialMetrics": financialMetrics,
            "performanceIndicators": performanceIndicators,
            "status": status
        });
        res.status(201).json({ message: "Performance record successfully created", data: result });
    }
    catch (error) {
        res.status(500).json({ "error": error.message, "message": "Error creating performance record." });
    }
});
PerformanceController.delete_performance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Performance ID is required' });
    }
    try {
        const deletedPerformance = yield performance_model_1.default.findByIdAndDelete(id);
        if (!deletedPerformance) {
            return res.status(404).json({ message: 'Performance record not found' });
        }
        res.status(200).json({ message: 'Performance record deleted successfully', deletedId: id });
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Error deleting performance record' });
    }
});
PerformanceController.get_all_performances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const performances = yield performance_model_1.default.find();
        res.status(200).json(performances);
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Error retrieving performance records' });
    }
});
PerformanceController.get_performance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Performance ID is required' });
    }
    try {
        const performance = yield performance_model_1.default.findById(id);
        if (!performance) {
            return res.status(404).json({ message: 'Performance record not found' });
        }
        res.status(200).json(performance);
    }
    catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ error: error.message, message: 'Error retrieving performance record' });
    }
});
exports.default = PerformanceController;
