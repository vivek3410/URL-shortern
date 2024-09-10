const redis = require('redis')

const client = redis.createClient({
    url: 'redis://localhost:6379'
})

client.on('error', (err) => {
    console.error("Redis Client Error: ", err)
})

client.on('connect', () => {
    console.log("Redis Client connected");
})

client.connect()

module.exports = client