/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

const NodeEnvironment = require('jest-environment-node').default;
const { execSync } = require('child_process');
const { v4: uuid } = require('uuid');
const { resolve } = require('path');
const { Client } = require('pg');
const { prisma } = require('@prisma/client');

const prismaCli = './node_modules/.bin/prisma';

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test'),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.schema = `code_schema_${uuid()}`;

    this.connectionString = process.env.DATABASE_URL.replace(
      'public',
      this.schema,
    );
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    execSync(`${prismaCli} migrate dev`);
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = CustomEnvironment;
