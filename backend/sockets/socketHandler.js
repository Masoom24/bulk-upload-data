const jobQueue = require("../config/redis");
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    jobQueue.on("global:progress", (jobId, progress) => {
      socket.emit("progress", { percent: progress });
    });

    jobQueue.on("global:completed", (jobId) => {
      socket.emit("complete", { message: "Processing completed" });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
