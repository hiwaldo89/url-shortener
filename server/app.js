import express from "express";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import rateLimit from "express-rate-limit";

import urlRoutes from "./url-routes";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const app = express();
const swaggerDocs = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: "Shorten URL API",
      version: "1.0.0",
    },
  },
  apis: ["url-routes.js"],
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/api", urlRoutes, limiter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

export default app;
