import dotenv from "dotenv";

dotenv.config();

//get config from environment
export default {
  IS_PROD: process.env.NODE_ENV === "production",
  PORT: process.env.HUY_BACKEND_PORT,
  MONGO_URL: process.env.HUY_MONGO_URL,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  ACCESS_TOKEN_EXPIRE: 24 * 60 * 60,
  REFESH_TOKEN_EXPIRE: 15 * 24 * 60 * 60,
  SECRET_KEY: process.env.SECRET_KEY,
  VERSION: process.env.VERSION,
  VERSION_TOKEN: process.env.VERSION_TOKEN,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  CORS: process.env.CORS,
  
};
