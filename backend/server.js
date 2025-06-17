const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://bulk-upload-data-4zxc.vercel.app", // ✅ Your frontend URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

require("./config/db");
require("./sockets/socketHandler")(io);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://bulk-upload-data-4zxc.vercel.app", // ✅ Your frontend URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", require("./routes/uploadRoute"));
app.get("/", (req, res) => {
  res.send(" Bulk Upload Server is Running!");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
