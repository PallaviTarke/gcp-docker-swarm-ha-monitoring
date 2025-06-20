const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express(), PORT = 3000;

mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB connected"));
const r = redis.createClient({url: process.env.REDIS_URL});
r.connect().then(() => console.log("Redis connected"));

app.get('/', async (req, res) => {
  await r.set("page","visited");
  res.send("Hello from Node.js!");
});
app.listen(PORT, () => console.log(`Server on ${PORT}`));
