import { connectDB } from "../lib/db";
import { AdSnippet } from "../lib/models/AdSnippet";

async function main() {
  await connectDB();
  const ads = await AdSnippet.find({}).lean();
  console.log(JSON.stringify(ads, null, 2));
  process.exit(0);
}

main();
