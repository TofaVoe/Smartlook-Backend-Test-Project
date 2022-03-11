// story/add (to collection)
// input: story id, collection id

import {IStoryAdd} from "../../types/entities/IStory";

async function add(ctx: any) {
  const data = <IStoryAdd>ctx.request.body;
}
// story/delete (from collection)
// input: story id
