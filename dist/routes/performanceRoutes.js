"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const performance_controller_1 = __importDefault(require("../controllers/performance_controller"));
const router = (0, express_1.Router)();
router.post('/performance/create-new-performance', performance_controller_1.default.create_performance);
router.get('/performance/all', performance_controller_1.default.get_all_performances);
router.get('/performance/:id', performance_controller_1.default.get_performance);
router.delete('/performance/:id', performance_controller_1.default.delete_performance);
exports.default = router;
