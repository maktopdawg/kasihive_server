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
const deposit_1 = __importDefault(require("../models/deposit"));
class DepositController {
}
_a = DepositController;
DepositController.create_deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { investorId, amount, dateDeposited } = req.body;
    if (!investorId || !amount || !dateDeposited) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        const result = yield deposit_1.default.create({
            investorId,
            amount,
            dateDeposited,
        });
        res.status(201).json({ message: "Deposit successfully created", deposit: result });
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: "Error creating deposit" });
    }
});
DepositController.get_deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Deposit id is required." });
    }
    try {
        const result = yield deposit_1.default.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Deposit record not found" });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message, message: "Error retrieving deposit record" });
    }
});
exports.default = DepositController;
