// Call all the routes here
import { Router } from "express";
import accountsRouter from "./accounts"
import investmentRequestRouter from "./investment_request"

const router: Router = Router();

router.use( accountsRouter )
router.use( investmentRequestRouter )

export default router;