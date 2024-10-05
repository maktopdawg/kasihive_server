import { Router } from "express";
import InvestmentsRequestController from "../controllers/investment_request_controller";

const router: Router = Router();

router.post( "/dashboard/:id/new-investment-request", InvestmentsRequestController.open_investment_request )
router.get( "/investment-requests/all", InvestmentsRequestController.get_all_investment_request )
router.get( "/investment-requests/:id", InvestmentsRequestController.get_investment_request )
router.post( "/investment-requests/add-investor", InvestmentsRequestController.add_investor_to_investment_request )
router.post( "/investment-requests/remove-investor", InvestmentsRequestController.remove_investor_from_investment_request )

export default router;