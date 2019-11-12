let fs = require('fs')


module.exports = class Utility {

    constructor(logger) {
        this.logger = logger
    }

    // readJson(path) {
    //     try {
    //         return fs.readFileSync(path, 'utf8')
    //     } catch (err) {
    //         this.logger.error(err)
    //     }
    // }
}