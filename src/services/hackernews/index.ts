// HackerNews service
import axios, {AxiosError} from "axios";
import {config} from "../../types/IConfig";
import IHackernews from "../../types/responce/IHackernews"
import story from "../../routes/story";
import {IStory} from "../../types/entities/IStory";
import {PoolClient} from "pg";
import Koa from "koa";

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

async function getComments(ids: Array<number>) {

}

async function fetchComments(storyId: number) {

}

export default { getComments, getStory, fetchComments }

// Fetch comments to story
