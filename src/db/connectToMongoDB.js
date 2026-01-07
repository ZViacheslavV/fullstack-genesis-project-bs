import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

const clientOptions = {
  serverApi: { version: '1', strict: false, deprecationErrors: true },
};

export const connectToMongoDB = async () => {
  try {
    const user = getEnvVar(ENV_VARS.DB_USER);
    const password = getEnvVar(ENV_VARS.DB_PASSWORD);
    const host = getEnvVar(ENV_VARS.DB_HOST);
    const dbName = getEnvVar(ENV_VARS.DB_NAME);
    const url = `mongodb+srv://${user}:${password}@${host}/${dbName}?appName=Cluster0`;

    await mongoose.connect(url, clientOptions);
    console.log('✅ MongoDB connection established successfully');

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('✅ Deployment pinged successfully');

    /*     await Model.syncIndexes();
    console.log('✅ Indexes synced successfully'); */
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};
