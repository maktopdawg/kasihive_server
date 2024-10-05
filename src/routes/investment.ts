import { Router } from "express";
import InvestmentController from "../controllers/investment_controller";

const router: Router = Router()

router.post( "/investments/create", InvestmentController.create_new_investment )
router.get( "/investments/:id", InvestmentController.get_investment )
router.patch( "/investments/:id", InvestmentController.update_investment_status )


export default router;