import Router from "koa-router";
import { Context } from "koa";

const router = new Router();

router.get("/json_path", (ctx:Context) => (ctx.body = "Events List!"));
router.put("/json_path", (ctx:Context) => (ctx.body = "Event Posted!"));

export const jsonPathRouter = router.routes();
