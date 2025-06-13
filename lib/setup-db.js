const fs = require('fs');
const path = require('path');
const db = require('./db');

async function setupDatabase() {
    try {
        // Read the schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Execute the schema
        await db.none(schema);
        console.log('Database schema created successfully!');

        // Insert some initial data
        await db.none(`
            INSERT INTO users (username, email, password_hash, full_name, role)
            VALUES ('admin', 'admin@sportsauction.com', 'dummy_hash', 'Admin User', 'admin')
            ON CONFLICT (username) DO NOTHING;
        `);
        console.log('Initial data inserted successfully!');

    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        process.exit();
    }
}

setupDatabase(); 