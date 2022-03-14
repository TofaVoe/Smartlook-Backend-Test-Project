// HackerNews service
import axios, {AxiosError} from "axios";
import {config} from "../../types/IConfig";
import IHackernews from "../../types/responce/IHackernews"
import story from "../../routes/story";
import {IStory} from "../../types/entities/IStory";
import {PoolClient} from "pg";
import Koa from "koa";
import IComment  from "../../types/entities/IComment";

/**
 * @return IStory
 * @param id
 * @param ctx
 */
async function getStory(ctx: Koa.Context, id: number) {
  try {
    const res =  await axios.get(config.hackernews.url.item + id +'.json');
    getComments(ctx, res.data.kids)
    return <IStory> res.data;
  } catch (e: any) {
    console.log(e);
    ctx.throw(400, e.name);
  }
}

async function getComments(ctx: any, ids: Array<number>) {
  try {
    for (const id of ids) {
      const res = await axios.get(config.hackernews.url.item + id + '.json');
      const comment: IComment = res.data;
      saveComment(ctx.db, comment);
      // Save to DB
      if (comment.kids) {
        getComments(ctx, comment.kids);
      }
    }
  } catch (e) {
    console.log(e);
    ctx.throw(400, config.responseMsg.databaseError);
  }
}

async function saveComment(db: PoolClient, comment: IComment) {
  const query = "INSERT INTO \"story_comment\"(id, time, type, text, by, parent) " +
      "VALUES($1, to_timestamp($2), $3, $4, $5, $6 )";
  const values = [
      comment.id,
      comment.time,
      comment.type,
      comment.text,
      comment.by,
      comment.parent
  ];

  try {
      await db.query(query, values);
  } catch (e) {
      console.log(e);
  }
}


async function fetchComments(storyId: number) {

}

export default { getComments, getStory, fetchComments }

// Fetch comments to story
