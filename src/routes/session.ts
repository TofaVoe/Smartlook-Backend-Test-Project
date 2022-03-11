import Router from "koa-router";

const router = new Router();

router.get('/session/create', (msg) => {
    msg.body = {
        token: "randomToken51819889"
    }
});

export default router;