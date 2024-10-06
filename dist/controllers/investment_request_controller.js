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
class InvestmentRequestController {
}
_a = InvestmentRequestController;
InvestmentRequestController.open_investment_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const businessId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    const { nameOfInvestment, description, amountRequested, duration, risk } = req.body;
    console.log("R1");
    if (!businessId || !nameOfInvestment || !description || !amountRequested || !duration || !risk)
        return res.status(200).json({ "message": "All fields are required." });
    console.log("R2");
    try {
        // const business = await BusinessAccount.findOne({ _id: businessId }).exec();
        // if (!business) return res.status(200).json({ "message": "No business found." })
        // const openRequests = business.investmentRounds.length;
        const openRequests = 1;
        console.log("R3");
        if (openRequests < 2) {
            console.log("R4");
            const result = yield investment_request_1.default.create({
                "businessId": businessId,
                "nameOfInvestment": nameOfInvestment,
                "description": description,
                "amountRequested": amountRequested,
                "duration": duration,
                "risk": risk
            });
            console.log("R5");
            return res.status(200).json({ "message": "Investment Request Now Opened." });
        }
        else {
            return res.status(200).json({ "message": "Can't open more than two investment requests." });
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ "message": "Internal Server Error." });
    }
});
InvestmentRequestController.get_all_investment_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query: { filter, value } } = req;
    if (!filter && !value) {
        const investment_requests = yield investment_request_1.default.find();
        if (!investment_requests)
            return res.status(200).json({ "message": [] });
        return res.status(200).json(investment_requests);
    }
    else {
        const filterUppercase = filter === null || filter === void 0 ? void 0 : filter.toString().toUpperCase();
        console.log(filterUppercase);
        // Return based on risk level
        if (filterUppercase === 'MEDIUM') {
            const investment_requests = yield investment_request_1.default.find({ "risk": "MEDIUM" });
            return res.status(200).json(investment_requests);
        }
        else if (filterUppercase === "LOW") {
            const investment_requests = yield investment_request_1.default.find({ "risk": "LOW" });
            return res.status(200).json(investment_requests);
        }
        else if (filterUppercase === "HIGH") {
            const investment_requests = yield investment_request_1.default.find({ "risk": "HIGH" });
            return res.status(200).json(investment_requests);
        }
        // Rerturn investment requests based on business
        const investment_requests = yield investment_request_1.default.find({ businessId: filter });
        return res.status(200).json(investment_requests);
    }
});
InvestmentRequestController.get_investment_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(400).json({ "message": "Investment Request Id required." });
    const investment_request_id = req.params.id;
    try {
        const investment_request = yield investment_request_1.default.findOne({ _id: investment_request_id }).exec();
        return res.status(200).json(investment_request);
    }
    catch (error) {
        return res.status(200).json({ "message": `Investment Request with id ${investment_request_id} not found.` });
    }
});
InvestmentRequestController.add_investor_to_investment_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { virtualWalletId } = req.body;
    if (!virtualWalletId)
        return res.status(400).json({ "message": "No wallet id provided." });
    try {
        const virtualWallet = yield virtual_wallet_1.default.findOne({ _id: virtualWalletId }).exec();
        try {
            const investment_request = yield investment_request_1.default.findOne({ _id: virtualWallet === null || virtualWallet === void 0 ? void 0 : virtualWallet.investmentRequest }).exec();
            if (!investment_request)
                return res.status(200).json({ "message": `Investment Request Not found` });
            investment_request.investors.push({
                investor: virtualWalletId,
            });
            investment_request.amountReceived += virtualWallet === null || virtualWallet === void 0 ? void 0 : virtualWallet.initialInvestment;
            yield investment_request.save();
            return res.status(200).json({ "message": `Virtual Wallet '${virtualWalletId}' has successfully invested.` });
        }
        catch (error) {
            return res.status(200).json({ "message": `Investment Request Not found.` });
        }
    }
    catch (error) {
        return res.status(200).json({ "message": `Virtual Wallet Not found` });
    }
});
InvestmentRequestController.remove_investor_from_investment_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { virtualWalletId } = req.body;
    if (!virtualWalletId)
        return res.status(400).json({ "message": "No wallet id provided." });
    try {
        // Fetch the virtual wallet
        const virtualWallet = yield virtual_wallet_1.default.findOne({ _id: virtualWalletId }).exec();
        if (!virtualWallet)
            return res.status(200).json({ "message": "Virtual Wallet Not found." });
        try {
            const investment_request = yield investment_request_1.default.findOne({ _id: virtualWallet === null || virtualWallet === void 0 ? void 0 : virtualWallet.investmentRequest }).exec();
            if (!investment_request)
                return res.status(200).json({ "message": "Investment Request Not found." });
            const investorIndex = investment_request.investors.findIndex((investor) => investor.investor.toString() === virtualWalletId);
            if (investorIndex === -1) {
                return res.status(200).json({ "message": "Investor not found in this investment request." });
            }
            investment_request.investors.splice(investorIndex, 1);
            yield investment_request.save();
            return res.status(200).json({ "message": `Investor '${virtualWalletId}' has been successfully removed from the investment request.` });
        }
        catch (error) {
            return res.status(500).json({ "message": "Error updating investment request." });
        }
    }
    catch (error) {
        return res.status(500).json({ "message": "Error fetching virtual wallet." });
    }
});
exports.default = InvestmentRequestController;
