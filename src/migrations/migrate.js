const fs = require('fs');
const path = require('path');
const { sql, config } = require('../database');

const MIGRATION_DIR = __dirname;

async function runMigration(file) {
    const sqlContent = fs.readFileSync(file, 'utf8');
    const pool = await sql.connect(config);
    await pool.request().query(sqlContent);
    console.log(`Applied migration: ${file}`);
}

async function migrate(direction) {
    const pool = await sql.connect(config);
    const migrationDir = path.join(MIGRATION_DIR, direction);
    console.log(migrationDir);
    const files = fs.readdirSync(migrationDir).filter(file => file.endsWith('.sql'));
    for (const file of files) {
        await runMigration(path.join(migrationDir, file));
    }

    sql.close();
}

const direction = process.argv[2];

if (direction !== 'up' && direction !== 'down') {
    console.error('Usage: npm run migrate <up|down>');
    process.exit(1);
}

migrate(direction).catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});