const { Client } = require('pg');

const client = new Client({
    user: 'xwanefbrvdnqfn',
    host: 'ec2-54-221-244-70.compute-1.amazonaws.com',
    database: 'deq4bf5u65h126',
    password: 'cbdff509ffe0cc15c88547962571ddecf64b96913a4a64e1a616fb5582853100',
    port: 5432,
    ssl: true
  });

  client.connect();


  module.exports = client;
 