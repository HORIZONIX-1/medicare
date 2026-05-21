const http = require("node:http");
const app = require("./app");

const normalizePort = (value) => {
  const port = Number.parseInt(value, 10);

  if (Number.isNaN(port) || port <= 0) {
    return 4000;
  }

  return port;
};

const port = normalizePort(process.env.PORT);
const server = http.createServer(app);

const shutdown = (signal) => {
  console.log(`${signal} received. Closing HTTP server...`);

  server.close((error) => {
    if (error) {
      console.error("Error while closing HTTP server:", error);
      process.exit(1);
    }

    console.log("HTTP server closed.");
    process.exit(0);
  });
};

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  if (error.code === "EACCES") {
    console.error(`Port ${port} requires elevated privileges.`);
    process.exit(1);
  }

  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use.`);
    process.exit(1);
  }

  throw error;
});

server.listen(port, () => {
  console.log(`Medical Center Admin API listening on port ${port}`);
});

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  shutdown("uncaughtException");
});
