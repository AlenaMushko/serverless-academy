"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@koa/cors"));
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const config_1 = require("./config");
const routers_1 = require("./routers");
const app = new koa_1.default();
const PORT = 8000;
(0, config_1.checkAndCreateTable)()
    .then(() => {
    app.use((0, cors_1.default)());
    app.use((0, koa_body_1.default)({
        multipart: true,
        formidable: {
            uploadDir: "./uploads",
            keepExtensions: true,
        },
    }));
    app.use(routers_1.authRouter);
    app.use(routers_1.jsonPathRouter);
    app.listen(PORT, () => {
        console.log(`🚀 Server listening at http://localhost:${PORT}/ 🚀`);
    });
})
    .catch((error) => {
    console.error("Failed to check and create tables:", error);
    process.exit(1);
});
