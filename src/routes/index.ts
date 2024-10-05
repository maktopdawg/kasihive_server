// Call all the routes here
import { Router } from "express";
import accountsRouter from "./accounts"
import performanceRouter from "./performanceRoutes"

const router: Router = Router();

router.use( accountsRouter )
router.use( performanceRouter )


export default router;