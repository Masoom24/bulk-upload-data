const Queue = require("bull");
const fileProcessor = require("../workers/fileProcessor");

const jobQueue = new Queue("fileQueue", "redis://127.0.0.1:6379");

jobQueue.process(fileProcessor);

module.exports = jobQueue;
