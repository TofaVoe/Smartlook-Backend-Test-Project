// HackerNews service
import axios from "axios";
import {config} from "../../types/IConfig";
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
    return <IStory> res.data;
  } catch (e: any) {
    console.log(e);
    ctx.throw(400, e.name);
  }
}

async function getComments(ctx: any, comments_ids: Array<number>, story_id: number) {
  try {
    for (const id of comments_ids) {
      const res = await axios.get(config.hackernews.url.item + id + '.json');
      const comment: IComment = res.data;
      await saveComment(ctx.db, comment);
      saveRelation(ctx.db, story_id, id);
      if (comment.kids) {
        getComments(ctx, comment.kids, story_id);
      }
    }
  } catch (e) {
    console.log(e);
    ctx.throw(400, config.responseMsg.databaseError);
  }
}

async function saveComment(db: PoolClient, comment: IComment) {

  console.log(Date.now());

  const query = "INSERT INTO \"comment\"(id, time, type, text, by, parent) " +
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

async function saveRelation(db: PoolClient, story_id: number, comment_id: number) {
  const query = "INSERT INTO \"story_has_comment\"(story_id, comment_id) VALUES($1, $2)";
  const values = [story_id, comment_id];
  try {
    await db.query(query, values);
  } catch (e) {
    console.log(e)
  }
}

export default { getStory, getComments }
