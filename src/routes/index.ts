// Call all the routes here
import { Router } from "express";
import accountsRouter from "./accounts"
import investmentRequestRouter from "./investment_request"
import virtualWalletRouter from "./virtual_wallet"
import InvestmentRouter from "./investment"

import performanceRouter from "./performanceRoutes"

const router: Router = Router();

router.use( accountsRouter )
router.use( performanceRouter )
router.use( investmentRequestRouter )
router.use( virtualWalletRouter )
router.use( InvestmentRouter )


export default router;