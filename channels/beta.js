const options = require("./default")
const channel = process.env.CHANNEL

module.exports = {
    name: "One Palengke - Beta",
    slug: "one-palengke-beta",
    android: {
        package: "com.zinevy.onepalengke.beta",
        versionCode: parseInt(process.env[channel]),
    },
    ios: {
        supportsTablet: true,
        buildNumber: process.env[channel].toString(),
    },
    ...options,
}
