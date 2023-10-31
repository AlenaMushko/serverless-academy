import cors from "@koa/cors";
import Koa from "koa";
import parser from "koa-bodyparser";

import { jsonPathRouter } from "./routers";

const app = new Koa();
const PORT = 8000;

app.use(cors());
app.use(parser());
app.use(jsonPathRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening http://127.0.0.1:${PORT}/ 🚀`);
});
