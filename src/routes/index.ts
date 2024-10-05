// Call all the routes here
import { Router } from "express";
import accountsRouter from "./accounts";
import investmentRequestRouter from "./investment_request";
import virtualWalletRouter from "./virtual_wallet";
import InvestmentRouter from "./investment";
import performanceRouter from "./performanceRoutes"; // This is from 'business_crud'

const router: Router = Router();

router.use(accountsRouter);
router.use(performanceRouter); // Added from 'business_crud'
router.use(investmentRequestRouter);
router.use(virtualWalletRouter);
router.use(InvestmentRouter);

export default router;