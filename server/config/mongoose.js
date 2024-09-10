const mongoose = require('mongoose')
const config = require('./env-variables')

mongoose.connect(config.MONGO_URI).then(() => {
    console.log("MongoDB connected");
}).catch((e) => {
    console.log("Error connecting to MongoDB", e);
})