import { Router } from "express";
import InvestmentController from "../controllers/investment_controller";

const router: Router = Router()

router.post( "/investments/create", InvestmentController.create_new_investment )

export default router;