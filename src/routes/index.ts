// Call all the routes here
import { Router } from "express";
import accountsRouter from "./accounts"

const router: Router = Router();

router.use( accountsRouter )

export default router;