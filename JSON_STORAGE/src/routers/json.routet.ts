import koaBody from "koa-body";
import Router from "koa-router";

import { jsonController } from "../controllers";
import { authenticateMiddleware, jsonMiddleware } from "../middlewares";

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
  koaBody({ multipart: true }),
  jsonMiddleware.isJsonValid,
  jsonController.putJson,
);

export const jsonPathRouter = router;
