import express, { Router } from "express";

import OverviewController from "@/resources/overview/overview.controller";

const router: Router = express.Router();

const overviewController: OverviewController = new OverviewController();

router.get("/getOverview", overviewController.getOverviews);

const overviewRoutes: Router = router;

export default overviewRoutes;
