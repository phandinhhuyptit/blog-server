import dotenv from 'dotenv'

dotenv.config()

//get config from environment
export default {
  IS_PROD: process.env.NODE_ENV === 'production',
  PORT: process.env.BLOG_BACKEND_PORT,
  MONGO_URL: process.env.BLOG_MONGO_URL,
}
