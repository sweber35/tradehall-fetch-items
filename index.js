import { fetchItems } from "./src/db.js";

export async function handler(event, context) {
  // first parse() removes escape characters but leaves it as a string
  // second parse() actually parsed the string into a object
  const response = await fetchItems(JSON.parse(JSON.parse(event.body)));

  return response;
}
