"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Call all the routes here
const express_1 = require("express");
const accounts_1 = __importDefault(require("./accounts"));
const investment_request_1 = __importDefault(require("./investment_request"));
const virtual_wallet_1 = __importDefault(require("./virtual_wallet"));
const investment_1 = __importDefault(require("./investment"));
const performanceRoutes_1 = __importDefault(require("./performanceRoutes"));
const investorOptionRoutes_1 = __importDefault(require("./investorOptionRoutes"));
const depositRoutes_1 = __importDefault(require("./depositRoutes"));
const router = (0, express_1.Router)();
router.use(accounts_1.default);
router.use(performanceRoutes_1.default);
router.use(investment_request_1.default);
router.use(virtual_wallet_1.default);
router.use(investment_1.default);
router.use(investorOptionRoutes_1.default);
router.use(depositRoutes_1.default);
exports.default = router;
