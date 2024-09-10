const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('./config/env-variables')
const loggingMiddleware = require('./middleware/logging.middleware')
const urlRoutes = require('./routes/url.routes')
require('./config/mongoose')

const app = express()

app.use(cors())

app.use(express.json())

// app.use(cookieParser())

// app.use(loggingMiddleware)

// app.get('/', (req, res) => {
//     let userId = req.cookies.userId;

//     console.log(userId);

//     if (!userId) {
//         userId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

//         console.log(userId);

//         res.cookie('userId', userId, {
//             httpOnly: true,
//             maxAge: 30 * 24 * 60 * 60 * 1000, // cookie valid for 30 days
//         })
//     }

//     res.status(200).json({ message: "Welcome to the URL Shortener API" })
// })

app.use('/api/url', urlRoutes)


app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
})

