const { PrismaClient } = require("@prisma/client");
const { Client } = require("pg");

const prisma = new PrismaClient();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main().catch((e) => {
  throw e;
});
