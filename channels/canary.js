const options = require("./default")
const channel = process.env.CHANNEL

module.exports = {
    name: "One Palengke - Canary",
    slug: "one-palengke-canary",
    android: {
        config: {
            googleSignIn: {
                apiKey: process.env.GOOGLE_API_KEY,
                certificateHash: process.env.CERTIFICATE_HASH,
            },
        },
        package: "com.zinevy.onepalengke.canary",
        versionCode: parseInt(process.env[channel]),
    },
    ios: {
        config: {
            googleSignIn: {
                reservedClientId: process.env.IOS_URL_SCHEME,
            },
        },
        bundleIdentifier: "com.zinevy.onepalengke.canary",
        supportsTablet: true,
        buildNumber: process.env[channel].toString(),
    },
    ...options,
}
