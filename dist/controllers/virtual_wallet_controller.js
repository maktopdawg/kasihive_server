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
const virtual_wallet_1 = __importDefault(require("../models/virtual_wallet"));
class VirtualWalletController {
}
_a = VirtualWalletController;
VirtualWalletController.create_new_virtual_wallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { investor, investmentRequest, initialInvestment } = req.body;
    if (!investor || !investmentRequest || !initialInvestment)
        return res.status(442).json({ "message": "All fields are required." });
    yield virtual_wallet_1.default.create({
        investor,
        investmentRequest,
        initialInvestment
    });
    return res.status(200).json({ "message": "Virtual Wallet Created." });
});
VirtualWalletController.get_virtual_wallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(442).json({ "message": "All fields are required" });
    const virtualWalletId = req.params.id;
    try {
        const virtual_wallet = yield virtual_wallet_1.default.findOne({ _id: virtualWalletId });
        return res.status(200).json(virtual_wallet);
    }
    catch (error) {
        console.log(error.message);
        return res.status(404).json({ "message": "Virtual Wallet Not Found." });
    }
});
VirtualWalletController.delete_virtual_wallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(442).json({ "message": "All fields are required" });
    const virtual_wallet_id = req.params.id;
    try {
        const virtual_wallet = yield virtual_wallet_1.default.findOneAndDelete({ _id: virtual_wallet_id });
        if (!virtual_wallet)
            return res.status(404).json({ "message": "Virtual Wallet not found." });
        return res.status(200).json({ "message": `Virtual Wallet Successfully deleted.` });
    }
    catch (error) {
        return res.status(404).json({ "message": `Virtual Wallet with id ${virtual_wallet_id} not found.` });
    }
});
exports.default = VirtualWalletController;
