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
const investment_option_1 = __importDefault(require("../models/investment_option"));
class InvestorOptionController {
}
_a = InvestorOptionController;
InvestorOptionController.create_investment_option = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { optionName, description, investmentType, minInvestment, maxInvestment, expectedReturns, riskLevel, investmentDuration, investmentRequests, investors } = req.body;
    if (!optionName || !description || !investmentType || !minInvestment || !maxInvestment ||
        !expectedReturns || !riskLevel || !investmentDuration) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }
    try {
        const result = yield investment_option_1.default.create({
            "optionName": optionName,
            "description": description,
            "investmentType": investmentType,
            "minInvestment": minInvestment,
            "maxInvestment": maxInvestment,
            "expectedReturns": expectedReturns,
            "riskLevel": riskLevel,
            "investmentDuration": investmentDuration,
            "investmentRequests": investmentRequests,
            "investors": investors
        });
        res.status(201).json({ message: "Investment record successfully created", data: result });
    }
    catch (error) {
        res.status(500).json({ "error": error.message, "message": "Error creating investment option" });
    }
});
InvestorOptionController.get_all_investment_options = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const investmentOptions = yield investment_option_1.default.find();
        res.status(200).json(investmentOptions);
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Error retrieving investment options' });
    }
});
InvestorOptionController.get_investment_options = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Investment Option ID is required' });
    }
    try {
        const investmentOption = yield investment_option_1.default.findById(id);
        if (!investmentOption) {
            return res.status(404).json({ message: 'Investment option not found' });
        }
        res.status(200).json(investmentOption);
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Error retrieving investment option' });
    }
});
InvestorOptionController.delete_investment_options = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Investment Option ID is required' });
    }
    try {
        const deletedPerformance = yield investment_option_1.default.findByIdAndDelete(id);
        if (!deletedPerformance) {
            return res.status(404).json({ message: 'Performance record not found' });
        }
        res.status(200).json({ message: 'Performance record deleted successfully', deletedId: id });
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: 'Error deleting performance record' });
    }
});
exports.default = InvestorOptionController;
