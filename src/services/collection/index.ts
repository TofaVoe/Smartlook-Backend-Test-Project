// Collection Service
// Add story into collection

import {IStory} from "../../types/entities/IStory";
import { PoolClient, QueryResult} from "pg";



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
  try {
    await saveStory(ctx.db, data);
    await saveRelation(ctx.db, data.id, collectionId);
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
  try {
    await db.query(query, values);
  } catch (e) {
    console.log(e)
  }
}

async function saveRelation(db: PoolClient, story_id: number, collection_id: number) {
  let query = "INSERT INTO \"collection_has_story\"(story_id, collection_id) VALUES($1, $2) "
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

  const deletefromCollectionHasStory = "DELETE FROM \"collection_has_story\" WHERE collection_id = $1 AND story_id = $2";
  const deletefromCollectionHasStoryvalues = [collection_id, story_id];
  await db.query(deletefromCollectionHasStory, deletefromCollectionHasStoryvalues);
}

export default {addStory, saveRelation, saveStory, removeStory, create, show, rename, remove}
