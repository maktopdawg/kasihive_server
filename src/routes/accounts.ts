import { Router } from "express";
import AccountsController from "../controllers/accounts_controller";

const router: Router = Router();

router.post( "/accounts/new-investor-account", AccountsController.create_investor_account )
router.post( "/accounts/new-business-account", AccountsController.create_business_account )

export default router;