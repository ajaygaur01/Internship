// config/redisClient.js
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    reconnectStrategy: retries => {
      console.log(`🔁 Reconnecting to Redis (${retries} attempts so far)...`);
      return Math.min(retries * 100, 3000); // retry delay
    },
  },
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Error:', err);
});

async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('✅ Connected to Upstash Redis');
    }
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
  }
}

connectRedis();

module.exports = redisClient;
