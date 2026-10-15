const { PrismaClient } = require("../generated/prisma/client");

// Query logging prints parameters (patient data, password hashes), so it is opt-in only
const logQueries = process.env.PRISMA_LOG_QUERIES === "true";

const prismaClientOptions = {
  log: [
    ...(logQueries ? [{ emit: "event", level: "query" }] : []),
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "warn" },
  ],
};

const createPrismaClient = () => {
  const client = new PrismaClient(prismaClientOptions);

  if (logQueries) {
    client.$on("query", (event) => {
      console.log(`Prisma Query: ${event.query}`);
      console.log(`Params: ${event.params}`);
      console.log(`Duration: ${event.duration}ms`);
    });
  }

  return client;
};

const prisma =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

module.exports = prisma;
