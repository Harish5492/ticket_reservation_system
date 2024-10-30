import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export const ENVIROMENT_MANAGER = {
  SERVICE_NAME: process.env.SERVICE_NAME,
  SERVICE_HOST: process.env.SERVICE_HOST,
  SERVICE_PORT: process.env.SERVICE_PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },

  ENCDECRYPT_KEY: process.env.ENCDECRYPT_KEY,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MYSQL: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_NAME: process.env.DB_NAME,
  },
  TWILIO: {
    ACCOUNTSID: process.env.ACCOUNTSID,
    AUTHTOKEN: process.env.AUTHTOKEN,
  },
  MAILTRAP: {
    USERNAME: process.env.MAILTRAP_USERNAME,
    PASSWORD: process.env.MAILTRAP_PASSWORD,
  },
  BASE_URL: process.env.BASE_URL,
  GOOGLE_AUTH: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  },
};
