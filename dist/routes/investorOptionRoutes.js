"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const investor_option_controller_1 = __importDefault(require("../controllers/investor_option_controller"));
const router = (0, express_1.Router)();
router.post('/investment-options/create', investor_option_controller_1.default.create_investment_option);
router.get('/investment-options', investor_option_controller_1.default.get_all_investment_options);
router.get('/investment-option/:id', investor_option_controller_1.default.get_investment_options);
router.delete('/investment-option/:id', investor_option_controller_1.default.delete_investment_options);
exports.default = router;
