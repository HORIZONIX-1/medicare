const fs = require('node:fs');
const path = require('node:path');
const { PrismaClient } = require('./src/generated/prisma/client');
const bcrypt = require('bcryptjs');

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, 'utf8');

  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalsIndex = trimmed.indexOf('=');

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: 'Admin', email: 'admin@example.com', password: 'password', role: 'ADMIN' },
    { name: 'Doctor', email: 'doctor@example.com', password: 'password', role: 'DOCTOR' },
    { name: 'Reception', email: 'reception@example.com', password: 'password', role: 'RECEPTIONIST' },
    { name: 'Dispenser', email: 'dispenser@example.com', password: 'password', role: 'DISPENSER' },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashed, name: u.name, role: u.role },
      create: { email: u.email, password: hashed, name: u.name, role: u.role },
    });
    console.log('Upserted', u.email);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());