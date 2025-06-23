const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://mongo1:27017,test?replicaSet=rs0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});

// Redis connection
const cache = redis.createClient({ url: "redis://redis-master:6379" });

cache.on('error', err => {
  console.error("❌ Redis connection error:", err.message);
});

cache.connect().then(() => {
  console.log("✅ Connected to Redis");
});

// Default GET route
app.get("/", (req, res) => {
  res.send("✅ Node.js App is running through NGINX!");
});

// POST /data to store key-value in Redis
app.post("/data", async (req, res) => {
  const { key, value } = req.body;
  try {
    await cache.set(key, value);
    res.send(`✅ Stored in Redis: ${key} = ${value}`);
  } catch (err) {
    res.status(500).send("❌ Error storing in Redis: " + err.message);
  }
});

// GET /data/:key to retrieve value from Redis
app.get("/data/:key", async (req, res) => {
  try {
    const value = await cache.get(req.params.key);
    if (value) {
      res.send(`🔍 Redis value: ${value}`);
    } else {
      res.status(404).send("❌ Key not found in Redis");
    }
  } catch (err) {
    res.status(500).send("❌ Error reading from Redis: " + err.message);
  }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Node.js server running on port ${PORT}`));

