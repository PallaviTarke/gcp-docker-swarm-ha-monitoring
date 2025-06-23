
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB connection (via ENV)
const mongoURL = process.env.MONGO_URL || "mongodb://mongo1:27017/test";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Redis connection (via ENV)
const redisURL = process.env.REDIS_URL || "redis://redis-master:6379";
const cache = redis.createClient({ url: redisURL });
cache.connect().then(() => console.log("Connected to Redis"))
  .catch(err => console.error("Redis connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Node.js App via NGINX 🚀");
});

app.post("/data", async (req, res) => {
  const { key, value } = req.body;
  await cache.set(key, value);
  res.send("Data cached in Redis ✅");
});

// Start server
app.listen(PORT, () => console.log(`Node.js listening on port ${PORT}`));
