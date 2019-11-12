let {
    createLogger,
    format,
    transports
} = require('winston')



module.exports = function Logger(config) {
    this.config = config.logger

    // Setup logger
    logger = createLogger({
        format: format.combine(
            format.simple(),
            format.timestamp(),
            format.printf(info => `[${info.timestamp}] - ${info.level} - ${info.message}`)
        ),
        transports: [
            new transports.File(this.config.transportFile),
        ]
    })

    // Check environment
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console(this.config.transportConsole))
    }
    return logger
}