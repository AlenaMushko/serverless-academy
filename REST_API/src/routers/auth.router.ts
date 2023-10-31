import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middelwares";
import { userSchema } from "../validations";

const router = Router();

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

export const authRouter = router;
