"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonPathRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const router = new koa_router_1.default({ prefix: "/json-file" });
router.get("/:userId", authenticate_middleware_1.authenticateMiddleware.isLogin, middlewares_1.jsonMiddleware.isJsonValid, controllers_1.jsonController.getJson);
router.put("/:userId", authenticate_middleware_1.authenticateMiddleware.isLogin, middlewares_1.jsonMiddleware.isJsonValid, controllers_1.jsonController.putJson);
exports.jsonPathRouter = router.routes();
