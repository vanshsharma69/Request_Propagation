const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/loggerDB");

let db;

async function connectDB() {
  if (db) return db; // already connected

  await client.connect();
  db = client.db("requestContextDB");
  console.log("MongoDB connected");
  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}

module.exports = { connectDB, getDB };