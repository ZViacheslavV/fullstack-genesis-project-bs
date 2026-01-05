import 'dotenv/config';

export const getEnvVar = (envName, defaultValue) => {
  const envValue = process.env[envName];

  if (envValue) return envValue;

  if (defaultValue) return defaultValue;

  throw new Error(`Env with name ${envName} is not set!`);
};
