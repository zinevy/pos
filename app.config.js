const dotenv = require("dotenv")
const Helper = require("./scripts/Helper")
const result = dotenv.config()
const { version } = require("./package.json")

Helper.init()

module.exports = () => {
    const channel = process.env.CHANNEL
    const config = require(`./channels/${channel}`)

    const channelConfig = {
        ...config,
        version,
        extra: {
            ...config.extra,
            ...result.parsed,
        },
    }

    return channelConfig
}
