import db_client from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Collection {
  id: number;
  name: string;
  user_id: number;
  photo: string; // ou string | null selon ta BDD
}

async function selectAll() {
  const [result] = await db_client.query("SELECT * FROM collection");
  return result;
}
async function selectOne(id: number) {
  const [[collection]] = await db_client.query<Rows>(
    "SELECT * FROM collection WHERE id = ?",
    [id],
  );
  return collection;
}

async function create(newCollection: Omit<Collection, "id">) {
  const [result] = await db_client.query<Result>(
    "INSERT INTO collection (name, photo, user_id) VALUES (?, ?)",
    [newCollection.name, newCollection.photo, newCollection.user_id],
  );
  return result;
}

async function deleteById(id: number) {
  const [result] = await db_client.query<Result>(
    "DELETE FROM collection WHERE id = ?",
    [id],
  );
  return result;
}

async function updateById(id: number, collection: Partial<Collection>) {
  const [result] = await db_client.query<Result>(
    "UPDATE collection SET ? WHERE id = ?",
    [collection, id],
  );
  return result;
}

async function selectByUser(userId: number) {
  const [collections] = await db_client.query<Rows>(
    `SELECT collection.id, collection.name,
      (SELECT photo FROM artwork 
       JOIN collection_has_artwork ON artwork.id = collection_has_artwork.artwork_id 
       WHERE collection_has_artwork.collection_id = collection.id 
       LIMIT 1) AS cover_photo
     FROM collection
     WHERE collection.user_id = ?`,
    [userId],
  );
  return collections;
}

export default { selectAll, selectOne, create, deleteById, updateById, selectByUser };
