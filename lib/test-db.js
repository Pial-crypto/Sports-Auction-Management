const db = require('./db');

async function testConnection() {
    try {
        const result = await db.one('SELECT NOW()');
        console.log('Database connection successful!');
        console.log('Current timestamp:', result.now);
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        process.exit();
    }
}

testConnection(); 