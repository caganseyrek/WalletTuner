import express from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

/**
 * Class for setting up and serving Swagger API documentation.
 * This integrates the Swagger UI with the Express application for the API documentation.
 */
class Swagger {
  private swaggerOptions: Options = {
    definition: {
      info: {
        title: "WalletTuner API",
        version: "v2",
      },
    },
    apis: ["./src/routes/accountRoutes.ts"],
  };

  /**
   * Applies the Swagger UI to the Express application.
   *
   * - Serves the Swagger documentation on the route `/api/dev/swagger`.
   * - Uses `swagger-jsdoc` to generate the API docs based on the provided route files.
   *
   * @param {express.Application} app - The Express application instance.
   * @returns {express.Application} The modified Express application with Swagger documentation applied.
   */
  public apply(app: express.Application): express.Application {
    app.use(
      "/api/dev/swagger",
      swaggerUI.serve,
      swaggerUI.setup(swaggerJsdoc(this.swaggerOptions), {
        explorer: true,
      }),
    );
    return app;
  }
}

export default Swagger;
