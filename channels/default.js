module.exports = {
    platforms: ["ios", "android"],
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    updates: {
        checkAutomatically: "ON_ERROR_RECOVERY",
        enabled: true,
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        config: {
            googleSignIn: {
                reservedClientId: process.env.IOS_CLIENT_ID,
            },
        },
    },
    extra: {
        test: 1,
    },
}
