import { Router } from "express";
import InvestorOptionController from "../controllers/investor_option_controller";

const router: Router = Router();

router.post('/investment-options/create', InvestorOptionController.create_investment_option);
router.get('/investment-options', InvestorOptionController.get_all_investment_options);
router.get('/investment-option/:id', InvestorOptionController.get_investment_options);

export default router;