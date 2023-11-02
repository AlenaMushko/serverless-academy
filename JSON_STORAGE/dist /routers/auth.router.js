"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const validations_1 = require("../validations");
const router = new koa_router_1.default({ prefix: "/auth" });
router.post("/sign-up", middlewares_1.commonMiddleware.isBodyValid(validations_1.userSchema.create), middlewares_1.authMiddleware.uniqueEmail, controllers_1.authController.signUp);
router.post("/sign-in", middlewares_1.commonMiddleware.isBodyValid(validations_1.userSchema.create), middlewares_1.authMiddleware.isUserExist, controllers_1.authController.signIn);
exports.authRouter = router.routes();
