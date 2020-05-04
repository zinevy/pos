const options = require("./default")
const channel = process.env.CHANNEL

module.exports = {
    name: "One Palengke - Canary",
    slug: "one-palengke-canary",
    android: {
        package: "com.zinevy.onepalengke.canary",
        versionCode: parseInt(process.env[channel]),
    },
    ios: {
        supportsTablet: true,
        buildNumber: process.env[channel].toString(),
    },
    ...options,
}
