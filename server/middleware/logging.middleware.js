
function loggingMiddleware(req, res, next) {
    const start = Date.now();

    console.log(`Request: ${req.method} ${res.originalUrl}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
            `Response: ${res.statusCode} ${res.statusMessage} - ${duration}ms`
        );
    })

    next();
}

module.exports = loggingMiddleware