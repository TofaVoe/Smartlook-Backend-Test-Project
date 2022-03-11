import Router from "koa-router";
import healthcheck from "./healthcheck";
import user from "./user";
import collection from "./collection";

const router = new Router();

router.get('/healthcheck', healthcheck);

// /user
router.post('/user/register', user.register);
router.post('/user/login', user.login);
router.get('/user/about', user.verify, user.about);

// /collection
router.post('/collection/add', user.verify, collection.add);
router.get('/collection/show', user.verify, collection.show);
router.put('/collection/rename', user.verify, collection.rename);
router.delete('/collection/delete', user.verify, collection.remove);

export default router;