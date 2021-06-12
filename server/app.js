import express from "express";
import path from "path";

import urlRoutes from "./url-routes";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use('/api', urlRoutes);

export default app;