import Router from "koa-router";

import { jsonController } from "../controllers";
import { jsonMiddleware } from "../middlewares";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware";

const router = new Router({ prefix: "/json-file" });

router.get(
  "/:userId",
  authenticateMiddleware.isLogin,
  jsonMiddleware.isJsonValid,
  jsonController.getJson,
);

router.put(
  "/:userId",
  authenticateMiddleware.isLogin,
  jsonMiddleware.isJsonValid,
  jsonController.putJson,
);

export const jsonPathRouter = router.routes();
