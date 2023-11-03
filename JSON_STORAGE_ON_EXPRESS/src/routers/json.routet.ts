import { Router } from "express";

import { jsonController } from "../controllers";
import { authenticateMiddleware, jsonMiddleware } from "../middlewares";

const router = Router();

router.get(
  "/:userId/listFiles",
  authenticateMiddleware.isLogin,
  jsonController.getListJson,
);

router.get(
  "/:userId/listFiles/:filePath",
  authenticateMiddleware.isLogin,
  jsonController.getJson,
);

router.put(
  "/:userId",
  authenticateMiddleware.isLogin,
  jsonMiddleware.isJsonValid,
  jsonController.putJson,
);

export const jsonPathRouter = router;
