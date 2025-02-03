import express from "express";

/**
 * Class for defining and applying API routes to the Express application.
 * This class configures the route paths for different sections of the application.
 */
class Routes {
  /**
   * Applies the API routes to the Express application.
   * The routes defined are for account, budget, challenge, insight, subscription, transaction, and user resources.
   *
   * @param {express.Application} app - The Express application instance.
   * @returns {express.Application} The modified Express application with the applied API routes.
   */
  public static apply(app: express.Application): express.Application {
    app.use("/api/account");
    app.use("/api/budget");
    app.use("/api/challenge");
    app.use("/api/insight");
    app.use("/api/subscription");
    app.use("/api/transaction");
    app.use("/api/user");

    return app;
  }
}

export default Routes;
