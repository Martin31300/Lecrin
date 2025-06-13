import db_client from "../../../database/client";
import type { Result } from "../../../database/client";

interface Artist {
  id: number;
  name: string;
  description: string;
  death_date: string;
  birthday: string;
}

async function selectAll() {
  const [artists] = await db_client.query("SELECT * FROM artist");
  return artists;
}

async function selectOne(id: number) {
  const [artist] = await db_client.query("SELECT * FROM artist WHERE id = ?", [
    id,
  ]);
  return artist;
}

async function create(newArtist: Artist) {
  const [result] = await db_client.query(
    "INSERT INTO artist ? VALUES (?, ?, ?, ?) ",
    [
      newArtist.name,
      newArtist.description,
      newArtist.death_date,
      newArtist.birthday,
    ],
  );
  return result;
}

async function deleteById(id: number) {
  const [result] = await db_client.query<Result>(
    "DELETE FROM artist WHERE id = ?",
    [id],
  );
  return result;
}

async function updateById(artist: Partial<Artist>, id: number) {
  const [result] = await db_client.query("UPDATE artist SET ? WHERE id = ?", [
    artist,
    id,
  ]);
  return result;
}

export default { selectAll, selectOne, create, deleteById, updateById };
