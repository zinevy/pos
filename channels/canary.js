const options = require("./default")
const channel = process.env.CHANNEL

module.exports = {
    name: "Zinevy - POS",
    slug: "zinevy-pos",
    android: {
        config: {
            googleSignIn: {
                apiKey: process.env.GOOGLE_API_KEY,
                certificateHash: process.env.CERTIFICATE_HASH,
            },
        },
        package: "com.zinevy.pos.canary",
        versionCode: parseInt(process.env[channel]),
    },
    ios: {
        config: {
            googleSignIn: {
                reservedClientId: process.env.IOS_URL_SCHEME,
            },
        },
        bundleIdentifier: "com.zinevy.pos.canary",
        supportsTablet: true,
        buildNumber: process.env[channel].toString(),
    },
    ...options,
}
