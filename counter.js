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
  const result = keys.reduce((obj, item, index) => { 
    obj[item] = counts[index];
    return obj;
  }, {});
  res.json(result);
}

module.exports = {
  counter,
  stat
};