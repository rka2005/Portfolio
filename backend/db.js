const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("❌ MONGO_URI is missing in .env file");
}

const client = new MongoClient(uri, {
  maxPoolSize: 10,               // Connection pooling
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

let cachedDb = null;

async function connectToMongo() {
  if (cachedDb) return cachedDb;

  await client.connect();
  console.log(">> MongoDB Client Connected");

  const dbName = process.env.MONGO_DB_NAME || "portfolioDB";
  cachedDb = client.db(dbName);

  return cachedDb;
}

module.exports = { connectToMongo };
