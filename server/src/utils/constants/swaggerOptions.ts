import swaggerJsdoc, { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    info: {
      title: "WalletTuner API",
      version: "v2",
    },
  },
  apis: ["./src/routes/accountRoutes.ts"],
};

export default swaggerJsdoc(swaggerOptions);
