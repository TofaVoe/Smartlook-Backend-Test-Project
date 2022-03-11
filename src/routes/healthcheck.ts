import {ParameterizedContext} from "koa";

function healthcheck(ctx: ParameterizedContext) {
  ctx.body = {
    status: "success",
    answer: 42
  }
}

export default healthcheck
