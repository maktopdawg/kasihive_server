import { Router } from "express";
import DepositController from "../controllers/deposit_controller";

const router: Router = Router();

router.post('/deposit/create-new-deposit', DepositController.create_deposit);
router.get('/deposit/:id', DepositController.get_deposit);

export default router;
