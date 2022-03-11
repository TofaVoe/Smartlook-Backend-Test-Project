import {ICollectionAdd, ICollectionRename} from "../../types/entities/ICollection";
import {config} from "../../types/IConfig";

async function add(ctx: any) {
  const data = <ICollectionAdd>ctx.request.body;

  const query = "INSERT INTO \"collection\"(name, owner_id) VALUES($1, $2)";
  const values = [data.name, ctx.userid];

  try {
    const res = await ctx.db.query(query, values);
    console.log(res);
    if (res.rowCount) {
      ctx.status = 201;
      ctx.body = {
        status: config.responseMsg.statusCreated
      }
    } else {
      console.log(res);
      ctx.status = 400;
      ctx.body = {
        status: config.responseMsg.databaseError
      }
    }
  } catch (e) {
    console.log(e);
    ctx.throw(401, config.responseMsg.databaseError);
  }

}
// Show my collections
async function show(ctx: any) {
  const query = "SELECT * FROM \"collection\" WHERE owner_id = $1 ";
  const values = [ctx.userid];
  try {
    const res = await ctx.db.query(query, values);
    ctx.body = {
      data: res.rows
    }
  } catch (e) {
    ctx.throw(400, config.responseMsg.databaseError)
  }
}
// Rename collection
async function rename(ctx: any) {
  const data = <ICollectionRename>ctx.request.body;
  const query = "UPDATE \"collection\" SET name = $1 WHERE id = $2 ";
  const values = [data.name, data.id];
  try {
    const res = await ctx.db.query(query, values);
    if (res.rowCount){
      ctx.status = 201;
      ctx.body = {
        status: config.responseMsg.statusUpdated
      }
    } else {
      ctx.throw(400, config.responseMsg.databaseError);
    }
  } catch (e) {
    ctx.throw(400, config.responseMsg.databaseError);
  }
}
// Delete collection
async function remove(ctx: any) {
  const data = ctx.request.body;
  const query = "DELETE FROM \"collection\" WHERE id = $1";
  const values = [data.id];
  try {
    const res = await ctx.db.query(query, values);
    ctx.body = {
      status: config.responseMsg.statusDeleted
    }
  } catch (e) {
    ctx.throw(400, config.responseMsg.databaseError)
  }
}

export default {add, show, remove, rename}
