import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

async function runMigrations() {
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  console.log('🔄 Starting database migrations...');

  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection(DATABASE_URL);
    console.log('✅ Database connection established');

    // Run migrations
    const db = drizzle(connection);
    
    // Import schema to ensure tables are created
    await import('./db.js');
    
    console.log('✅ Database migrations completed successfully');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigrations()
  .then(() => {
    console.log('✅ All migrations completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration error:', error);
    process.exit(1);
  });
