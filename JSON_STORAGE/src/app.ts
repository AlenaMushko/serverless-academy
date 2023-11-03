import cors from "@koa/cors";
import Koa from "koa";

import { checkAndCreateTable } from "./config";
import { authRouter, jsonPathRouter } from "./routers";

const app = new Koa();
const PORT = 8000;

checkAndCreateTable()
  .then(() => {
    app.use(cors());

    app.use(authRouter.routes()).use(authRouter.allowedMethods());
    app.use(jsonPathRouter.routes()).use(jsonPathRouter.allowedMethods());

    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}/ 🚀`);
    });
  })
  .catch((error) => {
    console.error("Failed to check and create tables:", error);
    process.exit(1);
  });
