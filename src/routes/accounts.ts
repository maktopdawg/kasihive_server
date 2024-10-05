import { Router } from "express";
import AccountsController from "../controllers/accounts_controller";

const router: Router = Router();

router.post( "/account/investor/register", AccountsController.create_investor_account )
router.delete( "/accounts/delete-investor-account", AccountsController.delete_investor_account )
router.post( "/accounts/new-business-account", AccountsController.create_business_account )
router.post( "/business/delete/:businessId", AccountsController.delete_business_account )
router.patch( "/accounts/update-investor-password", AccountsController.update_investor_password )
router.get( "/accounts/investors/all", AccountsController.get_all_investor_accounts )
router.get( "/accounts/investors/:username", AccountsController.get_investor_account )
router.patch( "/accounts/investors/:username/change-status", AccountsController.change_investor_profile_status )

export default router;