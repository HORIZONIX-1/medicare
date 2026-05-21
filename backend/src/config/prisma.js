const { PrismaClient } = require("../generated/prisma/client");

const prismaClientOptions = {
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "warn" },
  ],
};

const createPrismaClient = () => {
  const client = new PrismaClient(prismaClientOptions);

  client.$on("query", (event) => {
    console.log(`Prisma Query: ${event.query}`);
    console.log(`Params: ${event.params}`);
    console.log(`Duration: ${event.duration}ms`);
  });

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
