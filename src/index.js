import { connectToMongoDB } from './db/connectToMongoDB.js';
import { startServer } from './server.js';

(async () => {
  try {
    await connectToMongoDB();
    startServer();
  } catch (err) {
    console.error('Application failed to start:', err);
    process.exit(1);
  }
})();
