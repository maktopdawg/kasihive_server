"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const investment_controller_1 = __importDefault(require("../controllers/investment_controller"));
const router = (0, express_1.Router)();
router.post("/investments/create", investment_controller_1.default.create_new_investment);
router.get("/investments/:id", investment_controller_1.default.get_investment);
router.patch("/investments/:id", investment_controller_1.default.update_investment_status);
exports.default = router;
