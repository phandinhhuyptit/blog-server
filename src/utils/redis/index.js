import redis from "redis";
import bluebird from "bluebird";
import config from "./../../config/index";
import logger from "../../libs/logger";

const redisOptions = config.redis;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient(redisOptions);

client.on("error", function (err) {
  logger.error(`Error ${err}`);
  process.exit(0);
});

export default {
  client,
};
