import { Router } from "express";

import { urlController } from "../controllers";
import { urlMiddleware } from "../middlewares";

const router = Router();

router.post("/short", urlMiddleware.isOriginalUrl, urlController.shortUrl);

router.all("/:urlId", urlMiddleware.isExistUrlInDB, urlController.redirect);
export const urlRouter = router;
