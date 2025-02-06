import express, { Router } from "express";

import Auth from "@/middlewares/auth";

import OverviewController from "@/resources/overview/overview.controller";

class OverviewRouter {
  private router: Router;
  private overviewController: OverviewController;

  constructor() {
    this.router = express.Router();
    this.overviewController = new OverviewController();
  }

  public getRouter(): Router {
    this.router.get("/getOverview", Auth.check, (req, res, next) => {
      return this.overviewController.getOverviews(req, res, next);
    });
    return this.router;
  }
}

export default OverviewRouter;
