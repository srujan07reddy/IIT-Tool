const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const bcrypt = require('bcrypt');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith('#') || !line.includes('=')) {
      continue;
    }

    const idx = line.indexOf('=');
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    const commentIndex = value.indexOf(' #');
    if (commentIndex >= 0) {
      value = value.slice(0, commentIndex).trim();
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function createClient(host) {
  const client = new Client({
    host,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USERNAME || process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'coaching_db',
  });

  await client.connect();
  return client;
}

async function resolveClient() {
  const candidates = [];
  const configuredHost = process.env.DB_HOST;

  if (configuredHost) {
    candidates.push(configuredHost);
  }

  for (const fallback of ['localhost', '127.0.0.1']) {
    if (!candidates.includes(fallback)) {
      candidates.push(fallback);
    }
  }

  let lastError;

  for (const host of candidates) {
    try {
      const client = await createClient(host);
      console.log(`Connected to PostgreSQL on ${host}:${process.env.DB_PORT || 5432}`);
      return client;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function seedUsers() {
  loadEnvFile(path.resolve(__dirname, '../../../.env'));
  loadEnvFile(path.resolve(__dirname, '../.env'));

  const client = await resolveClient();

  const demoUsers = [
    {
      email: 'admin@example.com',
      firstName: 'System',
      lastName: 'Admin',
      role: 'ADMIN',
      password: 'password',
    },
    {
      email: 'student@example.com',
      firstName: 'Demo',
      lastName: 'Student',
      role: 'STUDENT',
      password: 'password',
    },
    {
      email: 'staff@example.com',
      firstName: 'Demo',
      lastName: 'Staff',
      role: 'STAFF',
      password: 'password',
    },
    {
      email: 'technician@example.com',
      firstName: 'Demo',
      lastName: 'Technician',
      role: 'TECHNICIAN',
      password: 'password',
    },
    {
      email: 'account@example.com',
      firstName: 'Demo',
      lastName: 'Account',
      role: 'ACCOUNT',
      password: 'password',
    },
  ];

  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
          CREATE TYPE users_role_enum AS ENUM (
            'SUPER_ADMIN',
            'ADMIN',
            'MANAGEMENT',
            'FACULTY',
            'OPERATIONS',
            'STAFF',
            'TECHNICIAN',
            'ACCOUNT',
            'STUDENT'
          );
        END IF;
      END
      $$;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "createdAt" timestamptz NOT NULL DEFAULT NOW(),
        "updatedAt" timestamptz NOT NULL DEFAULT NOW(),
        "deletedAt" timestamptz NULL,
        email varchar NOT NULL UNIQUE,
        password varchar NOT NULL,
        "firstName" varchar NOT NULL,
        "lastName" varchar NOT NULL,
        role users_role_enum NOT NULL DEFAULT 'STAFF',
        "roleId" uuid NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "lastLoginAt" timestamptz NULL,
        "passwordLastChangedAt" timestamptz NULL,
        "createdBy" varchar NULL
      )
    `);

    for (const user of demoUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await client.query(
        `
          INSERT INTO users (
            email,
            password,
            "firstName",
            "lastName",
            role,
            "isActive",
            "passwordLastChangedAt"
          )
          VALUES ($1, $2, $3, $4, $5, $6, NOW())
          ON CONFLICT (email)
          DO UPDATE SET
            password = EXCLUDED.password,
            "firstName" = EXCLUDED."firstName",
            "lastName" = EXCLUDED."lastName",
            role = EXCLUDED.role,
            "isActive" = EXCLUDED."isActive",
            "passwordLastChangedAt" = EXCLUDED."passwordLastChangedAt"
        `,
        [
          user.email,
          hashedPassword,
          user.firstName,
          user.lastName,
          user.role,
          true,
        ],
      );

      console.log(`Upserted ${user.role} user: ${user.email}`);
    }
  } finally {
    await client.end();
  }
}

seedUsers().catch((error) => {
  console.error('Failed to seed users:', error.message);
  process.exitCode = 1;
});
