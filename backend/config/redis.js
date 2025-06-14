const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error:", err));

const Queue = require("bull");
const redisURL = process.env.REDIS_URL;
const fileProcessor = require("../workers/fileProcessor");

const jobQueue = new Queue("fileQueue", redisURL);
jobQueue.process(fileProcessor);

jobQueue.on("progress", (job, progress) => {
  console.log(`Job ${job.id} is ${progress}% complete`);
});

jobQueue.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

module.exports = jobQueue;
