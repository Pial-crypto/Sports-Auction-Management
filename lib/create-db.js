const { Client } = require('pg');

async function createDatabase() {
    // Connect to default postgres database
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: '1234'
    });

    try {
        await client.connect();
        
        // Check if database exists
        const checkDb = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = 'Sport-auction'"
        );

        if (checkDb.rows.length === 0) {
            // Create database if it doesn't exist
            await client.query('CREATE DATABASE "Sport-auction"');
            console.log('Database "Sport-auction" created successfully!');
        } else {
            console.log('Database "Sport-auction" already exists.');
        }
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        await client.end();
    }
}

createDatabase(); 