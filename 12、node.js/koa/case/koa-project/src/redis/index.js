import redis from 'redis';
import bluebird from 'bluebird';
import logger from '../utils/log_util'
const client = redis.createClient('6379', '127.0.0.1');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
client.on("error", (err) => {
    logger.error(`redis--${err}`);
});
export default client;

