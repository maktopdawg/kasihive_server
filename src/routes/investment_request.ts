import { Router } from "express";
import InvestmentsRequestController from "../controllers/investment_request_controller";

const router: Router = Router();

router.post( "/dashboard/:id/create-new-investment-request", InvestmentsRequestController.open_investment_request )

export default router;