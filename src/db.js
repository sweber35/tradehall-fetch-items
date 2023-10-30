import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);

  const db = await client.db(process.env.DB_NAME);

  cachedDb = db;
  return db;
}

export async function fetchItems(query) {
  const db = await connectToDatabase();

  let result;

  if (query) {
    result = await db
      .collection(process.env.COLLECTION_NAME)
      .find(query)
      .toArray();
  } else {
    result = await db
      .collection(process.env.COLLECTION_NAME)
      .find()
      .limit(50)
      .toArray();
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  return response;
}
