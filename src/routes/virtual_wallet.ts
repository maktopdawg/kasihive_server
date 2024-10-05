import { Router } from "express";
import VirtualWalletController from "../controllers/virtual_wallet_controller";

const router: Router = Router();

router.post( "/virtual_wallet/new", VirtualWalletController.create_new_virtual_wallet );
router.get( "/virtual_wallet/view/:id", VirtualWalletController.get_virtual_wallet )
router.delete( "/virtual_wallet/delete/:id", VirtualWalletController.delete_virtual_wallet )

export default router;