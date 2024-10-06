"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const investment_request_controller_1 = __importDefault(require("../controllers/investment_request_controller"));
const router = (0, express_1.Router)();
router.post("/dashboard/:id/new-investment-request", investment_request_controller_1.default.open_investment_request);
router.get("/investment-requests/all", investment_request_controller_1.default.get_all_investment_request);
router.get("/investment-requests/:id", investment_request_controller_1.default.get_investment_request);
router.post("/investment-requests/add-investor", investment_request_controller_1.default.add_investor_to_investment_request);
router.post("/investment-requests/remove-investor", investment_request_controller_1.default.remove_investor_from_investment_request);
exports.default = router;
