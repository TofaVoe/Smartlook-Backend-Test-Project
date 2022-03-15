import {ICollectionAdd, ICollectionRename} from "../../types/entities/ICollection";
import {config} from "../../types/IConfig";
import collection from "../../services/collection";

async function add(ctx: any) {
  const data = <ICollectionAdd>ctx.request.body;

  try {
    await collection.create(ctx.db, ctx.userid, data.name)
    ctx.status = 201;
    ctx.body = {
      status: config.responseMsg.statusCreated
    }
  } catch (e: any) {
    console.log(e);
    ctx.throw(401, config.responseMsg.databaseError);
  }
}
// Show my collections
async function show(ctx: any) {
  try {
    const res = await collection.show(ctx.db, ctx.userid)
    ctx.status = 200;
    ctx.body = {
      data: res.rows
    }
  } catch (e: any) {
    ctx.throw(400, config.responseMsg.databaseError)
  }
}
// Rename collection
async function rename(ctx: any) {
  const data = <ICollectionRename>ctx.request.body;
  try {
    await collection.rename(ctx.db, data.id, data.name);
    ctx.status = 201;
    ctx.body = {
      status: config.responseMsg.statusUpdated
    }
  } catch (e: any) {
    ctx.throw(400, config.responseMsg.databaseError);
  }
}
// Delete collection
async function remove(ctx: any) {
  const data = ctx.request.body;
  try {
    await collection.remove(ctx.db, data.id)
    ctx.body = {
      status: config.responseMsg.statusDeleted
    }
  } catch (e: any) {
    ctx.throw(400, config.responseMsg.databaseError)
  }
}

export default {add, show, remove, rename}
