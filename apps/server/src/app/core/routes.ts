import express from "express";

import AccountRouter from "@/resources/account/account.router";
import AuthRouter from "@/resources/auth/auth.router";
import MilestoneRouter from "@/resources/milestone/milestone.router";
import OverviewRouter from "@/resources/overview/overview.router";
import SubscriptionRouter from "@/resources/subscription/subscription.router";
import TransactionRouter from "@/resources/transaction/transaction.router";

/**
 * Class for defining and applying API routes to the Express application.
 * This class configures the route paths for different sections of the application.
 */
class Routes {
  private base: string = "api";
  private version: string = "v2";
  private apiPrefix: string = `/${this.base}/${this.version}`;

  private authRouter: AuthRouter;
  private accountRouter: AccountRouter;
  private milestoneRouter: MilestoneRouter;
  private overviewRouter: OverviewRouter;
  private subscriptionRouter: SubscriptionRouter;
  private transactionRouter: TransactionRouter;

  constructor() {
    this.authRouter = new AuthRouter();
    this.accountRouter = new AccountRouter();
    this.milestoneRouter = new MilestoneRouter();
    this.overviewRouter = new OverviewRouter();
    this.subscriptionRouter = new SubscriptionRouter();
    this.transactionRouter = new TransactionRouter();
  }

  /**
   * Applies the API routes to the Express application.
   *
   * @param {express.Application} app - The Express application instance.
   * @returns {express.Application} The modified Express application with the applied API routes.
   */
  public apply(app: express.Application): express.Application {
    app.use(`${this.apiPrefix}/auth`, this.authRouter.getRouter());
    app.use(`${this.apiPrefix}/account`, this.accountRouter.getRouter());
    app.use(`${this.apiPrefix}/milestone`, this.milestoneRouter.getRouter());
    app.use(`${this.apiPrefix}/overview`, this.overviewRouter.getRouter());
    app.use(`${this.apiPrefix}/subscription`, this.subscriptionRouter.getRouter());
    app.use(`${this.apiPrefix}/transaction`, this.transactionRouter.getRouter());

    return app;
  }
}

export default Routes;
