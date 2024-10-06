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
const investment_request_1 = __importDefault(require("../models/investment_request"));
const virtual_wallet_1 = __importDefault(require("../models/virtual_wallet"));
const investment_1 = __importDefault(require("../models/investment"));
class InvestmentController {
}
_a = InvestmentController;
InvestmentController.create_new_investment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { investorId, virtualWalletId, investmentType } = req.body;
    // Validate required fields
    if (!virtualWalletId || !investmentType) {
        return res.status(400).json({ "message": "All fields are required." });
    }
    try {
        const virtualWallet = yield virtual_wallet_1.default.findOne({ _id: virtualWalletId }).exec();
        if (!virtualWallet) {
            return res.status(404).json({ "message": "Virtual Wallet not found." });
        }
        const investmentRequest = yield investment_request_1.default.findOne({ _id: virtualWallet.investmentRequest }).exec();
        if (!investmentRequest) {
            return res.status(404).json({ "message": "Investment Request not found." });
        }
        const newInvestment = yield investment_1.default.create({
            investmentId: investmentRequest._id,
            investmentName: investmentRequest.nameOfInvestment,
            investmentType: investmentType,
            investor: investorId,
            amountInvested: virtualWallet.initialInvestment,
            status: investmentRequest.status
        });
        return res.status(201).json({ "message": "New investment created successfully.", investment: newInvestment });
    }
    catch (error) {
        return res.status(500).json({ "message": "Internal Server Error." });
    }
});
InvestmentController.get_investment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Investment ID is required" });
    }
    try {
        const investment = yield investment_1.default.findById(id).exec();
        if (!investment) {
            return res.status(404).json({ message: "Investment not found" });
        }
        return res.status(200).json(investment);
    }
    catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        return res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});
InvestmentController.update_investment_status = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Investment ID is required" });
    }
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }
    try {
        const updatedInvestment = yield investment_1.default.findByIdAndUpdate(id, { status: status }, { new: true }).exec();
        if (!updatedInvestment) {
            return res.status(404).json({ message: "Investment not found" });
        }
        return res.status(200).json({ message: "Investment status updated successfully", investment: updatedInvestment });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});
exports.default = InvestmentController;
