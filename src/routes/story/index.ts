import {IStory, IStoryAdd, IStoryRemove} from "../../types/entities/IStory";
import hackernews from "../../services/hackernews";
import {config} from "../../types/IConfig";
import collection from "../../services/collection";

async function add(ctx: any) {
  const data = <IStoryAdd>ctx.request.body;
  const res = <IStory> await hackernews.getStory(ctx, data.storyId);

  if (res){
      await collection.addStory(ctx, res, data.collectionId);
      await hackernews.getComments(ctx, res.kids, res.id);

      ctx.status = 200;
      ctx.body = {
        status: config.responseMsg.statusCreated
      }
  }
}

async function remove(ctx: any) {
  const data = <IStoryRemove>ctx.request.body;
  try {
    await collection.removeStory(ctx.db, data.storyId, data.collectionId);
  } catch (e: any) {
    ctx.throw(400, e.name)
  }
}

export default {add, remove}
