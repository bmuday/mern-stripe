require("dotenv").config();
const port = process.env.port || 5000;
const http = require("http");
const app = require("./app");

// CREATE SERVER HTTP
app.set("port", port);
const server = http.createServer(app);

// CONNECT TO DATABASE
const db = require("./db");

server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
