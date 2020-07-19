const options = require("./default")
const channel = process.env.CHANNEL

module.exports = {
    name: "Zinevy - Beta",
    slug: "zinevy-pos",
    android: {
        package: "com.zinevy.pos.beta",
        versionCode: parseInt(process.env[channel]),
    },
    ios: {
        supportsTablet: true,
        buildNumber: process.env[channel].toString(),
    },
    ...options,
}
