import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";

import router from "./routes";
import {config} from "./types/IConfig";
import postgresql from "./services/postgresql";

const app = new Koa();
const apiRouter = router
const PORT = config.port;

app.context.db = postgresql;
app.use(bodyParser());

app.use(
    cors({
      origin: "*",
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH']
    })
);

app.use(logger());
app.use(apiRouter.routes());

const server = app
    .listen(PORT, async () => {
        console.log(`Server listening on port: ${PORT}`);
    })
    .on("error", err => {
        console.error(err);
    });

export default server;
