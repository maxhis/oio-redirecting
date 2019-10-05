const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || '');
const { urls } = require('./urls');

const counter = async (req, res, next) => {
  const path = req.path.split('/')[1];
  if (urls.hasOwnProperty(path)) {
    next();
    const count = await redis.incr(path);
    console.log(`${path}: ${count}`);
  } else {
    res.redirect(301, 'https://oio.dev')
  }
}

const stat = async (req, res) => {
  const keys = Object.keys(urls);
  const counts = await redis.mget(keys);
  res.json(keys.map((key, index) => ({ [key]: counts[index] })));
}

module.exports = {
  counter,
  stat
};