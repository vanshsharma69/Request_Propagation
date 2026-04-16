const { MongoClient } = require("mongodb");

// MongoDB client setup for local database
const client = new MongoClient("mongodb://localhost:27017/loggerDB");

let db;

// Function to connect to database
async function connectDB() {
  if (db) return db; // already connected

  await client.connect();
  db = client.db("requestContextDB");
  console.log("MongoDB connected");
  return db;
}

// Function to get database instance
function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}

// Exporting functions
module.exports = { connectDB, getDB };
