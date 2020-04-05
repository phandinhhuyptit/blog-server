import dotenv from "dotenv"

dotenv.config()

//get config from environment
export default {
  IS_PROD: process.env.NODE_ENV === "production",
  PORT: process.env.HUY_BACKEND_PORT,
  MONGO_URL: process.env.HUY_MONGO_URL,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
}
