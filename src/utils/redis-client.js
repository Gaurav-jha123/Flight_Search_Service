const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
    url : process.env.REDIS_URL,
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

client.connect().catch(console.error);

module.exports = client;

// const client = redis.createClient({
//     host: process.env.REDIS_HOST || '127.0.0.1', // we can use when we need to connect to local redis cli
//     port: process.env.REDIS_PORT || 6379,
// });


