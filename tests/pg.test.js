require('dotenv').config()
const pg = require("pg");
const postgresqlUri = process.env.DATABASE_URL
const conn = new URL(postgresqlUri);
const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient();

conn.search = conn.query = "";
const config = {
  connectionString: conn.href,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CA_PEM,
  },
};

const client = new pg.Client(config);

describe("Cient should connect to database and run native sql to it", () => {
  test('Check connection to database', () => {
    client.connect(function (err) {
      if (err)
        throw err;
      client.query("SELECT pid FROM pg_stat_activity WHERE datname = 'socket' AND state = 'active';", [], function (err, result) {
        if (err) {
          throw err;
        }
        expect(result.rows).toBeGreaterThan(0);
        client.end(function (err) {
          if (err)
            throw err;
        });
      });
    });
  });
})

describe("Prisma should connect to database and run create, insert, select, update, delete", () => {
  test('Check connection to database', async () => {
    let user = {
      email : (Math.random() + 1).toString(36).substring(7) + '@gmail.com',
      first_name : 'John',
      last_name : 'Doe',
      password : 'password',
      role : ['user'],
    }
    const create = await prismaClient.users.create({data: user})
    const find = await prismaClient.users.findUnique({
      where: {
        email: 'emailtest@gmail.com',
      },
    })
    expect(find.first_name).toBe('John');
  });
})