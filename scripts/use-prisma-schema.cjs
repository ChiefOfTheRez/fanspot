const fs = require('fs');
const path = require('path');

const mode = process.argv[2];
const root = process.cwd();
const source = mode === 'local'
  ? path.join(root, 'prisma', 'schema.local-sqlite.prisma')
  : mode === 'aws'
    ? path.join(root, 'prisma', 'schema.aws-postgres.prisma')
    : null;

if (!source) {
  console.error('Usage: npm run use:local-sqlite OR npm run use:aws-postgres');
  process.exit(1);
}

const target = path.join(root, 'prisma', 'schema.prisma');
fs.copyFileSync(source, target);
console.log(`Prisma schema switched to ${mode === 'local' ? 'local SQLite' : 'AWS PostgreSQL'}.`);
