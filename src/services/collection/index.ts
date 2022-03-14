// Collection Service
// Add story into collection

import {IStory} from "../../types/entities/IStory";
import {DatabaseError, PoolClient, QueryResult} from "pg";



async function create(db: PoolClient, userId: number, name: string) {
  const query = "INSERT INTO \"collection\"(name, owner_id)  VALUES($1, $2)";
  const values = [name, userId];
  await db.query(query, values);
}

async function show(db: PoolClient, userId: number) {
  const query = "SELECT * FROM \"collection\" WHERE owner_id = $1 ";
  const values = [userId];
  return <QueryResult> await db.query(query, values);
}

async function rename(db: PoolClient, collectionId: number, name: string) {
  const query = "UPDATE \"collection\" SET name = $1 WHERE id = $2 ";
  const values = [name, collectionId];
  await db.query(query, values);
}

async function remove(db: PoolClient, collectionId: number) {
  const query = "DELETE FROM \"collection\" WHERE id = $1 "
  const values = [collectionId];
  await db.query(query, values)
}

async function addStory(ctx: any, data: IStory, collectionId: number) {
  // save into collection data.collectionId
  try {
    // add to table.story
    await saveStory(ctx.db, data);
    // add to table.collection_has_story
    await saveRelation(ctx.db, data.id, collectionId);
    // Comments:

  } catch (e: any) {
    ctx.throw(400, e.name);
  }
}

async function saveStory(db: PoolClient, story: IStory) {
  let query = "INSERT INTO \"story\"(id, time, type, title, score, by, descendants, kids, url)" +
    "VALUES($1, to_timestamp($2), $3, $4, $5, $6, $7, $8, $9)";
  let values = [
    story.id,
    story.time,
    story.type,
    story.title,
    story.score,
    story.by,
    story.descendants,
    story.kids,
    story.url
  ];
  console.log(story);
  try {
    await db.query(query, values);
  } catch (e) {
    console.log(e)
  }
}

// PoolClient, IComment package?
async function saveComment(db: PoolClient, id: Array<number>) {

}

async function saveRelation(db: PoolClient, story_id: number, collection_id: number) {
  let query = "INSERT INTO \"collection_has_story\"(id_story, id_collection) VALUES($1, $2) "
  let values = [
    story_id,
    collection_id
  ]
  await db.query(query, values);
}

// Remove
async function removeStory(db: PoolClient, story_id: number, collection_id: number) {
  const deletefromStory = "DELETE FROM \"story\" WHERE id = $1";
  const deletefromStoryvalues = [collection_id];
  await db.query(deletefromStory, deletefromStoryvalues)

  const deletefromCollectionHasStory = "DELETE FROM \"collection_has_story\" WHERE id_collection = $1 AND id_story = $2";
  const deletefromCollectionHasStoryvalues = [collection_id, story_id];
  await db.query(deletefromCollectionHasStory, deletefromCollectionHasStoryvalues);
}

// Fetch story with comments

// Note to trigger some if this with CRON

export default {addStory, saveRelation, saveStory, removeStory, create, show, rename, remove}
