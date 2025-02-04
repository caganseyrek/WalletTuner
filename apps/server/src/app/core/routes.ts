import express from "express";

import accountRoutes from "@/resources/account/account.routes";
import milestoneRoutes from "@/resources/milestone/milestone.routes";
import overviewRoutes from "@/resources/overview/overview.routes";
import subscriptionRoutes from "@/resources/subscription/subscription.routes";
import transactionRoutes from "@/resources/transaction/transaction.routes";

/**
 * Class for defining and applying API routes to the Express application.
 * This class configures the route paths for different sections of the application.
 */
class Routes {
  private static base: string = "api";
  private static version: string = "v1";
  private static apiPrefix: string = `/${this.base}/${this.version}`;

  /**
   * Applies the API routes to the Express application.
   * The routes defined are for account, budget, challenge, insight, subscription, transaction, and user resources.
   *
   * @param {express.Application} app - The Express application instance.
   * @returns {express.Application} The modified Express application with the applied API routes.
   */
  public static apply(app: express.Application): express.Application {
    app.use(`${this.apiPrefix}/account`, accountRoutes);
    app.use(`${this.apiPrefix}/milestone`, milestoneRoutes);
    app.use(`${this.apiPrefix}/overview`, overviewRoutes);
    app.use(`${this.apiPrefix}/subscription`, subscriptionRoutes);
    app.use(`${this.apiPrefix}/transaction`, transactionRoutes);
    app.use(`${this.apiPrefix}/auth`);
    app.use(`${this.apiPrefix}/user`);

    return app;
  }
}

export default Routes;
