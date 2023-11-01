import cors from "@koa/cors";
import Koa from "koa";
import koaBody from "koa-body";

import { checkAndCreateTable } from "./config";
import { authRouter, jsonPathRouter } from "./routers";

const app = new Koa();
const PORT = 8000;

checkAndCreateTable()
  .then(() => {
    app.use(cors());
    app.use(
      koaBody({
        multipart: true,
        formidable: {
          uploadDir: "./uploads",
          keepExtensions: true,
        },
      }),
    );
    app.use(authRouter);
    app.use(jsonPathRouter);

    app.use(
      koaBody({
        multipart: true,
        formidable: {
          uploadDir: "./uploads",
          keepExtensions: true,
        },
      }),
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}/ 🚀`);
    });
  })
  .catch((error) => {
    console.error("Failed to check and create tables:", error);
    process.exit(1);
  });

// app.use(cors());
// app.use(parser());
// app.use(authRouter);
// app.use(jsonPathRouter);
//
// app.use(async (ctx, next) => {
//   try {
//     await checkAndCreateTable();
//     await next();
//   } catch (err) {
//     ctx.status = err.status || 500;
//     ctx.body = {
//       message: err.message,
//     };
//     ctx.app.emit("error", err, ctx);
//   }
// });
//
// app.listen(PORT, () => {
//   console.log(`🚀 Server listening http://localhost:${PORT}/ 🚀`);
// });
