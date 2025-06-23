const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect("mongodb://mongo1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cache = require("redis").createClient({ url: "redis://redis-master:6379" });
cache.connect();

app.post("/data", async (req, res) => {
  const { key, value } = req.body;
  await cache.set(key, value);
  res.send("Data cached in Redis");
});

app.listen(PORT, () => console.log(`Node.js listening on ${PORT}`));
