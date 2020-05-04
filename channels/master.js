const options = require("./default")
const channel = process.env.CHANNEL

module.exports = {
    name: "One Palengke",
    slug: "one-palengke",
    android: {
        package: "com.zinevy.onepalengke",
        versionCode: parseInt(process.env[channel]),
    },
    ios: {
        supportsTablet: true,
        buildNumber: process.env[channel].toString(),
    },
    ...options,
}
