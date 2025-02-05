import express, { Router } from "express";

import OverviewController from "@/resources/overview/overview.controller";

import Auth from "@/middleware/auth";

const router: Router = express.Router();

const overviewController: OverviewController = new OverviewController();

router.get("/getOverview", Auth.check, overviewController.getOverviews);

const overviewRoutes: Router = router;

export default overviewRoutes;
