const options = require("./default")
const channel = process.env.CHANNEL

module.exports = {
    name: "One Palengke - Dev",
    slug: "one-palengke-dev",
    android: {
        package: "com.zinevy.onepalengke.dev",
        versionCode: parseInt(process.env[channel]),
    },
    ios: {
        supportsTablet: true,
        buildNumber: process.env[channel].toString(),
    },
    ...options,
}
