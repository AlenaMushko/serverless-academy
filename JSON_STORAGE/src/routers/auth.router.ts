import Router from "koa-router";

import { authController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { userSchema } from "../validations";

const router = new Router({ prefix: "/auth" });

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(userSchema.create),
  authMiddleware.uniqueEmail,
  authController.signUp,
);

router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(userSchema.create),
  authMiddleware.isUserExist,
  authController.signIn,
);

export const authRouter = router.routes();
