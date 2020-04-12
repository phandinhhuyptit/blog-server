import redis from "redis";
import bluebird from "bluebird";
import configs from "../../configs/config";
import logger from "../logger";

const redisOptions = {
  host: configs.REDIS_HOST,
  port: configs.REDIS_PORT,
  prefix: configs.REDIS_PREFIX || "",
};

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
