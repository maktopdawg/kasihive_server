import { Router } from "express";
import PerformanceController from "../controllers/performance_controller";

const router: Router = Router();

router.post('/performance/create-new-performance', PerformanceController.create_performance )
router.get('/performance/all', PerformanceController.get_all_performances)
router.get('/performance/:id', PerformanceController.get_performance)
router.delete('/performance/:id', PerformanceController.delete_performance)

export default router;