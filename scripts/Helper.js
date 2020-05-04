const fs = require("fs")
const path = require("path")

const config = path.resolve("config.json")

class Helper {
    /**
     * Check If .env is existing
     * If exists, set to system enviroment
     * if not, use existing environment
     */
    static init() {
        let fileExists = fs.existsSync(config)

        if (fileExists) {
            const data = JSON.parse(fs.readFileSync(config))

            for (let env in data) {
                process.env[env] = data[env]
            }

            return
        }

        console.log("No config found, using Lambda Environment Variables")
    }

    static log(name, message) {
        return process.env.LOG == "true" ? console.log(`[${name}]:`, message) : null
    }
}

module.exports = Helper
