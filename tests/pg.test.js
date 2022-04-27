require('dotenv').config()
const pg = require("pg");
const fs = require('fs');
const postgresqlUri = process.env.DATABASE_URL
const conn = new URL(postgresqlUri);
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
